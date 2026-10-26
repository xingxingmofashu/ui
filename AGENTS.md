# UI Package Guidelines

This file defines the conventions for components, styles, tests, and collaboration inside `packages/ui`. The package currently contains only Button; future components should follow the same layering, naming, and validation approach.

## 1. Package Scope

- Package name: `@xingxingmofashu.me/ui`
- Public entry point: `src/index.ts`
- Export source directly; do not maintain a separate build output or `dist`.
- `react` / `react-dom` are `peerDependencies`; do not turn them into regular dependencies.
- Interaction behavior is based on `@base-ui/react`, styles are based on `tailwind-variants`, and class names are merged with `cn`.
- Design tokens live in `src/index.css`: raw values go in `@layer theme` under `:root` / `.light` / `.dark`, and Tailwind utilities are bridged through `@theme inline`. Consumers must import `@xingxingmofashu.me/ui/index.css`.
- The UI package does not depend on a specific icon library; `lucide-react` is only used by the `packages/web` preview page.

## 2. Button Visual Style

Button is a **glass capsule CTA** that feels restrained, light, and physically grounded.

### Outer Layer and Visible Surface

Use a two-layer structure; do not merge the layers:

- `base`: outer interactive area. Handles layout, focus, and disabled state, and is invisible itself.
- `surface`: the visible glass capsule. Handles background, border, shadow, filters, and dimensions.

The glass effect is built from several stacked layers:

- `rounded-full` capsule shape.
- A very low-opacity black background plus a double fine border.
- Multiple `inset` shadows to simulate glass edge reflections.
- A soft outer shadow to create a floating feel.
- `backdrop-blur`, `brightness`, and `contrast` create the frosted glass texture.
- The `before` pseudo-element provides the blurred inner dark edge.
- The `after` pseudo-element provides the diagonal highlight.
- The `overlay` provides the inner ring on the surface.

Each layer has a purpose. Do not delete or merge them casually. `z-[500]` / `z-[501]`, pseudo-element positions, and highlight direction are intentional; inspect desktop and mobile rendering before changing them.

### Text and Icons

- Text color uses `text-ink`; pressed text uses `text-ink-active`, mapped to `--ui-ink` / `--ui-ink-active`, switching with `.light` / `.dark`.
- The label uses the reference `drop-shadow(0 25px 3px rgba(102, 102, 102, 0.15))`, controlled by `--ui-drop-shadow-label`; do not inline raw color values.
- `leadingIcon` is a plain icon without a background; its SVG uses `--ui-drop-shadow-icon`.
- `trailingIcon` is a dark circular badge with a light icon; in `md` the badge is fixed at `40px`, and its SVG uses `--ui-drop-shadow-icon`.
- The glyph shadow offsets are reference values. The whole button is scaled through `--ui-button-scale`, so do not reduce the `25px` offsets or the glass blur/inset values independently when making the button smaller.
- Icon sizes are controlled by the Button `size`: `xs` / `sm` / `md` are 16px, `lg` is 20px, and `xl` is 24px.
- Icon sizes are set directly in the `leadingIcon` / `trailingIcon` slots of the `size` variant via `[&_svg]:size-*`; callers do not need to pass an icon `size`.
- To use a custom size, override through `classNames.leadingIcon` / `classNames.trailingIcon` with `[&_svg]:size-*`; do not change the default mapping.
- The icon container is responsible for centering, preventing shrink, and normalizing dimensions; it does not handle icon-library-specific logic.

### Motion

- Overall hover: `250ms ease`, lift `3px`.
- Press: `250ms`, reset the translation and scale to `0.94`.
- Trailing icon: `250ms ease`, scale to `1.1` on hover.
- The `surface` transition must cover `translate` and `scale`; Tailwind v4 uses separate CSS properties for translation and scaling, so `transform` alone will not animate them.
- Keep the `motion-reduce` override to disable translation and scaling when reduced motion is preferred.
- Do not replace these with spring animations or heavier transitions; the current motion is a deliberate characteristic of the reference implementation.

