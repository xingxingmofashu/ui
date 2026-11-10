# Slider

`Slider` renders the control, track, indicator, and glass thumb internally. `children` is intentionally not supported; `style` merges into the outermost root.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a single value or a range along a track.

Canonical: [Slider documentation](https://xingxingmofashu.github.io/ui/docs/en/components/slider)

## Import

```tsx
import { Slider } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Slider } from "@xingxingmofashu/ui/components/slider";
```

## Basic usage

```tsx
"use client";

import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderBasicDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span id="slider-basic-label">Volume</span>
        <span className="font-mono tabular-nums text-ui-ink/70">{volume}</span>
      </div>
      <Slider
        aria-labelledby="slider-basic-label"
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| readonly number[]` | — | Controlled value; an array renders one thumb per value. |
| `defaultValue` | `number \| readonly number[]` | — | Uncontrolled initial value. |
| `onValueChange` | `(value, details) => void` | — | Called when the value changes. |
| `onValueCommitted` | `(value, details) => void` | — | Called when a value change is committed. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step for dragging and arrow keys. |
| `largeStep` | `number` | `10` | Step for Page Up / Page Down and Shift + arrow keys. |
| `minStepsBetweenValues` | `number` | `0` | Minimum steps between range thumb values. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout and keyboard orientation. |
| `format` | `Intl.NumberFormatOptions` | — | Value format used by the accessible value text. |
| `locale` | `Intl.LocalesArgument` | — | Locale used for number formatting. |
| `getAriaLabel` | `(index: number) => string` | — | Accessible name for the thumb at the given index. Use it for range sliders. |
| `getAriaValueText` | `(formattedValue, value, index) => string` | — | Custom accessible value text for each thumb. |
| `thumbAlignment` | `"center" \| "edge" \| "edge-client-only"` | `"center"` | How thumbs align with the control edges. |
| `thumbCollisionBehavior` | `"push" \| "swap" \| "none"` | `"push"` | How range thumbs behave when they collide. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the outermost root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; control?: ClassValue; track?: ClassValue; indicator?: ClassValue; thumb?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

`disabled`, `name`, `form`, ARIA attributes such as `aria-label` and `aria-describedby`, and `ref` are forwarded to the slider and its thumbs.

| Attribute | Description |
| --- | --- |
| `data-dragging` | Present while a thumb is being dragged. |
| `data-orientation` | Indicates the orientation (`horizontal` or `vertical`). |
| `data-disabled` | Present when the slider is disabled. |
| `data-index` | Indicates the thumb index on range sliders. |
| `data-valid` | Present when the slider is valid and wrapped in `Field`. |
| `data-invalid` | Present when the slider is invalid and wrapped in `Field`. |
| `data-touched` | Present after the slider is touched while wrapped in `Field`. |
| `data-dirty` | Present after the slider value changes while wrapped in `Field`. |
| `data-slot` | Marks internal parts (`root`, `control`, `track`, `indicator`, `thumb`) for styling. |
| `data-focused` | Present when the slider is focused while wrapped in `Field`. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

Each thumb is a `slider` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and a name from `aria-label`, `aria-labelledby`, or `getAriaLabel`.

Arrow keys change the value by `step`, and `Page Up` and `Page Down` use `largeStep`. `Home` and `End` move a single-value slider to its bounds; on a range slider they move the focused thumb to the adjacent thumb boundary, while the outer thumbs still reach the bounds. Range sliders need a distinct name for every thumb. `aria-invalid` and `aria-errormessage` reach the underlying range input. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for naming examples.

## Gotchas

- A number renders one thumb; an array renders one thumb per value.
- Range sliders need a distinct name per thumb via `getAriaLabel`.
- `children` is not supported; style through `ui`.
- `step` controls arrow keys; `largeStep` controls Page Up/Page Down.
- Use `onValueCommitted` for the final value after dragging.

## Related components

- [Input](https://xingxingmofashu.github.io/ui/docs/en/components/input) — For an exact numeric value typed by the user.
- [Progress](https://xingxingmofashu.github.io/ui/docs/en/components/progress) — For read-only task completion.
- [Switch](https://xingxingmofashu.github.io/ui/docs/en/components/switch) — For an immediate binary setting.

## Canonical API

- [Slider documentation](https://xingxingmofashu.github.io/ui/docs/en/components/slider)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

