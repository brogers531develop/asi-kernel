#!/usr/bin/env node
import { readJson, writeJson } from "./io.js";
import {
  deriveRulesFromFailures,
  checkRunAgainstRules,
  recordFailure,
  smellCheckAgainstAdversarial,
  ingestAdversarial
} from "./kernel.js";

const args = process.argv.slice(2);
const cmd = args[0];

function usage() {
  console.log(`
asi-kernel CLI

Commands:
  derive-rules <atlasPath>
  check-run    <atlasPath> <runPath>
  ingest       <atlasPath> <lessonPath>
  ingest-adv   <atlasPath> <adversarialSetPath>
  smell-check  <atlasPath> <runPath>

Examples:
  node src/cli.js derive-rules memory/failure_atlas.json
  node src/cli.js ingest memory/failure_atlas.json examples/lessons/example_lesson.json
  node src/cli.js ingest-adv memory/failure_atlas.json memory/adversarial_set.json
  node src/cli.js smell-check memory/failure_atlas.json examples/runs/example_run_failed.json
`);
}

if (!cmd) {
  usage();
  process.exit(1);
}

if (cmd === "derive-rules") {
  const atlasPath = args[1];
  const atlas = readJson(atlasPath);
  const rules = deriveRulesFromFailures(atlas);
  atlas.rules = rules;
  writeJson(atlasPath, atlas);
  console.log(`[ok] derived ${rules.length} rules`);
  process.exit(0);
}

if (cmd === "check-run") {
  const atlasPath = args[1];
  const runPath = args[2];
  const atlas = readJson(atlasPath);
  const run = readJson(runPath);

  const verdict = checkRunAgainstRules(run, atlas.rules || []);
  if (verdict.blocked) {
    console.log(`[blocked] ${verdict.message}`);
    process.exit(2);
  }
  console.log("[ok] run passes current kernel rules");
  process.exit(0);
}

if (cmd === "ingest") {
  const atlasPath = args[1];
  const lessonPath = args[2];
  const atlas = readJson(atlasPath);
  const lesson = readJson(lessonPath);

  const updated = recordFailure(atlas, lesson);
  writeJson(atlasPath, updated);

  console.log(`[ok] ingested failure mode: ${lesson.failure_mode}`);
  process.exit(0);
}

if (cmd === "ingest-adv") {
  const atlasPath = args[1];
  const advPath = args[2];
  const atlas = readJson(atlasPath);
  const adv = readJson(advPath);

  const list = adv.examples || [];
  for (const ex of list) ingestAdversarial(atlas, ex);

  writeJson(atlasPath, atlas);
  console.log(`[ok] ingested ${list.length} adversarial exemplars into atlas.adversarial`);
  process.exit(0);
}

if (cmd === "smell-check") {
  const atlasPath = args[1];
  const runPath = args[2];
  const atlas = readJson(atlasPath);
  const run = readJson(runPath);

  const flags = smellCheckAgainstAdversarial(run, atlas.adversarial || []);
  if (flags.length) {
    console.log(`[warn] adversarial smell-check raised ${flags.length} flag(s):`);
    for (const f of flags) console.log(` - ${f.pattern}: ${f.note}`);
    process.exit(3);
  }
  console.log("[ok] no adversarial smell flags");
  process.exit(0);
}

usage();
process.exit(1);
