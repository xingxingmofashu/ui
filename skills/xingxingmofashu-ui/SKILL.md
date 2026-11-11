---
name: xingxingmofashu-ui
description: Build React 19 + Tailwind CSS 4 interfaces with @xingxingmofashu/ui Liquid Glass components. Use when installing or configuring the library, choosing components, composing forms, overlays, menus, selects, tabs, or toasts, theming glass surfaces, handling dark mode, or troubleshooting missing styles.
metadata:
  package: "@xingxingmofashu/ui"
  docs: "https://xingxingmofashu.github.io/ui/docs/en"
---

# Xingxingmofashu UI

`@xingxingmofashu/ui` is a React 19 component library with a CSS-only Liquid
Glass visual style, built on Base UI, Tailwind CSS 4, and Tailwind Variants.
This skill is for **consumers** of the package: projects that install the
library and build their own interfaces with it.

Use it when the task involves installing or configuring the package, choosing
components, composing forms or overlays, theming glass surfaces, dark mode, or
debugging missing styles and behavior.

Do not use this skill for React 18 or Tailwind CSS 3 projects. The package
targets React 19, React DOM 19, Tailwind CSS 4, Node.js 22+, and an ESM-capable
bundler.

## Workflow

1. **Inspect the consumer project.** Read `package.json`, the lockfile, the
   Tailwind entry CSS, and the framework. Confirm React 19 and Tailwind 4 are
   installed. Use the package manager already in use.
2. **Install if missing.** Run the matching command:
   `pnpm add @xingxingmofashu/ui`, `yarn add @xingxingmofashu/ui`,
   `npm install @xingxingmofashu/ui`, or `bun add @xingxingmofashu/ui`.
3. **Wire the stylesheet.** In the CSS entry that imports Tailwind, add the
   package after Tailwind:
   ```css
   @import "tailwindcss";
   @import "@xingxingmofashu/ui";
   ```
   Import it exactly once. Do not add a manual `@source` directive for the
   package; its stylesheet scans its own components.
4. **Choose the component.** Use the decision table and component index below.
   Open the matching `references/components/<name>.md` before writing code.
5. **Implement with the wrapper API.** Pass data through the documented props
   (`items`, `trigger`, `title`, `footer`, `label`, and so on). Do not assemble
   Base UI parts or import `@base-ui/react` directly.
6. **Style at the right layer.** Use `className` for the primary element, `ui`
   for internal slots keyed by `data-slot`, and shared `--ui-*` / `--ui-glass-*`
   tokens for material changes.
7. **Verify.** Run the project's typecheck or build. Check keyboard behavior,
   labels, dark mode, and server/client boundaries. For a new app, render one
   representative page in both light and dark.

## Non-negotiable rules

- Import the package stylesheet **after** `@import "tailwindcss";`, exactly
  once.
- The package is ESM-only. Do not use it from a CJS-only setup.
- `Card` is server-safe. The other components are client components because
  they manage interaction, focus, or portals. In Next.js App Router, put
  interactive usage in a `"use client"` module.
- The components are single-structure wrappers. Do not use `Dialog.Root`,
  `Menu.Trigger`, `Select.Popup`, or other Base UI parts. Do not add `asChild`;
  use the documented `render` prop where it exists.
- `className` and `style` target the primary element documented for that
  component. Use `ui` for internal slots. For collection components, root `ui`
  is applied before each item's `ui`, then the item's `className`.
- Prefer shared `--ui-glass-*` tokens for color, blur, and shadow changes. Do
  not restyle one component's glass layer in isolation unless the design
  requires it.
- Text-bearing overlays use `--ui-glass-overlay-surface`, not `--ui-surface`.
  Set both tokens when opaque surfaces and overlays should move together.
- `Toast` requires `ToastProvider` near the app root and a `<Toast />` element
  after the app content. `useToast()` only works inside the provider.
- `Dialog`, `AlertDialog`, and `Drawer` have no `trigger` prop. Render your own
  trigger and control `open` / `onOpenChange`.
- Do not guess a prop. If a prop is not in the component reference, read the
  installed package's type definitions or the canonical documentation.

## API shape

| Need | API shape |
| --- | --- |
| Anchored trigger | `Menu`, `Popover`, and `Tooltip` take `trigger={<Button ... />}`. The trigger must forward props and refs. |
| Controlled overlay | `Dialog`, `AlertDialog`, and `Drawer` take `open` plus `onOpenChange`; render your own trigger button. |
| Array-driven content | `Accordion`, `CheckboxGroup`, `Menu`, `RadioGroup`, `Select`, `Tabs`, `ToggleGroup`, and `Toolbar` take `items={[...]}`. |
| Grouped actions | `Toolbar` groups action buttons, toggles, links, and separators with one keyboard stop. |
| Toast | Wrap the app in `ToastProvider`, render `<Toast />`, and call `useToast()` inside. |
| Form layout | `Form` owns submission and errors; `Field` labels one control; `Fieldset` groups fields under a legend. |
| Actions and state | `Button` uses `children`; `Toggle` uses `pressed`; `Checkbox`/`Switch` use `checked`. |

