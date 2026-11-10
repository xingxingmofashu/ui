# Form

`Form` renders a native `<form>` and coordinates validation and external errors across its fields. It provides the form context that lets each [Field](https://xingxingmofashu.github.io/ui/docs/en/components/field) display an error without extra state per input.

Use `Form` when several fields share one submit action and error state. For a single control, use `Field`; to group related fields under one heading, use [Fieldset](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset).

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use when several fields share one submit action and one error state.

Canonical: [Form documentation](https://xingxingmofashu.github.io/ui/docs/en/components/form)

## Import

```tsx
import { Form } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Form } from "@xingxingmofashu/ui/components/form";
```

## Basic usage

```tsx
"use client";

import { useState } from "react";

import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

export default function FormBasicDemo() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className="w-full max-w-sm"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();

        const value = String(
          new FormData(event.currentTarget).get("email") ?? "",
        );

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setLoading(false);

        if (value.endsWith("@example.com")) {
          setStatus("");
          setErrors({ email: "The example domain is not allowed." });
          return;
        }

        setErrors({});
        setStatus("Saved. Check your inbox for a confirmation.");
      }}
    >
      <Field
        label="Email"
        name="email"
        description="We only use this address for account notices."
      >
        <Input
          type="email"
          defaultValue="you@example.com"
          placeholder="you@example.com"
        />
      </Field>

      <Button
        type="submit"
        label="Submit"
        disabled={loading}
        focusableWhenDisabled
      />

      {status ? <p className="text-sm text-ui-ink/60">{status}</p> : null}
    </Form>
  );
}
```

## API reference

**Form**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Fields and actions rendered inside the form. |
| `errors` | `Record<string, string \| string[]>` | — | External errors keyed by the `name` of a `Field`. Strings render one message; arrays render their messages, with two or more wrapped in a list. |
| `onFormSubmit` | `(formValues: Record<string, any>, eventDetails: { reason: "none"; event: Event }) => void` | — | Receives values from `Field`-registered controls and prevents the native submit event. |
| `validationMode` | `"onSubmit" \| "onBlur" \| "onChange"` | `"onSubmit"` | Default validation timing for fields in the form. A `Field` prop takes precedence. |
| `className` | `ClassValue` | — | Tailwind classes merged into the form element. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue }` | — | Tailwind classes for the `root` slot, keyed by `data-slot`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the form root element. |

Native `<form>` attributes and `ref` are forwarded, including `action`, `method`, `onSubmit`, `id`, and `aria-*`.

| Attribute | Description |
| --- | --- |
| `data-slot` | Marks the form root (`root`) for styling. |

`Form` has no `data-*` state attributes of its own.


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Form` renders a native `<form>` element. It does not add an accessible name; use `aria-label` or `aria-labelledby` when a page contains more than one form. Labels for individual controls come from `Field`, and submit buttons keep their own accessible names.

Native form behavior is preserved: `Enter` submits from a text field when a submit button exists, and autofill and `FormData` keep working. The component suppresses the browser's validation bubble and validates through `Field` instead. On a failed submission, focus moves to the first invalid control so keyboard and screen reader users land on the problem. Form-level errors are announced through the control's `aria-describedby` relationship. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- `errors` is keyed by the `name` of a `Field`, not by the input id.
- `onSubmit` still receives the native event; call `event.preventDefault()` when handling it yourself.
- `onFormSubmit` receives registered form values and prevents the native submit event. Use one submission approach consistently.
- A `Field` validation mode overrides the form default.
- Use `actionsRef.current.validate()` for imperative validation.

## Related components

- [Field](https://xingxingmofashu.github.io/ui/docs/en/components/field) — Displays a label, description, and the consolidated error for one control.
- [Fieldset](https://xingxingmofashu.github.io/ui/docs/en/components/fieldset) — Groups related fields under a shared legend.
- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — Submit actions with `type="submit"`.
- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — The standard text control to wrap in `Field`.

## Canonical API

- [Form documentation](https://xingxingmofashu.github.io/ui/docs/en/components/form)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

