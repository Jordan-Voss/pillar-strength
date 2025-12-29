# Architecture

## Components
- Expo client (Pillar Strength app: iOS/Android/Web)
- Spring Boot API (business logic, validation, analytics)
- Supabase Postgres (storage)
- Supabase Auth (JWT)

## Auth flow
Client authenticates with Supabase → receives JWT → calls API with Bearer JWT.
API verifies JWT via Supabase JWKS and uses `sub` as the user identifier.

## High-level diagram
```mermaid
flowchart LR
  subgraph Client
    A[Expo App]
  end

  subgraph Backend
    B[Spring Boot API]
  end

  subgraph Platform
    C[(Supabase Postgres)]
    D[Supabase Auth]
  end

  A -->|Login| D
  A -->|Bearer JWT| B
  B -->|Verify JWT (JWKS)| D
  B --> C
```