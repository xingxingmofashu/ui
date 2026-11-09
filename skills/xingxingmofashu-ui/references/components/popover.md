# Popover

`Popover` renders the trigger, portal, positioner, glass popup, directional arrow, title, description, optional body, and optional action area internally. The arrow follows the resolved side of the popup automatically; set `arrow={false}` to hide it.

Unlike `Dialog` and `Drawer`, `Popover` is non-modal by default: focus is not trapped, the page stays scrollable, and pressing outside or Escape closes it. Use it for compact settings, contextual actions, and filters.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for non-modal contextual panels anchored to a trigger.

Canonical: [Popover documentation](https://xingxingmofashu.github.io/ui/docs/en/components/popover)

## Import

```tsx
import { Popover } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Popover } from "@xingxingmofashu/ui/components/popover";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Settings } from "lucide-react";

import { Button, Popover, Switch } from "@xingxingmofashu/ui";

export default function PopoverBasicDemo() {
  return (
    <Popover
      trigger={<Button label="Open settings" leadingIcon={<Settings />} />}
      title="Workspace settings"
      description="Changes apply to everyone on the team."
    >
      <div className="flex flex-col gap-4">
        <Switch
          label="Email notifications"
          description="Send a summary when a teammate publishes changes."
          defaultChecked
        />
        <Switch
          label="Weekly digest"
          description="Email the team every Monday morning."
        />
      </div>
    </Popover>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | — | Element that opens the popover. Required. It must forward props and refs. |
| `title` | `ReactNode` | — | Popover heading. Required. |
| `description` | `ReactNode` | — | Supporting copy under the title. |
| `children` | `ReactNode` | — | Body content between the description and the action area. |
| `footer` | `ReactNode` | — | Bottom action area that can hold any number of controls. |
| `arrow` | `boolean` | `true` | Whether to render the directional arrow. |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to the trigger. |
| `sideOffset` | `number \| OffsetFunction` | `10` | Distance between the trigger and the popup in pixels. |
| `alignOffset` | `number \| OffsetFunction` | `0` | Offset along the alignment axis in pixels. |
| `collisionPadding` | `Padding` | `5px per side` | Space kept between the popup and the collision boundary. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the popover opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `modal` | `boolean \| "trap-focus"` | `false` | `true` locks page scroll and blocks outside interaction; `"trap-focus"` leaves scroll and outside interaction enabled. Neither traps focus because the component does not render a `Popover.Close` part. |
| `actionsRef` | `RefObject<Actions \| null>` | — | Imperative `close` and `unmount` actions. |
| `handle` | `PopoverHandle` | — | Associates the popover with external triggers. |
| `triggerId` | `string \| null` | — | ID of the trigger associated with the popover. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger used for an initially open popover. |
| `className` | `string` | — | Tailwind classes merged into the popup. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ positioner?: ClassValue; popup?: ClassValue; glass?: ClassValue; overlay?: ClassValue; arrow?: ClassValue; content?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; footer?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-open` | Present when the popup is open. |
| `data-closed` | Present when the popup is closed. |
| `data-starting-style` | Present when the popup begins animating in. |
| `data-ending-style` | Present when the popup is animating out. |
| `data-side` | Indicates the resolved side (`top`, `bottom`, `left`, `right`, `inline-start`, or `inline-end`). |
| `data-align` | Indicates the resolved alignment (`start`, `center`, or `end`). |
| `data-instant` | Present when animations should be skipped (`click`, `dismiss`, `focus`, or `trigger-change`). |
| `data-anchor-hidden` | Present when the anchor is hidden. |
| `data-uncentered` | Present when the arrow is uncentered. |
| `data-popup-open` | Present on the trigger while the popup is open. |
| `data-pressed` | Present while the trigger is pressed. |
| `data-slot` | Marks internal parts (`positioner`, `popup`, `glass`, `overlay`, `arrow`, `content`, `title`, `description`, `body`, `footer`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Popover` adds `aria-haspopup="dialog"` and `aria-expanded` to the trigger and renders a popup named by `title` and described by `description`.

It is non-modal by default: focus is not trapped, the page stays scrollable, and `Escape` or an outside press closes it. Provide a visible close or done action when the popup changes settings. The `modal` prop cannot enable focus trapping with this wrapper: Base UI only does that when a `Popover.Close` part is rendered, and the component does not render one. `modal={true}` still locks page scroll and blocks outside interaction. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for focus rules.

## Gotchas

- `trigger` and `title` are required.
- Popover is non-modal: focus is not trapped and the page stays scrollable. Use Dialog for multi-step flows.
- Control it with `open`/`onOpenChange` when needed.
- `footer` is for actions; `children` is the body.
- `className` targets the popup.

## Related components

- [Tooltip](https://xingxingmofashu.github.io/ui/docs/en/components/tooltip) — For a short, non-interactive hint.
- [Menu](https://xingxingmofashu.github.io/ui/docs/en/components/menu) — For a list of actions.
- [Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/dialog) — For modal content that needs focus trapping.

## Canonical API

- [Popover documentation](https://xingxingmofashu.github.io/ui/docs/en/components/popover)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

