# apps/backend

Fastify REST API for Tiny Flat Checker. Local only, no database, no auth.

**Before changing anything in this directory, follow the backend standards in
[`.claude/rules/backend.md`](../../.claude/rules/backend.md)** (layered DI
architecture, class controllers, zod schemas from `@flat-checker/shared`, REST
conventions, OpenAPI contract, TDD).

Quick commands (run from repo root):
- `pnpm --filter @flat-checker/backend run dev` — start with watch (default port 4000)
- `pnpm --filter @flat-checker/backend test` — `app.inject()` suites + OpenAPI drift test
- `pnpm openapi` — regenerate `apps/backend/openapi.json` after any route/schema change

Swagger UI: http://localhost:4000/docs · raw spec: http://localhost:4000/docs/json
