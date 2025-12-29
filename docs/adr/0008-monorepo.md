# ADR 0008: Monorepo vs Multirepo

## Context
Pillar Strength includes a backend API, an Expo app, and shared documentation.
We want vertical slices and synchronized contracts.

## Decision
Use a monorepo with:
- `apps/api` (Spring Boot)
- `apps/app` (Expo)
- `docs/` shared

CI uses path filters to run relevant pipelines only.

## Consequences
- One PR can update API, UI, and docs together
- Contract changes can be verified across both
- Deployments remain independent via path-based CD rules
