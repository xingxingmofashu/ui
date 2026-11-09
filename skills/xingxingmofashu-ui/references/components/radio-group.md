# Radio Group

`RadioGroup` renders a labelled group of circular glass radio controls. Each option can include a label and supporting description, and the entire row is clickable.

Options are passed through the `items` array; each item's `value` maps to the group value. Arrow keys move the selection between options, and the selected value is submitted through a hidden native radio input.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use when exactly one option must be selected from a visible list.

Canonical: [Radio Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group)

## Import

```tsx
import { RadioGroup } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { RadioGroup } from "@xingxingmofashu/ui/components/radio-group";
```

## Basic usage

```tsx
"use client";

import { RadioGroup } from "@xingxingmofashu/ui";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup
      label="Plan"
      description="Choose the plan that fits your team."
      defaultValue="pro"
      items={[
        {
          value: "free",
          label: "Free",
          description: "For personal projects and experiments.",
        },
        {
          value: "pro",
          label: "Pro",
          description: "For growing teams that need more room.",
        },
        {
          value: "team",
          label: "Team",
          description: "For larger organizations with shared billing.",
        },
      ]}
    />
  );
}
```

## API reference

**RadioGroup**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible label for the group. |
| `description` | `ReactNode` | — | Supporting text under the group label, linked with `aria-describedby`. |
| `aria-label` | `string` | — | Accessible name when no visible label is rendered. |
| `aria-labelledby` | `string` | — | ID reference for an external accessible name. |
| `aria-describedby` | `string` | — | ID reference for external supporting text. A visible `description` is merged with this value. |
| `items` | `readonly RadioGroupItemProps[]` | — | Options rendered by the group. |
| `value` | `string` | — | Controlled selected value. |
| `defaultValue` | `string` | — | Initial selected value when uncontrolled. |
| `onValueChange` | `(value: string, details) => void` | — | Called when the selected value changes. |
| `disabled` | `boolean` | `false` | Disables every option. |
| `readOnly` | `boolean` | `false` | Prevents changes while remaining focusable. |
| `required` | `boolean` | `false` | Requires a selection for form submission. |
| `name` | `string` | — | Form field name. |
| `form` | `string` | — | ID of the form that owns the hidden inputs. |
| `inputRef` | `Ref<HTMLInputElement>` | — | Ref to the hidden native input. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Control, indicator, and text size. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the group element. |
| `ref` | `Ref<HTMLDivElement>` | — | Ref forwarded to the group element. |
| `className` | `string` | — | Tailwind classes merged into the group root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; header?: ClassValue; label?: ClassValue; description?: ClassValue; items?: ClassValue; item?: ClassValue; box?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; dot?: ClassValue; wrapper?: ClassValue; itemLabel?: ClassValue; itemDescription?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**RadioGroupItem**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Value that identifies the option in the group value. |
| `label` | `ReactNode` | — | Visible label next to the control. It becomes the accessible name unless `aria-label` or `aria-labelledby` is provided. |
| `description` | `ReactNode` | — | Supporting copy under the label, linked with `aria-describedby` when the option has a name. |
| `disabled` | `boolean` | `false` | Disables this option. |
| `readOnly` | `boolean` | `false` | Prevents changes to this option while remaining focusable. |
| `required` | `boolean` | `false` | Marks this option as required for form submission. |
| `inputRef` | `Ref<HTMLInputElement>` | — | Ref to the hidden native input. |
| `aria-label` | `string` | — | Accessible name when no visible label is rendered. |
| `aria-labelledby` | `string` | — | ID of an external label. |
| `aria-describedby` | `string` | — | ID of external supporting text. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the option element. |
| `ref` | `Ref<HTMLSpanElement>` | — | Ref forwarded to the option element. |
| `className` | `string` | — | Tailwind classes merged into the option root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; box?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; dot?: ClassValue; wrapper?: ClassValue; itemLabel?: ClassValue; itemDescription?: ClassValue }` | — | Tailwind classes for this option's internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-checked` | Present when the option is selected. |
| `data-unchecked` | Present when the option is not selected. |
| `data-disabled` | Present when the option or group is disabled. |
| `data-readonly` | Present when the option is read-only. |
| `data-required` | Present when the option is required. |
| `data-valid` | Present on every option when the group is valid and wrapped in `Field`. |
| `data-invalid` | Present on every option when the group is invalid and wrapped in `Field`. |
| `data-touched` | Present on every option after the group is touched while wrapped in `Field`. |
| `data-dirty` | Present on every option after the group value changes while wrapped in `Field`. |
| `data-filled` | Present on every option when the group has a selection while wrapped in `Field`. |
| `data-focused` | Present on every option when any option is focused while wrapped in `Field`. |
| `data-starting-style` | Present when the indicator begins animating in. |
| `data-ending-style` | Present when the indicator is animating out. |
| `data-slot` | Marks internal parts (`root`, `header`, `label`, `description`, `items`, `item`, `box`, `glass`, `overlay`, `indicator`, `dot`, `wrapper`, `item-label`, `item-description`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`RadioGroup` exposes a `radiogroup` named by `label` or by `aria-label` / `aria-labelledby`. Each option is a radio with its visible `label` and `description` linked automatically.

Arrow keys move between options and update the selection, and `Space` selects the focused option. The selected value is submitted through a hidden native radio; set `required` when a choice is mandatory. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- Pass options through `items`; each item needs a unique `value`.
- The group value is a single string, not an array.
- `label` names the group; each item has its own `label`.
- Set `name` for form submission; `required` applies to the radio group.
- `readOnly` keeps options focusable.

## Related components

- [Checkbox](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox) — For independent boolean choices.
- [Select](https://xingxingmofashu.github.io/ui/docs/en/components/select) — When the option list is long.
- [Switch](https://xingxingmofashu.github.io/ui/docs/en/components/switch) — For an immediate on/off setting.

## Canonical API

- [Radio Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

