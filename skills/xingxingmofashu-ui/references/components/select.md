# Select

`Select` renders the label, trigger, glass surface, selected value, chevron, portal, glass popup, and options internally. Options are passed through the `items` array, so the same data drives both the trigger value and the popup list. Items can be flat or grouped, and `multiple` switches the value to an array.

Use `label` and `description` for visible field text. When no visible label is rendered, give the trigger an accessible name with `aria-label` or `aria-labelledby`. The selected value is submitted through a hidden native input when `name` is set.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to choose one option, or several when `multiple` is set, from a predefined list.

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

## Multiple selection

Set `multiple` to select more than one option. The value becomes an array, the popup stays open between selections, and the list exposes `aria-multiselectable`. Use `renderValue` to summarize the selection; it overrides `placeholder`, so return the empty-state text yourself.

```tsx
"use client";

import { useState } from "react";

import { Select } from "@xingxingmofashu/ui";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "rust", label: "Rust" },
] as const;

type Language = (typeof languages)[number]["value"];

export function LanguageSelect() {
  const [value, setValue] = useState<Language[]>(["typescript"]);

  return (
    <Select
      multiple
      label="Languages"
      items={languages}
      value={value}
      onValueChange={setValue}
      renderValue={(selected) =>
        selected.length === 0
          ? "Select languages"
          : `${selected.length} selected`
      }
    />
  );
}
```

## Grouped options

Pass groups as `{ label, items }` entries in `items`. Each group renders a heading and is announced as a labelled group, while the trigger still resolves labels from the flattened options.

```tsx
const produce = [
  {
    label: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    label: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "kale", label: "Kale" },
    ],
  },
] as const;

<Select label="Produce" placeholder="Select produce" items={produce} />;
```

## Object values

`Value` is not limited to strings. Pass objects as item values and use `itemToStringValue` for form submission and `isItemEqualToValue` when equal records are not the same reference. `renderValue` can show the full object inside the trigger.

```tsx
type ShippingMethod = {
  id: string;
  name: string;
  price: string;
};

<Select
  label="Shipping method"
  items={methods.map((method) => ({
    value: method,
    label: method.name,
    textValue: method.name,
  }))}
  value={method}
  onValueChange={setMethod}
  itemToStringValue={(value) => value.id}
  isItemEqualToValue={(item, value) => item.id === value.id}
  renderValue={(value) => value?.name ?? "Select a shipping method"}
/>;
```

## API reference

