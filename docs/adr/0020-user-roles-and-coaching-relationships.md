# ADR 0020: Users, roles, and coaching relationships

## Status
Accepted

## Context
Pillar Strength needs to support individual users, coaches, athletes, organisations with multiple coaches, coach-athlete relationships, and future app-generated coaching.

A user may be:
- training independently
- coached by another user
- coaching one or more athletes
- both coach and athlete at the same time
- part of an organisation
- using a system/app-generated program

A single global role on `user_profiles` would be too restrictive.

## Decision
Users are accounts/people. They do not have one global role.

Roles are contextual and come from memberships and relationships.

We will model:
- user_profiles for identity
- workspaces for personal/coaching/organisation/system spaces
- workspace_memberships for contextual roles
- coach_athlete_relationships for direct coaching permissions
- programs/templates with source metadata to distinguish custom, template, coach-assigned, app-generated, and AI-assisted programs

Users may be both coach and athlete at the same time.

## Consequences
- More flexible than a single `role` column
- Supports organisations with multiple coaches
- Supports athletes with multiple coaches
- Supports individual users
- Supports future AI/app-generated coaching
- Requires relationship-based authorization checks