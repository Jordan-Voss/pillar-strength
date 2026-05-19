# ADR 0021: Program templates and program creation strategy

## Status
Accepted

## Context
Pillar Strength needs to support premade programs, custom programs, coach-assigned programs, and future app-assisted/AI-assisted customisation.

Users may want to:
- use a template as-is
- customise a template
- answer questions and get a customised version
- create from scratch
- receive a program from a coach
- use an app-generated program

## Decision
Program templates are reusable blueprints. User programs are concrete copies assigned to or owned by an athlete.

Starting a template creates a program copy rather than editing the template directly.

Programs will track source type:
- FROM_TEMPLATE
- CUSTOM
- COACH_ASSIGNED
- APP_GENERATED
- AI_ADAPTED

Templates will track ownership/source:
- SYSTEM
- USER_CREATED
- COACH_CREATED
- ORG_CREATED

Exercise Library is a shared internal screen used by Train and Programs flows, not a primary top-level tab.

## Consequences
- Templates remain reusable and stable
- User programs can be customised safely
- Coach-assigned programs are distinguishable
- App-generated programs can be added later
- Program history remains easier to reason about