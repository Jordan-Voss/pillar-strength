# ADR 0001: Templates vs Program Instances

## Context
Users want structured programs but also the ability to customise them over time.

## Decision
Templates are immutable blueprints.
Users create Program Instances (editable copies) from templates or manually.

## Consequences
- Editing a program does not rewrite history
- Templates can evolve independently
- Supports onboarding recommendation flow
