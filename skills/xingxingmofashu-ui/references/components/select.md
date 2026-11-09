# Select

`Select` renders the label, trigger, glass surface, selected value, chevron, portal, glass popup, and options internally. Options are passed through the `items` array, so the same data drives both the trigger value and the popup list.

Use `label` and `description` for visible field text. When no visible label is rendered, give the trigger an accessible name with `aria-label` or `aria-labelledby`. The selected value is submitted through a hidden native input when `name` is set.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to choose one option from a predefined list.

Canonical: [Select documentation](https://xingxingmofashu.github.io/ui/docs/en/components/select)

## Import

```tsx
import { Select } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Select } from "@xingxingmofashu/ui/components/select";
```

## Basic usage

```tsx
"use client";

import { Select } from "@xingxingmofashu/ui";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon fruit", disabled: true },
] as const;

export default function SelectBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select
        label="Fruit"
        description="Choose the fruit for the next delivery."
        placeholder="Pick a fruit"
        items={fruits}
        defaultValue="apple"
      />
    </div>
  );
}
```

## API reference

**Select**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly SelectItemProps[]` | — | Options rendered by the select. Required. |
| `label` | `ReactNode` | — | Visible label associated with the trigger. |
| `description` | `ReactNode` | — | Supporting text under the trigger, linked with `aria-describedby`. |
| `placeholder` | `ReactNode` | — | Text shown when no value is selected. |
| `value` | `string \| null` | — | Controlled value. |
| `defaultValue` | `string \| null` | — | Initial value when uncontrolled. |
| `onValueChange` | `(value: string \| null, details) => void` | — | Called when the selected value changes. |
| `aria-label` | `string` | — | Accessible name for the trigger when no visible label is rendered. |
| `aria-labelledby` | `string` | — | Names the trigger from another element. |
| `aria-describedby` | `string` | — | Additional description IDs applied to the trigger. |
| `name` | `string` | — | Form field name for the hidden input. |
| `form` | `string` | — | Form that owns the hidden input. |
| `required` | `boolean` | `false` | Requires a value before form submission. |
| `readOnly` | `boolean` | `false` | Prevents changing the selected value. |
| `disabled` | `boolean` | `false` | Disables the trigger and options. |
| `modal` | `boolean` | `true` | Locks outside interaction while the popup is open. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls trigger height, padding, text, and icon size. |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to the trigger. |
| `sideOffset` | `number \| OffsetFunction` | `6` | Distance between the trigger and popup in pixels. |
| `alignOffset` | `number \| OffsetFunction` | `0` | Offset along the alignment axis in pixels. |
| `collisionPadding` | `Padding` | `5px per side` | Space kept between the popup and the collision boundary. |
| `alignItemWithTrigger` | `boolean` | `false` | Overlaps the popup so the selected item aligns with the trigger. |
| `open` | `boolean` | — | Controlled popup open state. |
| `defaultOpen` | `boolean` | `false` | Initial popup open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the popup opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `className` | `string` | — | Tailwind classes merged into the field root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; label?: ClassValue; trigger?: ClassValue; glass?: ClassValue; overlay?: ClassValue; value?: ClassValue; icon?: ClassValue; description?: ClassValue; positioner?: ClassValue; popup?: ClassValue; popupGlass?: ClassValue; popupOverlay?: ClassValue; list?: ClassValue; item?: ClassValue; itemIndicator?: ClassValue; itemText?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**SelectItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Value submitted and passed to `onValueChange`. Required. |
| `label` | `ReactNode` | — | Visible content inside the option and trigger. Required. |
| `textValue` | `string` | — | Plain-text label used for keyboard typeahead. Defaults to a string label. |
| `disabled` | `boolean` | `false` | Disables the option. |

`ui` keys map to the `data-slot` values listed below. Additional Base UI `Select.Root` props, including `actionsRef`, `inputRef`, and `highlightItemOnHover`, are forwarded.

| Attribute | Description |
| --- | --- |
| `data-open` | Present on the popup when the select is open. |
| `data-closed` | Present on the popup while it is closed or closing. |
| `data-placeholder` | Present on the value when no option is selected. |
| `data-selected` | Present on the selected option and its indicator. |
| `data-highlighted` | Present on the keyboard- or pointer-highlighted option. |
| `data-disabled` | Present when the select or an option is disabled. |
| `data-readonly` | Present when the select is read-only. |
| `data-popup-open` | Present on the trigger while the popup is open. |
| `data-side` | Indicates the resolved side of the popup. |
| `data-align` | Indicates the resolved alignment (`start`, `center`, or `end`). |
| `data-starting-style` | Present when the popup begins animating in. |
| `data-ending-style` | Present when the popup is animating out. |
| `data-slot` | Marks internal parts (`root`, `label`, `trigger`, `glass`, `overlay`, `value`, `icon`, `description`, `positioner`, `popup`, `popup-glass`, `popup-overlay`, `list`, `item`, `item-indicator`, `item-text`). |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Select` follows the Base UI select pattern: the trigger is a `combobox` with `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`; the inner list is the `listbox`, and each option is an `option`. `ArrowDown` and `ArrowUp` move through options, typeahead matches labels, and `Enter` selects the highlighted option. `Escape` closes the popup and returns focus to the trigger.

The visible `label` names the trigger and `description` is linked with `aria-describedby`. Without a visible label, use `aria-label` or `aria-labelledby`. Disabled options remain announced but cannot be selected. Set `required` when a value must be chosen, and see the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for shared form patterns.

## Gotchas

- Pass options through `items`; each item needs a unique `value` and a `label`.
- Use `value={null}` to clear a controlled selection; there is no built-in clear button.
- `className` targets the field root, not the trigger.
- `name` submits through a hidden native input; `required` participates in native validation.
- `label`/`description` are visible; use `aria-label`/`aria-labelledby` when omitted.
- `modal` defaults to true.

## Related components

- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — For free-form text fields next to a select.
- [Menu](https://xingxingmofashu.github.io/ui/docs/en/components/menu) — For actions rather than a persistent selected value.
- [Radio Group](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group) — When every option should stay visible.

## Canonical API

- [Select documentation](https://xingxingmofashu.github.io/ui/docs/en/components/select)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