## 3. Structure and Slot Conventions

| Slot | `data-slot` | Purpose |
| --- | --- | --- |
| `base` | `button` | Outer click area, focus, and disabled state |
| `surface` | `surface` | Visible glass capsule, dimensions, and primary visuals |
| `label` | `label` | Visible text, truncation, and typography |
| `leadingIcon` | `leading-icon` | Leading icon container |
| `trailingIcon` | `trailing-icon` | Trailing circular badge |
| `overlay` | `overlay` | Inner decorative surface ring, non-interactive |

Conventions:

- `base` must wrap Base UI's `UIButton`; do not replace it with a native `<button>`.
- Put all visual class names in `src/theme/button.ts`; the component file only handles structure, state, and class merging.
- `className` applies to `base`; to change the visible glass surface, use `classNames.surface`.
- `classNames` keys use camelCase: `base`, `surface`, `label`, `leadingIcon`, `trailingIcon`, `overlay`.
- DOM `data-slot` values use kebab-case: `button`, `surface`, `label`, `leading-icon`, `trailing-icon`, `overlay`.
- `overlay` is always `aria-hidden="true"` and must not receive pointer events.
- `surface` must keep `flex-row` + `flex-nowrap` + `items-center` so the label and both icons stay on one row by default.

## 4. API Conventions

Button supports:

- `label`: preferred visible text.
- `children`: fallback for `label`; when both are present, `label` takes precedence.
- `leadingIcon` / `trailingIcon`: any `ReactNode`, usually an icon; icon size is constrained by `size`, so do not pass `size` at the call site.
- `size`: `xs | sm | md | lg | xl`, default `md`; controls text, button, and icon sizes together.
- `classNames`: per-slot style overrides.
- All other native / Base UI props are forwarded to `UIButton`.

Examples:

```tsx
<Button label="Continue" trailingIcon={<ChevronRight />} />
<Button aria-label="Next" leadingIcon={<ChevronRight />} />
<Button
  label="Full width"
  classNames={{ base: "w-full", surface: "w-full" }}
/>
```

### Accessible Name

Buttons must have an accessible name. At the type level, `ButtonAccessibleName` requires at least one of:

- `label`
- `children`
- `aria-label`
- `aria-labelledby`

Do not relax this constraint. Icon-only buttons must receive `aria-label` or `aria-labelledby`.

- When the button already has an accessible name, set `aria-hidden="true"` on icon containers to avoid duplicate announcements.
- When there is no accessible name, do not hide the icons proactively; preserve any semantics the icon may carry.
- Use `aria-hidden={condition || undefined}`; do not emit `aria-hidden="false"`.

## 5. Sizes and Responsiveness

The recipe is authored at the reference geometry below. `base` applies `zoom: var(--ui-button-scale)`; the shipped token is `0.5`, so the entire button — layout, text, icons, glass layers, shadows, and motion offsets — renders at half size. This is the only supported way to make the button smaller.

| Size | Reference width | Reference height | Text | Icon |
| --- | --- | --- | --- | --- |
| `xs` | `9rem` / 144px | `2.75rem` / 44px | `text-sm/[normal]` / 14px | `1rem` / 16px |
| `sm` | `11rem` / 176px | `3.25rem` / 52px | `text-base/[normal]` / 16px | `1rem` / 16px |
| `md` | `16.25rem` / 260px | `4.6875rem` / 75px | `text-[1.5625rem]/[normal]` / 25px | `1rem` / 16px |
| `lg` | `19rem` / 304px | `5.25rem` / 84px | `text-[1.75rem]/[normal]` / 28px | `1.25rem` / 20px |
| `xl` | `22rem` / 352px | `5.75rem` / 92px | `text-[2rem]/[normal]` / 32px | `1.5rem` / 24px |

At the shipped `0.5` scale, the effective dimensions are:

