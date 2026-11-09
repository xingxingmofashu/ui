# Progress

`Progress` renders a linear glass track. It supports determinate values, an indeterminate state, an optional label and description, and a formatted value readout.

The component composes the root, label, value, track, and indicator internally, so you use one component instead of assembling the parts yourself.

> This reference mirrors the English documentation for convenience. If it disagrees with the installed package types or the canonical docs, trust the installed package and the canonical docs.

## When to use

Use to show determinate or indeterminate task progress.

Canonical: [Progress documentation](https://xingxingmofashu.github.io/ui/docs/en/components/progress)

## Import

```tsx
import { Progress } from "@xingxingmofashu/ui";
```

Deep import:

```tsx
import { Progress } from "@xingxingmofashu/ui/components/progress";
```

## Basic usage

```tsx
import { Progress } from "@xingxingmofashu/ui";

export default function ProgressBasic() {
  return (
    <div className="w-full max-w-md">
      <Progress
        label="Exporting data"
        description="You can keep working while the export runs."
        value={64}
      />
    </div>
  );
}
```

## API reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| null` | `null` | Current value. Use `null` for an indeterminate progress bar. |
| `label` | `ReactNode` | — | Visible label for the progress bar. |
| `description` | `ReactNode` | — | Supporting text under the bar. It is linked automatically through `aria-describedby`. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Controls track height, spacing, and text size. |
| `min` | `number` | `0` | The minimum value. |
| `max` | `number` | `100` | The maximum value. |
| `format` | `Intl.NumberFormatOptions` | — | Options used to format the visible value and the default `aria-valuetext`. |
| `locale` | `Intl.LocalesArgument` | — | The locale used by `Intl.NumberFormat`. Defaults to the runtime locale. |
| `getAriaValueText` | `(formattedValue: string, value: number \| null) => string` | — | Returns a human-readable text alternative for the current value. |
| `aria-valuetext` | `string` | — | Overrides the accessible value text. |
| `aria-label` | `string` | — | Accessible name when no visible label is rendered. |
| `aria-labelledby` | `string` | — | ID reference for an external accessible name. |
| `aria-describedby` | `string` | — | ID reference for external supporting text. A visible `description` is merged with this value. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | — | Replaces the rendered root element. |
| `ref` | `Ref<HTMLDivElement>` | — | Ref forwarded to the root element. |
| `className` | `ClassValue` | — | Tailwind classes merged into the root. |
| `style` | `CSSProperties` | — | Inline styles merged into the same element as `className`. |
| `ui` | `{ root?: ClassValue; header?: ClassValue; label?: ClassValue; value?: ClassValue; track?: ClassValue; indicator?: ClassValue; description?: ClassValue }` | — | Tailwind classes for internal slots, keyed by `data-slot`. |

| Attribute | Description |
| --- | --- |
| `data-complete` | Present when the progress has completed. |
| `data-indeterminate` | Present when the progress is indeterminate. |
| `data-progressing` | Present while the progress is progressing. |
| `data-slot` | Marks internal parts (`root`, `header`, `label`, `value`, `track`, `indicator`, `description`) for styling. |

## Styling

`className` targets the primary element described in the API table above. Use `ui` to style internal slots keyed by `data-slot`; the `ui` row lists the available keys. Prefer shared `--ui-glass-*` tokens for material changes instead of overriding colors, blur, or shadows on one component.

`style` merges into the same primary element as `className`. Use it for computed values or per-instance CSS variables.

## Accessibility

A visible `label` gives the progress bar its accessible name. When no visible label is rendered, provide `aria-label` or `aria-labelledby` yourself.

The default `aria-valuetext` is the formatted percentage. Use `getAriaValueText` when the value needs a more meaningful description, such as “7 of 10 files uploaded”.

An indeterminate bar has no `aria-valuenow`; it is announced as indeterminate progress. See the [accessibility guide](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility) for announcement patterns.

## Gotchas

- Use `value={null}` for an indeterminate bar; omitting `value` also defaults to null.
- Provide `label` or `aria-label`/`aria-labelledby`; a bar without a name is not useful to assistive technology.
- `min`/`max` default to 0/100; `value` is a number, not a percentage string.
- Use `getAriaValueText` for meaningful units beyond a percentage.
- `format` affects the visible value and the default accessible value text.

## Related components

- [Toast](https://xingxingmofashu.github.io/ui/docs/en/components/toast) — For transient status messages.
- [Slider](https://xingxingmofashu.github.io/ui/docs/en/components/slider) — For an interactive numeric value.
- [Scroll Area](https://xingxingmofashu.github.io/ui/docs/en/components/scroll-area) — For scroll position rather than task completion.

## Canonical API

- [Progress documentation](https://xingxingmofashu.github.io/ui/docs/en/components/progress)
- [Full documentation (llms-full.txt)](https://xingxingmofashu.github.io/ui/llms-full.txt)
- [Theming guide](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

