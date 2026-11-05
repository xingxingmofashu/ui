# UI Package

Package: `@xingxingmofashu/ui`

Visual style: Liquid Glass.

Source files and tests are the source of truth.

The repository root is the UI package. The Fumadocs site lives in `docs/` and
the Vite component playground lives in `playground/`; both are included in the
same pnpm workspace.

## Commands

- `pnpm build` — build the publishable `dist` output with unbuild.
- `pnpm lint` — lint the package and tests with oxlint.
- `pnpm lint:fix` — apply oxlint's safe fixes.
- `pnpm test` — run the Vitest suite.
- `pnpm typecheck` — typecheck the package.
- `pnpm docs:dev` — start the docs site on port 3001.
- `pnpm docs:build` — export the docs site to `docs/out`.
- `pnpm docs:typecheck` — typecheck the docs package.
- `pnpm playground:dev` — start the component playground on port 3002.
- `pnpm playground:build` — build the playground.
- `pnpm playground:typecheck` — typecheck the playground package.
- `pnpm release` — run the interactive release-it flow from `main`.

## Git

- Rebase feature branches onto `main` and merge with `git merge --squash` so
  `main` stays linear. Do not create merge commits.

## Releases

- `pnpm release` bumps the version, generates GitHub release notes from
  Conventional Commits, commits, tags, pushes, and creates the GitHub Release.
- npm publishing stays in `.github/workflows/release.yml` so OIDC provenance is
  preserved.
- There is no `CHANGELOG.md`; GitHub Releases are the changelog. The workflow
  uploads the packed tarball to the release created by release-it.
- Set `GITHUB_TOKEN` before running `pnpm release`.

## Components

| Component | Component file | Theme file | Test file |
| --- | --- | --- | --- |
| Accordion | `src/components/accordion.tsx` | `src/theme/accordion.ts` | `test/components/accordion.test.tsx` |
| Alert Dialog | `src/components/alert-dialog.tsx` | `src/theme/alert-dialog.ts` | `test/components/alert-dialog.test.tsx` |
| Button | `src/components/button.tsx` | `src/theme/button.ts` | `test/components/button.test.tsx` |
| Card | `src/components/card.tsx` | `src/theme/card.ts` | `test/components/card.test.tsx` |
| Checkbox | `src/components/checkbox.tsx` | `src/theme/checkbox.ts` | `test/components/checkbox.test.tsx` |
| Checkbox Group | `src/components/checkbox-group.tsx` | `src/theme/checkbox-group.ts` | `test/components/checkbox-group.test.tsx` |
| Dialog | `src/components/dialog.tsx` | `src/theme/dialog.ts` | `test/components/dialog.test.tsx` |
| Drawer | `src/components/drawer.tsx` | `src/theme/drawer.ts` | `test/components/drawer.test.tsx` |
| Field | `src/components/field.tsx` | `src/theme/field.ts` | `test/components/field.test.tsx` |
| Fieldset | `src/components/fieldset.tsx` | `src/theme/fieldset.ts` | `test/components/fieldset.test.tsx` |
| Form | `src/components/form.tsx` | `src/theme/form.ts` | `test/components/form.test.tsx` |
| Input | `src/components/input.tsx` | `src/theme/input.ts` | `test/components/input.test.tsx` |
| Menu | `src/components/menu.tsx` | `src/theme/menu.ts` | `test/components/menu.test.tsx` |
| Popover | `src/components/popover.tsx` | `src/theme/popover.ts` | `test/components/popover.test.tsx` |
| Progress | `src/components/progress.tsx` | `src/theme/progress.ts` | `test/components/progress.test.tsx` |
| Radio Group | `src/components/radio-group.tsx` | `src/theme/radio-group.ts` | `test/components/radio-group.test.tsx` |
| Scroll Area | `src/components/scroll-area.tsx` | `src/theme/scroll-area.ts` | `test/components/scroll-area.test.tsx` |
| Select | `src/components/select.tsx` | `src/theme/select.ts` | `test/components/select.test.tsx` |
| Slider | `src/components/slider.tsx` | `src/theme/slider.ts` | `test/components/slider.test.tsx` |
| Switch | `src/components/switch.tsx` | `src/theme/switch.ts` | `test/components/switch.test.tsx` |
| Tabs | `src/components/tabs.tsx` | `src/theme/tabs.ts` | `test/components/tabs.test.tsx` |
| Toast | `src/components/toast.tsx` | `src/theme/toast.ts` | `test/components/toast.test.tsx` |
| Toggle | `src/components/toggle.tsx` | `src/theme/toggle.ts` | `test/components/toggle.test.tsx` |
| Toggle Group | `src/components/toggle-group.tsx` | `src/theme/toggle-group.ts` | `test/components/toggle-group.test.tsx` |
| Tooltip | `src/components/tooltip.tsx` | `src/theme/tooltip.ts` | `test/components/tooltip.test.tsx` |

