# ADR 0015: e1RM Formula Choice (Epley vs Brzycki)

## Context
Estimated 1RM is useful for insights. Different communities prefer different formulas.

## Decision
Default to Epley for MVP.
Allow users to choose Epley or Brzycki in settings.
The selected formula affects insights only, not stored session data.

## Consequences
- User choice without data migration
- Analytics queries must apply correct formula at runtime
- Testing must cover both formulas on known datasets
