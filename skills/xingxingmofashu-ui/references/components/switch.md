# Switch

`Switch` renders a two-state control with a Liquid Glass track and thumb. Use it for settings that take effect immediately; for a single action that stays pressed, use `Toggle`.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a setting that takes effect immediately.

Canonical: [Switch documentation](https://xingxingmofashu.github.io/ui/docs/en/components/switch)

## Import

```tsx
import { Switch } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Switch } from "@xingxingmofashu/ui/components/switch";
```

## Basic usage

```tsx
"use client";

import { Switch } from "@xingxingmofashu/ui";

export default function SwitchBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Switch
        label="Receive notifications"
        description="When enabled, new messages are sent to your inbox."
        defaultChecked
      />
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible label. It becomes the accessible name unless `aria-label` or `aria-labelledby` is provided. |
| `description` | `ReactNode` | — | Supporting text, linked with `aria-describedby` when the control has a name. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls track size and text size. |
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial checked state when uncontrolled. |
| `onCheckedChange` | `(checked: boolean, details) => void` | — | Called when the checked state changes. |
| `disabled` | `boolean` | `false` | Disables the switch. |
| `readOnly` | `boolean` | `false` | Prevents toggling while remaining focusable. |
| `required` | `boolean` | `false` | Requires the switch to be on for form submission. |
| `uncheckedValue` | `string` | — | Value submitted with the form when the switch is off. |
| `nativeButton` | `boolean` | `false` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the switch root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; container?: ClassValue; base?: ClassValue; thumb?: ClassValue; wrapper?: ClassValue; label?: ClassValue; description?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

`name`, `form`, `value`, `id`, `ref`, and other native attributes are forwarded to the rendered control and its hidden input.

| Attribute | Description |
| --- | --- |
| `data-checked` | Present when the switch is on. |
| `data-unchecked` | Present when the switch is off. |
| `data-disabled` | Present when the switch is disabled. |
| `data-readonly` | Present when the switch is read-only. |
| `data-required` | Present when the switch is required. |
| `data-valid` | Present when the switch is valid and wrapped in `Field`. |
| `data-invalid` | Present when the switch is invalid and wrapped in `Field`. |
| `data-touched` | Present after the switch is touched while wrapped in `Field`. |
| `data-dirty` | Present after the switch value changes while wrapped in `Field`. |
| `data-filled` | Present when the switch is on while wrapped in `Field`. |
| `data-focused` | Present when the switch is focused while wrapped in `Field`. |
| `data-animating` | Present while the thumb transition is running. |
| `data-slot` | Marks internal parts (`root`, `container`, `base`, `thumb`, `wrapper`, `label`, `description`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Track and thumb changes should use `--ui-ink`/`--ui-surface` plus the `--ui-switch-*` geometry tokens instead of overriding individual colors or shadows. Set geometry overrides with `style` on the switch.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Switch` renders a focusable element with `role="switch"` and `aria-checked` (a `<span>` by default). The visible `label` names it and `description` is linked with `aria-describedby`; explicit ARIA names take precedence.

`Space` toggles the focused control. The hidden checkbox carries `name` and `value` for form submission, and `readOnly` prevents changes while keeping focus. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for form patterns.

## Gotchas

- `label` becomes the accessible name; standalone switches need `aria-label` or `aria-labelledby`.
- Use `checked` + `onCheckedChange` for controlled state; `defaultChecked` for uncontrolled.
- Set `name`/`value` for form submission; use `uncheckedValue` when needed.
- `readOnly` keeps the switch focusable.
- Use Checkbox for a choice that is submitted with a form, not an immediate setting.

## Related components

- [Checkbox](https://xingxingmofashu.github.io/ui/docs/en/components/checkbox) — For choices that are confirmed with a form.
- [Radio Group](https://xingxingmofashu.github.io/ui/docs/en/components/radio-group) — For one choice among several.
- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For a button that stays pressed.

## Canonical API

- [Switch documentation](https://xingxingmofashu.github.io/ui/docs/en/components/switch)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

