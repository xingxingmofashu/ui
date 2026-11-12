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

## Parent checkbox

Pass every child value through `allValues`, keep the group controlled, and set `parent: true` on the parent item:

```tsx
"use client";

import { useState } from "react";

import {
  CheckboxGroup,
  type CheckboxGroupItemProps,
} from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const satisfies readonly CheckboxGroupItemProps[];

const channelValues = channels.map((channel) => channel.value);

const items = [
  { parent: true, label: "All channels" },
  ...channels,
] as const satisfies readonly CheckboxGroupItemProps[];

export default function CheckboxGroupParentDemo() {
  const [value, setValue] = useState<string[]>(["comments"]);

  return (
    <CheckboxGroup
      label="Notification channels"
      allValues={channelValues}
      items={items}
      value={value}
      onValueChange={setValue}
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
| `allValues` | `string[]` | — | Every child value in the group. Required when an item uses `parent: true`. |
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
| `value` | `string` | — | Identifies the option in the group value. Required for child items; optional for a parent item. |
| `parent` | `boolean` | `false` | Renders the group's parent checkbox. Requires a controlled group with `allValues`. |
| `indeterminate` | `boolean` | `false` | Forces the mixed state. |
| `label` | `ReactNode` | — | Visible label next to the control. It becomes the accessible name unless `aria-label` or `aria-labelledby` is provided. |
| `description` | `ReactNode` | — | Supporting copy under the label, linked with `aria-describedby` when the control has a name. |
| `onCheckedChange` | `(checked: boolean, details) => void` | — | Called when this option changes, before the group update. Call `details.cancel()` to cancel the group update. |
| `disabled` | `boolean` | `false` | Disables this option. |
| `readOnly` | `boolean` | `false` | Prevents changes while remaining focusable. |
| `required` | `boolean` | `false` | Marks this checkbox as required for form submission. |
| `nativeButton` | `boolean` | `false` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the entry root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the entry root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; box?: ClassValue; fill?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; wrapper?: ClassValue; itemLabel?: ClassValue; itemDescription?: ClassValue }` | — | Tailwind classes for control slots, keyed by `data-slot`. |

Parent items use `parent: true` and require the group's `allValues`; they do not submit a value. `uncheckedValue` is not supported on group items.

`ui` keys map to the `data-slot` values listed below. `name` and `form` are applied to every child control. `id`, `ref`, and other native attributes target the group root; use an item's `inputRef` for its hidden input.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the group or an option is disabled. |
| `data-readonly` | Present when an option is read-only. |
| `data-required` | Present when an option is required. |
| `data-checked` | Present on a checked option. |
| `data-unchecked` | Present on an unchecked option. |
| `data-indeterminate` | Present when an option is mixed. |
| `data-parent` | Present on the group's parent item. |
| `data-slot` | Marks internal group parts (`root`, `header`, `label`, `description`, `items`) and each control (`item`, `box`, `fill`, `glass`, `overlay`, `indicator`, `indicator-icon`, `wrapper`, `item-label`, `item-description`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`CheckboxGroup` exposes a `group` named by `label` or by `aria-label` / `aria-labelledby`. Each option is a checkbox with its visible `label` and `description` linked automatically. `Space` toggles the focused checkbox, and `Tab` moves between options because a checkbox group is not a composite widget.

A parent item with `parent: true` is named by its `label` and keeps its children in sync through `allValues`. The group supplies the parent's checked and mixed states and links it to its children with `aria-controls`. Parent items are controls only and never submit a value. When one parent must control multiple groups, use a separate `Checkbox` and keep each group array in sync.

Disabled options remain announced but cannot change. Each checked option submits its own hidden native checkbox; there is no native `required` for a group, so validate that at least one value is selected in your form handler. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- Pass options through `items`; the group value is `string[]`.
- Use `parent: true` with the group's `allValues` for a built-in parent; a parent item never submits a value.
- `uncheckedValue` is not supported on group items; it is omitted from the item type.
- `name` is applied to every child checkbox; each checked item submits its own value. Parent items are excluded.
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

