# Product Navigation

## Main Tabs

Pillar Strength uses four long-term tabs:

```txt
Home
Log
Progress
Profile
```

Tabs represent daily-use product areas, not database domains.

---

## Home

Purpose: today view and next action.

Contains:

- today's planned workout,
- current program summary,
- quick start actions,
- recent workout summary,
- upcoming session preview.

Home answers:

```txt
What should I do today?
```

---

## Log

Purpose: record training and related data.

MVP Core contains:

- start planned workout,
- start blank/ad-hoc workout,
- resume active workout,
- quick access to Exercise Library.

Future Log items may include:

- bodyweight,
- sleep,
- nutrition notes,
- recovery/readiness,
- pain/injury notes.

Log answers:

```txt
What do I need to record?
```

---

## Progress

Purpose: review history and stats.

MVP Core contains:

- workout history,
- session detail links,
- exercise history,
- basic e1RM display,
- basic volume/adherence summaries.

Progress answers:

```txt
Am I improving?
```

---

## Profile

Purpose: account and preferences.

Contains:

- profile details,
- username/display name,
- units,
- e1RM formula,
- theme,
- sign out.

---

## Internal Routes

Internal routes are important but should not be tabs.

```txt
/exercises
/exercises/[id]
/programs
/programs/[id]
/program-templates
/program-templates/[id]
/workouts/[id]
/history
```

### Exercise Library

`/exercises` is a reusable screen used by:

- program creation,
- workout logging,
- exercise detail lookup.

### Programs

Programs are managed through internal routes because users do not need to manage programs every time they open the app.

They are surfaced through:

- Home current program card,
- Log planned workout flow,
- internal `/programs` and `/program-templates` screens.

---

## Decision

The app should optimise for the daily training loop:

```txt
Home → Log → Progress
```

Programs and exercises are core capabilities, but they support that loop rather than being permanent tabs.
