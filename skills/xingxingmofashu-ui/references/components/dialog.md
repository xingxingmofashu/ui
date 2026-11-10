# Dialog

`Dialog` is a general-purpose modal. It renders the portal, backdrop, centered popup, title, description, optional body, and a custom action area internally.

Unlike `AlertDialog`, which always blocks backdrop dismissal, `Dialog` can be dismissed by pressing the backdrop or Escape, and `footer` can render any number and any kind of action buttons.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for general-purpose modal content with a custom footer action area.

Canonical: [Dialog documentation](https://xingxingmofashu.github.io/ui/docs/en/components/dialog)

## Import

```tsx
import { Dialog } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Dialog } from "@xingxingmofashu/ui/components/dialog";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, Switch } from "@xingxingmofashu/ui";

export default function DialogBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open settings"
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Choose how your workspace behaves for everyone on the team."
        footer={
          <>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              size="sm"
              label="Save changes"
              onClick={() => setOpen(false)}
            />
          </>
        }
      >
        <Switch
          label="Email notifications"
          description="Send a summary when a teammate publishes changes."
          defaultChecked
        />
      </Dialog>
    </>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Dialog heading. Required. |
| `description` | `ReactNode` | — | Supporting copy under the title. |
| `children` | `ReactNode` | — | Body content between the description and the action area. |
| `footer` | `ReactNode` | — | Bottom action area that can hold any number of controls. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the dialog opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `modal` | `boolean \| "trap-focus"` | `true` | Controls focus trapping and page scroll locking. |
| `disablePointerDismissal` | `boolean` | `false` | Prevents the backdrop from closing the dialog. |
| `handle` | `DialogHandle` | — | Associates the dialog with external triggers. |
| `triggerId` | `string \| null` | — | ID of the trigger associated with the dialog. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger used for an initially open dialog. |
| `className` | `ClassValue` | — | Tailwind classes merged into the popup. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ backdrop?: ClassValue; viewport?: ClassValue; popup?: ClassValue; glass?: ClassValue; overlay?: ClassValue; content?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; footer?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-open` | Present when the dialog is open. |
| `data-closed` | Present when the dialog is closed. |
| `data-starting-style` | Present when the dialog begins animating in. |
| `data-ending-style` | Present when the dialog is animating out. |
| `data-nested` | Present when the dialog is nested within another dialog. |
| `data-nested-dialog-open` | Present when another dialog is open inside this one. |
| `data-slot` | Marks internal parts (`backdrop`, `viewport`, `popup`, `glass`, `overlay`, `content`, `title`, `description`, `body`, `footer`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Dialog` renders a modal `dialog` named by `title` and described by `description`. Focus moves into the popup, stays trapped while it is open, and returns to the trigger when it closes.

`Escape` and backdrop clicks close it by default. `disablePointerDismissal` stops backdrop clicks only; Escape still closes the dialog. Provide a visible close action in `footer`. `modal={false}` relaxes focus trapping and scroll locking. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for overlay focus rules.

## Gotchas

- There is no `trigger` prop; render your own Button and control `open`/`onOpenChange`.
- Footer buttons do not close the dialog automatically.
- `disablePointerDismissal` prevents backdrop clicks only; Escape still closes.
- `modal={false}` relaxes focus trapping and scroll locking.
- `className` targets the popup, not the page trigger.

## Related components

- [Alert Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/alert-dialog) — For destructive confirmations that must not dismiss on backdrop press.
- [Drawer](https://xingxingmofashu.github.io/ui/docs/en/components/drawer) — For edge-aligned panels and mobile layouts.
- [Popover](https://xingxingmofashu.github.io/ui/docs/en/components/popover) — For compact, non-modal content.

## Canonical API

- [Dialog documentation](https://xingxingmofashu.github.io/ui/docs/en/components/dialog)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

