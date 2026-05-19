# Data Model

## Principle

Pillar Strength separates:

- identity,
- reusable templates,
- user-owned programs,
- planned workouts,
- performed sessions.

Programs define intent. Sessions are the source of truth.

---

## Current / Near-Term Domains

### User Profile

Stores application profile and preferences for a Supabase authenticated user.

Includes:

- id,
- email,
- username/display name fields,
- onboarding status,
- theme,
- timezone,
- units,
- e1RM formula.

A user does not have a global coach/athlete role in MVP Core.

---

### Exercises

`exercises` stores movement metadata.

Includes:

- id,
- name,
- slug,
- category,
- exercise family,
- movement pattern,
- equipment,
- bodyweight flag,
- unilateral flag.

---

### Muscles

`muscles` stores anatomical metadata for exercise mapping and future diagram support.

Includes:

- id,
- code,
- name,
- muscle group,
- body region,
- diagram region key.

---

### Exercise Muscles

`exercise_muscles` maps exercises to muscles.

Roles:

- PRIMARY,
- SECONDARY,
- SUPPORTING.

---

## Program Templates

Program templates are reusable blueprints.

Suggested tables:

```txt
program_templates
template_days
template_day_exercises
```

Templates should not be modified when a user starts a program.

---

## User Programs

User programs are user-owned copies.

Suggested tables:

```txt
programs
program_days
program_day_exercises
```

Programs may be created from:

- template,
- blank/custom program,
- future coach assignment,
- future app recommendation.

---

## Scheduling

MVP Core supports two scheduling modes:

```txt
SEQUENTIAL
FIXED_WEEKLY
```

Sequential scheduling advances based on completed workouts.

Fixed weekly scheduling assigns program days to weekdays.

---

## Workout Sessions

Performed training is stored in session tables.

Suggested tables:

```txt
workout_sessions
workout_exercises
workout_sets
```

A workout session may be:

- planned from an active program,
- blank/ad-hoc.

Workout sets may include:

- reps,
- weight,
- optional RPE,
- warmup/working role,
- notes.

---

## Future Domains

Deferred until after MVP Core:

```txt
workspaces
workspace_memberships
coach_athlete_relationships
program_recommendations
exercise_relationships
bodyweight_logs
sleep_logs
nutrition_notes
recovery_logs
```

Coach/org features should use relationship-based permissions rather than a global user role.
