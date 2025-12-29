# ADR 0011: Program Editing Does Not Rewrite History

## Context
Users may edit programs over time. Past training must remain accurate.

## Decision
Workout sessions and sets are immutable history.
Programs define intent; editing programs does not modify past sessions.
Sessions link to the program day at the time of execution.

Future: add program versioning to track revisions.

## Consequences
- Accurate historical analytics
- Safe program edits
- Requires careful session-to-programDay linkage and soft versioning later
