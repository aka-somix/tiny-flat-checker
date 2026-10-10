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

## Scope (for now)
- **No database** — keep state out of the backend until storage is designed.
- **No auth, no API keys.** The app runs locally only; the backend is not
  deployed (only the frontend goes to Cloudflare).

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
