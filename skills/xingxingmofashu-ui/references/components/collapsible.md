# Collapsible

`Collapsible` renders one disclosure panel on a glass surface. The trigger is a real button, and the panel animates its height when it opens.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a single expandable section, such as shipping details or advanced settings. Use `Accordion` when several disclosures share one surface.

Canonical: [Collapsible documentation](https://xingxingmofashu.github.io/ui/docs/en/components/collapsible)

## Import

```tsx
import { Collapsible } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Collapsible } from "@xingxingmofashu/ui/components/collapsible";
```

## Basic usage

```tsx
"use client";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleBasicDemo() {
  return (
    <Collapsible className="w-full max-w-md" trigger="Shipping details">
      Standard shipping takes 3-5 business days. Express delivery arrives in
      1-2 business days.
    </Collapsible>
  );
}
```

## API reference

**Collapsible**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `ReactNode` | — | Required visible label inside the trigger. |
| `children` | `ReactNode` | — | Panel content revealed by the trigger. |
| `indicator` | `ReactNode \| false` | Built-in plus icon | Replaces the default indicator with decorative content. Set to `false` to hide it. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initially open state when uncontrolled. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the panel opens or closes. |
| `disabled` | `boolean` | `false` | Ignores pointer and keyboard interaction. |
| `keepMounted` | `boolean` | `false` | Keeps the closed panel mounted in the DOM. |
| `hiddenUntilFound` | `boolean` | `false` | Keeps the closed panel searchable with `hidden="until-found"`. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls trigger height, padding, text, and the indicator. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; content?: ClassValue; trigger?: ClassValue; title?: ClassValue; indicator?: ClassValue; indicatorIcon?: ClassValue; panel?: ClassValue; panelContent?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

Native `<div>` attributes and `ref` are forwarded to the root.

| Attribute | Description |
| --- | --- |
| `aria-controls` | Set on the trigger while the panel is open. |
| `aria-expanded` | Reports whether the panel is open. |
| `data-open` | Present on the root and panel when open. |
| `data-closed` | Present on the root and panel when closed. |
| `data-panel-open` | Present on the trigger while the panel is open. |
| `data-disabled` | Present when the collapsible is disabled. |
| `data-starting-style` | Present when the panel begins animating in. |
| `data-ending-style` | Present when the panel is animating out. |
| `data-slot` | Marks internal parts (`root`, `glass`, `overlay`, `content`, `trigger`, `title`, `indicator`, `indicator-icon`, `panel`, `panel-content`). |

## Styling

`className` targets the root. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

The component theme defines these geometry values: `--ui-collapsible-trigger-height`, `--ui-collapsible-trigger-px`, `--ui-collapsible-trigger-py`, `--ui-collapsible-font-size`, `--ui-collapsible-indicator-size`, `--ui-collapsible-icon-size`, `--ui-collapsible-panel-px`, `--ui-collapsible-panel-pb`, and `--ui-collapsible-panel-font-size`. They are internal; adjust them through the `ui.trigger` / `ui.panel` classes (for example with arbitrary CSS variables) instead of editing package source.

## Accessibility

The trigger is a native `<button>` that exposes `aria-expanded` and, while open, `aria-controls` pointing at the panel. `Enter` and `Space` toggle the focused trigger. Disabled triggers stay in the document but are skipped by the Tab key. The accessible name comes from the `trigger` content, so keep a meaningful text label; for an icon-only trigger, include visually hidden text inside `trigger`. ARIA label props passed to `Collapsible` target the root wrapper, not the button.

The panel is a plain `<div>` without a landmark role. Wrap long expanded content in a `<section>` with an `aria-labelledby` when it needs landmark navigation. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for shared interaction patterns.

## Gotchas

- Pass the panel content through `children`; the trigger label is the `trigger` prop, not children.
- Closed panels unmount by default. Use `keepMounted` for form state, or `hiddenUntilFound` for find-in-page.
- `indicator={false}` removes the trailing indicator entirely; the trigger still keeps its full clickable width.
- Wrap several related disclosures in `Accordion` instead of stacking `Collapsible` components, so they share one glass surface.

## Related components

- [Accordion](https://xingxingmofashu.github.io/ui/docs/en/components/accordion) — For several disclosure panels that share one glass surface.
- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between sibling views instead of expanding one.
- [Toggle](https://xingxingmofashu.github.io/ui/docs/en/components/toggle) — For a single on/off action without a panel.

## Canonical API

- [Collapsible documentation](https://xingxingmofashu.github.io/ui/docs/en/components/collapsible)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
