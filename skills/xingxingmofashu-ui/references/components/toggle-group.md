# Toggle Group

`ToggleGroup` groups related toggle buttons on one glass surface. Use it for view switchers and formatting controls with single or multiple selection.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a set of related toggle buttons with single or multiple selection.

Canonical: [Toggle Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group)

## Import

```tsx
import { ToggleGroup } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { ToggleGroup } from "@xingxingmofashu/ui/components/toggle-group";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup } from "@xingxingmofashu/ui";

export default function ToggleGroupBasicDemo() {
  const [value, setValue] = useState<string[]>(["grid"]);
  const selected = value[0] ?? "";

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="View"
        value={value}
        onValueChange={setValue}
        items={[
          { value: "grid", label: "Grid", icon: <LayoutGrid /> },
          { value: "list", label: "List", icon: <List /> },
        ]}
      />
      <p className="text-sm text-ui-ink/60">
        Current view:{" "}
        {selected === "grid" ? "Grid" : selected === "list" ? "List" : "None"}
      </p>
    </div>
  );
}
```

## API reference

**ToggleGroup**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `readonly string[]` | — | Controlled pressed values. |
| `defaultValue` | `readonly string[]` | `[]` | Initial pressed values when uncontrolled. |
| `onValueChange` | `(value: string[], details) => void` | — | Called when the pressed values change. |
| `multiple` | `boolean` | `false` | Allows multiple pressed items. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout and keyboard orientation. |
| `loopFocus` | `boolean` | `true` | Loops keyboard focus back to the first item after the last one. |
| `disabled` | `boolean` | `false` | Disables every item. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls item height, padding, text, and icons. |
| `items` | `readonly ToggleGroupItemProps[]` | — | Options rendered by the group. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the group element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the group root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; rim?: ClassValue; item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**ToggleGroupItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Required value used by the group. |
| `label` | `ReactNode` | — | Visible content inside the item. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `onPressedChange` | `(pressed, details) => void` | — | Called when this item's pressed state changes. |
| `nativeButton` | `boolean` | `true` | Whether the item renders a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the item element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the item root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for this item's internal slots, keyed by `data-slot`. |

Items do not accept `pressed` or `defaultPressed`; the group `value` / `defaultValue` is the single source of truth for selection. Root `ui` is merged into every item first, then the item's `ui`, then the item's `className`. ARIA attributes, `disabled`, and `ref` are forwarded to the group and item buttons.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the group or an item is disabled. |
| `data-orientation` | Indicates the orientation (`horizontal` or `vertical`). |
| `data-multiple` | Present when the group allows multiple pressed items. |
| `data-pressed` | Present on a pressed item. |
| `data-slot` | Marks internal parts (`root`, `glass`, `rim`, `item`, `content`, `icon`, `label`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`ToggleGroup` renders a `group` whose items are toggle buttons with `aria-pressed`. Name the group with `aria-label` or `aria-labelledby`; icon-only items need their own name.

Arrow keys move focus within the group, `Home` and `End` jump to the ends, and `Space` or `Enter` toggles the focused item. In single-selection mode, the group value is the single source of truth; control it when the selection must not be cleared. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for keyboard details.

## Gotchas

- Pass options through `items`; each item needs a unique `value`.
- `multiple` switches the value between a single string and a string array.
- Name the group with `aria-label` or `aria-labelledby`; icon-only items need their own names.
- `orientation` controls layout and arrow-key navigation.
- `loopFocus` wraps focus at the ends.

## Related components

- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For a single pressed button.
- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between content panels.
- [Radio Group](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group) — For a form choice among exclusive options.

## Canonical API

- [Toggle Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

