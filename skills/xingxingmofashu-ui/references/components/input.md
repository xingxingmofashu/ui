# Input

`Input` renders a glass control around a native `<input>`, with optional leading and trailing icons. The input owns its glass surface and native form behavior; wrap it in `Field` to provide a visible label, description, and validation message.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for single-line text entry; wrap it in Field for a label, description, and error.

Canonical: [Input documentation](https://xingxingmofashu.github.io/ui/docs/en/components/input)

## Import

```tsx
import { Input } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Input } from "@xingxingmofashu/ui/components/input";
```

## Basic usage

```tsx
"use client";

import { useState } from "react";

import { Field, Input } from "@xingxingmofashu/ui";

export default function InputBasicDemo() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field
        label="Email"
        description="We only use this address for account notices."
      >
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onValueChange={setEmail}
        />
      </Field>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {email ? `Ready to send to ${email}.` : "Enter an email address."}
      </p>
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leadingIcon` | `ReactNode` | — | Decorative icon before the input. |
| `trailingIcon` | `ReactNode` | — | Decorative icon after the input. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls height, padding, radius, text, and icon size. |
| `value` | `string \| number \| readonly string[]` | — | Controlled value. |
| `defaultValue` | `string \| number \| readonly string[]` | — | Initial value when uncontrolled. |
| `onValueChange` | `(value: string, details) => void` | — | Called when the value changes. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the input element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the outer root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; control?: ClassValue; glass?: ClassValue; overlay?: ClassValue; leadingIcon?: ClassValue; input?: ClassValue; trailingIcon?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

Native `<input>` attributes such as `type`, `name`, `placeholder`, `required`, `readOnly`, `disabled`, `id`, and `aria-*`, as well as `ref`, are forwarded to the input element.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the input is disabled. |
| `data-valid` | Present when the input is valid and wrapped in `Field`. |
| `data-invalid` | Present when the input is invalid and wrapped in `Field`. |
| `data-touched` | Present after the input is touched while wrapped in `Field`. |
| `data-dirty` | Present after the input value changes while wrapped in `Field`. |
| `data-filled` | Present when the input has a value while wrapped in `Field`. |
| `data-focused` | Present when the input is focused while wrapped in `Field`. |
| `data-slot` | Marks internal parts (`root`, `control`, `glass`, `overlay`, `leading-icon`, `input`, `trailing-icon`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Input` renders a native `<input>`. Wrap it in `Field` to give it a visible label, description, and validation message; `Field` wires `aria-describedby` and `aria-invalid` for you. Use `aria-label` or `aria-labelledby` only when no visible label is rendered; placeholder text is not a label. Icon slots are decorative. Native attributes such as `required`, `name`, and `type` keep native form behavior. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for labeling patterns.

## Gotchas

- Standalone inputs need `aria-label` or `aria-labelledby`; placeholder text is not a label.
- Use `onValueChange` for the wrapper value callback when using `value`/`defaultValue`.
- `className` targets the outer root; use `ui.input` for the native input.
- Leading and trailing icons are decorative and hidden from assistive technology.
- Set `type`, `name`, and `required` as native attributes.

## Related components

- [Field](https://xingxingmofashu.github.io/ui/docs/en/components/field) — Adds a label, description, and validation message around the input.
- [Select](https://xingxingmofashu.github.io/ui/docs/en/components/select) — For choosing from a fixed set of values.
- [Checkbox](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox) — For boolean fields.
- [Slider](https://xingxingmofashu.github.io/ui/docs/en/components/slider) — For numeric ranges.

## Canonical API

- [Input documentation](https://xingxingmofashu.github.io/ui/docs/en/components/input)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

