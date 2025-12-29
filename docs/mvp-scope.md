# Pillar Strength — MVP Scope

## Goal
A user can choose a training template or create their own program, follow a schedule, log gym sessions quickly (RPE optional), and view history + weekly insights.
The system is designed to later support coaches/orgs/media and other activities, but MVP is gym-only.

## In scope (MVP)
### Account & Settings
- Supabase Auth (email/password)
- User profile:
    - display name (optional in UI; stored for future)
- Settings (MVP):
    - units: metric/imperial
    - e1RM formula: Epley/Brzycki
    - theme: follow system (manual override later)

### Programs
- Templates (4):
    1) Powerlifting 3-day (S/B/D)
    2) Powerlifting 4-day (Upper/Lower strength)
    3) General gym 3-day full body (hypertrophy)
    4) General gym 4-day upper/lower (hypertrophy)
- Create Program Instance from template
- Create-your-own program (basic builder)
- Program day includes planned exercises with **scheme metadata**
- Optional planned warmup guidance per program day:
  - `warmup_plan` text (e.g. “10 min bike + hip mobility 5 min”)

### Schedule & History
- Schedule view (next 14 days)
    - planned workout days from program
    - completed/missed status
- History view
    - sessions list
    - session detail with sets

### Session logging
- Start a session from schedule or “today”
- Log sets:
  - weight, reps
  - optional RPE
  - optional note
  - role: `WARMUP` or `WORKING` (default WORKING)
- Log warmup activities:
  - bike/row/run/stretching/mobility
  - duration minutes (+ optional distance/intensity/notes)
- Copy last session for same program day (prefill)
- Add exercises during a session (planned or freestyle)

### Insights (weekly)
- Session count
- Adherence (planned vs completed)
- Volume per exercise and/or lift category
- Top e1RM for squat/bench/deadlift if present
- Insights are computed on demand in MVP
- lifting volume excludes warmups (role=WARMUP) by default 
- warmup activities shown in session detail; optional weekly “warmup minutes” later

### Set/rep schemes (declarative metadata only)
Supported scheme shapes (stored + displayed, not executed):
- straight sets
- top set + backoffs
- top set @RPE + percentage backoffs
    - backoff reps may differ from top set reps
- top set % + percentage backoffs
- fatigue single + backoffs
- (future-ready) multiple backoff blocks stored but not required in UI

### Engineering foundations
- OpenAPI contract generated from API
- Contract checks in CI (OpenAPI diff + Spectral lint)
- Typed client generation for Expo (or schema validation) to keep UI in sync
- Unit + integration + BDD (API-level) + small UI E2E smoke tests
- Observability baseline (structured logs + metrics plan + tracing plan)
- Health endpoint
- Monorepo structure with path-filtered CI

---

## Out of scope (MVP)
- Coach/org roles, billing, payments
- Video upload/comments
- Adaptive programming engine (auto load calculation, auto progression)
- Meso/micro blocks, deload automation
- Non-gym activities
- Wearables/nutrition/sleep integrations
- Multi-language support (i18n)
- Social features
- Automatic warmup prescription engines (e.g., calculate warmups from working weight/readiness)
- Warmup exercise library/videos 
- i18n/multi-language (design for it only)

---
## Definition of done
- User can sign up → choose template or build custom → schedule shown
- User can start session → log sets → finish → session appears in history
- Weekly insights return correct numbers for seeded test dataset
- Contract checks + tests pass in CI
- Demo script works end-to-end
