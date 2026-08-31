# Engineering Standards Enforcement (required-reading)

<!-- Add this to your project's CLAUDE.md to activate condensed full-lifecycle enforcement -->

## Code Standards
- Names MUST reveal intent and use domain language. No `data`, `temp`, `result`, `info`, `item`.
- Functions MUST do one thing, have ≤3 parameters, no boolean flags, no hidden side effects.
- Enforce Command-Query Separation. Prefer pure functions.
- No commented-out code. Comments explain WHY, never WHAT.
- Use exceptions, not error codes. Never return or pass null. Never swallow exceptions.
- Define errors out of existence where possible.
- Refactor in small, verified steps. Never combine refactoring with behavior changes.

## Architecture Standards
- Enforce all SOLID principles as requirements, not suggestions.
- Design deep modules: simple interfaces hiding complex implementations.
- Source code dependencies MUST point inward. Business logic never depends on frameworks/DB/UI.
- Identify and respect Bounded Context boundaries. Use Anti-Corruption Layers.
- Domain objects MUST contain behavior (no anemic domain models).
- Choose data model based on access pattern, not habit.
- Record architectural decisions as ADRs.

## Testing Standards
- Follow Red-Green-Refactor. Tests drive design, not afterthought.
- Test pyramid: ~70% unit, ~20% integration, ~10% E2E.
- Name tests to describe behavior. Single assertion principle. Four-phase structure.
- Test behavior, not implementation. No flaky tests. No testing private methods.
- Characterization tests before modifying legacy code.

## Security Standards
- Validate ALL input at trust boundaries. Allowlists over denylists. Server-side validation.
- Parameterized queries only. Context-aware output encoding. CSP headers.
- Auth/authz enforced server-side on every request. Least privilege.
- Never hardcode secrets. Never log sensitive data. Never secrets in URLs.
- HTTPS/TLS everywhere. Passwords hashed with Argon2id/bcrypt/scrypt.
- Threat model (STRIDE) for new systems. Dependency vulnerability scanning in CI.

## DevOps Standards
- Automate builds, tests, and deployments. Main branch always deployable.
- Infrastructure as code. No snowflake servers.
- Zero-downtime deployments. Rollback strategy tested before deploying.
- Observability: structured logging, metrics (golden signals), distributed tracing.
- SLOs backed by SLIs. Alert on symptoms, not causes.
- Circuit breakers, timeouts, bulkheads, retries with backoff.

## Data Standards
- Choose data model based on access pattern, not convention.
- Index for actual query patterns. No SELECT * in production. No N+1 queries.
- Schema migrations are additive/non-destructive. Test against production-scale data.
- Idempotent pipelines. Handle event time vs processing time correctly.
- Data quality SLOs: freshness, completeness, accuracy.

## Delivery Standards
- Small batches. WIP limits. Make all work visible.
- Relative estimation. Definition of Done enforced.
- Stream-aligned teams. Respect Conway's Law.
- Technical debt visible and allocated capacity.

## Product Standards
- Outcomes over outputs. Validate demand before building.
- Problems before solutions. Continuous discovery.
- User stories with testable acceptance criteria.
- One Metric That Matters per phase.

## UX Standards
- Usability first. Follow established conventions.
- WCAG 2.1 AA minimum. Keyboard accessible. Screen reader tested.
- Design tokens as single source of truth. Atomic design hierarchy.
- Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1.
- Mobile-first responsive design.

## Leadership Standards (applies to your own work)
- ADRs for significant decisions, written at decision time. Document WHY, not just WHAT.
- Classify decisions by reversibility: two-way doors fast, one-way doors confirmed first.
- Code review as teaching, not gatekeeping. Explain the principle. Never block on style.
- Make the implicit explicit — write down inferred conventions.
- Blameless framing for failures, including your own. Make tech debt visible when created.

## Leadership Standards (advisory — only when a human is deciding)
- Psychological safety. Intent-based leadership. Sponsorship and mentorship.
- Capacity allocated across feature/debt/ops/growth. Conway's Law in team design.
- Do not raise these during ordinary code work.

## AI & LLM Standards
- Rule out a deterministic solution before reaching for a model.
- Prompts are versioned artifacts under review, never inline literals.
- Delimit and label untrusted input. Prompt injection is an injection vulnerability.
- Specify the output contract, then parse and validate it. Never assume the format held.
- No eval set, no ship. Build it from real failures; keep a held-out split.
- Pin model versions. Re-run evals when the version changes.
- Treat model output as untrusted input to every downstream system.
- Bound agent loops by iterations, cost, and time. Confirm irreversible actions with a human.

## API Standards
- Design the contract before the implementation. Never expose internal models on the wire.
- Honor HTTP semantics. Never return 200 with an error body.
- No breaking change without a version. Deprecate, instrument, then remove.
- Every collection endpoint paginates. Prefer cursor over offset on mutating data.
- Errors are machine-readable with stable codes. Never leak internals.
- Consumers idempotent; idempotency keys for retryable non-idempotent operations.
- Publish a machine-readable spec and enforce it with contract tests.

