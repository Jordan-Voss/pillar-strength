# ADR 0010: Data Ownership & Access Control

## Context
Training data is user-owned and sensitive. The system must prevent cross-user access.

## Decision
All endpoints require authentication in MVP.
API enforces ownership by scoping all reads/writes using authenticated `user_id` from JWT (`sub`).

## Consequences
- Strong protection against BOLA by default
- Requires auth setup for all requests
- Public/anonymous endpoints can be added later only for explicitly public resources
