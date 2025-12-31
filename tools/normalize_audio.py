#!/usr/bin/env python3
"""
Batch-normalize game audio files offline using ffmpeg loudnorm.

Typical command:
  python tools/normalize_audio.py --in assets/audio --out assets/audio_normalized

Idempotent behavior means: rerunning with the same inputs + settings will skip
work that is already normalized based on a manifest stored at:
  <out_dir>/.normalized_manifest.json
"""

from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

SUPPORTED_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"]
MANIFEST_VERSION = 1
MANIFEST_FILENAME = ".normalized_manifest.json"


@dataclass
class Settings:
    i: float
    tp: float
    lra: float
    ffmpeg_version: str

    def as_dict(self) -> Dict[str, object]:
        return {
            "i": self.i,
            "tp": self.tp,
            "lra": self.lra,
            "ffmpeg_version": self.ffmpeg_version,
        }


@dataclass
class FileTask:
    input_path: Path
    rel_path: Path
    sha256: str
    input_mtime: float
    input_size: int


@dataclass
class ProcessResult:
    rel_path: Path
    status: str
    output_rel_path: Optional[Path] = None
    output_size: Optional[int] = None
    error: Optional[str] = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Batch-normalize audio files using ffmpeg loudnorm, with idempotent "
            "manifest tracking."
        )
    )
    parser.add_argument("--in", dest="input_dir", required=True, help="Input directory")
    parser.add_argument("--out", dest="output_dir", required=True, help="Output directory")
    parser.add_argument("--i", type=float, default=-16.0, help="Target integrated loudness")
    parser.add_argument("--tp", type=float, default=-1.5, help="Target true peak")
    parser.add_argument("--lra", type=float, default=11.0, help="Target loudness range")
    parser.add_argument("--dry-run", action="store_true", help="Show work without writing")
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Remove outputs no longer present in input and update manifest",
    )
    parser.add_argument("--verbose", action="store_true", help="Verbose per-file logs")
    parser.add_argument(
        "--extensions",
        default=",".join(SUPPORTED_EXTENSIONS),
        help="Comma-separated list of extensions to include (e.g. .mp3,.wav)",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=1,
        help="Number of concurrent workers (default 1)",
    )
    parser.add_argument(
        "--fail-fast",
        action="store_true",
        help="Stop on the first processing failure",
    )
    return parser.parse_args()


def normalize_extensions(extensions_arg: str) -> List[str]:
    extensions: List[str] = []
    for ext in extensions_arg.split(","):
        ext = ext.strip().lower()
        if not ext:
            continue
        if not ext.startswith("."):
            ext = f".{ext}"
        extensions.append(ext)
    return sorted(set(extensions))


def compute_sha256(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def load_manifest(path: Path, verbose: bool) -> Dict[str, object]:
    if not path.exists():
        return {
            "version": MANIFEST_VERSION,
            "settings": {},
            "files": {},
        }
    try:
        with path.open("r", encoding="utf-8") as handle:
            data = json.load(handle)
    except (json.JSONDecodeError, OSError) as exc:
        if verbose:
            print(f"Warning: could not read manifest ({exc}); starting fresh.")
        return {
            "version": MANIFEST_VERSION,
            "settings": {},
            "files": {},
        }
    if not isinstance(data, dict):
        return {
            "version": MANIFEST_VERSION,
            "settings": {},
            "files": {},
        }
    data.setdefault("version", MANIFEST_VERSION)
    data.setdefault("settings", {})
    data.setdefault("files", {})
    return data


def write_manifest(path: Path, manifest: Dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = path.with_suffix(".json.tmp")
    with temp_path.open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2, sort_keys=True)
        handle.write("\n")
    temp_path.replace(path)


def get_ffmpeg_version() -> str:
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            check=True,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise RuntimeError("ffmpeg not found") from exc
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"ffmpeg error: {exc}") from exc
    return result.stdout.splitlines()[0].strip() if result.stdout else "unknown"


