# ADR 0009: API Contract Strategy (OpenAPI)

## Context
The UI must remain compatible with the API as both evolve.
We want early detection of breaking changes.

## Decision
- Generate OpenAPI from Spring Boot using springdoc.
- Validate contract quality using Spectral.
- Detect breaking changes using OpenAPI diff against main.
- Keep UI in sync by generating typed client/types from OpenAPI.

## Consequences
- Contract becomes a first-class artifact
- Breaking changes are caught in CI
- UI types remain aligned with API responses
