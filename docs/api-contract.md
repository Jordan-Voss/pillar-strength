# API Contract (MVP)

All endpoints are versioned under `/v1`.

All endpoints require authentication (Supabase JWT), as training data is user-owned.

---

## Templates

### GET /v1/templates
Returns templates and their day structures.

#### Response:
```json
{
  "templates": [
    {
      "id": "uuid",
      "name": "Powerlifting 3-Day",
      "goal": "strength",
      "daysPerWeek": 3,
      "days": [
        {
          "name": "Day 1",
          "exercises": [
            {
              "exerciseKey": "SQUAT",
              "displayName": "Back Squat",
              "scheme": {
                "type": "TOP_SET_RPE_BACKOFF",
                "topSet": { "reps": 1, "rpe": 8 },
                "backoffs": { "sets": 4, "reps": 3, "percentageOfTopSet": 85 }
              },
              "notes": "Rest 3–5 minutes."
            }
          ]
        }
      ]
    }
  ]
}
```
## Programs
### POST /v1/programs

Creates a program instance.

#### Request (from template):
```json
{ "templateId": "uuid", "startDate": "2026-01-05" }
```
#### Response (Custom Program):
```json
{
  "name": "My 4-Day Upper/Lower",
  "startDate": "2026-01-05",
  "days": [
    {
      "name": "Upper A",
      "exercises": [
        {
          "exerciseKey": "BENCH_PRESS",
          "displayName": "Bench Press",
          "scheme": { "type": "STRAIGHT_SETS", "sets": 4, "reps": 6 },
          "notes": "Keep 1–2 reps in reserve."
        }
      ]
    }
  ]
}

```
---
### GET /v1/programs/current
Returns current program instance.
---
## Schedule

### GET /v1/schedule?from=YYYY-MM-DD&to=YYYY-MM-DD

Returns planned days and completion status.

#### Response:
```json
{
  "from": "2026-01-05",
  "to": "2026-01-18",
  "days": [
    {
      "date": "2026-01-06",
      "programDayId": "uuid",
      "name": "Day 1",
      "status": "PLANNED",
      "completedSessionId": null
    }
  ]
}
```
---
## Sessions

### POST /v1/sessions
Start Session

#### Request:
```json
{ "date": "2026-01-06", "programDayId": "uuid" }
```

### POST /v1/sessions/{id}/sets

Log a set.

#### Request:
```json
{
  "exerciseId": "uuid",
  "reps": 3,
  "weight": 180.0,
  "rpe": 8,
  "note": "Moved well"
}
```
Validation:

- reps >= 1

- weight >= 0
- 
- rpe optional, if present 1–10

---

## History

### GET /v1/history

Returns past sessions (paginated).

---

## Insights

### GET /v1/insights/weekly?weekStart=YYYY-MM-DD

#### Weekly summary derived from sessions:

- session count

- adherence

- volume per exercise

- top e1RM for S/B/D if present

---

# User 
### GET /v1/me

#### Returns basic information about the authenticated user.

Used by the client to:
- verify authentication
- bootstrap user preferences (units, e1RM formula)
- confirm API connectivity

**Authentication:** Required (JWT)

**Response (200):**
```json
{
  "userId": "uuid",
  "units": "METRIC",
  "e1rmFormula": "EPLEY"
}
```

**Errors:**

```json
{
401 Unauthorized - missing or invalid token
}```