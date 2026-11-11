# Toolbar

`Toolbar` renders one glass bar with actions, toggle buttons, links, groups, and separators. Use it for editor controls, formatting bars, and compact action rows that should share a single keyboard stop. Actions are passed through `items`, and arrow keys move focus inside the bar.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a set of related actions that should stay on one surface and share roving keyboard focus. Use `ToggleGroup` when you only need a selection group, or `Menu` when the actions do not fit in the bar.

Canonical: [Toolbar documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toolbar)

## Import

```tsx
import { Toolbar } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Toolbar } from "@xingxingmofashu/ui/components/toolbar";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Copy, Redo2, Scissors, Undo2 } from "lucide-react";
import { useState } from "react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarBasicDemo() {
  const [lastAction, setLastAction] = useState("None");

  return (
    <div className="flex flex-col items-center gap-4">
      <Toolbar
        aria-label="Document actions"
        items={[
          {
            label: "Undo",
            icon: <Undo2 />,
            onClick: () => setLastAction("Undo"),
          },
          {
            label: "Redo",
            icon: <Redo2 />,
            onClick: () => setLastAction("Redo"),
          },
          { kind: "separator" },
          {
            label: "Cut",
            icon: <Scissors />,
            onClick: () => setLastAction("Cut"),
          },
          {
            label: "Copy",
            icon: <Copy />,
            onClick: () => setLastAction("Copy"),
          },
        ]}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Last action: {lastAction}
      </p>
    </div>
  );
}
```

## API reference

**Toolbar**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly ToolbarItemProps[]` | — | Actions, toggles, links, groups, and separators rendered by the toolbar. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout and arrow-key axis. |
| `loopFocus` | `boolean` | `true` | Wraps focus to the other end when an arrow key passes the last item. |
| `disabled` | `boolean` | `false` | Disables buttons, toggles, and groups while keeping focusable items in the roving focus order. Links are not affected. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls item height, padding, text, icons, and separator length. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the toolbar root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the toolbar root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; group?: ClassValue; item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue; separator?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**ToolbarButtonProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"button"` | `"button"` | Marks the entry as an action button. Optional. |
| `label` | `ReactNode` | — | Visible label inside the button. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `disabled` | `boolean` | `false` | Ignores pointer and keyboard activation. |
| `focusableWhenDisabled` | `boolean` | `true` | Keeps a disabled button in the roving focus order. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the button element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the button. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for this item's internal slots. |

**ToolbarToggleProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"toggle"` | — | Marks the entry as a two-state button. Required. |
| `label` | `ReactNode` | — | Visible label inside the toggle. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `pressed` | `boolean` | — | Controlled pressed state. |
| `defaultPressed` | `boolean` | `false` | Initial pressed state when uncontrolled. |
| `onPressedChange` | `(pressed: boolean, details) => void` | — | Called when the pressed state changes. |
| `disabled` | `boolean` | `false` | Ignores pointer and keyboard activation. |
| `focusableWhenDisabled` | `boolean` | `true` | Keeps a disabled toggle in the roving focus order. |
| `className` | `ClassValue` | — | Tailwind classes merged into the toggle. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for this item's internal slots. |

**ToolbarLinkProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"link"` | — | Marks the entry as a link. Required. |
| `href` | `string` | — | Destination of the link. Required. |
| `label` | `ReactNode` | — | Visible label inside the link. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the link element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the link. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for this item's internal slots. |

**ToolbarGroupProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"group"` | — | Marks the entry as a group. Required. |
| `items` | `readonly ToolbarGroupItemProps[]` | — | Action buttons, toggles, and links rendered inside the group. Required. |
| `disabled` | `boolean` | `false` | Disables the buttons and toggles in the group. Links are not affected. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the group element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the group. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ group?: ClassValue; item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for the group and its items. |

**ToolbarSeparatorProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"separator"` | — | Marks the entry as a separator. Required. |
| `orientation` | `"horizontal" \| "vertical"` | Opposite of the toolbar | Orientation of the separator. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the separator element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the separator. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ separator?: ClassValue }` | — | Tailwind classes for the separator slot. |

| Attribute | Description |
| --- | --- |
| `aria-disabled` | Reports a disabled button or toggle item. |
| `aria-orientation` | Reports the toolbar and separator orientation. |
| `aria-pressed` | Reports the pressed state of a toggle item. |
| `data-disabled` | Present on the toolbar, a group, or a button or toggle item when disabled. |
| `data-focusable` | Present on a focusable button or toggle item; disabled items keep it when `focusableWhenDisabled` is `true`. |
| `data-orientation` | Indicates the orientation on the toolbar, groups, items, and separators. |
| `data-pressed` | Present on a pressed toggle item. |
| `data-slot` | Marks internal parts (`root`, `glass`, `overlay`, `group`, `item`, `content`, `icon`, `label`, `separator`). |

## Styling

`className` targets the toolbar root. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

Component-specific values live in `src/theme/toolbar.ts`: `--ui-toolbar-item-height`, `--ui-toolbar-item-px`, `--ui-toolbar-font-size`, `--ui-toolbar-icon-size`, `--ui-toolbar-item-gap`, `--ui-toolbar-padding`, `--ui-toolbar-gap`, `--ui-toolbar-group-gap`, `--ui-toolbar-vertical-radius`, and `--ui-toolbar-separator-length`. The hover fill, pressed thumb, rim, shadow, and divider colors are mixed from `--ui-ink`.

## Accessibility

`Toolbar` renders `role="toolbar"` with `aria-orientation`. Name it with `aria-label` or `aria-labelledby`. The bar takes one stop in the Tab order: arrow keys move focus along the toolbar orientation, and `loopFocus` defaults to `true`.

Toggle items expose `aria-pressed`. Disabled buttons and toggles keep `aria-disabled` and, unless `focusableWhenDisabled` is `false`, remain focusable and skip activation. Groups render `role="group"` and need `aria-label` or `aria-labelledby`. Separators render `role="separator"` with the opposite orientation. Icon-only items need an accessible name, and icons are hidden from assistive technology. Links are not disabled by the toolbar; they stay in the roving focus order and keep standard link behavior. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for shared interaction patterns.

## Gotchas

- Pass actions through `items`; a plain button entry needs no `kind`.
- Use `{ kind: "separator" }` for a divider. It takes the opposite orientation automatically.
- Toggle items use `pressed` / `onPressedChange`; do not also control them through a group value.
- Group entries accept buttons, toggles, and links, but not nested groups or separators.
- Name icon-only items with `aria-label` or `aria-labelledby`.
- `disabled` on the root disables buttons and toggles; links stay active. `focusableWhenDisabled` controls whether disabled items stay in the roving focus order.
- Links have no disabled state. Remove or replace them when the toolbar or group is disabled.
- For text entry, use a separate `Input` or `Field` next to the toolbar; the wrapper does not expose `Toolbar.Input`.

## Related components

- [Toggle Group](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group) — For a selection group without other toolbar actions.
- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — For a single standalone action.
- [Menu](https://xingxingmofashu.github.io/ui/docs/en/components/menu) — For actions that do not fit in the bar.
- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between content panels.

## Canonical API

- [Toolbar documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toolbar)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
