# Toggle

`Toggle` renders the glass shell, selected thumb, optional icon and label, and exposes the pressed state through `aria-pressed`.

Use it for a single on/off action. For a set of related options, use `ToggleGroup` instead.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a single on/off action that stays pressed.

Canonical: [Toggle documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toggle)

## Import

```tsx
import { Toggle } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Toggle } from "@xingxingmofashu/ui/components/toggle";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Bold } from "lucide-react";

import { Toggle } from "@xingxingmofashu/ui";

export default function ToggleBasicDemo() {
  return <Toggle label="Bold" icon={<Bold />} defaultPressed />;
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed` | `boolean` | — | Controlled pressed state. |
| `defaultPressed` | `boolean` | `false` | Initial pressed state when uncontrolled. |
| `onPressedChange` | `(pressed, details) => void` | — | Called when the pressed state changes. |
| `value` | `string` | — | Identifies the toggle when it is used inside a toggle group. |
| `nativeButton` | `boolean` | `true` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the rendered element. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Control size. |
| `label` | `ReactNode` | — | Visible label rendered inside the toggle. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `className` | `ClassValue` | — | Tailwind classes merged into the toggle root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; rim?: ClassValue; thumb?: ClassValue; content?: ClassValue; icon?: ClassValue; label?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

`disabled`, other native button attributes, and `ref` are forwarded to the rendered button.

| Attribute | Description |
| --- | --- |
| `data-pressed` | Present when the toggle is pressed. |
| `data-disabled` | Present when the toggle is disabled. |
| `data-slot` | Marks internal parts (`root`, `glass`, `rim`, `thumb`, `content`, `icon`, `label`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

The component supplies the button role, `aria-pressed`, keyboard activation, and disabled behavior. `Space` or `Enter` toggles the focused control.

When `label` is present it contributes to the accessible name; icon-only toggles need `aria-label` or `aria-labelledby`. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for naming patterns.

## Gotchas

- Icon-only toggles need `aria-label` or `aria-labelledby`.
- Use `pressed` + `onPressedChange` for controlled state; `defaultPressed` for uncontrolled.
- Use ToggleGroup for a set of related options.
- `value` only identifies the toggle when it is used inside a ToggleGroup.
- Use Button for a one-shot action, not a persistent state.

## Related components

- [Toggle Group](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group) — For several related toggles.
- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — For an action that does not stay pressed.
- [Switch](https://xingxingmofashu.github.io/ui/docs/en/components/switch) — For an immediate on/off setting.

## Canonical API

- [Toggle documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toggle)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

