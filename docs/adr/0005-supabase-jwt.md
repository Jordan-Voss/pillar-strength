# ADR 0005: Supabase JWT Authentication

## Context
We want managed auth without storing passwords or building a custom identity service.

## Decision
Use Supabase Auth for identity and verify JWTs in the API using Supabase JWKS.

## Consequences
- Stateless API
- No credential handling in the backend
- Easy to add providers/SSO later