| Size | Rendered width | Rendered height |
| --- | --- | --- |
| `xs` | 72px | 22px |
| `sm` | 88px | 26px |
| `md` | 130px | 37.5px |
| `lg` | 152px | 42px |
| `xl` | 176px | 46px |

Rules:

- Width is controlled by a fixed `w-*` on `base`; `surface` fills it with `w-full`.
- `base` must have `max-w-full` and `min-w-0` so narrow parents can shrink the button to the parent width.
- `base` must keep `[zoom:var(--ui-button-scale)]`; this preserves the whole visual system when the scale changes.
- **Do not use `100vw` or `calc(100vw - ...)` to constrain width.**
- `min-w-0` + `truncate` on `label` is required behavior for narrow containers; do not remove it.
- `md` is the reference baseline: `260 × 75px` before scaling, `130 × 37.5px` at the shipped scale, `25px` reference text, `16px` reference icon, and a `40px` reference trailing badge.
- Set icon sizes in the `leadingIcon` / `trailingIcon` slots of the `size` variant; do not hard-code them in component JSX.
- After changing sizes, verify at minimum: `200px` parent container, `390px` mobile, and `1440px` desktop have no horizontal overflow, and check that actual SVG dimensions match the table.

## 6. Code Style

### File Responsibilities

- `src/components/button.tsx`: component structure, props, types, accessibility, and event forwarding.
- `src/theme/button.ts`: the single `tailwind-variants` recipe; default export only.
- `src/index.css`: the single global design token file; `@layer theme` defines raw `--ui-*` values and `.light` / `.dark`, and `@theme inline` maps them to Tailwind utilities; no component classes.
- `src/index.ts`: public exports.
- `test/components/button.test.tsx`: component behavior tests.
- `test/tokens.test.ts`: Tailwind compilation and token regression tests.
- `test/setup.ts`: Testing Library cleanup and jest-dom setup.
- `vitest.config.ts`: test environment configuration.

### TypeScript and React

- `strict: true`; do not use `any`; add a concrete type first if avoidance is impossible.
- Keep `"use client"` as the first line of component files.
- Use React namespace types such as `React.ReactNode` and `React.ComponentProps`.
- Use function declarations for components and PascalCase component names.
- Use camelCase / PascalCase for props, slots, and type names.
- Use `value != null ? ... : null` for conditional rendering; do not use `&&` that could render `0` or an empty string.
- Do not introduce `useMemo` or extra state for simple styling.

### Imports and Formatting

- Use double quotes, semicolons, 2-space indentation, and trailing commas.
- Third-party dependencies first, local relative imports after, separated by a blank line.
- Use `type` modifiers for type imports, e.g. `import { type VariantProps } from "tailwind-variants"`.
- Prefer named exports; only the theme recipe uses a default export.
- Export public types together at the bottom of the file: `export type { ButtonClassNames, ButtonProps }`.
- Add brief JSDoc for non-obvious public props and types; do not comment on self-explanatory code.

### Styling

