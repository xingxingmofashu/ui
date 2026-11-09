# Field

`Field` wraps one Base UI form control with a visible label, supporting text, and a validation message. It owns the labeling and validity wiring, while the child control owns its own glass surface and interaction.

Use `Field` to give `Input` a visible label, description, and validation message. Controls that already render their own label, such as `Checkbox`, `Select`, `CheckboxGroup`, `RadioGroup`, and `Switch`, keep their built-in `label` prop. Use [Fieldset](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset) when several fields need one shared legend.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to label and validate a single form control; pair it with Input.

Canonical: [Field documentation](https://xingxingmofashu.github.io/ui/docs/en/components/field)

## Import

```tsx
import { Field } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Field } from "@xingxingmofashu/ui/components/field";
```

## Basic usage

```tsx
"use client";

import { Field, Input } from "@xingxingmofashu/ui";

export default function FieldBasicDemo() {
  return (
    <Field
      label="Email"
      description="We only use this address for account notices."
      className="w-full max-w-sm"
    >
      <Input type="email" placeholder="you@example.com" />
    </Field>
  );
}
```

## API reference

**Field**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | Single Base UI control labelled and validated by the field. Required. |
| `label` | `ReactNode` | — | Visible label associated with the control. |
| `description` | `ReactNode` | — | Supporting text rendered under the control and linked with `aria-describedby`. |
| `error` | `ReactNode` | — | Error message. A string renders directly; a React element replaces the body. A truthy value marks the field invalid. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Label, message, and spacing size. |
| `validate` | `(value, formValues) => string \| string[] \| null \| void \| Promise<...>` | — | Custom validation. Return a message or messages when the value is invalid. |
| `validationMode` | `"onSubmit" \| "onBlur" \| "onChange"` | `"onSubmit"` | When the field validates. |
| `validationDebounceTime` | `number` | `0` | Delay in milliseconds between `validate` calls in `onChange` mode. |
| `invalid` | `boolean` | — | Marks the field invalid from external state. |
| `disabled` | `boolean` | `false` | Disables the control through the field and fades the label and message. |
| `name` | `string` | — | Form field name registered by the field. |
| `dirty` | `boolean` | — | Marks the field dirty from external state. |
| `touched` | `boolean` | — | Marks the field touched from external state. |
| `actionsRef` | `RefObject<Field.Root.Actions \| null>` | — | Imperative actions. `validate` validates the field on demand. |
| `className` | `ClassValue` | — | Tailwind classes merged into the field root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; label?: ClassValue; error?: ClassValue; description?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the field root element. |

Additional Base UI `Field.Root` props are forwarded, including `id`. The child control also accepts its own props; set `required`, `disabled`, and native constraints on the control when they belong to that element.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the field is disabled. |
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has changed. |
| `data-touched` | Present after the field is touched. |
| `data-filled` | Present when the control has a value. |
| `data-focused` | Present when the control is focused. |
| `data-slot` | Marks internal parts (`root`, `label`, `error`, `description`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Field` renders a real `<label>` linked to the control. `description` and `error` register their ids with the control's `aria-describedby`; an error also sets `aria-invalid` on the control.

Keyboard behavior belongs to the wrapped control. Use `label` rather than a placeholder so the accessible name survives zoom, translation, and voice control. Group controls keep their own `label`; use `Fieldset` for a shared legend. When the field is disabled, the label and message fade and the control is disabled through the shared field state. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- `children` must be a single control.
- `Field name` must match the key used in `Form errors`.
- Use `Field` for `Input` and other controls without a built-in label; controls with built-in labels such as Checkbox, Switch, Select, CheckboxGroup, and RadioGroup can label themselves.
- Use `Fieldset` for a shared legend; a Field wraps one control.
- Placeholder text is not a label.

## Related components

- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — The standard text field to place inside `Field`.
- [Fieldset](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset) — Groups related fields under one shared legend.
- [Checkbox Group](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox-group) — A grouped control that keeps its own label and description.

## Canonical API

- [Field documentation](https://xingxingmofashu.github.io/ui/docs/en/components/field)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

