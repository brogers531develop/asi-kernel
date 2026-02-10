#!/bin/bash
set -e
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ATLAS="${1:-$REPO_ROOT/memory/failure_atlas.json}"

command -v jq >/dev/null 2>&1 || { echo "jq required"; exit 1; }

echo "----- FAILURE ATLAS (failures) -----"
jq '.failures[]? | {ts, failure_mode, notes}' "$ATLAS"
echo
echo "----- FAILURE ATLAS (rules) -----"
jq '.rules[]? | {ts, name, severity}' "$ATLAS"
echo
echo "----- FAILURE ATLAS (adversarial exemplars) -----"
jq '.adversarial[]? | {ts, pattern, tags}' "$ATLAS"
