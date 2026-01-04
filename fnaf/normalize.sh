#!/usr/bin/env bash
set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

python "${script_dir}/mp3_raw/normalize_audio.py" --in "${script_dir}/mp3_raw" --out "${script_dir}/mp3_normalized.mp3"
