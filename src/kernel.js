import { nowIso, uid } from "./io.js";

/**
 * ASI Kernel = Wisdom Wrapper
 *
 * It does NOT generate answers.
 * It prevents recurrence of known pain by:
 *  - turning recorded failures into rules (guardrails)
 *  - maintaining an adversarial library of convincing-wrong patterns
 *
 * Philosophy:
 *  - Intelligence explores
 *  - Wisdom remembers pain
 *  - ASI refuses to relearn known failure
 */

/** Convert failures -> enforceable rules (minimal v0.1) */
export function deriveRulesFromFailures(atlas) {
  const rules = [];
  for (const f of atlas.failures || []) {
    rules.push({
      id: uid("rule"),
      ts: nowIso(),
      name: f.avoidance_rule?.name || `Rule from ${f.failure_mode}`,
      if: f.avoidance_rule?.if || {},
      then: f.avoidance_rule?.then || {},
      severity: "block"
    });
  }
  return rules;
}

/** Minimal matcher: block if run fields equal rule.if fields */
export function checkRunAgainstRules(run, rules) {
  const fields = {
    claim_type: run.claim_type || "unknown",
    experiments_count: run.metrics?.experiments_count ?? 0
  };

  for (const r of rules || []) {
    const iff = r.if || {};
    const matches =
      (iff.claim_type == null || iff.claim_type === fields.claim_type) &&
      (iff.experiments_count == null || iff.experiments_count === fields.experiments_count);

    if (matches && (r.then?.action === "block")) {
      return { blocked: true, message: r.then?.message || "Blocked by ASI kernel rule." };
    }
  }
  return { blocked: false };
}

/**
 * Lightweight adversarial smell-check.
 * This doesn't prove wrongness; it flags risk.
 */
export function smellCheckAgainstAdversarial(run, adversarialExamples) {
  const text = (run.answer || "").toLowerCase();
  const flags = [];

  for (const ex of adversarialExamples || []) {
    const pat = ex.pattern;
    if (pat === "CONFIDENCE_STACKING") {
      const triggers = ["definitively", "well-known", "clearly", "undeniably", "therefore"];
      if (triggers.some(t => text.includes(t))) {
        flags.push({ pattern: pat, note: "High-certainty rhetoric detected." });
      }
    }
    if (pat === "SELECTIVE_EVIDENCE") {
      if (!text.includes("confound") && !text.includes("negative control")) {
        flags.push({ pattern: pat, note: "No confounder/negative-control language detected." });
      }
    }
    if (pat === "UNFALSIFIABLE_ESCAPE_HATCH") {
      if (text.includes("observe") && !text.includes("if") && !text.includes("would falsify")) {
        flags.push({ pattern: pat, note: "Experiment phrasing may be non-falsifiable." });
      }
    }
    if (pat === "RUBRIC_MIRRORING") {
      const headings = ["assumptions", "experiments", "controls"];
      if (headings.every(h => text.includes(h)) && (text.length < 250)) {
        flags.push({ pattern: pat, note: "Rubric keywords present but content is very short." });
      }
    }
  }

  return flags;
}

export function recordFailure(atlas, lesson) {
  const failure = {
    id: uid("failure"),
    ts: nowIso(),
    failure_mode: lesson.failure_mode,
    trigger: lesson.trigger,
    outcome: lesson.outcome,
    avoidance_rule: lesson.avoidance_rule,
    notes: lesson.notes || ""
  };
  atlas.failures = atlas.failures || [];
  atlas.failures.push(failure);
  return atlas;
}

export function ingestAdversarial(atlas, adversarialExample) {
  atlas.adversarial = atlas.adversarial || [];
  atlas.adversarial.push({
    id: adversarialExample.id || uid("adv"),
    ts: adversarialExample.ts || nowIso(),
    pattern: adversarialExample.pattern,
    example: adversarialExample.example,
    why_it_works: adversarialExample.why_it_works,
    how_to_catch: adversarialExample.how_to_catch,
    tags: adversarialExample.tags || []
  });
  return atlas;
}
