# Data Model Overview

The Pillar Strength model separates **planned training** from **performed training**.

This allows:
- accurate history
- reliable analytics
- safe program edits without corrupting past data

---

## Core Concepts

### Templates
Templates are immutable program blueprints.

### Program Instances
A Program Instance is a user-owned copy of a template or a custom-built program.

### Program Days
Programs contain ordered days. Each day contains exercises.

### Program Day Exercises
Each planned exercise can include:
- a set/rep scheme (metadata)
- textual guidance (notes)

---

## Planned vs Performed

### Planned (intent)
Planned data defines what the user *intends* to do:
- templates
- programs
- program_days
- program_day_exercises
- scheme metadata (JSON)
- optional `program_days.warmup_plan` (text guidance)

Planned data is used for:
- schedule generation
- UI guidance
- adherence expectations

### Performed (source of truth)
Performed data defines what the user *actually did*:
- workout_sessions
- workout_exercises
- workout_sets
- session_activities (warmup activities like bike/mobility)

Performed data is used for:
- history
- analytics and insights
- progression tracking

---

## Schemes are planned-only (critical rule)

Set/rep schemes are stored **only** on planned exercises (`program_day_exercises.scheme`).
They are:
- displayed as guidance in the UI
- never relied on for analytics correctness

Analytics uses the performed sets (what happened), not the plan.

---

## Workout Sessions (Source of Truth)
A Workout Session represents what the user performed on a specific date.
Sessions may link to a program day (for adherence), or be a blank/freestyle session.

### Blank/freestyle sessions
- `workout_sessions.program_day_id` is nullable
- users can start a blank day and add exercises as they go

---
## Warmups

Warmups exist in two complementary forms, following the same pattern as programs vs sessions:

- **planned warmup plan** (intent, metadata)
- **performed warmup** (what actually happened)

### Planned warmup plan (metadata, programmatic)
Program days may include an optional `warmup_plan` stored as structured metadata (JSON).
This supports programmatic warmups such as:
- “glute bridges 2×10/side”
- “couch stretch 30s/side”
- “hip opener 1×8/side”
- “10 min bike easy”

This plan is **guidance only** in MVP and is not used for analytics correctness.

Recommended JSON shape (MVP-safe, extensible):

```json
{
  "items": [
    { "type": "CARDIO", "name": "Bike", "durationMinutes": 10, "intensity": "easy" },
    { "type": "MOBILITY", "name": "Glute bridges", "sets": 2, "reps": 10, "perSide": true },
    { "type": "MOBILITY", "name": "Couch stretch", "sets": 1, "durationSeconds": 30, "perSide": true }
  ],
  "notes": "Keep it easy. Focus on hips + glutes."
}
```
### Performed warmup activities (bike/mobility/stretching)

## Captured as performed activities:

session_activities rows linked to a session

These represent what the user actually did (duration, intensity, notes, etc.).
Warmup activities are shown in session detail and can later be summarized (e.g. weekly warmup minutes).
---
## Workout Sets
Workout sets are the atomic unit of performed lifting.

Each set may include:
- reps
- weight
- optional RPE
- optional note
- role: `WORKING` (default) or `WARMUP`

All lifting analytics are derived from performed sets (typically `role=WORKING` only).

---

## Set/Rep Schemes (Declarative)

Strength training uses common schemes:
- straight sets
- top set + backoffs
- top set @RPE + backoffs
- fatigue single + backoffs

In MVP, Pillar Strength stores these schemes as **declarative metadata** attached to planned exercises.

The system does **not**:
- calculate loads
- enforce structure during logging
- auto-progress week to week

Users log what they actually did; schemes describe intent.

### Example: top set 1@8 then 4x3 @85%
```json
{
  "type": "TOP_SET_RPE_BACKOFF",
  "topSet": { "reps": 1, "rpe": 8 },
  "backoffs": { "sets": 4, "reps": 3, "percentageOfTopSet": 85 }
}
```
### Future-ready: multiple backoff blocks
```json
{
  "type": "TOP_SET_RPE_BACKOFF",
  "topSet": { "reps": 1, "rpe": 8 },
  "backoffBlocks": [
    { "sets": 4, "reps": 3, "percentageOfTopSet": 85 },
    { "sets": 2, "reps": 6, "percentageOfTopSet": 75 }
  ]
}

```
## Why this separation matters

Programs can change without rewriting history

Planned vs completed is easy to compute

Advanced program intent can be expressed without building a progression engine

### Blank/freestyle sessions

workout_sessions.program_day_id nullable

### Analytics

progression queries use performed sets (e.g., squat triples = sets where reps=3)

warmups excluded by default from volume