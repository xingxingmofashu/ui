# Alert Dialog

`AlertDialog` is an accessible modal confirmation component. It renders the portal, backdrop, centered popup, title, description, optional body, and fixed cancel and confirm actions internally.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for destructive or irreversible confirmations that need explicit cancel and confirm actions.

Canonical: [Alert Dialog documentation](https://xingxingmofashu.github.io/ui/docs/en/components/alert-dialog)

## Import

```tsx
import { AlertDialog } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { AlertDialog } from "@xingxingmofashu/ui/components/alert-dialog";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Delete project"
        leadingIcon={<Trash2 />}
        onClick={() => setOpen(true)}
      />

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone. All files, deployments, and environment variables will be permanently removed."
        confirmLabel="Delete project"
        cancelLabel="Cancel"
      />
    </>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Dialog heading. Required. |
| `description` | `ReactNode` | — | Supporting copy under the title. |
| `children` | `ReactNode` | — | Extra content between the description and the action buttons. |
| `cancelLabel` | `ReactNode` | `"Cancel"` | Cancel button label. |
| `confirmLabel` | `ReactNode` | `"Confirm"` | Confirm button label. |
| `onCancel` | `MouseEventHandler<HTMLButtonElement>` | — | Called when the cancel button is pressed. |
| `onConfirm` | `MouseEventHandler<HTMLButtonElement>` | — | Called when the confirm button is pressed. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the dialog opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `actionsRef` | `RefObject<Actions \| null>` | — | Imperative `close` and `unmount` actions. |
| `handle` | `AlertDialogHandle` | — | Associates the dialog with external triggers. |
| `triggerId` | `string \| null` | — | ID of the trigger associated with the dialog. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger used for an initially open dialog. |
| `className` | `string` | — | Tailwind classes merged into the popup. |
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

`AlertDialog` renders a modal `alertdialog` named by `title` and described by `description`. Focus moves into the popup, stays trapped while it is open, and returns to the trigger when it closes.

Escape closes the dialog without calling `onCancel` or `onConfirm`; guard the flow in `onOpenChange` when Escape must not dismiss it. The backdrop never closes an alert dialog, so keep the cancel action visible. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for overlay focus rules.

## Gotchas

- There is no `trigger` prop. Render your own Button and control `open`/`onOpenChange`.
- Escape closes the dialog without calling `onCancel` or `onConfirm`; guard destructive flows in `onOpenChange`.
- The backdrop never dismisses an alert dialog; keep the cancel action visible.
- `onConfirm` does not close the dialog automatically; close it when the action succeeds.

## Related components

- [Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/dialog) — For general-purpose modal content that can be dismissed more freely.
- [Drawer](https://xingxingmofashu.github.io/ui/docs/en/components/drawer) — For edge-aligned panels on small screens.
- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — The action style rendered in the footer.

## Canonical API

- [Alert Dialog documentation](https://xingxingmofashu.github.io/ui/docs/en/components/alert-dialog)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

