#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ATLAS="${1:-$REPO_ROOT/memory/failure_atlas.json}"
ADV="${2:-$REPO_ROOT/memory/adversarial_set.json}"

command -v node >/dev/null 2>&1 || { echo "node required"; exit 1; }

echo "[ASI-ADV] ingesting adversarial set into atlas..."
node "$REPO_ROOT/src/cli.js" ingest-adv "$ATLAS" "$ADV"
echo "[ASI-ADV] done"
