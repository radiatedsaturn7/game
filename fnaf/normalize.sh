#!/usr/bin/env bash
set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
legacy_out_dir="${script_dir}/mp3_normalized.mp3"

if [[ -d "${legacy_out_dir}" ]]; then
  rm -rf "${legacy_out_dir}"
fi

python "${script_dir}/mp3_raw/normalize_audio.py" --in "${script_dir}/mp3_raw" --out "${script_dir}/mp3_normalized"
