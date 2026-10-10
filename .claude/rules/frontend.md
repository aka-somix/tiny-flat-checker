---
paths:
  - "apps/frontend/**/*"
---
# Frontend rules

Standards for the React + Vite + Tailwind client. Follow these without being asked.

## UI and logic are separate
- **`src/ui/`** is the component library. It is **presentational only**:
  components get data and callbacks via props and render. No `fetch`, no
  TanStack Query, no router, no imports from `api/`, `features/` or `pages/`.
  ESLint (`eslint.config.js`) enforces this — never disable the rule.
  Local UI state (open/closed, hover, controlled-input plumbing) is fine.
- **`src/features/<feature>/`** holds logic: hooks (`useXxx.ts`) and container
  components that call `api/hooks.ts`, own state, and pass plain data into `ui/`
  components.
- **`src/pages/`** is route-level composition: a template from `ui/templates`
  filled with feature containers.
- App code imports the library through its barrel (`src/ui/index.ts`), not deep
  paths.

## Atomic design (inside `src/ui/`)
- **Atoms** — one element, no app knowledge (Button, Input, Badge, Icon, Spinner).
- **Molecules** — small compositions of atoms (FormField, SearchBar).
- **Organisms** — larger sections built from molecules/atoms; still props-only.
- **Templates** — page layouts with slots (`children`/render props), no data.
- Build the smallest reusable piece first; don't inline markup a lower level
  already covers. Export every component from its level's `index.ts`.
- Every `ui/` component ships with `Name.tsx`, `Name.stories.tsx` (all variants
  and states) and `Name.test.tsx` side by side.

## Data fetching
- All server access goes through `api/client.ts` (typed with
  `@flat-checker/shared`) wrapped in TanStack Query hooks in `api/hooks.ts`.
  Only `features/` consume those hooks.
- Query keys start with the resource name (`["health"]`, `["<resource>", …]`).
  Mutations invalidate their resource key.
- Keep `api/client.ts` aligned with `apps/backend/openapi.json` — it is the
  contract.

## Styling
- Tailwind v4 only; use the tokens from `src/ui/tokens/theme.css` (`surface`,
  `ink`, `line`, `accent`, …). No raw hex values in components. Add a token
  before using a new color.
- Use `cn()` from `ui/lib/cn.ts` for conditional classes.
- For visual design work use the impeccable skills (and the taste skills, if
  installed) before writing markup.
- **Responsive is required**: design mobile-first, verify at tablet and mobile
  widths. The page body never scrolls sideways.

## Accessibility
- Every interactive control has an accessible name (label, `aria-label`, or text).
  Inputs are tied to labels via `htmlFor`/`id`. Loading and error states are
  announced. Storybook's a11y addon runs on every story — fix violations, don't
  silence them.

## Testing (TDD)
- React Testing Library + Vitest (jsdom). Render via `test/utils.tsx`
  (`renderWithProviders`) when a QueryClient is needed. Test behavior through the
  accessible UI (roles, labels); mock the network with
  `vi.spyOn(globalThis, "fetch", …)`.
- `pnpm --filter @flat-checker/frontend test` (lint + vitest), `run typecheck`,
  `run build` and `run build-storybook` must be green.

## Style
- ESM with `.js` import extensions. Strict TS, no `any`. Function components with
  hooks; no class components.
