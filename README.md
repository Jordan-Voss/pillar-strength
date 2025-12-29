# Pillar Strength

Pillar Strength is a training platform focused on **correctness, clarity, and long-term progression**.

The goal is to allow athletes to:
- follow a structured training program (template or custom),
- log gym sessions quickly (RPE optional),
- view accurate history and weekly insights,
- and later share training data with coaches or organisations.

This repository is a **monorepo** containing:
- a Spring Boot API (`apps/api`)
- an Expo application for mobile + web (`apps/app`)
- system and product documentation (`docs/`)

The MVP focuses on **gym-based training only**, but the system is designed to expand to:
- coaches and organisations
- program blocks (meso/micro) and deloads
- media uploads and comments
- additional activity types beyond the gym
- different training methodologies

---

## Tech Stack

**Backend**
- Java 21
- Spring Boot
- Supabase Postgres
- Supabase Auth (JWT)
- Testcontainers (integration tests)

**Frontend**
- React Native (Expo)
- Expo Router
- Runs on iOS, Android, and Web

**Engineering**
- Monorepo with vertical slices
- CI with linting and tests
- OpenAPI for API contracts
- ADRs for architectural decisions
- Structured logging and basic observability

---

## Repository Structure

pillar-strength/
apps/
api/ # Spring Boot backend
app/ # Expo app (mobile + web)
docs/
adr/ # Architecture Decision Records
design/ # Wireframes and user flows
.github/
workflows/ # CI pipelines


---

## Philosophy

Pillar Strength is built with the following principles:
- **Sessions are the source of truth** (what actually happened matters)
- **Programs define intent**, not reality
- **Set/rep schemes are declarative metadata** in MVP (no progression engine yet)
- **Design for expansion without building it prematurely**

---

## Status

Early development — MVP under active construction.

See `docs/mvp-scope.md` for what is explicitly in and out of scope.