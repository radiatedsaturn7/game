#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

python -m http.server 8000 --directory "${SCRIPT_DIR}/fnaf"
