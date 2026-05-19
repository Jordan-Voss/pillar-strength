# Pillar Strength Roadmap

## Delivery Strategy

Build the product in vertical slices. Each slice should include:

- database migration,
- backend API,
- frontend UI,
- tests where valuable,
- documentation/ADR update where the decision is architectural.

---

## Current Foundation

Already implemented or in progress:

- Supabase authentication,
- email/username login,
- user profile endpoint,
- main navigation foundation,
- Exercise Library route,
- exercise data model with muscles and roles,
- cloud deployment foundation.

---

## Phase 0 — Documentation and Navigation Alignment

Goal: align the docs and app structure with the individual-first MVP.

Tasks:

- Update MVP scope.
- Update roadmap.
- Update navigation docs.
- Update API contract.
- Add ADR for Home/Log/Progress/Profile tabs.
- Add ADR for deferring coaching/org features.

Acceptance criteria:

- Docs clearly describe MVP Core.
- Coach/org features are future scope.
- Main tabs are Home, Log, Progress, Profile.

---

## Phase 1 — Exercise Detail

Goal: complete the Exercise Library slice.

Tasks:

- Add `GET /api/v1/exercises/{id}`.
- Add `/exercises/[id]`.
- Show exercise metadata and muscles.
- Add placeholders for future diagrams, progressions, and substitutions.

Acceptance criteria:

- User can open exercise detail from exercise list.
- Detail page works on mobile and web.
- Back navigation works correctly.

---

## Phase 2 — Program Templates Backend

Goal: create reusable seeded program templates.

Tasks:

- Add `program_templates`.
- Add `template_days`.
- Add `template_day_exercises`.
- Seed templates:
  - Beginner Strength 3 Day,
  - Powerlifting Base 4 Day,
  - Upper Lower Strength 4 Day,
  - Rugby Strength 3 Day.
- Add APIs:
  - `GET /api/v1/program-templates`,
  - `GET /api/v1/program-templates/{id}`.

Acceptance criteria:

- Template summaries return name, goal, level, days/week, and duration.
- Template detail returns days and exercises.
- Template exercises reference existing exercise catalogue.

---

## Phase 3 — Program Templates UI

Goal: let users browse templates.

Tasks:

- Add `/program-templates`.
- Add `/program-templates/[id]`.
- Add template cards.
- Add template detail day/exercise view.
- Link templates from Home and/or Programs internal route.

Acceptance criteria:

- User can browse seeded templates.
- User can inspect template structure.

---

## Phase 4 — Start Program From Template

Goal: allow users to create an active program copy.

Tasks:

- Add `programs`.
- Add `program_days`.
- Add `program_day_exercises`.
- Add copy-from-template service.
- Add APIs:
  - `POST /api/v1/programs/from-template`,
  - `GET /api/v1/programs/current`.

Acceptance criteria:

- Starting a template creates a user-owned program copy.
- The original template remains unchanged.
- Home can show current program summary.

---

## Phase 5 — Custom Program Builder v1

Goal: allow users to build or edit their own program.

Tasks:

- Create blank program.
- Add/edit/remove days.
- Add exercises from Exercise Library.
- Add simple scheme metadata.
- Save draft.
- Activate program.

Acceptance criteria:

- User can create a program without a template.
- User can edit their own program.
- User can activate the program.

---

## Phase 6 — Scheduling

Goal: determine what the user should train next.

Tasks:

- Support sequential scheduling.
- Support fixed weekly scheduling.
- Add upcoming schedule API.
- Update Home tab with today/next workout.
- Update Log tab with start planned workout.

Acceptance criteria:

- User can see what to train today.
- User can see next planned workout.
- Completed/missed/upcoming status can be represented.

---

## Phase 7 — Workout Logging

Goal: allow users to log actual training.

Tasks:

- Add workout sessions.
- Add workout exercises.
- Add workout sets.
- Start planned workout.
- Start blank workout.
- Complete workout.

Acceptance criteria:

- User can log a planned workout.
- User can log a blank workout.
- Completed sessions are stored.

---

## Phase 8 — History and Basic Stats

Goal: make logged data useful.

Tasks:

- Add workout history.
- Add session detail.
- Add exercise history.
- Add basic e1RM stats.
- Add basic weekly volume/adherence stats.

Acceptance criteria:

- User can review completed sessions.
- User can see useful progress indicators.

---

## Future Phases

Future features after MVP Core:

- coach-athlete invite flow,
- coach program assignment,
- organisations,
- multiple coaches per athlete,
- questionnaire-based template recommendation,
- AI-assisted program customisation,
- exercise diagrams/media,
- advanced analytics,
- template marketplace,
- payments/subscriptions,
- sleep/bodyweight/nutrition/recovery logs.
