# Checkbox

`Checkbox` renders the glass tile, check or dash indicator, optional label and description, and a hidden native checkbox for form submission.

The tile keeps the glass surface when unchecked; when checked it fills with `--ui-ink` and reveals the mark with a scale animation. The `indeterminate` mixed state is supported.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for independent boolean choices, including the mixed state.

Canonical: [Checkbox documentation](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox)

## Import

```tsx
import { Checkbox } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Checkbox } from "@xingxingmofashu/ui/components/checkbox";
```

## Basic usage

```tsx
"use client";

import { Checkbox } from "@xingxingmofashu/ui";

export default function CheckboxBasicDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        aria-label="Product updates"
        label="Product updates"
        description="Receive an email when a new release ships."
        defaultChecked
      />
      <Checkbox
        aria-label="Security alerts"
        label="Security alerts"
        description="Get notified about sign-ins from new devices."
        defaultChecked
      />
      <Checkbox
        aria-label="Research invites"
        label="Research invites"
        description="Occasional invitations to product interviews."
      />
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible label rendered inside the control. It becomes the accessible name unless `aria-label` or `aria-labelledby` is provided. |
| `description` | `ReactNode` | — | Supporting copy under the label, linked with `aria-describedby` when the control has a name. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Tile, icon, and text size. |
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial checked state when uncontrolled. |
| `indeterminate` | `boolean` | `false` | Mixed state; sets `aria-checked="mixed"` when true. |
| `onCheckedChange` | `(checked: boolean, details) => void` | — | Called when the checked state changes. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `readOnly` | `boolean` | `false` | Prevents changes while remaining focusable. |
| `required` | `boolean` | `false` | Requires the checkbox to be checked for form submission. |
| `uncheckedValue` | `string` | — | Value submitted with the form when unchecked. |
| `parent` | `boolean` | `false` | Whether this checkbox controls a group of child checkboxes inside a `CheckboxGroup`. |
| `nativeButton` | `boolean` | `false` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the checkbox root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; box?: ClassValue; fill?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; wrapper?: ClassValue; label?: ClassValue; description?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

`disabled`, `name`, `form`, `value`, `id`, `ref`, and other native attributes are still forwarded to the rendered control and its hidden input.

| Attribute | Description |
| --- | --- |
| `data-checked` | Present when the checkbox is checked. |
| `data-unchecked` | Present when the checkbox is not checked. |
| `data-indeterminate` | Present when the checkbox is in an indeterminate state. |
| `data-disabled` | Present when the checkbox is disabled. |
| `data-readonly` | Present when the checkbox is read-only. |
| `data-required` | Present when the checkbox is required. |
| `data-valid` | Present when the checkbox is valid and wrapped in `Field`. |
| `data-invalid` | Present when the checkbox is invalid and wrapped in `Field`. |
| `data-touched` | Present after the checkbox is touched while wrapped in `Field`. |
| `data-dirty` | Present after the checkbox value changes while wrapped in `Field`. |
| `data-filled` | Present when the checkbox is checked while wrapped in `Field`. |
| `data-focused` | Present when the checkbox is focused while wrapped in `Field`. |
| `data-starting-style` | Present when the indicator begins animating in. |
| `data-ending-style` | Present when the indicator is animating out. |
| `data-slot` | Marks internal parts (`root`, `box`, `fill`, `glass`, `overlay`, `indicator`, `indicator-icon`, `wrapper`, `label`, `description`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Checkbox` renders a focusable element with `role="checkbox"` and `aria-checked` (a `<span>` by default), plus a hidden native checkbox for form submission. The visible `label` names it and `description` is linked with `aria-describedby`; explicit ARIA names take precedence.

`Space` toggles the focused control. `indeterminate` sets `aria-checked="mixed"`. Use `required` when a checked state is mandatory, and see the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- `label` becomes the accessible name; standalone checkboxes need `aria-label` or `aria-labelledby`.
- Use `checked` + `onCheckedChange` for controlled state; `defaultChecked` for uncontrolled.
- `indeterminate` is a visual and ARIA state; it does not submit a value.
- Set `name`/`value` for form submission; use `uncheckedValue` when an unchecked value must submit.
- `readOnly` keeps the control focusable while blocking changes.

## Related components

- [Switch](https://xingxingmofashu.github.io/ui/docs/en/components/switch) — For settings that take effect immediately.
- [Radio Group](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group) — For choosing one option from a small set.
- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For a one-off pressed action.

## Canonical API

- [Checkbox documentation](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

