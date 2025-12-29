# Security

This document outlines the MVP security model for Pillar Strength.

---

## Threat model (MVP)

Primary risks:
- Unauthorized access to user-owned training data
- Token theft / misuse
- Broken object-level authorization (BOLA)
- Excessive data exposure via APIs

Non-goals (MVP):
- Advanced fraud controls
- WAF-level protection
- Enterprise SSO

---

## Authentication

- Supabase Auth manages identities and credential storage.
- Client obtains a JWT from Supabase.
- Client sends requests to API with: `Authorization: Bearer <JWT>`.

API verifies JWT using Supabase JWKS and extracts:
- `sub` as `user_id`

---

## Authorization & data isolation

All endpoints require authentication in MVP.

Key rule:
- Every query and mutation is scoped to the authenticated `user_id`.

Implementation:
- API enforces `WHERE user_id = :authUserId` for all user-owned tables.
- Resource identifiers (UUIDs) are never trusted without verifying ownership.

Example:
- `GET /sessions/{id}` must verify the session belongs to the user before returning it.

---

## Input validation

The API validates:
- numeric ranges (reps, weight, rpe)
- schema shapes (set/rep scheme JSON)
- required fields by endpoint

---

## Storage & secrets

- Supabase service role keys are never shipped to the client.
- Secrets are stored in CI secret manager and runtime environment variables.

---

## Logging (PII considerations)

Logs should:
- include request/correlation IDs
- include user_id
- avoid logging raw JWTs, passwords, or sensitive notes

---

## Future considerations (post-MVP)
- Rate limiting
- Audit logs for coach/org access
- Fine-grained roles & permissions
- Secure media upload workflows (pre-signed URLs)
