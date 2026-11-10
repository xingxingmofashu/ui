# Button

`Button` renders a native button with a Liquid Glass surface, optional leading and trailing icons, and five sizes. Use it for actions; when it should navigate, render it as a link.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for actions. Render it as a link when the action navigates.

Canonical: [Button documentation](https://xingxingmofashu.github.io/ui/docs/en/components/button)

## Import

```tsx
import { Button } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Button } from "@xingxingmofashu/ui/components/button";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonBasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          leadingIcon={<Plus />}
          onClick={() => setCount((value) => value + 1)}
        >
          Add one
        </Button>
        <Button
          size="sm"
          leadingIcon={<RotateCcw />}
          onClick={() => setCount(0)}
          disabled={count === 0}
        >
          Reset
        </Button>
      </div>
      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Clicked {count} {count === 1 ? "time" : "times"}
      </p>
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Visible button content. Also supplies the accessible name unless an ARIA name is set. |
| `leadingIcon` | `ReactNode` | — | Decorative icon before the content. |
| `trailingIcon` | `ReactNode` | — | Decorative icon after the content. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls height, padding, text, and icon size. |
| `focusableWhenDisabled` | `boolean` | `false` | Keeps a disabled button in the Tab order and exposes it with `aria-disabled`. |
| `nativeButton` | `boolean` | `true` | Whether `Button` renders a native `<button>` as its root. Set it to `false` when `render` targets another element, such as a `<div>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element, or composes it with another component. |
| `className` | `ClassValue` | — | Tailwind classes merged into the outer `root`. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; base?: ClassValue; glass?: ClassValue; overlay?: ClassValue; label?: ClassValue; leadingIcon?: ClassValue; trailingIcon?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

Native `<button>` attributes such as `disabled`, `type`, `form`, `name`, `value`, `onClick`, and `aria-*`, as well as `ref`, are forwarded to the rendered element. Pass the visible content as `children`.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the button is disabled. |
| `data-slot` | Marks internal parts (`root`, `base`, `glass`, `overlay`, `leading-icon`, `label`, `trailing-icon`) for styling. `label` is omitted for icon-only buttons. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Button` renders a native `<button>` by default, so it gets focus, `Enter` and `Space` activation, and disabled behavior from the platform. The visible content provides the accessible name. Icon-only buttons must use `aria-label` or `aria-labelledby`; icon slots are decorative and hidden from assistive technology.

When `nativeButton={false}` renders a link or another element, keep the visible content meaningful and use the element that matches the action. `focusableWhenDisabled` keeps a disabled action in the Tab order with `aria-disabled` while blocking activation.

## Gotchas

- `children` is the only content prop; `label` is not supported.
- Icon-only buttons need `aria-label` or `aria-labelledby`.
- Set `type="submit"` inside forms; the default is `button`.
- For links, set `nativeButton={false}` and `render={<a href="..." />}`.
- `className` targets the outer root; use `ui` for internal slots.

## Related components

- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For an action that stays pressed.
- [Toggle Group](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group) — For a set of related pressed states.
- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — For text entry next to an action.

## Canonical API

- [Button documentation](https://xingxingmofashu.github.io/ui/docs/en/components/button)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

