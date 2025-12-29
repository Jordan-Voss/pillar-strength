# Testing Strategy

Pillar Strength aims for high confidence via layered testing with contract protection.

---

## Goals
- Correctness of training data (logging, units, e1RM)
- Protect API/UI compatibility
- Fast CI feedback
- Catch regressions with small end-to-end coverage

---

## Test layers

### 1) Unit tests (fast)
Scope:
- set validation rules
- unit conversion utilities
- e1RM calculations (Epley + Brzycki)
- adherence calculations (planned vs completed)
- scheme JSON validation (shape, required fields)

Tools:
- JUnit 5 + Mockito (as needed)

---

### 2) Integration tests (real DB)
Scope:
- Spring Boot endpoints hit real Postgres via Testcontainers
- verifies persistence and queries behave as expected
- tests critical flows without UI

Examples:
- create program → schedule entries produced
- start session → log sets → session detail returns correct
- weekly insights returns correct on seeded data

Tools:
- Testcontainers (Postgres)
- Spring Boot integration testing (MockMvc/WebTestClient)

---

### 3) Contract tests (API compatibility)
Approach (MVP):
- API generates OpenAPI spec (springdoc)
- Spectral lints the spec
- OpenAPI diff checks for breaking changes
- UI uses generated client/types based on OpenAPI

CI fails if:
- breaking change is introduced without intentional versioning
- OpenAPI changes but client/types are not regenerated

Tools:
- springdoc-openapi
- Spectral
- openapi-diff
- openapi-typescript (or equivalent) for type generation

---

### 4) BDD acceptance tests (Given/When/Then) at API boundary
Scope:
- business-level flows expressed as scenarios
- run against API + real DB in CI
- designed to catch contract and behaviour changes

Example scenario:
- Given a user with a program
- When they start a session and log a set
- Then the session appears in history
- And weekly insights reflect the set volume

Tools:
- Cucumber JVM (Java) + integration test harness

Note:
- Keep scenario count small (5–10) in MVP.

---

### 5) UI E2E smoke tests
Goal:
- validate primary user journeys in a realistic environment

MVP flows (2–3 only):
1) onboarding → select template → schedule shows plan
2) start session → log set → history shows session
3) insights loads for a week with data

Tools:
- Prefer Playwright for Expo Web build initially (simpler)
- Consider Detox later for native

---

## CI expectations by slice
- Slice 1: unit + integration + contract generation/lint
- Slice 2: add BDD scenario for log set → history
- Slice 3: add copy-last golden integration test
- Slice 4: add insights golden dataset integration test
- Slice 5: add UI smoke tests
