# Pillar Strength — MVP Scope

## MVP Goal

Build an individual-first training tracker that lets users:

1. follow or create a gym program,
2. see what to do today,
3. log planned and ad-hoc workouts,
4. review history and useful stats,
5. edit their own program over time.

Coach, organisation, marketplace, and AI features are important future directions, but they are **not part of MVP Core**.

---

## MVP User

The MVP is designed for **individual lifters** first.

The app should work well for:

- powerlifting/strength users,
- general gym strength/hypertrophy users,
- rugby or field-sport strength users,
- users who want to follow templates,
- users who want to create custom programs.

Future users may include:

- coaches,
- athletes connected to coaches,
- organisations with multiple coaches and athletes.

---

## MVP Navigation

The main app tabs are:

```txt
Home
Log
Progress
Profile
```

### Home

Purpose: today view and next action.

Includes:

- today's planned workout,
- current program summary,
- recent workout summary,
- quick actions.

### Log

Purpose: record training data.

Includes:

- start planned workout,
- start blank/ad-hoc workout,
- resume active workout,
- quick access to exercise selection.

Future logs may include bodyweight, sleep, nutrition notes, recovery, and pain/injury notes.

### Progress

Purpose: review history and stats.

Includes:

- workout history,
- exercise history,
- basic e1RM display,
- recent volume/adherence summaries.

### Profile

Purpose: account and preferences.

Includes:

- profile details,
- username/display name,
- units,
- e1RM formula,
- theme,
- sign out.

---

## Internal Screens

These are important product areas but should not be main tabs:

```txt
/exercises
/exercises/[id]
/programs
/programs/[id]
/program-templates
/program-templates/[id]
/workouts/[id]
/history
```

---

## MVP Core Features

### 1. Auth and Profile

In scope:

- sign up,
- login with email or username,
- authenticated `/me`,
- profile/preferences,
- sign out.

### 2. Exercise Library

In scope:

- seeded exercise catalogue,
- exercise search,
- category/filter chips,
- exercise detail page,
- exercise metadata:
  - category,
  - exercise family,
  - movement pattern,
  - equipment,
  - bodyweight flag,
  - unilateral flag,
- muscle mapping:
  - primary,
  - secondary,
  - supporting.

Out of scope for MVP Core:

- full muscle diagram implementation,
- exercise videos,
- custom user-created exercises,
- substitutions/progressions engine.

### 3. Program Templates

In scope:

- seeded templates across several styles:
  - beginner strength,
  - powerlifting base,
  - upper/lower strength,
  - rugby strength,
- template summary list,
- template detail page,
- template days,
- template day exercises,
- declarative set/rep scheme metadata.

Templates are reusable blueprints and should not be edited directly when a user starts a program.

### 4. User Programs

In scope:

- start program from template,
- create a user-owned program copy,
- create custom program v1,
- edit own active/draft program,
- view current program.

### 5. Scheduling

In scope:

- sequential scheduling,
- fixed weekly scheduling,
- next planned workout,
- upcoming workout statuses.

Sequential scheduling:

```txt
Complete Day 1
→ next workout is Day 2
```

Fixed weekly scheduling:

```txt
Monday = Day 1
Wednesday = Day 2
Friday = Day 3
```

### 6. Workout Logging

In scope:

- start planned workout,
- start blank/ad-hoc workout,
- add exercises,
- log sets:
  - reps,
  - weight,
  - optional RPE,
  - warmup vs working set,
- complete workout,
- save session history.

### 7. History and Basic Stats

In scope:

- workout history,
- session detail,
- exercise history,
- basic estimated 1RM,
- basic volume/adherence summaries.

---

## Explicitly Out of MVP Core

Deferred to future phases:

- coach-athlete invite flow,
- organisations,
- coach dashboards,
- sharing permissions,
- payments,
- template marketplace,
- questionnaire-based program recommendation,
- AI-assisted program customisation,
- advanced analytics,
- full body diagram/media library,
- nutrition/sleep/recovery logging beyond placeholders.

---

## MVP Completion Criteria

MVP Core is complete when an individual user can:

1. create an account,
2. browse exercises and view exercise details,
3. choose or create a program,
4. schedule the program sequentially or by fixed weekdays,
5. see what to train today,
6. log a planned workout,
7. log a blank workout,
8. review history,
9. view basic progress stats,
10. edit their own program.
