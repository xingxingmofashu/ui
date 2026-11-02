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

## Git

- Rebase feature branches onto `main` and merge with `git merge --squash` so
  `main` stays linear. Do not create merge commits.

## Components

| Component | Component file | Theme file | Test file |
| --- | --- | --- | --- |
| Accordion | `src/components/accordion.tsx` | `src/theme/accordion.ts` | `test/components/accordion.test.tsx` |
| Alert Dialog | `src/components/alert-dialog.tsx` | `src/theme/alert-dialog.ts` | `test/components/alert-dialog.test.tsx` |
| Button | `src/components/button.tsx` | `src/theme/button.ts` | `test/components/button.test.tsx` |
| Card | `src/components/card.tsx` | `src/theme/card.ts` | `test/components/card.test.tsx` |
| Checkbox | `src/components/checkbox.tsx` | `src/theme/checkbox.ts` | `test/components/checkbox.test.tsx` |
| Dialog | `src/components/dialog.tsx` | `src/theme/dialog.ts` | `test/components/dialog.test.tsx` |
| Drawer | `src/components/drawer.tsx` | `src/theme/drawer.ts` | `test/components/drawer.test.tsx` |
| Input | `src/components/input.tsx` | `src/theme/input.ts` | `test/components/input.test.tsx` |
| Popover | `src/components/popover.tsx` | `src/theme/popover.ts` | `test/components/popover.test.tsx` |
| Scroll Area | `src/components/scroll-area.tsx` | `src/theme/scroll-area.ts` | `test/components/scroll-area.test.tsx` |
| Slider | `src/components/slider.tsx` | `src/theme/slider.ts` | `test/components/slider.test.tsx` |
| Switch | `src/components/switch.tsx` | `src/theme/switch.ts` | `test/components/switch.test.tsx` |
| Toast | `src/components/toast.tsx` | `src/theme/toast.ts` | `test/components/toast.test.tsx` |
| Toggle | `src/components/toggle.tsx` | `src/theme/toggle.ts` | `test/components/toggle.test.tsx` |
| Toggle Group | `src/components/toggle-group.tsx` | `src/theme/toggle-group.ts` | `test/components/toggle-group.test.tsx` |

## Glass

- `src/index.css` owns the standard glass material: `--ui-glass-*` tokens and the
  `.ui-glass`, `.ui-glass-inner`, `.ui-glass-highlight`, `.ui-glass-rim`, and
  `.ui-glass-chip` classes.
- Light/dark tokens support `.light` / `.dark` and
  `data-theme="light"` / `data-theme="dark"`.

## Component API

- Components are single-structure wrappers: they own the Base UI anatomy. Do
  not export Base UI parts or add a second composition API.
- `className` targets the component's primary element. Internal slots are
  styled with `ui`, keyed by `data-slot`.
- Derive `ui` types from the tailwind-variants theme. Never hand-write a slot
  map or add aliases such as `AccordionUi` or `AccordionItemUi`.
- `src/internal/tv.ts` owns the minimal `ComponentConfig` helper used to map
  theme slots to prop types, mirroring Nuxt UI.

```ts
type Accordion = ComponentConfig<typeof theme>;

type AccordionProps<Value extends string = string> = /* ... */ & {
  ui?: Accordion["slots"];
};

type AccordionItemProps<Value extends string = string> = /* ... */ & {
  ui?: Partial<
    Pick<
      Accordion["slots"],
      | "item"
      | "header"
      | "trigger"
      | "title"
      | "indicator"
      | "indicatorIcon"
      | "panel"
      | "panelContent"
    >
  >;
};
```

- `ui` values are `ClassValue`, not only `string`, so arrays and class maps
  work.
- Merge order: theme -> root `ui` -> item `ui` -> `className`. Do not introduce
  an internal prop such as `sharedUi`; merge root and item `ui` at the call
  site.
- `data-slot` is the public styling contract. `data-layer` stays private.
- `style` is not supported. Use `className` for layout and the shared `--ui-*`
  tokens for material.
- Component docs list the derived slot object for `ui` and include `data-slot`
  in the Attribute table.

## Package files

- Public exports: `src/index.ts`
- Design tokens and glass material: `src/index.css`
- Shared token and glass tests: `test/tokens.test.ts`
- Test setup: `test/setup.ts`
- Vitest config: `vitest.config.ts`
- Build config: `build.config.ts`
- Docs site: `docs/` (see `docs/AGENTS.md`)
- Playground app: `playground/`
