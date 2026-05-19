# ADR 0026: Coaching Deferred From MVP Core

## Status

Accepted

## Context

Pillar Strength may eventually support coaches, athletes, organisations, and app-generated coaching.

However, the first MVP needs to prove the individual program tracking loop:

```txt
See today's training
→ log workout
→ review progress
→ edit program
```

Adding coach/org functionality too early would require permissions, invitations, sharing rules, and separate UX before the core tracker is valuable.

## Decision

Coach, athlete, and organisation functionality will be deferred until after MVP Core.

The app will not show coach-specific tabs in MVP Core.

The MVP will be built as an individual training tracker with future-friendly data modelling.

## Consequences

- Simpler first user experience.
- Faster path to a useful app.
- Less authorization complexity early.
- Future coach/org features can still be added through contextual relationships and memberships.
