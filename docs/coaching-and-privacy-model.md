# Coaching and Privacy Model

## MVP Core Decision

Coach, athlete, and organisation features are **not part of MVP Core**.

The MVP is an individual training tracker first.

The system should still be designed so coaching can be added later without changing the user/profile model.

---

## Future Requirement

Pillar Strength may eventually support:

- individual users,
- users coached by another user,
- coaches managing athletes,
- users who are both coach and athlete,
- organisations with multiple coaches and athletes,
- app-generated coaching/program recommendations.

---

## Core Decision

A user is an account/person.

A user does not have one global role.

Roles are contextual.

---

## Future Data Model

### Workspaces

Represent personal, coaching, organisation, or system spaces.

Types:

- PERSONAL,
- COACHING,
- ORGANISATION,
- SYSTEM.

### Workspace Memberships

Represent a user’s role within a workspace.

Roles:

- OWNER,
- ADMIN,
- COACH,
- ATHLETE,
- VIEWER.

### Coach-Athlete Relationships

Represent direct coaching access between two users.

Statuses:

- PENDING,
- ACTIVE,
- PAUSED,
- ENDED,
- DECLINED.

---

## Privacy Expectations

By default, training data is private to the user.

Data becomes visible to a coach or organisation only through an accepted relationship or membership.

The API must enforce relationship-based access control when coaching features are introduced.

---

## Future Coach Flow

```txt
Coach sends invite
→ Athlete accepts
→ Relationship becomes active
→ Athlete chooses what is shared
→ Coach can view shared training data
→ Coach may recommend or assign programs
```

---

## AI/App Coaching

App-generated coaching should not be modelled as a normal human user initially.

Generated or recommended programs should use source metadata such as:

- APP_RECOMMENDED,
- AI_ADAPTED.

Users should review generated/adapted programs before activation.
