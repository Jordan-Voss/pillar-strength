# ADR 0012: Set/Rep Scheme Storage Format (JSON)

## Context
Set/rep schemes vary widely and will expand (top set, backoffs, fatigue singles, multiple blocks).
Hard-coding all scheme shapes as relational tables increases complexity early.

## Decision
Store scheme metadata as JSON attached to planned program exercises.
Validate JSON shape server-side.
Support independent backoff reps (e.g., top set 1@8 then 4x3 @85%).

## Consequences
- Flexible representation without schema churn
- Requires JSON validation and careful evolution strategy
- Future progression engines can interpret the JSON without rewriting storage
