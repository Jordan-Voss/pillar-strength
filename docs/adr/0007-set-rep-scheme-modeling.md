# ADR 0007: Set/Rep Schemes as Declarative Metadata

## Context
Training programs use structured schemes (straight sets, top sets, backoffs, fatigue singles). Fully implementing progression and load calculation early would increase scope significantly.

## Decision
Model set/rep schemes as declarative metadata attached to planned exercises.
Schemes are stored and returned by the API but are not executed or enforced in MVP.

Schemes support independent backoff reps and percentages (e.g., top set 1@8 followed by 4x3 @85%).

## Consequences
- Advanced program intent can be represented immediately
- MVP remains small and correctness-focused
- Future progression engines can be introduced without schema changes
