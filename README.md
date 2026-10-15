# Tiny Flat Checker

Check a flat before buying it. One versioned checklist of the checks you'd never
remember on the day, filled in on your phone during the viewing, then saved to
your profile (invite-only Google sign-in) or downloaded as a PDF.

## Stack

TypeScript monorepo (pnpm workspaces):

- **`packages/shared`**: zod schemas + inferred types shared by client and
  server (the source of the API contract).
- **`apps/backend`**: Fastify REST API, class-based controllers wired through a
  DI container, zod type provider, OpenAPI 3.1 generated from the code.
  Storage in Supabase Postgres through the Data API; `/public/*` needs an API
  key, `/private/*` a Supabase Auth JWT.
- **`supabase/migrations`**: schema, API-key functions, invite-only auth hook,
  checklist templates.
- **`apps/frontend`**: React + Vite + Tailwind v4 + TanStack Query, with an
  atomic component library (`src/ui`) kept strictly apart from the logic
  (`src/features`) and browsed in Storybook.

## Getting started

Requires [pnpm](https://pnpm.io) (v10+) and Node 22 (`.node-version`). The repo
pins pnpm through `packageManager`, so `corepack enable` installs the right
version for you.

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env     # fill in (see Supabase setup)
cp apps/frontend/.env.example apps/frontend/.env   # fill in (see Supabase setup)

# 1. Start the API (http://localhost:4000)
pnpm run dev:backend

# 2. In another terminal, start the web app (http://localhost:5173)
pnpm run dev:frontend

# 3. Optional: browse the component library (http://localhost:6006)
pnpm run storybook
```

The frontend reads the API base URL from `VITE_API_URL`, which defaults to
`http://localhost:4000` (see `apps/frontend/.env.example`).

## Supabase setup (once per project)

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then
   `supabase init` (keeps the existing `supabase/migrations`),
   `supabase link --project-ref <ref>` and `supabase db push`.
2. Create the API-key salt in Vault (SQL editor):
   `select vault.create_secret('<long random string>', 'api_key_salt');`
3. Mint the web app key and copy the result into `VITE_API_KEY`:
   `select public.create_api_key('webapp');` (shown once; only its HMAC is stored).
4. Authentication → Providers → **Google**: enable it with a Google OAuth client
   (authorised redirect URI: `https://<ref>.supabase.co/auth/v1/callback`).
   Authentication → URL configuration: add `http://localhost:5173` and the
   production URL to the redirect URLs.
5. Authentication → Hooks → **Before User Created**: select
   `public.hook_before_user_created`. Only invited emails can sign up.
6. Invite people: `insert into public.invited_emails (email) values ('friend@example.com');`
   (lowercase). Revoke by deleting the row.
7. Make sure the project uses asymmetric JWT signing keys (default on new
   projects): the backend verifies tokens against
   `https://<ref>.supabase.co/auth/v1/.well-known/jwks.json`.

Env: backend `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `CORS_ORIGIN`; frontend
`VITE_API_URL`, `VITE_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

New checklist version: add a migration inserting `version = N+1` into
`checklist_templates`. Saved checks keep rendering with the version they were
filled on.

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

| Method | Path                          | Auth    | Description                          |
| ------ | ----------------------------- | ------- | ------------------------------------ |
| GET    | `/health`                     | none    | Liveness probe                       |
| GET    | `/public/checklists/current`  | API key | Latest checklist template            |
| GET    | `/public/checklists/:version` | API key | A checklist template by version      |
| POST   | `/private/flatchecks`         | JWT     | Store a flat check                   |
| GET    | `/private/flatchecks`         | JWT     | My flat checks, newest first         |
| GET    | `/private/flatchecks/:id`     | JWT     | One of my flat checks                |
| DELETE | `/private/flatchecks/:id`     | JWT     | Delete one of my flat checks         |

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
locally for now (hosting not decided yet; Supabase hosts the database and auth).
