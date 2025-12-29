# Observability

Pillar Strength aims for production-grade observability even in MVP.

---

## Objectives
- Diagnose issues quickly (errors, performance)
- Track usage and key business metrics
- Correlate client and server events

---

## Logging

### Structured logging (JSON)
All API logs are structured and include:
- timestamp
- level
- service name
- environment
- correlationId (request id)
- userId (when authenticated)
- route + status code + latency

### Correlation ID
- API generates a correlation ID per request if not provided
- Returned in response header: `X-Correlation-Id`

---

## Metrics

Expose a `/metrics` endpoint (implementation choice: Micrometer) tracking:
- request count by route/status
- latency percentiles (p50/p95/p99)
- error rate
- DB query timings (if feasible)

Business-level metrics (MVP):
- sessions created per day
- sets logged per day
- active users per day (approx)

---

## Tracing

MVP plan:
- add OpenTelemetry instrumentation later
- ensure log correlation ID is in place first
- keep trace IDs compatible once tracing is enabled

---

## Health checks

- `/health` returns:
    - app status
    - DB connectivity status

---

## Runbook linkage
Operational guidance lives in:
- `docs/runbook.md`