## Glass

- `src/index.css` owns global runtime tokens and shared glass material.
  Component-specific values stay in `src/theme/<component>.ts`; do not add
  `--ui-<component>-*` tokens to `index.css`.
- Global tokens are `--ui-ink`, `--ui-ink-active`, `--ui-surface`,
  `--ui-shadow-glass`, and `--ui-drop-shadow-label`. Shared glass tokens cover
  color, geometry, and optics under `--ui-glass-*`, including
  `--ui-glass-overlay-surface` for text-bearing overlays.
- `--ui-surface` is the opaque theme surface (`#fff` in light, `#141414` in
  dark); `--ui-glass-surface` is the translucent fill and
  `--ui-glass-overlay-surface` is the stronger overlay fill. Use `bg-ui-surface`
  for solids, `bg-ui-glass-surface` for in-page glass, and
  `bg-ui-glass-overlay-surface` for overlay glass such as arrows.
- Material classes: `.ui-glass` owns fill, double border, shadow, blur, and
  tone; `.ui-glass-overlay` swaps the fill to the overlay veil;
  `.ui-glass-inner` adds the inset outline; `.ui-glass-highlight` adds the
  diagonal glare; `.ui-glass-rim` is the child rim; `.ui-glass-chip` is the
  compact surface.
- `src/plugins/glass-preset/index.css` owns the
  `data-glass="thin | soft | regular | thick"` presets. They only override
  shared `--ui-glass-*` variables; do not add component styles there.
- Light is the default at `:root`. `.dark` / `data-theme="dark"` switches to
  dark; `.light` / `data-theme="light"` re-applies light and wins inside a dark
  ancestor. The `ui-light` / `ui-dark` Tailwind variants mirror these selectors.
- Tokens live in `@layer theme`, so an unlayered `:root` override in a consumer
  app wins without `!important`.

## Plugins

- Optional plugins live in `src/plugins/<name>/` and are not re-exported from
  `src/index.ts`. Wildcard exports publish `index.tsx` and optional
  `index.css` as `@xingxingmofashu/ui/plugins/<name>` and
  `@xingxingmofashu/ui/plugins/<name>/index.css`; keep other files internal.
- A plugin owns its state, UI, and optional stylesheet. Plugin CSS stays
  opt-in; do not import it from `src/index.css`.
- Add `"use client"` only to modules that use hooks or browser APIs. Pure
  components may stay server-safe.
- Plugin tests live in `test/plugins/<name>.test.tsx`;
  `src/plugins/glass-preset/` is the reference plugin.

## Component API

- Components are single-structure wrappers: they own the Base UI anatomy and
  expose no Base UI parts or second composition API.
- Inherit Base UI props from the part that receives them: use
  `Omit<UIComponent.Root.Props, ...>` for root props and
  `Pick<UIComponent.Part.Props, ...>` for forwarded part props. Do not
  re-declare them with indexed access or use `Omit` to expose props the wrapper
  does not forward.
- Declare wrapper-owned props locally (`trigger`, `arrow`, `className`, `ui`,
  item fields). Pass-through props keep Base UI names; a single content slot
  uses `children`, while array item fields keep their own names.
- `className` targets the primary element; internal slots use `ui`, keyed by
  `data-slot`. Derive `ui` from the theme via `ComponentConfig`
  (`src/internal/tv.ts`); never hand-write slot maps or aliases. `ui` values
  are `ClassValue`.
- Merge order: theme -> root `ui` -> item `ui` -> `className`. Merge at the
  call site instead of adding `sharedUi`.
- `data-slot` is public; `data-layer` stays private. `style` is unsupported;
  use `className` and the shared `--ui-*` tokens.
- Docs list the derived `ui` slots and `data-slot` in the Attribute table.

```ts
type Accordion = ComponentConfig<typeof theme>;

type AccordionProps<Value extends string = string> = /* ... */ & {
  ui?: Accordion["slots"];
};

type AccordionItemProps<Value extends string = string> = /* ... */ & {
  ui?: Partial<
    Pick<Accordion["slots"], "item" | "header" | "trigger" | "panel">
  >;
};
```

## Package files

- Public exports: `src/index.ts`
- Plugins: `src/plugins/<name>/`
- Glass preset plugin: `src/plugins/glass-preset/`
- Design tokens and glass material: `src/index.css`
- Shared glass presets: `src/plugins/glass-preset/index.css`
- Shared token and theme contract tests: `test/tokens/`
- Plugin tests: `test/plugins/<name>.test.tsx`
- Test setup: `test/setup.ts`
- Vitest config: `vitest.config.ts`
- Build config: `build.config.ts`
- Docs site: `docs/` (see `docs/AGENTS.md`)
- Playground app: `playground/`
