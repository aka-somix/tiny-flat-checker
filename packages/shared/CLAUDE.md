# packages/shared

`@flat-checker/shared` — zod schemas + inferred types that cross the client/server
boundary, imported by both apps.

**Before changing anything here, follow
[`.claude/rules/shared.md`](../../.claude/rules/shared.md)**: keep it pure (no
I/O), define every API payload as a zod schema here, re-export from `src/index.ts`,
and unit-test exported behavior.

- `pnpm --filter @flat-checker/shared test` — unit tests
