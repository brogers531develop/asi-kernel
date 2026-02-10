#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ATLAS="${1:-$REPO_ROOT/memory/failure_atlas.json}"
LESSON="${2:-$REPO_ROOT/examples/lessons/example_lesson.json}"

command -v jq >/dev/null 2>&1 || { echo "jq required"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "node required"; exit 1; }

echo "[ASI-INGEST] atlas=$ATLAS"
echo "[ASI-INGEST] lesson=$LESSON"

node "$REPO_ROOT/src/cli.js" ingest "$ATLAS" "$LESSON"
node "$REPO_ROOT/src/cli.js" derive-rules "$ATLAS"

echo "[ASI-INGEST] done"