**Select**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly (SelectItemProps \| SelectItemGroupProps)[]` | — | Options rendered by the select, optionally grouped. Required. |
| `label` | `ReactNode` | — | Visible label associated with the trigger. |
| `description` | `ReactNode` | — | Supporting text under the trigger, linked with `aria-describedby`. |
| `placeholder` | `ReactNode` | — | Text shown when no value is selected. |
| `renderValue` | `(value) => ReactNode` | — | Formats the trigger value. Receives `Value \| null`, or `readonly Value[]` when `multiple`. Overrides `placeholder`. |
| `multiple` | `boolean` | `false` | Allows selecting several options; `value`, `defaultValue`, and `onValueChange` then use arrays. |
| `value` | `Value \| null` | — | Controlled value. Use `readonly Value[] \| null` when `multiple`. |
| `defaultValue` | `Value \| null` | — | Initial value when uncontrolled. Use `readonly Value[] \| null` when `multiple`. |
| `onValueChange` | `(value, details) => void` | — | Called when the selected value changes. Receives `Value \| null`, or `Value[]` when `multiple`. |
| `open` | `boolean` | — | Controlled popup open state. |
| `defaultOpen` | `boolean` | `false` | Initial popup open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the popup opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `modal` | `boolean` | `true` | Locks outside interaction while the popup is open. |
| `readOnly` | `boolean` | `false` | Prevents changing the selected value. |
| `disabled` | `boolean` | `false` | Disables the trigger and options. |
| `highlightItemOnHover` | `boolean` | `true` | Highlights options on pointer move. Set to `false` to style `:hover` separately from `data-highlighted`. |
| `itemToStringLabel` | `(itemValue: Value) => string` | — | Converts an object value to the text shown in the trigger. |
| `itemToStringValue` | `(itemValue: Value) => string` | — | Converts an object value to the string submitted with the form. |
| `isItemEqualToValue` | `(itemValue: Value, value: Value) => boolean` | `Object.is` | Custom equality used to match object values that are not the same reference. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls trigger height, padding, text, and icon size. |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to the trigger. |
| `sideOffset` | `number \| OffsetFunction` | `6` | Distance between the trigger and popup in pixels. |
| `alignOffset` | `number \| OffsetFunction` | `0` | Offset along the alignment axis in pixels. |
| `collisionPadding` | `Padding` | `5px per side` | Space kept between the popup and the collision boundary. |
| `alignItemWithTrigger` | `boolean` | `false` | Overlaps the popup so the selected item aligns with the trigger. |
| `className` | `ClassValue` | — | Tailwind classes merged into the field root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; label?: ClassValue; trigger?: ClassValue; glass?: ClassValue; overlay?: ClassValue; value?: ClassValue; icon?: ClassValue; description?: ClassValue; positioner?: ClassValue; popup?: ClassValue; popupGlass?: ClassValue; popupOverlay?: ClassValue; list?: ClassValue; group?: ClassValue; groupLabel?: ClassValue; item?: ClassValue; itemIndicator?: ClassValue; itemText?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**SelectItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Value submitted and passed to `onValueChange`. Any type is accepted. Required. |
| `label` | `ReactNode` | — | Visible content inside the option and trigger. Required. |
| `textValue` | `string` | — | Plain-text label used for keyboard typeahead. Defaults to a string label. |
| `disabled` | `boolean` | `false` | Disables the option. |

**SelectItemGroupProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible heading rendered above the group. Required. |
| `items` | `readonly SelectItemProps[]` | — | Options in the group. Required. |

`ui` keys map to the `data-slot` values listed below. `name`, `form`, `autoComplete`, `required`, and `id` are forwarded to the Base UI select root. `aria-label`, `aria-labelledby`, and `aria-describedby` are applied to the trigger. Use `inputRef` to access the hidden input; the wrapper does not forward `ref` to the trigger.

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
| `data-slot` | Marks internal parts (`root`, `label`, `trigger`, `glass`, `overlay`, `value`, `icon`, `description`, `positioner`, `popup`, `popup-glass`, `popup-overlay`, `list`, `group`, `group-label`, `item`, `item-indicator`, `item-text`). |


## Styling

`className` targets the field root. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Select` follows the select pattern: the trigger is a `combobox` with `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`; the inner list is the `listbox`, and each option is an `option`. `ArrowDown` and `ArrowUp` move through options, typeahead matches labels, and `Enter` selects the highlighted option. `Escape` closes the popup and returns focus to the trigger.

With `multiple`, the list reports `aria-multiselectable="true"`, each option exposes `aria-selected`, and activating an option toggles it without closing the popup. Grouped options render inside a `group` labelled by their heading.

The visible `label` names the trigger and `description` is linked with `aria-describedby`. Without a visible label, use `aria-label` or `aria-labelledby`. Disabled options remain announced but cannot be selected. Set `required` when a value must be chosen, and see the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for shared form patterns.

## Gotchas

- Pass options through `items`; each item needs a unique `value` and a `label`. Groups use `{ label, items }`.
- Set `multiple` to switch `value` to an array; the popup stays open after each selection.
- Use `renderValue` to customize the trigger; it overrides `placeholder`.
- `Value` accepts any type. Use `itemToStringValue`, `itemToStringLabel`, and `isItemEqualToValue` for object values.
- Use `value={null}` to clear a single controlled selection; there is no built-in clear button.
- `className` targets the field root, not the trigger.
- `name` submits through a hidden native input; `multiple` submits one input per selected value.
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
