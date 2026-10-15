---
paths:
  - "apps/backend/**/*"
---
# Backend rules

Standards for the Fastify REST API. Follow these without being asked.

## Architecture: layered, dependency-injected
- **Flow:** route plugin → controller → service → repository. Never skip a layer
  (no persistence in controllers, no Fastify objects in services).
- **Routes** (`routes/*.routes.ts`) are Fastify plugins built by a factory that
  receives their controller (`healthRoutes(controller)`). They declare the schema
  and delegate — nothing else.
- **Controllers** (`controllers/*.controller.ts`) are classes. Methods are thin:
  take already-validated input, call a service, shape the response. No business
  logic, no persistence.
- **Services** (`services/*.service.ts`) hold business logic. They depend on
  repository **interfaces** only.
- **Repositories** (when storage arrives): interface in
  `repositories/<name>.repository.ts`, concrete implementation in
  `<impl>-<name>.repository.ts`. Swapping storage means a new implementation —
  nothing above changes.
- **Composition root** is `container.ts`. All wiring happens there. Inject
  side-effects (id generation, clock) so services stay deterministic in tests.
- `app.ts` is a factory `buildApp(container, opts)`; `server.ts` only boots it.
  Keep them separate so tests drive the app in-process with `app.inject()`.

## Schemas & validation
- Every route declares a `schema` using zod schemas from `@flat-checker/shared`
  (`params`, `querystring`, `body`, `response` per status code). Never read
  `request.body`/`request.query` without one — the zod type provider validates
  and types them.
- Every route sets `operationId` (camelCase verb + noun), `summary` and `tags`.
- Give reusable schemas an id with `.meta({ id: "Name" })` so they become
  `components/schemas` in the spec.

## OpenAPI contract (3.1)
- `apps/backend/openapi.json` is the committed API contract, generated from the
  code by `@fastify/swagger`.
- **After any route or schema change, run `pnpm openapi`** and commit the updated
  `openapi.json` in the same change. `src/openapi.test.ts` fails when the file is
  stale — never edit `openapi.json` by hand, never weaken that test.
- Live: Swagger UI at `/docs`, raw spec at `/docs/json`.

## REST conventions
- Proper verbs and status codes: 200 read, 201 create, 204 delete, 400
  validation, 404 missing.
- Throw typed errors (`HttpError`, `NotFoundError`); the central `errorHandler`
  in `http/errors.ts` maps them (and zod validation errors) to JSON responses.
  Error body shape: `{ error: string, details?: unknown }`.

## Storage and auth
- **Storage is Supabase Postgres via the Data API** (`@supabase/supabase-js`
  with the secret key, built in `container.ts`). Schema changes are SQL
  migrations in `supabase/migrations/` (one new file per change, never edit an
  applied one). Every table has RLS on with no policies: only the backend reads
  or writes.
- Supabase repositories live in `supabase-<name>.repository.ts`; in-memory twins
  (`memory-<name>.repository.ts`) back the tests and the OpenAPI generator via
  `memoryDeps()`. Never call Supabase from a test.
- **Two guarded segments**, each an encapsulated plugin in `app.ts`:
  - `/public/*` — `apiKeyGuard`: `x-api-key` verified by the Postgres function
    `verify_api_key` (HMAC with the Vault secret `api_key_salt`; the salt never
    leaves the database).
  - `/private/*` — `jwtGuard`: Supabase Auth access token verified against the
    project JWKS; the user is read with `currentUser(req)`.
  New routes go in one of the two segments and declare `security` in their schema.
- Invite-only sign-up is enforced in Supabase by the `hook_before_user_created`
  auth hook (`invited_emails` table), not in the backend.
- Checklist templates are versioned rows; a published version is never edited.
  Add a new version in a new migration. Answers are validated against their
  version with `validateValues` from `@flat-checker/shared`.
- The backend runs locally for now (hosting not decided); only the frontend is
  deployed to Cloudflare.

## Testing (TDD)
- Write the test first. Endpoint tests use `buildApp(createContainer(...))` +
  `app.inject()`. Every new endpoint gets a happy-path + a 4xx test.
- `pnpm --filter @flat-checker/backend test` and
  `pnpm --filter @flat-checker/backend run typecheck` must both be green before
  you consider work done.

## Style
- ESM everywhere; import local files with the `.js` extension. `strict` TS, no
  `any`. Small, single-purpose files. Logging via `request.log` / `app.log`
  (pino) — never `console.log` in app code.
