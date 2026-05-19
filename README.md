# Pillar Strength

Pillar Strength is an individual-first training platform focused on **correctness, clarity, and long-term progression**.

The MVP is a structured training tracker for lifters who want to:

- follow a structured gym program,
- create or edit their own program,
- log planned and ad-hoc workouts quickly,
- review history and useful training stats,
- and later share training data with coaches or organisations.

This repository is a **monorepo** containing:

- a Spring Boot API (`apps/api`)
- an Expo application for mobile + web (`apps/app`)
- system and product documentation (`docs/`)

The MVP focuses on **individual gym-based program tracking**. Coach, organisation, marketplace, and AI-assisted coaching features are future scope and should not drive the first user experience.

---

## Tech Stack

**Backend**

- Java 25
- Spring Boot
- Supabase Postgres
- Supabase Auth (JWT)
- Flyway migrations
- Testcontainers for integration tests

**Frontend**

- React Native (Expo)
- Expo Router
- Runs on iOS, Android, and Web

**Engineering & DevOps**

- Monorepo with vertical slices
- CI with linting and tests
- OpenAPI for API contracts
- ADRs for architectural decisions
- Structured logging and basic observability
- Terraform/AWS infrastructure
- Docker containerisation
- Private Amazon ECR image registry

---

## Repository Structure

```txt
pillar-strength/
├── apps/
│   ├── api/          # Spring Boot backend
│   └── app/          # Expo app
├── docs/
│   ├── adr/          # Architecture Decision Records
│   ├── design/       # Wireframes and user flows
│   └── *.md          # Product, API, roadmap, and architecture docs
└── .github/
    └── workflows/    # CI/CD pipelines
```

---

## Product Direction

The core app loop is:

```txt
See what to do today
→ Log planned or blank workout
→ Review progress/history
→ Edit or change program when needed
```

The long-term tabs are:

```txt
Home
Log
Progress
Profile
```

Programs and exercises are important, but they are not permanent top-level tabs. They are internal screens used by the main app loop.

---

## Philosophy

Pillar Strength is built with the following principles:

- **Sessions are the source of truth**: what actually happened matters most.
- **Programs define intent**: planned training can differ from performed training.
- **Templates are blueprints**: active programs are user-owned copies.
- **Set/rep schemes are declarative metadata in MVP**: no full progression engine yet.
- **Design for coaching/org expansion without building it prematurely**.

---

## Status

Early development — MVP Core under active construction.

See `docs/mvp-scope.md` and `docs/roadmap.md` for the current scope and delivery order.