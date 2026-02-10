#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ATLAS="${1:-$REPO_ROOT/memory/failure_atlas.json}"
RUN="${2:-$REPO_ROOT/examples/runs/example_run_failed.json}"

command -v node >/dev/null 2>&1 || { echo "node required"; exit 1; }

echo "[ASI-RUN] 1) rule-check (hard block)"
set +e
node "$REPO_ROOT/src/cli.js" check-run "$ATLAS" "$RUN"
RC=$?
set -e

if [ $RC -eq 2 ]; then
  echo "[ASI-RUN] BLOCKED — recurrence prevented."
  exit 2
fi

echo "[ASI-RUN] 2) adversarial smell-check (soft warning)"
set +e
node "$REPO_ROOT/src/cli.js" smell-check "$ATLAS" "$RUN"
SRC=$?
set -e

if [ $SRC -eq 3 ]; then
  echo "[ASI-RUN] WARN — smells like known deception. Proceed with extra verification."
  exit 3
fi

echo "[ASI-RUN] OK — run passes."
exit 0
