# API Contract

All API endpoints are versioned under:

```txt
/api/v1
```

Most endpoints require Supabase JWT authentication.

---

## Auth

### POST `/api/v1/auth/login`

Allows login by email or username.

### GET `/api/v1/auth/username-availability`

Checks username availability.

---

## User

### GET `/api/v1/me`

Returns the current authenticated user's app profile and preferences.

---

## Exercises

### GET `/api/v1/exercises`

Returns exercise list.

Query params:

- `q` optional search term

### GET `/api/v1/exercises/{id}`

Planned next.

Returns exercise detail, including metadata and muscles.

---

## Program Templates

### GET `/api/v1/program-templates`

Planned.

Returns program template summaries.

### GET `/api/v1/program-templates/{id}`

Planned.

Returns template detail including days and exercises.

---

## Programs

### POST `/api/v1/programs/from-template`

Planned.

Creates a user-owned program from a template.

### GET `/api/v1/programs/current`

Planned.

Returns current active program.

### POST `/api/v1/programs`

Planned.

Creates a custom program.

### PATCH `/api/v1/programs/{id}`

Planned.

Updates a user-owned program.

---

## Schedule

### GET `/api/v1/schedule?from&to`

Planned.

Returns upcoming planned workout days and status.

---

## Workout Sessions

### POST `/api/v1/workout-sessions`

Planned.

Creates a planned or blank workout session.

### POST `/api/v1/workout-sessions/{id}/exercises`

Planned.

Adds an exercise to a workout.

### POST `/api/v1/workout-sessions/{id}/sets`

Planned.

Adds a set to a workout exercise.

### POST `/api/v1/workout-sessions/{id}/complete`

Planned.

Completes a workout session.

---

## History and Progress

### GET `/api/v1/workout-sessions`

Planned.

Returns completed session history.

### GET `/api/v1/exercises/{id}/history`

Planned.

Returns history for a specific exercise.

### GET `/api/v1/progress/summary`

Planned.

Returns basic progress summary.

---

## Future APIs

Deferred until after MVP Core:

- coach-athlete invites,
- organisations,
- questionnaire recommendations,
- AI-assisted program customisation,
- marketplace/payments.

---

## Contract Strategy

OpenAPI should be generated from the Spring Boot API and used to keep frontend/backend contracts aligned.