def gather_audio_files(input_dir: Path, extensions: List[str]) -> List[Path]:
    files: List[Path] = []
    for path in sorted(input_dir.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() in extensions:
            files.append(path)
    return files


def build_task(path: Path, input_dir: Path) -> FileTask:
    stat_info = path.stat()
    return FileTask(
        input_path=path,
        rel_path=path.relative_to(input_dir),
        sha256=compute_sha256(path),
        input_mtime=stat_info.st_mtime,
        input_size=stat_info.st_size,
    )


def is_up_to_date(
    entry: Dict[str, object],
    task: FileTask,
    output_dir: Path,
    settings_match: bool,
) -> bool:
    if not settings_match:
        return False
    if entry.get("sha256") != task.sha256:
        return False
    output_rel = entry.get("output_rel_path")
    if not isinstance(output_rel, str):
        return False
    output_path = output_dir / output_rel
    if not output_path.exists():
        return False
    output_size = entry.get("output_size")
    if not isinstance(output_size, int):
        return False
    try:
        actual_size = output_path.stat().st_size
    except OSError:
        return False
    return actual_size == output_size


def run_ffmpeg(
    input_path: Path,
    output_path: Path,
    settings: Settings,
) -> Tuple[bool, str]:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    filter_arg = f"loudnorm=I={settings.i}:TP={settings.tp}:LRA={settings.lra}:print_format=summary"
    result = subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(input_path),
            "-af",
            filter_arg,
            str(output_path),
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        return True, ""
    return False, result.stderr.strip()


def process_file(
    task: FileTask,
    output_dir: Path,
    settings: Settings,
    verbose: bool,
) -> ProcessResult:
    output_rel_path = task.rel_path
    output_path = output_dir / output_rel_path
    success, error = run_ffmpeg(task.input_path, output_path, settings)
    if success:
        output_size = output_path.stat().st_size
        return ProcessResult(
            rel_path=task.rel_path,
            status="processed",
            output_rel_path=output_rel_path,
            output_size=output_size,
        )
    if output_path.exists():
        try:
            output_path.unlink()
        except OSError:
            pass
    if task.input_path.suffix.lower() != ".wav":
        fallback_rel = task.rel_path.with_suffix(".wav")
        fallback_path = output_dir / fallback_rel
        fallback_success, fallback_error = run_ffmpeg(
            task.input_path, fallback_path, settings
        )
        if fallback_success:
            output_size = fallback_path.stat().st_size
            if verbose:
                print(f"Fallback to WAV for {task.rel_path}")
            return ProcessResult(
                rel_path=task.rel_path,
                status="processed",
                output_rel_path=fallback_rel,
                output_size=output_size,
            )
        error = f"{error}\nFallback failed: {fallback_error}".strip()
        if fallback_path.exists():
            try:
                fallback_path.unlink()
            except OSError:
                pass
    return ProcessResult(
        rel_path=task.rel_path,
        status="failed",
        error=error,
    )


def format_command(args: argparse.Namespace, override: Optional[str] = None) -> str:
    base = [
        "python",
        "tools/normalize_audio.py",
        "--in",
        str(args.input_dir),
        "--out",
        str(args.output_dir),
        "--i",
        str(args.i),
        "--tp",
        str(args.tp),
        "--lra",
        str(args.lra),
    ]
    if args.extensions:
        base.extend(["--extensions", str(args.extensions)])
    if args.workers and args.workers != 1:
        base.extend(["--workers", str(args.workers)])
    if override:
        base.append(override)
    return " ".join(base)


def main() -> int:
    args = parse_args()
    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)

    if not input_dir.exists() or not input_dir.is_dir():
        print(f"Input directory not found: {input_dir}")
        return 2

    try:
        ffmpeg_version = get_ffmpeg_version()
    except RuntimeError:
        print("Error: ffmpeg not found. Install ffmpeg and retry.")
        return 1

    extensions = normalize_extensions(args.extensions)
    settings = Settings(i=args.i, tp=args.tp, lra=args.lra, ffmpeg_version=ffmpeg_version)

    manifest_path = output_dir / MANIFEST_FILENAME
    manifest = load_manifest(manifest_path, args.verbose)
    manifest_settings = manifest.get("settings", {})
    settings_match = manifest_settings == settings.as_dict()

    all_files = gather_audio_files(input_dir, extensions)
    total_files = len(all_files)

    if total_files == 0:
        print("No audio files found to process.")
        print(f"Manifest path: {manifest_path}")
        return 0

    file_entries: Dict[str, Dict[str, object]] = manifest.get("files", {})

    tasks: List[FileTask] = []
    skipped: List[Path] = []

    for path in all_files:
        task = build_task(path, input_dir)
        entry = file_entries.get(task.rel_path.as_posix())
        if entry and is_up_to_date(entry, task, output_dir, settings_match):
            skipped.append(task.rel_path)
            if args.verbose:
                print(f"Skip {task.rel_path}")
            continue
        tasks.append(task)
        if args.verbose:
            print(f"Queue {task.rel_path}")

    processed = 0
    failed = 0
    failures: List[Tuple[Path, str]] = []

    if args.dry_run:
        processed = len(tasks)
    else:
        if tasks:
            task_map = {task.rel_path: task for task in tasks}
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=max(1, args.workers)
            ) as executor:
                future_map = {
                    executor.submit(
                        process_file, task, output_dir, settings, args.verbose
                    ): task
                    for task in tasks
                }
                for future in concurrent.futures.as_completed(future_map):
                    result = future.result()
                    if result.status == "processed":
                        processed += 1
                        normalized_at = datetime.now(timezone.utc).isoformat()
                        task = task_map[result.rel_path]
                        file_entries[result.rel_path.as_posix()] = {
                            "sha256": task.sha256,
                            "input_mtime": task.input_mtime,
                            "input_size": task.input_size,
                            "output_rel_path": result.output_rel_path.as_posix()
                            if result.output_rel_path
                            else result.rel_path.as_posix(),
                            "output_size": result.output_size,
                            "normalized_at_iso": normalized_at,
                        }
                        if args.verbose:
                            print(f"Processed {result.rel_path}")
                    else:
                        failed += 1
                        failures.append((result.rel_path, result.error or "Unknown error"))
                        if args.verbose:
                            print(f"Failed {result.rel_path}")
                        if args.fail_fast:
                            for pending in future_map:
                                pending.cancel()
                            break

    cleaned = 0
    if args.clean:
        input_rel_set = {path.relative_to(input_dir).as_posix() for path in all_files}
        for rel_path_str in list(file_entries.keys()):
            if rel_path_str in input_rel_set:
                continue
            entry = file_entries.get(rel_path_str, {})
            output_rel = entry.get("output_rel_path")
            if isinstance(output_rel, str):
                output_path = output_dir / output_rel
                if output_path.exists():
                    if args.dry_run:
                        cleaned += 1
                    else:
                        try:
                            output_path.unlink()
                            cleaned += 1
                        except OSError:
                            pass
            if not args.dry_run:
                file_entries.pop(rel_path_str, None)

    if not args.dry_run:
        manifest["version"] = MANIFEST_VERSION
        manifest["settings"] = settings.as_dict()
        manifest["files"] = file_entries
        write_manifest(manifest_path, manifest)

    skipped_count = len(skipped)

    print("\nSummary")
    print("-------")
    print(f"Total files found: {total_files}")
    print(f"Processed: {processed}")
    print(f"Skipped: {skipped_count}")
    print(f"Failed: {failed}")
    print(f"Cleaned: {cleaned}")
    print(f"Manifest: {manifest_path}")

    print("\nNext steps")
    print("----------")
    print(f"1) Point the game to use {output_dir} instead of {input_dir}.")
    print(f"2) Re-run with same settings:\n   {format_command(args)}")
    print(
        "3) Change target loudness (example):\n"
        f"   {format_command(args, override='--i -14.0')}"
    )

    if failures:
        print("\nFailures")
        print("--------")
        for rel_path, error in failures:
            short_error = error.splitlines()[-1] if error else "Unknown error"
            print(f"- {rel_path}: {short_error}")
        print("Possible reasons: missing codec support, permission issues, or corrupt input.")

    if args.dry_run:
        print("\nDry run complete. No files were written.")

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
