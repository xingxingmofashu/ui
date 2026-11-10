# Toast

`ToastProvider` supplies the toast manager. Render `Toast` inside it to draw the portal, viewport, and Liquid Glass stack; call `useToast()` anywhere inside the provider to add, update, close, or track notifications.

Render one `ToastProvider` near the app root and place `Toast` after your app content. Each provider owns a separate viewport, so pass the same `toastManager` to it when you also create toasts outside React.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for transient notifications, actions, and promise status.

Canonical: [Toast documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toast)

## Import

```tsx
import { Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Toast, ToastProvider } from "@xingxingmofashu/ui/components/toast";
import { useToast } from "@xingxingmofashu/ui/composables/use-toast";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Bell } from "lucide-react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastTrigger() {
  const toast = useToast();

  return (
    <Button
      label="Show notification"
      leadingIcon={<Bell />}
      onClick={() =>
        toast.add({
          title: "Changes saved",
          description: "Your workspace settings were updated for everyone.",
        })
      }
    />
  );
}

export default function ToastBasicDemo() {
  return (
    <ToastProvider>
      <ToastTrigger />
      <Toast />
    </ToastProvider>
  );
}
```

## API reference

**ToastProvider**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | App content that can call `useToast()`. |
| `timeout` | `number` | `5000` | Default auto-dismiss delay in milliseconds; `0` keeps toasts open. |
| `limit` | `number` | `3` | Maximum number of visible toasts. Older toasts stay mounted with `data-limited`. |
| `toastManager` | `ToastManager` | — | Global manager created with `createToastManager`. |

**Toast**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-right"` | Corner where the stack is anchored. |
| `close` | `ReactNode` | Built-in close button | Custom content rendered in place of the default close button. |
| `className` | `ClassValue` | — | Tailwind classes merged into each toast. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ viewport?: ClassValue; root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; content?: ClassValue; icon?: ClassValue; text?: ClassValue; title?: ClassValue; description?: ClassValue; actions?: ClassValue; action?: ClassValue; close?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces each toast root element. |

Native attributes and `ref` are forwarded to each toast root.

**useToast**

| Method | Description |
| --- | --- |
| `add(options)` | Adds a toast and returns its ID. |
| `update(id, options)` | Updates an existing toast. |
| `close(id?)` | Closes one toast, or every toast when `id` is omitted. |
| `promise(promise, options)` | Tracks a promise with `loading`, `success`, and `error` options. |
| `toasts` | The current toast objects. |

**Toast options**

`add` accepts these fields. `update` accepts `ToastUpdateOptions`, a partial version without `id`, and `promise` uses the same update options for its `loading`, `success`, and `error` states. Below, `ToastOptions` means the add options and `ToastUpdateOptions` means `Partial<Omit<ToastOptions, "id">>`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | generated | Stable identifier for `add`. Adding an existing ID updates that toast in place; `update` and `promise` do not accept `id`. |
| `title` | `ReactNode` | — | Toast heading. |
| `description` | `ReactNode` | — | Supporting copy under the title. |
| `type` | `string` | — | Status icon: `info`, `success`, `warning`, `error`, or `loading`. |
| `timeout` | `number` | `5000` | Auto-dismiss delay in milliseconds; `0` keeps the toast open. |
| `priority` | `"low" \| "high"` | `"low"` | Polite or assertive announcement. |
| `actionProps` | `ComponentPropsWithoutRef<"button">` | — | Action button props, including `children` and `onClick`. |
| `onClose` | `() => void` | — | Called when the toast closes. |
| `onRemove` | `() => void` | — | Called after the toast is removed from the list. |
| `data` | `object` | — | Custom payload attached to the toast object. |

**Promise options**

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `string \| ToastUpdateOptions` | — | Toast shown while the promise is pending. |
| `success` | `string \| ToastUpdateOptions \| ((value) => string \| ToastUpdateOptions)` | — | Toast shown when the promise resolves. |
| `error` | `string \| ToastUpdateOptions \| ((error) => string \| ToastUpdateOptions)` | — | Toast shown when the promise rejects. |

**createToastManager**

`createToastManager()` returns a manager with the same `add`, `update`, `close`, and `promise` methods as `useToast()`. It does not expose the current `toasts` list; read that with `useToast()` inside React. Use the manager when code outside React needs to create toasts, and pass the instance to `ToastProvider` through `toastManager`.

**Toast attributes**

| Attribute | Description |
| --- | --- |
| `data-expanded` | Present when the toast is expanded in the viewport. |
| `data-limited` | Present when the toast was limited because the limit was exceeded. |
| `data-type` | Indicates the toast type (`info`, `success`, `warning`, `error`, or `loading`). |
| `data-swiping` | Present while the toast is being swiped. |
| `data-swipe-direction` | Indicates the swipe direction (`up`, `down`, `left`, or `right`). |
| `data-starting-style` | Present when the toast begins animating in. |
| `data-ending-style` | Present when the toast is animating out. |
| `data-behind` | Present when the toast is behind the frontmost toast in the stack. |
| `data-position` | Indicates the anchored corner on the viewport. |
| `data-icon` | Indicates the status icon type on the icon slot. |
| `data-slot` | Marks internal parts (`viewport`, `root`, `glass`, `overlay`, `content`, `icon`, `text`, `title`, `description`, `actions`, `action`, `close`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

The viewport is a live region. High-priority toasts use an `alertdialog` role and the rest use a `dialog` role; titles and descriptions are connected with `aria-labelledby` and `aria-describedby`.

The stack supports F6 focus entry plus swipe dismissal, and timers pause while the viewport is hovered or focused. When you replace the default close button, give your `close` control an accessible name. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for announcement guidance.

## Gotchas

- Render `ToastProvider` near the app root and `<Toast />` after the app content.
- Call `useToast()` only inside the provider.
- `add` returns an ID; use `update` and `close` for the same toast.
- Actions do not close the toast automatically; call `close` in the action handler.
- `timeout={0}` keeps a toast open; `limit` controls the visible stack.
- Use `createToastManager` for code outside React and pass it to `toastManager`.

## Related components

- [Progress](https://xingxingmofashu.github.io/ui/docs/en/components/progress) — For visible task completion instead of a transient message.
- [Alert Dialog](https://xingxingmofashu.github.io/ui/docs/en/components/alert-dialog) — When the user must stop and decide.
- [Tooltip](https://xingxingmofashu.github.io/ui/docs/en/components/tooltip) — For passive hints attached to a control.

## Canonical API

- [Toast documentation](https://xingxingmofashu.github.io/ui/docs/en/components/toast)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

