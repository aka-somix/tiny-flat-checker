---
paths:
  - "packages/shared/**/*"
---
# Shared package rules

`@flat-checker/shared` is the single source of truth for the shapes that cross the
client/server boundary. Treat it as a pure library.

## Purity
- No I/O, no framework imports, no environment access. Every export is a zod
  schema, a type, or a pure function. This is what lets backend and frontend both
  depend on it.

## Schemas
- Define every API payload (request bodies, query/params, responses) here as a
  zod schema named `XxxSchema`, and export its inferred type `Xxx`
  (`z.infer<typeof XxxSchema>`).
- Reusable schemas get `.meta({ id: "Xxx", description })` — the id becomes the
  OpenAPI component name, so renaming it changes the contract (run `pnpm openapi`).
- One file per resource (`health.ts`, …).

## Testing
- Unit-test exported behavior (accepted and rejected inputs for each schema, every
  pure function). `pnpm --filter @flat-checker/shared test` must be green.

## Exports
- Re-export everything from `src/index.ts`.
