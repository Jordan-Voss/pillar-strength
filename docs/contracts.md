# API Contracts

Pillar Strength treats the API contract as a first-class artifact.

Goals:
- Keep UI and API in sync
- Detect breaking changes early
- Make integration predictable

---

## OpenAPI as the source of truth

The Spring Boot API generates an OpenAPI spec using `springdoc-openapi`.

- Swagger UI: `/swagger-ui`
- OpenAPI JSON: `/v3/api-docs`

The generated spec is exported to:
- `docs/openapi.yaml` (committed) OR generated in CI as a build artifact.

---

## Contract validation in CI

CI performs:

### 1) OpenAPI generation
- Build API
- Generate OpenAPI spec
- Fail if generation fails

### 2) OpenAPI lint (Spectral)
- Lint the spec against rules (naming, required fields, response format)
- Fail on contract-quality regressions

### 3) Breaking change detection (OpenAPI diff)
- Compare `main` branch spec vs PR spec
- Fail on breaking changes unless explicitly acknowledged (e.g., version bump)

---

## Keeping the Expo app in sync

Recommended approach:
1) Generate a typed client from OpenAPI for the Expo app (e.g., `openapi-typescript` + fetch wrapper).
2) The Expo app imports types from the generated client.
3) CI fails if:
    - OpenAPI changes but the client was not regenerated.

This ensures API changes cannot silently break the UI.

---

## Versioning policy

- All endpoints are under `/v1`.
- Backward-incompatible changes require:
    - new endpoint shape under `/v2`, or
    - a new endpoint name while keeping `/v1` stable.

MVP supports `/v1` only.
