# Tooltip

`Tooltip` renders the trigger, portal, positioner, glass popup, directional arrow, and content internally. It is a visual hint for sighted pointer and keyboard users, not a replacement for visible labels or accessible descriptions.

Keep the trigger's accessible name aligned with the tooltip content. Icon-only triggers need an `aria-label`; the tooltip itself is supplementary.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a short, non-interactive hint on hover or focus.

Canonical: [Tooltip documentation](https://xingxingmofashu.github.io/ui/docs/en/components/tooltip)

## Import

```tsx
import { Tooltip } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Tooltip } from "@xingxingmofashu/ui/components/tooltip";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Eye, Rocket, Save } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip trigger={<Button label="Save" leadingIcon={<Save />} />}>
        Save changes
      </Tooltip>
      <Tooltip trigger={<Button label="Preview" leadingIcon={<Eye />} />}>
        Preview the current draft
      </Tooltip>
      <Tooltip trigger={<Button label="Publish" leadingIcon={<Rocket />} />}>
        Publish to everyone
      </Tooltip>
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | — | Element that opens the tooltip. Required. It must forward props and refs. |
| `children` | `ReactNode` | — | Short hint displayed in the popup. Required. |
| `arrow` | `boolean` | `true` | Whether to render the directional arrow. |
| `delay` | `number` | `600` | Delay before opening on hover, in milliseconds. |
| `closeDelay` | `number` | `0` | Delay before closing, in milliseconds. |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"top"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to the trigger. |
| `sideOffset` | `number \| OffsetFunction` | `8` | Distance between the trigger and popup in pixels. |
| `alignOffset` | `number \| OffsetFunction` | `0` | Offset along the alignment axis in pixels. |
| `collisionPadding` | `Padding` | `5px per side` | Space kept between the popup and the collision boundary. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the tooltip opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `disabled` | `boolean` | `false` | Prevents the tooltip from opening. |
| `trackCursorAxis` | `"none" \| "x" \| "y" \| "both"` | `"none"` | Axis the tooltip follows while the pointer moves. |
| `disableHoverablePopup` | `boolean` | `false` | Whether the tooltip contents can be hovered without closing the tooltip. |
| `actionsRef` | `RefObject<Tooltip.Root.Actions \| null>` | — | Imperative `close` and `unmount` actions. |
| `triggerId` | `string \| null` | — | ID of the trigger for a controlled tooltip. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger for an initially open tooltip. |
| `handle` | `Tooltip.Handle<Payload>` | — | Handle that lets external triggers control the tooltip. |
| `className` | `string` | — | Tailwind classes merged into the popup. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ positioner?: ClassValue; popup?: ClassValue; glass?: ClassValue; overlay?: ClassValue; arrow?: ClassValue; content?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

`ui` keys map to the `data-slot` values listed below. All other Base UI `Tooltip.Root` props are forwarded.

| Attribute | Description |
| --- | --- |
| `data-open` | Present when the popup is open. |
| `data-closed` | Present when the popup is closed. |
| `data-side` | Indicates the resolved side (`top`, `bottom`, `left`, `right`, `inline-start`, or `inline-end`). |
| `data-align` | Indicates the resolved alignment (`start`, `center`, or `end`). |
| `data-starting-style` | Present when the popup begins animating in. |
| `data-ending-style` | Present when the popup is animating out. |
| `data-instant` | Present when animations should be skipped. |
| `data-popup-open` | Present on the trigger while the tooltip is open. |
| `data-slot` | Marks internal parts (`positioner`, `popup`, `glass`, `overlay`, `arrow`, `content`). |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Tooltip` opens when the trigger is hovered or receives keyboard focus and closes on blur, `Escape`, or an outside press. The popup is visual-only: it is not exposed as a description, and tooltips are not available to touch or screen reader users. The trigger must carry its full accessible name from visible text, `aria-label`, or `aria-labelledby`.

Tooltip content must be short and supplementary. Do not put interactive controls or unique information inside a tooltip, because some users may never open it. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for label and focus guidance.

## Gotchas

- `trigger` is required; `children` is the tooltip content.
- Tooltips are visual-only and not announced as descriptions; icon-only triggers still need `aria-label`.
- Do not put interactive content in a tooltip; use Popover.
- `delay` and `closeDelay` tune timing; `arrow` is optional.
- Tooltips close on blur and Escape.

## Related components

- [Popover](https://xingxingmofashu.github.io/ui/docs/en/components/popover) — For richer content, actions, and non-modal focus.
- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — The usual tooltip trigger.
- [Menu](https://xingxingmofashu.github.io/ui/docs/en/components/menu) — For a list of actions anchored to a trigger.

## Canonical API

- [Tooltip documentation](https://xingxingmofashu.github.io/ui/docs/en/components/tooltip)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

