# ADR 0002: Workout Sessions as Source of Truth

## Context
Analytics must reflect what actually happened. Planned data is not always executed as written.

## Decision
Workout sessions and sets represent reality and are the source of truth for insights.
Programs represent intent and schedule only.

## Consequences
- Accurate history and insights
- Easy planned vs completed adherence
- Requires linking sessions to program days where applicable
