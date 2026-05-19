# ADR 0025: MVP Scope and Phasing

## Status

Accepted

## Context

The product vision includes individual tracking, custom programs, templates, scheduling, workout logging, coaching, organisations, questionnaire recommendations, and AI-assisted programming.

Building everything at once would create too much complexity and delay the core training loop.

## Decision

The MVP will be split into:

```txt
MVP Core
Future
```

MVP Core includes:

- auth/profile,
- Home/Log/Progress/Profile tabs,
- Exercise Library,
- exercise detail,
- program templates,
- custom program v1,
- start program from template,
- sequential and fixed weekly scheduling,
- planned and blank workout logging,
- history,
- basic stats.

Future includes:

- coach-athlete invite flow,
- organisations,
- sharing permissions,
- questionnaire-based recommendations,
- AI-assisted customisation,
- advanced analytics,
- full muscle diagram/media,
- marketplace/payments.

## Consequences

- MVP remains focused on the individual training loop.
- Coaching and organisations are still designed for but deferred.
- The product can become useful before complex collaboration features are added.
