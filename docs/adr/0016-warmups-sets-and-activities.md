# ADR 0016: Warmups as Sets and Activities

## Context
Users warm up in two main ways:
1) ramp/bar warmup sets for lifts
2) general warmup work like bike/row/run, mobility, stretching

We want warmups to be loggable and visible without overbuilding an engine.

## Decision
Represent warmups in two complementary forms:
- warmup sets: `workout_sets.role = WARMUP`
- warmup activities: `session_activities` rows linked to a workout session

Allow blank/freestyle sessions (`program_day_id` nullable) so users can log sessions without a planned program day.

Insights exclude warmup sets from lifting volume by default.

## Consequences
- supports real lifting workflows (ramp sets + general warmups)
- keeps analytics clear by default (working volume)
- avoids premature warmup prescription engines while keeping data structured
