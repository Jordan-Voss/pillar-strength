# ADR 0024: Exercise and Program Placement

## Status

Accepted

## Context

Exercise Library and Program management are essential to Pillar Strength, but they are not the primary daily-use tabs.

Exercises support program creation and workout logging.

Programs define training intent, but users interact daily with today's workout and logging.

## Decision

Exercise Library will live at:

```txt
/exercises
```

Program management will live under internal routes such as:

```txt
/programs
/program-templates
```

Neither Exercises nor Programs will be permanent MVP top-level tabs.

## Consequences

- Main tabs remain focused on daily use.
- Exercises can be reused by program creation and workout logging.
- Program management remains available without dominating navigation.
- Home can surface current program and today's workout.