## Choose a component

| Intent | Components |
| --- | --- |
| Run an action | `Button` |
| Keep an action pressed | `Toggle`, `ToggleGroup`, `Toolbar` |
| Group related actions | `Toolbar`, `ToggleGroup` |
| Navigate between views | `Tabs`, `Menu`, `Drawer` |
| Enter text | `Field` + `Input` |
| Choose one or more options | `Select`, `RadioGroup` |
| Choose independent options | `Checkbox`, `CheckboxGroup` |
| Toggle an immediate setting | `Switch` |
| Pick a number or range | `Slider` |
| Confirm something destructive | `AlertDialog` |
| Show modal content | `Dialog` |
| Show an edge panel | `Drawer` |
| Show contextual content | `Popover` |
| Show a short hint | `Tooltip` |
| Show task progress | `Progress` |
| Show a transient notification | `Toast` |
| Lay out content | `Card`, `Accordion`, `ScrollArea` |

## Component index

### Element

- [Button](references/components/button.md) — Action button with sizes, icons, and link rendering.
- [Card](references/components/card.md) — Server-safe glass panel with header, body, and footer.
- [Collapsible](references/components/collapsible.md) — One disclosure panel with an animated glass trigger.
- [Progress](references/components/progress.md) — Determinate and indeterminate task progress.
- [Toggle](references/components/toggle.md) — Persistent on/off action.
- [Toggle Group](references/components/toggle-group.md) — Related toggle buttons with single or multiple selection.
- [Toolbar](references/components/toolbar.md) — Action bar with buttons, toggles, links, groups, and separators.

### Form

- [Form](references/components/form.md) — Shared validation, errors, and submit state.
- [Checkbox](references/components/checkbox.md) — Independent boolean choice, including mixed state.
- [Checkbox Group](references/components/checkbox-group.md) — Labelled set of independent choices.
- [Field](references/components/field.md) — Label, description, and error for one control.
- [Fieldset](references/components/fieldset.md) — Group related fields under one legend.
- [Input](references/components/input.md) — Glass text input with optional icons.
- [Radio Group](references/components/radio-group.md) — Exactly one choice from a visible list.
- [Select](references/components/select.md) — Single or multiple choice from a dropdown, with optional groups.
- [Slider](references/components/slider.md) — Single value or range along a track.
- [Switch](references/components/switch.md) — Immediate on/off setting.

### Data

- [Accordion](references/components/accordion.md) — Collapsible glass panels on one surface.
- [Scroll Area](references/components/scroll-area.md) — Native scrolling with custom glass scrollbars.

### Navigation

- [Tabs](references/components/tabs.md) — Related panels with a glass tab list.

### Overlay

- [Alert Dialog](references/components/alert-dialog.md) — Destructive confirmation with cancel and confirm.
- [Dialog](references/components/dialog.md) — General modal with a custom footer.
- [Drawer](references/components/drawer.md) — Edge-aligned panel with swipe dismissal.
- [Menu](references/components/menu.md) — Action menu with groups, icons, shortcuts, and separators.
- [Popover](references/components/popover.md) — Non-modal panel anchored to a trigger.
- [Toast](references/components/toast.md) — Notifications, actions, and promise states.
- [Tooltip](references/components/tooltip.md) — Short hint on hover or focus.

## Core references

- [Installation](references/installation.md) — Requirements, package managers, CSS order, dark mode, SSR, and deep imports.
- [Theming](references/theming.md) — Light/dark tokens, glass presets, custom glass surfaces, and styling layers.
- [Patterns](references/patterns.md) — App shell, forms, dialogs, menus, selects, toasts, tabs, drawers, and theme toggles.
- [Troubleshooting](references/troubleshooting.md) — Missing styles, hydration, overlay contrast, forms, and toast issues.

Examples in the component references use `lucide-react` for icons only. Replace
it with the icon library already used by the consumer project, or omit the icon
props.

## Canonical sources

- Documentation: <https://xingxingmofashu.github.io/ui/docs/en>
- Full documentation for agents: <https://xingxingmofashu.github.io/ui/llms-full.txt>
- GitHub: <https://github.com/xingxingmofashu/ui>
- npm: <https://www.npmjs.com/package/@xingxingmofashu/ui>

If a reference disagrees with the installed package, trust the installed
package's `.d.ts` files and the canonical documentation.
