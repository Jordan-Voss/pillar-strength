# ADR 0018: User identity profile fields

## Status

Accepted

## Context

Pillar Strength uses Supabase Auth for authentication and a backend API for app-specific domain data.

Supabase Auth owns authentication identifiers such as email, provider identity, and password/session handling. The application still needs its own user profile data for display, onboarding, coach-athlete relationships, future profile pages, and username-based login.

The app needs to support both:

- Email/password sign-up, where the user can choose a username immediately.
- Social sign-in later, such as Google or Apple, where a username may not be provided by the identity provider.

Using only one field for both username and display name would make social sign-in and future profile customisation awkward. Using email as a public identifier would expose private auth information and would not be suitable for profile URLs or coach/athlete discovery.

## Decision

We will store both `username` and `display_name` in `public.user_profiles`.

- `username` is the unique public handle.
- `username_search` is a generated lowercase version of `username` used for case-insensitive uniqueness and lookup.
- `display_name` is the friendly name shown in the UI.
- `email` remains owned by Supabase Auth and is not stored in `public.user_profiles`.
- `username` may be null until onboarding is completed.
- `display_name` may be inferred from sign-up metadata, provider metadata, or email prefix.
- Email/password sign-up will set both `username` and `display_name` to the chosen username initially.
- Social sign-in may create a profile with `username = null` and a provider-derived `display_name`.

A user can exist without a username, but cannot complete onboarding without one.

## Consequences

This supports social login without inventing poor-quality usernames automatically.

The app can display a friendly name before the user has chosen a username.

Username uniqueness is enforced case-insensitively while preserving the user's chosen casing for display.

The backend and onboarding flow must handle incomplete profiles where `username` is null.

Future profile URLs and coach/athlete discovery can use `username` without exposing email addresses.

## Alternatives considered

### Single `username` field only

Rejected because social providers do not reliably provide usernames. It would force the app to generate usernames or block profile creation during social sign-in.

### Single `display_name` field only

Rejected because display names are not stable or unique enough for login, search, profile URLs, or coach/athlete discovery.

### Store email in `user_profiles`

Rejected because Supabase Auth already owns email and because storing email in public profile tables increases the chance of accidental exposure.

### Public anon username-to-email lookup

Rejected because it exposes whether a username exists and can expose email addresses if implemented directly against Supabase with the anon key.