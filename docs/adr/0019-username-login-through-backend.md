# ADR 0019: Username login through backend

## Status

Accepted

## Context

Supabase Auth supports password login using email and password. The product experience should allow users to log in with either their email address or username in a single login field.

A common implementation is to query a public profile table from the client to resolve `username -> email`, then call Supabase Auth with email and password. This is simple but exposes email lookup behaviour to the client and may leak whether usernames or emails exist.

The app already has a Spring Boot backend and uses JWT-protected endpoints such as `/api/v1/me`.

## Decision

Username login will be handled by the backend.

The mobile app will call:

```http
POST /api/v1/auth/login