# ADR 0023: Program Scheduling Strategy

## Status

Accepted

## Context

Users may follow programs flexibly or on fixed weekdays.

Sequential scheduling is simple and handles missed days naturally.

Fixed weekly scheduling is useful for users who train on set days.

## Decision

Pillar Strength will support two scheduling modes in MVP Core:

```txt
SEQUENTIAL
FIXED_WEEKLY
```

Sequential mode:

```txt
Complete Day 1
→ Next planned workout is Day 2
```

Fixed weekly mode:

```txt
Monday = Day 1
Wednesday = Day 2
Friday = Day 3
```

## Consequences

- More useful for different training styles.
- More complex than sequential-only MVP.
- Missed workout handling must be explicit.
- Schedule APIs must represent planned, completed, skipped/missed, and upcoming states.
