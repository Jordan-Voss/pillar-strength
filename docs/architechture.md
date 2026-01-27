# Architecture

## Components
- Expo client (Pillar Strength app: iOS/Android/Web)
- Spring Boot API (business logic, validation, analytics)
- Supabase Postgres (storage)
- Supabase Auth (JWT)

## Deployment Flow (Cloud Migration)
The Pillar Strength API follows a modern containerized pipeline:
1. **Build**: GitHub Actions compiles the Java 21 API and builds a Docker image.
2. **Registry**: The image is pushed to a private **Amazon ECR** repository.
3. **Provision**: Terraform ensures the EC2, Security Groups, and IAM Roles are correctly configured.
4. **Deploy**: The EC2 instance pulls the latest image from ECR using its **IAM Role** (no passwords required) and restarts the container with the latest environment variables.

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