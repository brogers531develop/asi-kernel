#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log(){ echo "[ASI-INIT] $1"; }
abort(){ echo "[ASI-INIT][FATAL] $1" >&2; exit 1; }

command -v jq >/dev/null 2>&1 || abort "jq is required"

log "Initializing ASI kernel in repo..."
mkdir -p "$REPO_ROOT/memory" "$REPO_ROOT/agents" "$REPO_ROOT/logs" "$REPO_ROOT/docs" "$REPO_ROOT/examples"

if [ ! -f "$REPO_ROOT/memory/failure_atlas.json" ]; then
  cat > "$REPO_ROOT/memory/failure_atlas.json" <<'EOF'
{
  "version": "0.1",
  "description": "Population-shared negative knowledge store",
  "failures": [],
  "rules": [],
  "adversarial": []
}
EOF
  log "Created memory/failure_atlas.json"
else
  log "memory/failure_atlas.json exists — preserving scars"
fi

if [ ! -f "$REPO_ROOT/agents/agent-template.json" ]; then
  cat > "$REPO_ROOT/agents/agent-template.json" <<'EOF'
{
  "agent_name": "template",
  "role": "explorer",
  "heuristics": [],
  "guardrails": [],
  "known_failure_signatures": [],
  "confidence_calibration": "unknown",
  "notes": "This agent has not yet learned pain"
}
EOF
  log "Created agents/agent-template.json"
fi

jq '.failures|length' "$REPO_ROOT/memory/failure_atlas.json" >/dev/null
log "Kernel initialized. (failures preserved, rules derivable)"
