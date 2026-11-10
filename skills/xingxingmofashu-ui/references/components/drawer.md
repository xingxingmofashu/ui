# Drawer

`Drawer` is an edge-aligned panel with swipe dismissal. It renders the portal, backdrop, popup, title, description, optional body, and a custom action area internally, with optional snap points.

Unlike the centered `Dialog`, `Drawer` slides in from an edge of the screen, which makes it a good fit for mobile settings panels, filters, and side navigation.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for edge-aligned panels, mobile filters, settings, or side navigation.

Canonical: [Drawer documentation](https://xingxingmofashu.github.io/ui/docs/en/components/drawer)

## Import

```tsx
import { Drawer } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Drawer } from "@xingxingmofashu/ui/components/drawer";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Drawer, Switch } from "@xingxingmofashu/ui";

export default function DrawerBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open settings"
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Choose how your workspace behaves for everyone on the team."
        footer={
          <>
            <Button size="sm" label="Cancel" onClick={() => setOpen(false)} />
            <Button
              size="sm"
              label="Save changes"
              onClick={() => setOpen(false)}
            />
          </>
        }
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
          <Switch
            label="Mentions"
            description="Notify you when someone mentions your name."
            defaultChecked
          />
        </div>
      </Drawer>
    </>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Drawer heading. Required. |
| `description` | `ReactNode` | — | Supporting copy under the title. |
| `children` | `ReactNode` | — | Body content between the description and the action area. |
| `footer` | `ReactNode` | — | Bottom action area that can hold any number of controls. |
| `direction` | `"down" \| "up" \| "left" \| "right"` | `"down"` | Edge the drawer slides in from, also used as the swipe dismissal direction. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the drawer opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `modal` | `boolean \| "trap-focus"` | `true` | Controls focus trapping and page scroll locking. |
| `disablePointerDismissal` | `boolean` | `false` | Prevents the backdrop from closing the drawer. |
| `handle` | `DrawerHandle` | — | Associates the drawer with external triggers. |
| `triggerId` | `string \| null` | — | ID of the trigger associated with the drawer. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger used for an initially open drawer. |
| `snapPoints` | `DrawerSnapPoint[]` | — | Snap heights, as viewport fractions, pixel numbers, or `px`/`rem` strings. |
| `snapToSequentialPoints` | `boolean` | `false` | Uses drag distance instead of velocity to choose the next snap point. |
| `snapPoint` | `DrawerSnapPoint \| null` | — | Controlled active snap point. |
| `defaultSnapPoint` | `DrawerSnapPoint \| null` | — | Initial snap point when uncontrolled. |
| `onSnapPointChange` | `(snapPoint: DrawerSnapPoint \| null, details) => void` | — | Called when the active snap point changes. |
| `className` | `ClassValue` | — | Tailwind classes merged into the popup. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ backdrop?: ClassValue; viewport?: ClassValue; popup?: ClassValue; glass?: ClassValue; overlay?: ClassValue; content?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; footer?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-open` | Present when the drawer is open. |
| `data-closed` | Present when the drawer is closed. |
| `data-starting-style` | Present when the drawer begins animating in. |
| `data-ending-style` | Present when the drawer is animating out. |
| `data-expanded` | Present when the drawer is at the expanded snap point. |
| `data-nested` | Present when the drawer is nested within another drawer. |
| `data-nested-drawer-open` | Present when another drawer is open inside this one. |
| `data-nested-drawer-swiping` | Present while a nested drawer is being swiped. |
| `data-swipe-dismiss` | Present when the drawer is dismissed by a swipe. |
| `data-swipe-direction` | Indicates the swipe direction (`up`, `down`, `left`, or `right`). |
| `data-swiping` | Present while the drawer is being swiped. |
| `data-slot` | Marks internal parts (`backdrop`, `viewport`, `popup`, `glass`, `overlay`, `content`, `title`, `description`, `body`, `footer`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Drawer` uses the same dialog semantics as `Dialog`: focus moves into the panel, stays trapped while it is open, and returns to the trigger when it closes. `title` names the panel and `description` describes it.

`Escape`, the backdrop, and the swipe gesture close it; use `disablePointerDismissal` and a visible cancel action when dismissal could lose work. Keep swipe gestures away from horizontally scrollable content. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for overlay focus rules.

## Gotchas

- There is no `trigger` prop; control `open`/`onOpenChange` yourself.
- `direction` also sets the swipe dismissal direction.
- `disablePointerDismissal` prevents backdrop clicks only; Escape and actions still work.
- Keep swipe gestures away from horizontally scrollable content.
- Snap points are intended for top and bottom drawers.

## Related components

- [Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/dialog) — For centered modal content.
- [Alert Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/alert-dialog) — For explicit destructive decisions.
- [Popover](https://xingxingmofashu.github.io/ui/docs/en/components/popover) — For non-modal contextual panels.

## Canonical API

- [Drawer documentation](https://xingxingmofashu.github.io/ui/docs/en/components/drawer)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

