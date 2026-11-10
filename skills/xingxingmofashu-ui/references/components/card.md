# Card

`Card` is a native layout primitive: it has no interactive state and forwards
its remaining native props to the root `div`. It is server-safe and does not
support the `render` prop. Use `ui` to style the glass layers or any internal
section.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for static or composed content panels; it is server-safe and has no interaction state.

Canonical: [Card documentation](https://xingxingmofashu.github.io/ui/docs/en/components/card)

## Import

```tsx
import { Card } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Card } from "@xingxingmofashu/ui/components/card";
```

## Basic usage

> The example uses `lucide-react` for icons only. Replace it with your icon library or omit the icon props.

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { Button, Card } from "@xingxingmofashu/ui";

export default function CardBasicDemo() {
  return (
    <Card
      className="w-full max-w-md"
      title="Liquid glass"
      description="A CSS-only frosted glass panel."
      footer={
        <Button size="sm" label="View" trailingIcon={<ArrowRight />} />
      }
    >
      <div className="text-sm text-ui-ink/70">
        Place the card over a detailed background to see the glass effect.
      </div>
    </Card>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Card heading, rendered as a `div`. |
| `description` | `ReactNode` | — | Supporting text below the heading. |
| `footer` | `ReactNode` | — | Footer action area. |
| `children` | `ReactNode` | — | Card body content. |
| `className` | `ClassValue` | — | Merged into `root`; use it for layout. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; layout?: ClassValue; header?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; footer?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

Native `<div>` attributes and `ref` are forwarded to the root.

| Attribute | Description |
| --- | --- |
| `data-slot` | Marks internal parts (`root`, `glass`, `overlay`, `layout`, `header`, `title`, `description`, `body`, `footer`) for styling. |


## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

`Card` is a non-interactive container with no role or state of its own. Use a real heading for `title`, or add your own heading inside the body, so the card appears in the document outline.

When the whole card should be clickable, put one link or button in the title instead of adding a click handler to the root. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for label guidance.

## Gotchas

- `title` renders a `div`, not a heading; add a real heading if the card must appear in the document outline.
- Do not attach `onClick` to the root for a clickable card; put a link or button in the title.
- `Card` does not support the `render` prop.
- Use `footer` for actions.

## Related components

- [Accordion](https://xingxingmofashu.github.io/ui/docs/en/components/accordion) — For collapsible groups of content.
- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between card-sized views.
- [Scroll Area](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area) — When card content should scroll independently.

## Canonical API

- [Card documentation](https://xingxingmofashu.github.io/ui/docs/en/components/card)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

