# UI Package

Package: `@xingxingmofashu/ui`

Visual style: Liquid Glass.

Source files and tests are the source of truth.

The repository root is the UI package. The Fumadocs site lives in `docs/` and
is included in the same pnpm workspace.

## Commands

- `pnpm build` — build the publishable `dist` output with unbuild.
- `pnpm lint` — lint the package and tests with oxlint.
- `pnpm lint:fix` — apply oxlint's safe fixes.
- `pnpm test` — run the Vitest suite.
- `pnpm typecheck` — typecheck the package.
- `pnpm docs:dev` — start the docs site on port 3001.
- `pnpm docs:build` — export the docs site to `docs/out`.
- `pnpm docs:typecheck` — typecheck the docs package.

## Components

| Component | Component file | Theme file | Test file |
| --- | --- | --- | --- |
| Button | `src/components/button.tsx` | `src/theme/button.ts` | `test/components/button.test.tsx` |
| Card | `src/components/card.tsx` | `src/theme/card.ts` | `test/components/card.test.tsx` |
| Slider | `src/components/slider.tsx` | `src/theme/slider.ts` | `test/components/slider.test.tsx` |
| Switch | `src/components/switch.tsx` | `src/theme/switch.ts` | `test/components/switch.test.tsx` |
| Toggle Group | `src/components/toggle-group.tsx` | `src/theme/toggle-group.ts` | `test/components/toggle-group.test.tsx` |

## Glass

- `src/index.css` owns the standard glass material: `--ui-glass-*` tokens and the
  `.ui-glass`, `.ui-glass-inner`, `.ui-glass-highlight`, `.ui-glass-rim`, and
  `.ui-glass-chip` classes.
- Light/dark tokens support `.light` / `.dark` and
  `data-theme="light"` / `data-theme="dark"`. Tailwind aliases use the `ui-`
  prefix (`text-ui-ink`, `outline-ui-glass-focus`).
- The material is a lens: the surface applies the shared tone and contrast
  filter to its backdrop, border, shadow, inner rim, and glare. Keep text and
  icons out of that filtered element. Render the material as a dedicated,
  `aria-hidden` glass layer and put content in a sibling layer above it.
- Button uses `base` for layout/motion and the private `glass` slot for the
  material. Card uses its private `glass` layer. Toggle Group uses its private
  `glass` layer behind the indicator and items.
- Component recipes compose those classes. Do not restate the surface, border,
  shadow, backdrop blur, inner rim, or highlight gradient in `src/theme/`.
- Size, radius, overflow, layout, and motion remain in the component recipe.
  The glass layer clips its own pseudo-elements; the content wrapper must not
  clip the material's outer shadow.
- Switch and Slider keep their unique optical layers, but shared colors, edge
  shadows, lens blur, and specular values come from `--ui-glass-*` tokens.
- Tune the material through the tokens in `src/index.css`, not through
  per-component one-off overrides.

## Package files

- Public exports: `src/index.ts`
- Design tokens and glass material: `src/index.css`
- Shared token and glass tests: `test/tokens.test.ts`
- Test setup: `test/setup.ts`
- Vitest config: `vitest.config.ts`
- Build config: `build.config.ts`
- Docs site: `docs/` (see `docs/AGENTS.md`)
