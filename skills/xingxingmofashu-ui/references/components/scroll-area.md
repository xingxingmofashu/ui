# Scroll Area

`ScrollArea` renders the glass panel, native scroll viewport, content container, and custom scrollbars internally.

Native scrollbars are hidden. The themed scrollbars stay subtle at rest and brighten while the pointer is over the area or the viewport is scrolling. They only render when the content actually overflows.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use for a glass panel with native scrolling and custom scrollbars.

Canonical: [Scroll Area documentation](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area)

## Import

```tsx
import { ScrollArea } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { ScrollArea } from "@xingxingmofashu/ui/components/scroll-area";
```

## Basic usage

```tsx
"use client";

import { ScrollArea } from "@xingxingmofashu/ui";

const activity = [
  {
    time: "09:12",
    title: "Design review scheduled",
    detail: "Maya added the component audit to Thursday's agenda.",
  },
  {
    time: "08:47",
    title: "Release notes drafted",
    detail: "The 2.4.0 notes now cover all twelve shipped components.",
  },
  {
    time: "08:20",
    title: "Playground deployed",
    detail: "The light and dark previews are available on the staging site.",
  },
  {
    time: "Yesterday",
    title: "Glass tokens updated",
    detail: "Rim contrast now follows the active light or dark theme.",
  },
  {
    time: "Yesterday",
    title: "Accessibility pass",
    detail: "Every scrollable viewport now receives a visible focus ring.",
  },
  {
    time: "Monday",
    title: "New contributors",
    detail: "Two engineers joined the interface team for the next cycle.",
  },
];

export default function ScrollAreaBasicDemo() {
  return (
    <ScrollArea
      aria-label="Recent activity"
      className="h-72 w-full max-w-md"
    >
      <div className="flex flex-col gap-3 p-4">
        {activity.map((item) => (
          <article
            key={`${item.time}-${item.title}`}
            className="rounded-2xl border border-ui-glass-border bg-ui-glass-surface p-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ui-ink/50">
              {item.time}
            </p>
            <h3 className="mt-1 text-sm font-medium text-ui-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-ui-ink/65">
              {item.detail}
            </p>
          </article>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Scrollable content rendered inside the viewport. |
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Scrollbar axes to render. |
| `overflowEdgeThreshold` | `number \| Partial<{ xStart: number; xEnd: number; yStart: number; yEnd: number }>` | `0` | Distance in pixels before an edge is marked as overflowing. |
| `aria-label` | `string` | — | Accessible name forwarded to the scrollable viewport. |
| `aria-labelledby` | `string` | — | ID of an element that labels the viewport. |
| `aria-describedby` | `string` | — | ID of an element that describes the viewport. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the root element. |
| `ref` | `Ref<HTMLDivElement>` | — | Ref forwarded to the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the root. Set the height here. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; glass?: ClassValue; overlay?: ClassValue; viewport?: ClassValue; content?: ClassValue; scrollbar?: ClassValue; thumb?: ClassValue; corner?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-orientation` | Indicates the enabled scrollbar axes (`horizontal`, `vertical`, or `both`). |
| `data-scrolling` | Present while the user scrolls inside the area. |
| `data-has-overflow-x` | Present when content is wider than the viewport. |
| `data-has-overflow-y` | Present when content is taller than the viewport. |
| `data-overflow-x-start` | Present when there is horizontal overflow on the start side. |
| `data-overflow-x-end` | Present when there is horizontal overflow on the end side. |
| `data-overflow-y-start` | Present when there is vertical overflow on the start side. |
| `data-overflow-y-end` | Present when there is vertical overflow on the end side. |
| `data-hovering` | Present on a scrollbar while the pointer is over the area. |
| `data-slot` | Marks internal parts (`root`, `glass`, `overlay`, `viewport`, `content`, `scrollbar`, `thumb`, `corner`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

The viewport is focusable only while it can scroll, matching native scroll-container behavior. Pass `aria-label` or `aria-labelledby` to name the region, and `aria-describedby` for extra instructions.

Pointer and keyboard scrolling stay native, while the custom scrollbars remain decorative and hidden from assistive technology. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for region naming.

## Gotchas

- Set an explicit height or max-height on `className`; otherwise there is nothing to scroll.
- `orientation` controls which scrollbars render: `vertical`, `horizontal`, or `both`.
- Custom scrollbars are decorative and hidden from assistive technology.
- Name the scroll region with `aria-label` or `aria-labelledby`.
- Native wheel, trackpad, and keyboard scrolling are preserved.

## Related components

- [Card](https://xingxingmofashu.github.io/ui/docs/en/components/card) — A static panel for content that fits.
- [Tabs](https://xingxingmofashu.github.io/ui/docs/en/components/tabs) — For switching between views.
- [Drawer](https://xingxingmofashu.github.io/ui/docs/en/components/drawer) — For an edge panel with its own scrolling.

## Canonical API

- [Scroll Area documentation](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

