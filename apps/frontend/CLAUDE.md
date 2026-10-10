# apps/frontend

React + Vite + Tailwind client for Tiny Flat Checker, with an atomic component
library in `src/ui` browsed through Storybook.

**Before changing anything in this directory, follow the frontend standards in
[`.claude/rules/frontend.md`](../../.claude/rules/frontend.md)** (strict UI/logic
split, atomic levels, TanStack Query data layer, Tailwind tokens, responsive +
a11y rules, TDD with React Testing Library).

Quick commands (run from repo root):
- `pnpm --filter @flat-checker/frontend run dev` — Vite dev server on port 5173
- `pnpm --filter @flat-checker/frontend run storybook` — component library on port 6006
- `pnpm --filter @flat-checker/frontend test` — ESLint boundary check + Vitest
- `pnpm --filter @flat-checker/frontend run build` — typecheck + production build

The API base URL comes from `VITE_API_URL` (defaults to `http://localhost:4000`).
