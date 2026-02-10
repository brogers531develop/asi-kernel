# ASI Kernel — Industrialized Wisdom (v0.1)

> Intelligence consumes energy to understand.  
> Wisdom conserves energy by remembering what hurts.  
> **ASI is the industrialization of wisdom.**

This repository is not “an AGI model.”
It is a **kernel**: a small set of rules + data structures that make any agent system
**refuse to relearn known pain**.

## What this is
- A minimal, opinionated framework for:
  - capturing failures as structured lessons
  - turning those lessons into guardrails
  - sharing negative knowledge across a population
- Scripts + a tiny Node runtime you can run locally

## What this is not
- A claim of consciousness
- A “superintelligence button”
- A replacement for evaluation, science, or rigor

---

## Quickstart (local)

### Requirements
- bash
- `jq`
- Node.js (recommended)

### Initialize the kernel
```bash
bash scripts/asi-init.sh
```

### Run the demo
```bash
bash scripts/asi-demo.sh
```

What you should see:
- a failed run gets ingested into the atlas
- the atlas produces a guardrail
- the next run gets blocked from repeating the same failure pattern
- adversarial examples are ingested into a Hall of Fame
- a lightweight “red team” check warns when an answer smells like a known deception pattern

---

## Core idea (in one sentence)
**One failure, properly recorded, should protect a thousand futures.**

---

## Why this matters
Most systems optimize for “best answer.”
This optimizes for **shrinking the space of catastrophic wrongness**.

That’s the difference between intelligence and wisdom.

---

## Repository map
- `memory/failure_atlas.json` — shared negative knowledge (failures + rules)
- `memory/adversarial_set.json` — convincing-wrong exemplars (deception patterns)
- `docs/FAILURE_MODES.md` — taxonomy of failure modes + early tells + mitigations
- `scripts/` — init/run/ingest/demo tools
- `src/` — minimal kernel runtime (Node)
- `schemas/` — JSON schemas for structured lessons

---

## Roadmap (near-term)
- population registry + diversity archive
- automatic clustering of failure signatures
- adversarial graders + rubric-gaming detectors
- optional MongoDB store for shared multi-machine memory

---

## License
MIT
