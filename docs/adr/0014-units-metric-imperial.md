# ADR 0014: Units (Metric vs Imperial)

## Context
Users log weight in kg or lb. Analytics and storage must remain consistent.

## Decision
Store weights internally in metric (kg) for consistency.
Convert at API/UI boundaries based on user preference.

## Consequences
- Consistent calculations and comparisons
- Requires conversion utilities and clear rounding rules
- UI displays user-preferred units while DB remains stable