## CS Fundamentals Standards
- Know the time and space complexity of what you write.
- Hunt accidental quadratics: scans and membership tests inside loops.
- Choose the data structure from the access pattern. Use a set for membership.
- Prefer standard library implementations over hand-rolled structures.
- Never compare floats for equality. Never use floating point for money.
- Bound recursion or convert to iteration. Reason about termination.

## Cryptography & Identity Standards
- Never design, implement, or modify a cryptographic primitive. Use a vetted library.
- Authenticated encryption only (AES-GCM, ChaCha20-Poly1305). No ECB, MD5, SHA-1, 3DES.
- Never hardcode keys or secrets. Never reuse a nonce/IV with the same key.
- Passwords: Argon2id, scrypt, or bcrypt. Never a fast hash. Constant-time comparison.
- TLS 1.2 minimum with certificate verification. Never disable verification.
- Validate JWTs fully (signature, alg allowlist, iss, aud, exp). Never accept `alg: none`.
- Short-lived access tokens with a revocation path. No sensitive data in token payloads.
- Regenerate session IDs on privilege change. Cookies Secure, HttpOnly, SameSite.

## Distributed Systems & Concurrency Standards
- Explicit timeout on every remote call. Retry with exponential backoff AND jitter.
- Circuit breakers and bulkheads isolate failing dependencies. Define the degraded mode.
- State the consistency model per operation. No 2PC across services — use sagas.
- Assume at-least-once delivery. Every consumer is idempotent with a dedup key.
- Never order distributed events by wall-clock time. Use logical clocks or sequence numbers.
- Prefer immutability, then message passing, then locks. Document concurrency contracts.
- Never hold a lock across a remote call. Never use sleep for coordination.
- Bound every queue and thread pool. Report latency as percentiles, never averages.

## Documentation Standards
- Docs live in version control beside the code, updated in the same change as behavior.
- Know which of the four types you are writing: tutorial, how-to, reference, explanation.
- Lead with the goal. Every page stands alone for a reader arriving from search.
- Procedures numbered, one action per step, expected result stated.
- Examples must be complete and runnable, never fragments assuming hidden state.
- Active voice. No "simply", "just", "obviously", or "easy".
- Delete wrong documentation. Wrong docs cost more than missing docs.

## Offensive Security Standards
- Never test without explicit written authorization naming scope, techniques, and window.
- Stop at the scope boundary. Escalate rather than pursue what you find outside it.
- Use the least invasive proof. Prove access; never exfiltrate to demonstrate it.
- Log all actions with timestamps. Report critical findings immediately.
- Remove all artifacts, test accounts, and persistence when finished.
- Findings need repro, evidence, impact, reasoned severity, and concrete remediation.
- Never deliver a raw scanner dump as a report. Retest before closing a finding.

## Performance Standards
- Never optimize without a measurement. Establish a baseline first.
- State the target as a number at a percentile before starting.
- Apply USE (resources) and RED (services). Find the real bottleneck before tuning.
- Report latency as p50/p95/p99, never as an average.
- Fix the algorithm before the constant. Eliminate work before making work faster.
- Never add a cache before understanding the access pattern.
- Add a regression test or budget once a bottleneck is fixed. Verify in production.

## Platform Standards
- The platform is a product; adoption is the measure, not feature count.
- Provide a golden path that is genuinely faster than the alternative, with an escape hatch.
- Make the secure, observable path the default path. Self-service by default.
- Infrastructure declarative and in version control. No manual console changes.
- Plan step reviewed before apply. State remote, encrypted, and locked.
- Resource requests and limits on every workload. Probes defined and distinguished.
- Never bake secrets into images. Rollback is a first-class, tested path.
- Track cost per tenant, service, and team.

## Security Operations Standards
- Detect behavior and technique, not single indicators. No detection without a runbook.
- Centralize logs off-host with integrity protection. Retention matches the detection window.
- Never log secrets, tokens, or unnecessary personal data. Synchronize time across sources.
- Written IR plan with roles and severities — and exercise it.
- Preserve evidence before remediating. Maintain the timeline during the incident.
- Blameless post-incident review producing owned, dated actions tracked to closure.
- No perimeter trust. Least privilege, short-lived credentials, network segmentation.
- Test backup restores. Isolate backups from the production credential domain.

## Enforcement Behavior
- Classify work type at task start (WRITE_CODE, MODIFY_CODE, REVIEW_CODE, etc.).
- Apply domain rules continuously during work.
- Run applicable checklist before delivering. Report results.
- Flag violations with severity: CRITICAL, MAJOR, MINOR.
- Reject anti-patterns: God class, anemic domain model, N+1 queries, hardcoded secrets, flaky tests, feature factory, hero dependency, roll-your-own crypto, retry storms, unbounded collections, vibes-based evaluation, alert fatigue, and more.

## Pragmatism
- Match principle weight to scope. Don't apply system concerns to utility functions.
- Scripts and prototypes can bend rules. Production code cannot.
- If user explicitly requests quick/dirty, comply but note what to fix for production.
