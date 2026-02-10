# FAILURE MODES — v1 Taxonomy (30)

This file is intentionally written to be understood by:
- an exhausted engineer (IQ 80 day), and
- a research lead (IQ 200 day)

Each failure mode includes:
- **Early tells**: what it looks like *before* it blows up
- **Why it happens**: the mechanism
- **Mitigation**: what to encode into the kernel

> ASI is built by industrializing *irreversible lessons*.

---

## 1) UNTESTABLE_CLAIM
**Early tells:** elegant mechanism, zero falsification tests  
**Why:** narrative optimization beats reality  
**Mitigation:** block mechanism claims without ≥2 falsifiable experiments or explicit “speculation” tag

## 2) CONFIDENT_HALLUCINATION
**Early tells:** high certainty language + weak citations/evidence  
**Why:** fluency mistaken for truth  
**Mitigation:** require evidence checklist; penalize certainty without support

## 3) RUBRIC_GAMING
**Early tells:** answers mirror grader keywords; shallow substance  
**Why:** optimizing evaluator, not objective  
**Mitigation:** adversarial graders + “substance” checks (external consistency, counterfactual probes)

## 4) ONTOLOGY_MISMATCH
**Early tells:** terms used inconsistently; category errors  
**Why:** wrong mental model of entities/relationships  
**Mitigation:** enforce glossary; require definitions for critical terms

## 5) CAUSAL_LEAP
**Early tells:** correlation → mechanism jump  
**Why:** humans love stories; models love coherence  
**Mitigation:** require causal diagram or explicit confounders

## 6) CONFOUNDING_IGNORED
**Early tells:** single-factor explanation for multi-factor system  
**Why:** complexity compression  
**Mitigation:** “confounder sweep” checklist

## 7) BASE_RATE_NEGLECT
**Early tells:** rare events treated as common  
**Why:** vivid examples overweighted  
**Mitigation:** base-rate prompt + sanity bounds

## 8) OVERGENERALIZATION
**Early tells:** claims extend beyond evidence scope  
**Why:** pattern overreach  
**Mitigation:** scope tags: {population, context, assumptions}

## 9) UNDER-SPECIFIED_TASK
**Early tells:** answer starts before clarifying constraints  
**Why:** urgency bias  
**Mitigation:** enforce “3 clarifying questions or 2 conditional branches” rule

## 10) MISSING_NEGATIVE_CONTROLS
**Early tells:** experiments lack proper controls  
**Why:** confirmation bias  
**Mitigation:** require positive + negative control per experiment

## 11) MEASUREMENT_ERROR
**Early tells:** vague metrics, no assay limitations  
**Why:** map/territory confusion  
**Mitigation:** measurement section required

## 12) DATA_LEAKAGE
**Early tells:** suspiciously high performance; leaked labels  
**Why:** improper splits, leakage paths  
**Mitigation:** leakage checklist + red-team split audit

## 13) DISTRIBUTION_SHIFT
**Early tells:** trained on A, deployed on B  
**Why:** environment moves  
**Mitigation:** shift detectors + “unknown unknowns” gates

## 14) NON-REPRODUCIBLE_PIPELINE
**Early tells:** missing seeds, versions, parameters  
**Why:** hidden state  
**Mitigation:** enforce reproducibility metadata

## 15) TOOL_OVERTRUST
**Early tells:** “the tool said so” without validation  
**Why:** authority bias  
**Mitigation:** cross-check requirement for critical claims

## 16) TOOL_UNDERUSE
**Early tells:** hand-wavy where tools could verify  
**Why:** laziness / missing affordances  
**Mitigation:** auto-suggest tool calls for verification steps

## 17) COST_BLINDNESS
**Early tells:** proposes infeasible resources/time  
**Why:** optimization ignores constraints  
**Mitigation:** cost budget gates

## 18) SAFETY_BLINDNESS
**Early tells:** no mention of hazards or ethics  
**Why:** narrow objective  
**Mitigation:** safety checklist for bio/chem/medical tasks

## 19) PRIVACY_LEAK
**Early tells:** handles sensitive data casually  
**Why:** convenience bias  
**Mitigation:** redaction + minimization defaults

## 20) SECURITY_WEAKNESS
**Early tells:** secrets in code, no auth, broad CORS  
**Why:** demo-itis  
**Mitigation:** secure defaults + threat model

## 21) REGRESSION_RISK
**Early tells:** change lacks tests  
**Why:** speed bias  
**Mitigation:** tests required for kernel functions

## 22) SILENT_FAILURE
**Early tells:** no error handling; happy-path only  
**Why:** optimism bias  
**Mitigation:** “fail loud” policy and logging contracts

## 23) INTERFACE_DRIFT
**Early tells:** schema changes without migration  
**Why:** entropy  
**Mitigation:** schema versioning + migrations

## 24) MISALIGNED_OBJECTIVE
**Early tells:** optimizes proxy, not goal  
**Why:** Goodhart’s law  
**Mitigation:** multi-metric evaluation + veto constraints

## 25) LOCAL_MAXIMA_TRAP
**Early tells:** convergence too early; little diversity  
**Why:** elitism collapse  
**Mitigation:** diversity archive + novelty rewards

## 26) MODE_COLLAPSE
**Early tells:** all agents write similarly  
**Why:** cloning winners  
**Mitigation:** enforce diversity quota

## 27) OVERCONFIDENCE_IN_NOVELTY
**Early tells:** “never seen before” treated as “true”  
**Why:** novelty bias  
**Mitigation:** novelty requires validation

## 28) UNKNOWN_UNKNOWN_BLINDSPOT
**Early tells:** no mention of what could be missing  
**Why:** incomplete search  
**Mitigation:** mandatory “what would change my mind?” section

## 29) LEGIBILITY_TRAP
**Early tells:** preference for neat explanations over messy truth  
**Why:** human readability bias  
**Mitigation:** allow uncertainty; require alternatives

## 30) ADVERSARIAL_DECEPTION
**Early tells:** persuasive structure; missing falsifiers; selective evidence  
**Why:** optimization for belief  
**Mitigation:** adversarial exemplars + contradiction probes + forced counterarguments

---

## Kernel integration
These failure modes become:
- *lessons* (specific events), then
- *rules* (general guardrails), then
- *gates* (prevent recurrence by default).

The system improves when error space shrinks.
