# ADR 0022: App Navigation Structure

## Status

Accepted

## Context

The app originally considered tabs such as Train, Programs, Library, or Exercises.

However, Train and Programs overlap from a user's perspective. Users primarily want to know what to do today, record training, and review progress.

Programs and exercises are important capabilities, but they are not daily-use top-level destinations for the MVP.

## Decision

The app will use four long-term tabs:

```txt
Home
Log
Progress
Profile
```

Internal routes will handle program and exercise management:

```txt
/exercises
/programs
/program-templates
/workouts
/history
```

## Consequences

- Navigation is based on user intent rather than backend domains.
- Home becomes the today/next-action dashboard.
- Log becomes the place to record planned and ad-hoc training.
- Progress becomes the place to review history and stats.
- Programs and exercises remain reusable internal screens.
