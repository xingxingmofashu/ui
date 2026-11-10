# Accordion

`Accordion` renders a stack of disclosure panels on one glass surface. Each entry is a real heading and button, and the panel height animates when it opens.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for FAQs, settings sections, or any set of disclosure panels that share one glass surface.

Canonical: [Accordion documentation](https://xingxingmofashu.github.io/ui/docs/en/components/accordion)

## Import

```tsx
import { Accordion } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Accordion } from "@xingxingmofashu/ui/components/accordion";
```

## Basic usage

```tsx
"use client";

import { Accordion } from "@xingxingmofashu/ui";

export default function AccordionBasicDemo() {
  return (
    <Accordion
      className="w-full max-w-md"
      defaultValue={["shipping"]}
      items={[
        {
          value: "shipping",
          title: "How long does shipping take?",
          content:
            "Standard shipping takes 3-5 business days. Express delivery arrives in 1-2 business days.",
        },
        {
          value: "returns",
          title: "What is your return policy?",
          content:
            "You can return any item within 30 days of delivery. Opened items may be subject to a restocking fee.",
        },
        {
          value: "tracking",
          title: "How can I track my order?",
          content:
            "Once your order ships, you will receive a tracking link by email. Tracking updates can take up to 24 hours to appear.",
        },
      ]}
    />
  );
}
```

## API reference

**Accordion**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly AccordionItemProps[]` | — | Panels rendered inside the accordion. |
| `value` | `Value[]` | — | Controlled expanded item values. |
| `defaultValue` | `Value[]` | `[]` | Initially expanded item values. |
| `onValueChange` | `(value: Value[], details) => void` | — | Called when the expanded values change. |
| `multiple` | `boolean` | `false` | Allows more than one panel to stay open. |
| `disabled` | `boolean` | `false` | Disables every trigger. |
| `hiddenUntilFound` | `boolean` | `false` | Keeps closed panels searchable with `hidden="until-found"`. |
| `keepMounted` | `boolean` | `false` | Keeps closed panels mounted in the DOM. |
| `loopFocus` | `boolean` | — | Deprecated. No longer affects keyboard focus. |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Deprecated. No longer affects keyboard focus. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls trigger height, padding, text, and the indicator. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; content?: ClassValue; item?: ClassValue; header?: ClassValue; trigger?: ClassValue; title?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; panel?: ClassValue; panelContent?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

**AccordionItemProps**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Required identifier used by the accordion value. |
| `title` | `ReactNode` | — | Required visible heading inside the trigger. |
| `content` | `ReactNode` | — | Panel content. |
| `indicator` | `ReactNode \| false` | Built-in plus icon | Replaces the default indicator. Set to `false` to hide it. |
| `disabled` | `boolean` | `false` | Disables this item. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when this panel opens or closes. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the item root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the item root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ item?: ClassValue; header?: ClassValue; trigger?: ClassValue; title?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; panel?: ClassValue; panelContent?: ClassValue }` | — | Tailwind classes for this item's internal slots, keyed by `data-slot`. |

Root `ui` is merged into every item first, then the item's `ui`, then the item's `className`.

Native `<div>` attributes and `ref` are forwarded to the root and to each item root.

| Attribute | Description |
| --- | --- |
| `data-disabled` | Present when the accordion or an item is disabled. |
| `data-orientation` | Indicates the orientation (`horizontal` or `vertical`). |
| `data-index` | Indicates the item index on item and trigger elements. |
| `data-open` | Present when an item is open. |
| `data-panel-open` | Present on a trigger while its panel is open. |
| `data-starting-style` | Present when a panel begins animating in. |
| `data-ending-style` | Present when a panel is animating out. |
| `data-slot` | Marks internal parts (`root`, `glass`, `overlay`, `content`, `item`, `header`, `trigger`, `title`, `indicator`, `indicator-icon`, `panel`, `panel-content`). |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

Each entry renders a native button inside a real heading (an `<h3>` by default). The trigger exposes `aria-expanded`; while its panel is open, it also exposes `aria-controls`. The panel is labelled by its trigger. `Enter` or `Space` toggles the focused panel. Disabled triggers stay in the document but are skipped by the Tab key.

Keep the heading text meaningful; the visual style is not a substitute for a real document outline. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for shared interaction patterns.

## Gotchas

- Pass panels through `items`, not children. Each item needs a unique `value` and a `title`.
- Use `multiple` when more than one panel may stay open; the default allows one.
- `loopFocus` and `orientation` are deprecated and no longer affect keyboard focus.
- Root `ui` merges before item `ui`, then item `className`.

## Related components

- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between sibling views instead of stacking disclosures.
- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For a single on/off action without a panel.
- [Scroll Area](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area) — When an expanded panel needs its own scroll container.

## Canonical API

- [Accordion documentation](https://xingxingmofashu.github.io/ui/docs/en/components/accordion)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

