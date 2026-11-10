# Menu

`Menu` renders the trigger, portal, positioner, glass popup, list, action items, groups, and separators internally. Selecting an item closes the menu by default and calls its `onSelect` callback.

Items are passed through the `items` array. Use `type: "group"` for a labelled section and `type: "separator"` for a divider. Action items need a unique `value` for React keys. When the visible label is not plain text, pass `textValue` so keyboard typeahead can match it.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a list of actions triggered by a button.

Canonical: [Menu documentation](https://xingxingmofashu.github.io/ui/docs/en/components/menu)

## Import

```tsx
import { Menu } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Menu } from "@xingxingmofashu/ui/components/menu";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { Copy, Download, Link, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, Menu } from "@xingxingmofashu/ui";

export default function MenuBasicDemo() {
  const [lastAction, setLastAction] = useState("No action selected.");

  return (
    <div className="flex flex-col items-start gap-3">
      <Menu
        trigger={<Button>Open menu</Button>}
        items={[
          {
            type: "group",
            label: "Edit",
            items: [
              {
                value: "rename",
                label: "Rename",
                icon: <Pencil />,
                shortcut: "⌘R",
                onSelect: () => setLastAction("Rename selected."),
              },
              {
                value: "duplicate",
                label: "Duplicate",
                icon: <Copy />,
                shortcut: "⌘D",
                onSelect: () => setLastAction("Duplicate selected."),
              },
              {
                value: "copy-link",
                label: "Copy link",
                icon: <Link />,
                onSelect: () => setLastAction("Copy link selected."),
              },
            ],
          },
          { type: "separator" },
          {
            type: "group",
            label: "Danger zone",
            items: [
              {
                value: "download",
                label: "Download",
                icon: <Download />,
                onSelect: () => setLastAction("Download selected."),
              },
              {
                value: "delete",
                label: "Delete",
                icon: <Trash2 />,
                disabled: true,
                onSelect: () => setLastAction("Delete selected."),
              },
            ],
          },
        ]}
      />
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        {lastAction}
      </p>
    </div>
  );
}
```

## API reference

**Menu**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `ReactElement` | — | Element that opens the menu. Required. It must forward props and refs. |
| `items` | `readonly (MenuItemProps \| MenuGroupProps \| MenuSeparatorProps)[]` | — | Action items, groups, and separators rendered by the menu. |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment relative to the trigger. |
| `sideOffset` | `number \| OffsetFunction` | `8` | Distance between the trigger and menu in pixels. |
| `alignOffset` | `number \| OffsetFunction` | `0` | Offset along the alignment axis in pixels. |
| `collisionPadding` | `Padding` | `5px per side` | Space kept between the popup and the collision boundary. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the menu opens or closes. |
| `onOpenChangeComplete` | `(open: boolean) => void` | — | Called after the open or close animation finishes. |
| `modal` | `boolean` | `true` | Locks outside interaction while the menu is open. |
| `loopFocus` | `boolean` | `true` | Loops keyboard focus through the items. |
| `highlightItemOnHover` | `boolean` | `true` | Highlights items when the pointer moves over them. |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Roving focus axis used by the arrow keys. |
| `closeParentOnEsc` | `boolean` | `false` | In a nested menu, closes the whole menu on Escape instead of only the child menu. |
| `onItemHighlighted` | `(item: HTMLElement \| undefined, details) => void` | — | Called when the highlighted item changes. |
| `disabled` | `boolean` | `false` | Prevents the menu from opening. |
| `handle` | `Menu.Handle<Payload>` | — | Handle that lets external triggers control the menu. |
| `triggerId` | `string \| null` | — | ID of the trigger for a controlled menu. |
| `defaultTriggerId` | `string \| null` | — | ID of the trigger for an initially open menu. |
| `className` | `ClassValue` | — | Tailwind classes merged into the popup. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ positioner?: ClassValue; popup?: ClassValue; glass?: ClassValue; overlay?: ClassValue; list?: ClassValue; item?: ClassValue; itemIcon?: ClassValue; itemLabel?: ClassValue; shortcut?: ClassValue; group?: ClassValue; groupLabel?: ClassValue; separator?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**MenuItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"item"` | — | Marks the entry as an action item. Optional when the entry has no group or separator type. |
| `value` | `string` | — | Unique value used as the React key for this item. Required. |
| `label` | `ReactNode` | — | Visible content inside the item. Required. |
| `textValue` | `string` | — | Plain-text label used for keyboard typeahead. Defaults to a string label. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `shortcut` | `ReactNode` | — | Shortcut hint rendered after the label. It is visual only. |
| `onSelect` | `(event) => void` | — | Called when the item is selected. |
| `disabled` | `boolean` | `false` | Disables the item. |
| `closeOnClick` | `boolean` | `true` | Whether selecting the item closes the menu. |
| `nativeButton` | `boolean` | `false` | Whether the rendered element is a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the item element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the item. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; itemIcon?: ClassValue; itemLabel?: ClassValue; shortcut?: ClassValue }` | — | Tailwind classes for this item's slots. |

**MenuGroupProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"group"` | — | Marks the entry as a group. Required. |
| `label` | `ReactNode` | — | Group heading. Required. |
| `items` | `readonly MenuItemProps[]` | — | Items rendered inside the group. Required. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the group element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the group. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ group?: ClassValue; groupLabel?: ClassValue; item?: ClassValue; itemIcon?: ClassValue; itemLabel?: ClassValue; shortcut?: ClassValue }` | — | Tailwind classes for the group and its item slots. |

**MenuSeparatorProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"separator"` | — | Marks the entry as a separator. Required. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the separator element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the separator. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ separator?: ClassValue }` | — | Tailwind classes for the separator slot. |

`ui` keys map to the `data-slot` values listed below. Native attributes and `ref` are forwarded to the root, each item, group, and separator.

| Attribute | Description |
| --- | --- |
| `data-open` | Present on the popup when the menu is open. |
| `data-closed` | Present on the popup while it is closed or closing. |
| `data-highlighted` | Present on the keyboard- or pointer-highlighted item. |
| `data-disabled` | Present when the menu or an item is disabled. |
| `data-popup-open` | Present on the trigger while the menu is open. |
| `data-side` | Indicates the resolved side of the popup. |
| `data-align` | Indicates the resolved alignment (`start`, `center`, or `end`). |
| `data-instant` | Present when animations should be skipped. |
| `data-starting-style` | Present when the popup begins animating in. |
| `data-ending-style` | Present when the popup is animating out. |
| `data-slot` | Marks internal parts (`positioner`, `popup`, `glass`, `overlay`, `list`, `item`, `item-icon`, `item-label`, `shortcut`, `group`, `group-label`, `separator`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Menu` follows the menu-button pattern: the trigger exposes `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`; the inner list carries `role="menu"`, and each action is a `menuitem`. `ArrowDown` and `ArrowUp` move through enabled items, and typeahead matches item labels. `Enter` or `Space` activates the highlighted item, and `Escape` closes the menu and returns focus to the trigger.

Disabled items stay announced but cannot be activated. `value` is only the React key. When `label` is not plain text, pass `textValue` so typeahead has a readable label, and pass `aria-label` or `aria-labelledby` when the item also needs an accessible name. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for the shared interaction patterns.

## Gotchas

- `trigger` is required and must forward props and refs; a Button works.
- Pass actions through `items`; each action needs a unique `value`.
- Use `type: "group"` and `type: "separator"` for structure.
- Selecting an item closes the menu by default; set `closeOnClick: false` to keep it open.
- `value` is the React key, not a form value.
- Pass `textValue` when the visible label is not plain text.

## Related components

- [Button](https://xingxingmofashu.github.io/ui/docs/en/components/button) — The usual menu trigger and the action style used inside items.
- [Popover](https://xingxingmofashu.github.io/ui/docs/en/components/popover) — For richer content that needs a title, body, and actions.
- [Select](https://xingxingmofashu.github.io/ui/docs/en/components/select) — For choosing one option from a list instead of running an action.

## Canonical API

- [Menu documentation](https://xingxingmofashu.github.io/ui/docs/en/components/menu)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

