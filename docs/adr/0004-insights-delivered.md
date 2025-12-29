# ADR 0004: Insights Derived On Demand (MVP)

## Context
Insights can be computed on demand or stored as snapshots. Snapshots improve performance but add complexity and duplication.

## Decision
In MVP, compute insights on demand from sessions and sets.

## Consequences
- Simplifies MVP and ensures correctness
- Easy to validate via golden dataset tests
- Snapshot tables may be added later if performance becomes an issue
