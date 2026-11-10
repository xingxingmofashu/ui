# Checkbox Group

`CheckboxGroup` renders a labelled set of independent checkbox choices on one shared state. Each option is a real checkbox with its own label and description, and the group value is an array of the checked `value`s.

Options are passed through the `items` array. The group owns the checked values, supports controlled and uncontrolled usage, and shares one label and description across the set.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a labelled set of independent choices that share one value array.

Canonical: [Checkbox Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox-group)

## Import

```tsx
import { CheckboxGroup } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { CheckboxGroup } from "@xingxingmofashu/ui/components/checkbox-group";
```

## Basic usage

```tsx
"use client";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  {
    value: "comments",
    label: "Comments",
    description: "Replies and mentions on your posts.",
  },
  {
    value: "releases",
    label: "Releases",
    description: "A summary when a new version ships.",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Invoices, receipts, and plan changes.",
  },
] as const;

export default function CheckboxGroupBasicDemo() {
  return (
    <CheckboxGroup
      label="Notifications"
      description="Choose the channels you want to hear about."
      items={channels}
      defaultValue={["comments", "releases"]}
      className="w-full max-w-sm"
    />
  );
}
```

## API reference

**CheckboxGroup**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly CheckboxGroupItemProps[]` | — | Options rendered by the group. Required. |
| `label` | `ReactNode` | — | Visible label for the group. |
| `description` | `ReactNode` | — | Supporting text under the group label, linked with `aria-describedby`. |
| `value` | `string[]` | — | Controlled checked values. |
| `defaultValue` | `string[]` | `[]` | Initial checked values when uncontrolled. |
| `onValueChange` | `(value: string[], details) => void` | — | Called when a checkbox is ticked or unticked. |
| `disabled` | `boolean` | `false` | Disables every option. |
| `readOnly` | `boolean` | `false` | Prevents changes while keeping every option focusable. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Control, label, description, and spacing size. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the group root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the group root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; header?: ClassValue; label?: ClassValue; description?: ClassValue; items?: ClassValue; item?: ClassValue; box?: ClassValue; fill?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; wrapper?: ClassValue; itemLabel?: ClassValue; itemDescription?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**CheckboxGroupItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Identifies the option in the group value. Required. |
| `indeterminate` | `boolean` | `false` | Forces the mixed state. |
| `label` | `ReactNode` | — | Visible label next to the control. It becomes the accessible name unless `aria-label` or `aria-labelledby` is provided. |
| `description` | `ReactNode` | — | Supporting copy under the label, linked with `aria-describedby` when the control has a name. |
| `disabled` | `boolean` | `false` | Disables this option. |
| `readOnly` | `boolean` | `false` | Prevents changes while remaining focusable. |
| `required` | `boolean` | `false` | Marks this checkbox as required for form submission. |
| `uncheckedValue` | `string` | — | Value submitted when this option is unchecked. |
| `nativeButton` | `boolean` | `false` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the entry root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the entry root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; box?: ClassValue; fill?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; wrapper?: ClassValue; itemLabel?: ClassValue; itemDescription?: ClassValue }` | — | Tailwind classes for control slots, keyed by `data-slot`. |

Parent checkboxes are not part of the component API. Compose them with `Checkbox` and keep the arrays in sync, as shown above.

`ui` keys map to the `data-slot` values listed below. `name`, `form`, `id`, `ref`, and other native attributes are forwarded to the group and each control.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the group or an option is disabled. |
| `data-readonly` | Present when an option is read-only. |
| `data-required` | Present when an option is required. |
| `data-checked` | Present on a checked option. |
| `data-unchecked` | Present on an unchecked option. |
| `data-indeterminate` | Present when an option is mixed. |
| `data-slot` | Marks internal group parts (`root`, `header`, `label`, `description`, `items`) and each control (`item`, `box`, `fill`, `glass`, `overlay`, `indicator`, `indicator-icon`, `wrapper`, `item-label`, `item-description`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`CheckboxGroup` exposes a `group` named by `label` or by `aria-label` / `aria-labelledby`. Each option is a checkbox with its visible `label` and `description` linked automatically. `Space` toggles the focused checkbox, and `Tab` moves between options because a checkbox group is not a composite widget.

A parent checkbox is a separate `Checkbox`: give the group its own accessible name, derive the parent's `checked` and `indeterminate` state from the shared arrays, and keep both levels in sync. Parent checkboxes are controls only, so they do not submit a value unless you give them a `name` and `value`.

Disabled options remain announced but cannot change. Each checked option submits its own hidden native checkbox; there is no native `required` for a group, so validate that at least one value is selected in your form handler. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- Pass options through `items`; the group value is `string[]`.
- A select-all parent checkbox is not part of the API; compose it with `Checkbox` and keep the arrays in sync.
- `name` is applied to every checkbox; each checked option submits its own value.
- There is no native `required` for the group; validate that at least one value is selected.
- `readOnly` keeps options focusable.

## Related components

- [Checkbox](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox) — For a single independent choice outside a group.
- [Radio Group](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group) — When exactly one option can be selected.
- [Switch](https://xingxingmofashu.github.io/ui/docs/en/components/switch) — For a setting that takes effect immediately.

## Canonical API

- [Checkbox Group documentation](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox-group)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

