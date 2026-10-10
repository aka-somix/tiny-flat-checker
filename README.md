# Tiny Flat Checker

_One-line pitch goes here._ A tiny web app, currently a scaffold only: no views,
no business logic, just a `/health` endpoint.

## Stack

TypeScript monorepo (pnpm workspaces):

- **`packages/shared`**: zod schemas + inferred types shared by client and
  server (the source of the API contract).
- **`apps/backend`**: Fastify REST API, class-based controllers wired through a
  DI container, zod type provider, OpenAPI 3.1 generated from the code. No
  database, no auth, local only.
- **`apps/frontend`**: React + Vite + Tailwind v4 + TanStack Query, with an
  atomic component library (`src/ui`) kept strictly apart from the logic
  (`src/features`) and browsed in Storybook.

## Getting started

Requires [pnpm](https://pnpm.io) (v10+) and Node 22 (`.node-version`). The repo
pins pnpm through `packageManager`, so `corepack enable` installs the right
version for you.

```bash
pnpm install

# 1. Start the API (http://localhost:4000)
pnpm run dev:backend

# 2. In another terminal, start the web app (http://localhost:5173)
pnpm run dev:frontend

# 3. Optional: browse the component library (http://localhost:6006)
pnpm run storybook
```

The frontend reads the API base URL from `VITE_API_URL`, which defaults to
`http://localhost:4000` (see `apps/frontend/.env.example`).

## Scripts

- `pnpm test`: run every workspace's test suite (frontend includes ESLint)
- `pnpm typecheck`: typecheck all workspaces
- `pnpm run build`: build all workspaces
- `pnpm openapi`: regenerate `apps/backend/openapi.json`
- `pnpm run storybook`: Storybook dev server
- `pnpm run deploy`: build the frontend and deploy it to Cloudflare Workers

## API & OpenAPI

The API contract is [`apps/backend/openapi.json`](apps/backend/openapi.json)
(OpenAPI 3.1). It is generated from the route schemas by `@fastify/swagger`, so
it never drifts from the code:

- After changing a route or a schema, run `pnpm openapi` and commit the result.
- `apps/backend/src/openapi.test.ts` fails `pnpm test` if the committed file is
  stale.
- While the backend runs: Swagger UI at http://localhost:4000/docs, raw spec at
  http://localhost:4000/docs/json.

| Method | Path      | Description    |
| ------ | --------- | -------------- |
| GET    | `/health` | Liveness probe |

## Component library

`apps/frontend/src/ui` follows atomic design (atoms → molecules → organisms →
templates) and is **presentational only**: props in, markup out. Data fetching
and state live in `src/features`, route composition in `src/pages`. ESLint
blocks `ui/` from importing `api/`, `features/`, `pages/`, TanStack Query or
`fetch`. Design tokens live in `src/ui/tokens/theme.css`.

## Testing

- `pnpm --filter @flat-checker/shared test`: schema unit tests
- `pnpm --filter @flat-checker/backend test`: endpoints via `app.inject()`, plus
  the OpenAPI drift test
- `pnpm --filter @flat-checker/frontend test`: ESLint boundary check + Vitest +
  Testing Library

## Design & conventions

- Spec-driven workflow (Superpowers): [`docs/README.md`](docs/README.md). Specs
  and plans go in `docs/superpowers/{specs,plans}/`.
- Coding standards (auto-loaded per subtree): [`.claude/rules/`](.claude/rules/)
- Claude Code plugins enabled for the project: superpowers, impeccable,
  playwright (`.claude/settings.json`).

## Deploying

Only the **frontend** is deployed: `pnpm run deploy` builds `apps/frontend` and
publishes the static build to Cloudflare Workers via `wrangler.jsonc` (assets +
SPA fallback). Log in once with `pnpm exec wrangler login`. The backend runs
locally only.