- Put all component styles in `tailwind-variants`; do not scatter static class strings in JSX.
- Put design values such as colors and shadows in `src/index.css` `--ui-*` tokens; do not repeat hex / rgba values in the recipe.
- Map `--ui-*` tokens to semantic utilities through `@theme inline`, e.g. `text-ink`, `bg-glass-surface`, `border-glass-border`, `shadow-glass`.
- Theme switching only changes `--ui-*` under `:root` / `.light` / `.dark`; component recipes must not use `dark:` color branches. The package reserves `ui-light:` / `ui-dark:` namespaced variants; do not override the consuming app's global `dark:`.
- `@theme inline` does not guarantee exported `--color-*` variables; when referencing raw variables directly, use `--ui-*`, not `var(--color-*)`.
- Lens refraction uses two layers: `base` uses `[filter:contrast(3)]`, while `surface` uses `[filter:brightness(0.9)]` and `backdrop-blur-[2px]`; do not merge `contrast(3)` back into `surface`.
- Use `--ui-glass-glare-stop` for the diagonal highlight threshold, default `15%`; do not hard-code the percentage in the gradient again.
- Tailwind's `font-[...]` and `font-normal` are treated as the same group by the merger, causing one to be dropped; use the `[font-family:...]` arbitrary property for the font family.
- Motion transitions must explicitly include `translate` and `scale`; do not write only `transform`.
- `src/index.css` only contains tokens, not layout, pseudo-elements, variants, or component classes; keep the glass surface composition in `theme/button.ts`.
- Use `cn(ui.slot(), classNames?.slot)` to merge slot styles.
- Reuse existing tokens and layers; do not introduce a new color, radius, or shadow system casually.
- Do not depend on icon libraries; icon sizes are constrained by the icon slot classes in the `size` variant; do not hard-code widths/heights at call sites or in JSX.
- New dependencies must first be added to the `catalog` in the root `pnpm-workspace.yaml`, then referenced in `package.json` with `catalog:`.
- `className` is currently treated as a string; do not rely on Base UI's function-style `className`, which this component does not implement yet.

## 7. Testing Guidelines

Stack: Vitest + jsdom + Testing Library + user-event, plus a Tailwind compile test for token regressions.

Place test files under `test/components/` and name them `*.test.tsx`. Token tests live at `test/tokens.test.ts`.

### Queries

- Prefer `screen.getByRole("button", { name: "..." })`; do not find buttons with CSS selectors.
- To verify slots, use the `getSlot(element, "surface")` helper based on `data-slot`.
- Use inline `<svg />` for icon tests; do not add an icon library to the UI package for tests.

### Coverage

- Accessible names: `label`, `children`, `aria-label`, `aria-labelledby`.
- Decorative icons: hidden when a name exists, not hidden when no name exists.
- Size contract: default `md`, the width and height classes for every size, and the shared `[zoom:var(--ui-button-scale)]` on `base`.
- Icon size contract: `xs` / `sm` / `md` use `size-4`, `lg` uses `size-5`, `xl` uses `size-6`; both icon slots are set together in the `size` variant.
- Responsive contract: no `100vw`; `base` has `max-w-full`; `surface` has `w-full`.
- Visual regression points: label uses `--ui-drop-shadow-label`; SVG uses `--ui-drop-shadow-icon`; `base` contrast and `surface` brightness are layered; the surface transition covers `translate` / `scale`.
- Reference baseline: `md` on desktop is `260 × 75px` before scaling, `25px` text, `16px` icon, and a `40px` trailing badge; at the shipped `0.5` scale it renders at `130 × 37.5px`.
- Token contract: color, background, border, and shadow utilities resolve from `src/index.css` correctly; after token changes, check actual computed styles and verify `.dark` switches colors, borders, and shadows with the variables.
- Slot API: `className` applies to `base`; `classNames` can override slots such as `surface`.
- Interaction: click callbacks and disabled state.
- Type constraints: use `@ts-expect-error` to cover "icon-only buttons must have an accessible name".

Testing conventions:

- Do not use snapshot tests.
- Assert behavior, accessibility, and stable class contracts; do not assert brittle DOM structure details.
- When fixing a visual or layout bug, add a regression case that would fail without the fix.
- Cases should cover the scope above; extend tests for new behavior instead of skipping tests to bypass issues.

## 8. Validation Flow

After changes under `packages/ui`, run at minimum:

```bash
pnpm test
pnpm typecheck
```

If the change affects the preview page or build, also run from the repository root:

```bash
pnpm build
pnpm lint
```

For visual, sizing, stacking, or motion changes, also inspect the preview page:

- Desktop `1440px`: size sequence and icon badges render correctly.
- Mobile `390px`: no horizontal overflow.
- Parent container `200px`: all sizes shrink to the container width without overflow.

Clean up temporary screenshots, Playwright artifacts, and other debug files; keep the working tree tidy.

Unless the user explicitly requests it, do not automatically push to the remote repository; validate and commit locally.
