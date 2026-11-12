# Tabs

`Tabs` switches between related panels on the same page. The tab list sits on a shared glass surface, and a translucent lens follows the active tab.

Tabs are passed through the `items` array. Each item's `value` links its tab button to the matching panel, while `content` renders inside that panel. Use `defaultValue` for uncontrolled usage or `value` with `onValueChange` for a controlled component.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to switch between related panels on the same page.

Canonical: [Tabs documentation](https://xingxingmofashu.github.io/ui/docs/en/components/tabs)

## Import

```tsx
import { Tabs } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Tabs } from "@xingxingmofashu/ui/components/tabs";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { CreditCard, UserRound, UsersRound } from "lucide-react";

import { Tabs } from "@xingxingmofashu/ui";

export default function TabsBasicDemo() {
  return (
    <Tabs
      className="w-full max-w-lg"
      aria-label="Account settings"
      defaultValue="profile"
      items={[
        {
          value: "profile",
          label: "Profile",
          icon: <UserRound />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Profile</p>
              <p className="text-sm text-ui-ink/60">
                Update your name, photo, and contact details.
              </p>
            </div>
          ),
        },
        {
          value: "billing",
          label: "Billing",
          icon: <CreditCard />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Billing</p>
              <p className="text-sm text-ui-ink/60">
                Review invoices, payment methods, and billing history.
              </p>
            </div>
          ),
        },
        {
          value: "team",
          label: "Team",
          icon: <UsersRound />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Team</p>
              <p className="text-sm text-ui-ink/60">
                Invite teammates and choose what each person can access.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
```

## API reference

**Tabs**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly TabsItemProps[]` | — | Tabs and panels rendered by the component. |
| `value` | `any` | — | Controlled active value. Use `null` to render no active tab. |
| `defaultValue` | `any` | First enabled item | Initial active value when uncontrolled. |
| `onValueChange` | `(value: any, details) => void` | — | Called when the active value changes. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout and keyboard orientation. |
| `activateOnFocus` | `boolean` | `false` | Activates a tab as arrow-key focus moves. |
| `loopFocus` | `boolean` | `true` | Loops keyboard focus back to the first tab after the last one. |
| `disabled` | `boolean` | `false` | Disables every tab. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Tab height, padding, text, icons, and spacing. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; list?: ClassValue; glass?: ClassValue; overlay?: ClassValue; indicator?: ClassValue; tab?: ClassValue; icon?: ClassValue; label?: ClassValue; panels?: ClassValue; panel?: ClassValue; panelContent?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**TabsItem**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Value that links the tab to its panel. |
| `label` | `ReactNode` | — | Visible label inside the tab. |
| `icon` | `ReactNode` | — | Decorative icon rendered before the label. |
| `content` | `ReactNode` | — | Panel content shown while the tab is active. |
| `keepMounted` | `boolean` | `false` | Keeps the panel in the DOM while another tab is active. |
| `nativeButton` | `boolean` | `true` | Whether the tab renders a native `<button>`. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the tab element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the tab button. Use `ui.panel` for the panel. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ tab?: ClassValue; icon?: ClassValue; label?: ClassValue; panel?: ClassValue; panelContent?: ClassValue }` | — | Tailwind classes for this tab's internal slots, keyed by `data-slot`. |

Root `ui` is merged into every tab and panel first, then the item's `ui`. The item's `className` applies only to the tab button; style the panel through `ui.panel`. Native attributes and `ref` are forwarded to the root and each tab; the list receives `aria-label`, `aria-labelledby`, and `aria-describedby`.

| Attribute | Description |
| --- | --- |
| `data-active` | Present on the active tab. |
| `data-disabled` | Present when the component or tab is disabled. |
| `data-orientation` | Indicates the orientation (`horizontal` or `vertical`). |
| `data-activation-direction` | Indicates the direction of the newly active tab relative to the previous one. |
| `data-hidden` | Present on a mounted panel that is not active. |
| `data-starting-style` | Present when a panel begins animating in. |
| `data-ending-style` | Present when a panel is animating out. |
| `data-slot` | Marks internal parts (`root`, `list`, `glass`, `overlay`, `indicator`, `tab`, `icon`, `label`, `panels`, `panel`, `panel-content`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Tabs` renders a `tablist` of `tab` buttons and linked `tabpanel`s. The active tab exposes `aria-selected`, and each panel is connected with `aria-controls` and `aria-labelledby`.

Arrow keys move focus along the orientation, `Home` and `End` jump to the ends, and `Enter` or `Space` activates the focused tab when `activateOnFocus` is false. Name the tab list with `aria-label` or `aria-labelledby`; icon-only tabs need their own name. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for keyboard details.

## Gotchas

- Pass tabs through `items`; each item's `value` links its tab and panel.
- Name the tab list with `aria-label` or `aria-labelledby`.
- Root `className` targets the component; item `className` targets the tab button, not the panel.
- Use `ui.panel` to style the panel.
- `activateOnFocus` changes whether arrow keys activate a tab or only move focus.

## Related components

- [Accordion](https://xingxingmofashu.github.io/ui/docs/en/components/accordion) — For stacked disclosures without a tab list.
- [Toggle Group](https://xingxingmofashu.github.io/ui/docs/en/components/toggle-group) — For a compact view switch that is not content navigation.
- [Scroll Area](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area) — When a panel needs its own scroll container.

## Canonical API

- [Tabs documentation](https://xingxingmofashu.github.io/ui/docs/en/components/tabs)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

