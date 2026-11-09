# Fieldset

`Fieldset` renders a native `<fieldset>` with an accessible legend and groups related fields under one heading. Each field keeps its own label, description, and validation message; `Fieldset` only provides the shared group semantics and spacing.

Use `Fieldset` when several fields belong together, such as billing details or notification preferences. For a single control, use a [Field](https://xingxingmofashu.github.io/ui/docs/en/components/field). Controls that already render their own label, such as `CheckboxGroup` and `RadioGroup`, keep that label instead of taking one from the fieldset.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to group related fields under one legend.

Canonical: [Fieldset documentation](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset)

## Import

```tsx
import { Fieldset } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Fieldset } from "@xingxingmofashu/ui/components/fieldset";
```

## Basic usage

```tsx
"use client";

import { Field, Fieldset, Input } from "@xingxingmofashu/ui";

export default function FieldsetBasicDemo() {
  return (
    <Fieldset legend="Billing details" className="w-full max-w-sm">
      <Field label="Company" description="Shown on invoices and receipts.">
        <Input placeholder="Acme Inc." />
      </Field>

      <Field label="Tax ID">
        <Input placeholder="XX-XXXXXXX" />
      </Field>
    </Fieldset>
  );
}
```

## API reference

**Fieldset**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Fields and controls grouped by the fieldset. Required. |
| `legend` | `ReactNode` | — | Visible legend naming the group. |
| `disabled` | `boolean` | `false` | Disables the native fieldset and nested fields and form controls. |
| `className` | `string` | — | Tailwind classes merged into the fieldset root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; legend?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the fieldset root element. |

Additional Base UI `Fieldset.Root` props are forwarded, including `id` and native fieldset attributes.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the fieldset is disabled. |
| `data-slot` | Marks internal parts (`root`, `legend`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Fieldset` renders a native `<fieldset>` and links its `legend` with `aria-labelledby`. Each nested `Field` still provides the control's own label and description, and keyboard behavior belongs to the controls inside the group.

Always render a visible `legend` when the group needs a heading. If the design intentionally omits it, pass `aria-label` to the fieldset so the group still has an accessible name. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- Nested controls still need their own labels.
- `disabled` disables the native fieldset and nested controls.
- Render a visible `legend`; if it is intentionally omitted, pass `aria-label`.
- Do not use Fieldset as a replacement for a single Field.

## Related components

- [Field](https://xingxingmofashu.github.io/ui/docs/en/components/field) — Adds a label, description, and validation message to one control.
- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — The standard text field to place inside a field.
- [Checkbox Group](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox-group) — A grouped control that keeps its own label.

## Canonical API

- [Fieldset documentation](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

