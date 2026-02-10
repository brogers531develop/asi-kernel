#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[DEMO] 1) init"
bash "$REPO_ROOT/scripts/asi-init.sh"

echo "[DEMO] 2) ingest adversarial hall of fame (holy sh*t jump)"
bash "$REPO_ROOT/scripts/asi-ingest-adversarial.sh" \
  "$REPO_ROOT/memory/failure_atlas.json" \
  "$REPO_ROOT/memory/adversarial_set.json"

echo "[DEMO] 3) ingest a failure lesson (creates blocking rule)"
bash "$REPO_ROOT/scripts/asi-ingest-failure.sh" \
  "$REPO_ROOT/memory/failure_atlas.json" \
  "$REPO_ROOT/examples/lessons/example_lesson.json"

echo "[DEMO] 4) attempt known-bad run — should be BLOCKED"
set +e
bash "$REPO_ROOT/scripts/asi-run.sh" \
  "$REPO_ROOT/memory/failure_atlas.json" \
  "$REPO_ROOT/examples/runs/example_run_failed.json"
RC=$?
set -e

if [ $RC -eq 2 ]; then
  echo "[DEMO] ✅ blocked as expected (kernel prevented recurrence)"
else
  echo "[DEMO] ❌ unexpected: run was not blocked"
fi

echo "[DEMO] 5) attempt safe run — should pass, maybe warn"
set +e
bash "$REPO_ROOT/scripts/asi-run.sh" \
  "$REPO_ROOT/memory/failure_atlas.json" \
  "$REPO_ROOT/examples/runs/example_run_safe.json"
SRC=$?
set -e
if [ $SRC -eq 0 ]; then
  echo "[DEMO] ✅ safe run passed"
elif [ $SRC -eq 3 ]; then
  echo "[DEMO] ⚠️ safe run passed rules but raised smell warnings (expected if rhetoric triggers)"
fi

echo "[DEMO] 6) print atlas"
bash "$REPO_ROOT/scripts/asi-print-atlas.sh" "$REPO_ROOT/memory/failure_atlas.json"
