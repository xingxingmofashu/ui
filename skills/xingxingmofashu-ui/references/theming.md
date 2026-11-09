# Theming

The core stylesheet contains the design tokens, the shared glass material, and
the Tailwind source scan. Import it once in the global CSS, then customize at
the token layer or through the component slots.

```css
@import "tailwindcss";
@import "@xingxingmofashu/ui";
```

## Light and dark

Tokens switch through `.light` / `.dark` classes or
`data-theme="light"` / `data-theme="dark"` attributes. Light is the default even
when no selector is present.

```html
<html class="dark">
```

```html
<html data-theme="dark">
```

The mechanisms are interchangeable. A nested `.light` or
`[data-theme="light"]` subtree switches back to light tokens inside a dark
document. Set the theme before the first paint to avoid a flash and hydration
mismatch.

The package exposes `ui-light` and `ui-dark` Tailwind variants that mirror these
selectors. If the app uses Tailwind `dark:` utilities, register the class-based
variant shown in [Installation](installation.md).

## Token layers

Runtime tokens change with the theme:

- `--ui-ink` and `--ui-ink-active`
- `--ui-surface`
- `--ui-glass-surface` and `--ui-glass-overlay-surface`
- `--ui-glass-border`, `--ui-glass-highlight`, `--ui-glass-rim`
- `--ui-glass-focus`, `--ui-glass-inner-border`
- `--ui-glass-tone` and `--ui-glass-contrast`
- `--ui-shadow-glass` and `--ui-drop-shadow-label`

Shared geometry and optics stay stable across themes:

- `--ui-glass-blur` and `--ui-glass-saturate`
- `--ui-glass-inner-inset` and `--ui-glass-rim-inset`
- the other shared `--ui-glass-*` parameters

The package defines tokens inside `@layer theme`, so an unlayered `:root` block
in the app wins without `!important`:

```css
@import "tailwindcss";
@import "@xingxingmofashu/ui";

:root {
  --ui-glass-surface: rgb(255 255 255 / 0.5);
  --ui-glass-overlay-surface: rgb(255 255 255 / 0.8);
  --ui-glass-border: rgb(15 23 42 / 0.16);
  --ui-glass-blur: 20px;
  --ui-glass-saturate: 160%;
}

.dark,
[data-theme="dark"] {
  --ui-glass-surface: rgb(20 20 20 / 0.75);
  --ui-glass-overlay-surface: rgb(20 20 20 / 0.86);
  --ui-glass-border: rgb(255 255 255 / 0.24);
}
```

Use `--ui-surface` for opaque surfaces and `--ui-glass-surface` for in-page
glass. Text-bearing overlays such as Dialog, Alert Dialog, Drawer, Popover,
Menu, Select, Toast, and Tooltip use `--ui-glass-overlay-surface`. If an
existing override changed overlay backgrounds through `--ui-surface`, move it
to `--ui-glass-overlay-surface`.

## Glass presets

Glass presets are optional. Import the plugin stylesheet:

```css
@import "@xingxingmofashu/ui/plugins/glass-preset/index.css";
```

Then switch the shared material with `data-glass` on the root or any container:

```html
<html data-glass="thin">
<section data-glass="thick">...</section>
```

| Preset | Character |
| --- | --- |
| `thin` | Default and clearest |
| `soft` | Adds diffusion for secondary text |
| `regular` | Balances transparency with text separation |
| `thick` | Most readable over busy imagery |

The presets only override shared CSS variables. They adjust both the in-page
and overlay veils. Without the plugin stylesheet, the main stylesheet still
uses the `thin` material.

The optional React plugin manages the attribute and persistence:

```tsx
import {
  GlassPresetProvider,
  GlassPresetScope,
  GlassPresetScript,
} from "@xingxingmofashu/ui/plugins/glass-preset";

// In <head>, before React hydrates.
<GlassPresetScript storageKey="app-glass" />;

// Around the application.
<GlassPresetProvider storageKey="app-glass">
  {children}
</GlassPresetProvider>;

// Or scope one container without changing the global preset.
<GlassPresetScope preset="thick">{children}</GlassPresetScope>;
```

The provider writes `data-glass` to `<html>` and exposes `useGlassPreset()`.
Pass `preset` and `onPresetChange` for controlled state, or `defaultPreset` for
an uncontrolled initial value.

## Tailwind aliases

The stylesheet exposes Tailwind aliases for common tokens:

| Utility family | Token |
| --- | --- |
| `text-ui-ink`, `bg-ui-ink` | `--ui-ink` |
| `bg-ui-glass-surface` | `--ui-glass-surface` |
| `bg-ui-glass-overlay-surface` | `--ui-glass-overlay-surface` |
| `border-ui-glass-border` | `--ui-glass-border` |
| `outline-ui-glass-focus` | `--ui-glass-focus` |
| `bg-ui-surface` | `--ui-surface` |

Use these aliases for custom chrome so it follows the same theme as the
components:

```tsx
<div className="rounded-3xl border border-ui-glass-border bg-ui-glass-surface p-6 text-ui-ink">
  Matches the component material.
</div>
```

## Custom glass surfaces

The shared material is exported as CSS classes. Use them only for surfaces the
package does not provide:

```tsx
<div className="ui-glass ui-glass-inner ui-glass-highlight relative overflow-hidden rounded-3xl p-6">
  <span aria-hidden="true" className="ui-glass-rim" />
  <p className="relative z-10 text-sm text-ui-ink">Custom glass panel</p>
</div>
```

- `.ui-glass` draws the translucent fill, double border, specular shadow, and
  backdrop blur.
- `.ui-glass-overlay` swaps the fill for the stronger overlay veil.
- `.ui-glass-inner` adds the soft inner outline.
- `.ui-glass-highlight` adds the diagonal glare.
- `.ui-glass-rim` is a decorative child element; render it with
  `aria-hidden="true"`.
- `.ui-glass-chip` is a compact surface for small readouts.

## Component styling

Every component accepts `className` and `style`, which merge into the
component's primary element. Use them for layout, not for replacing the
material:

```tsx
<Button className="w-full" style={{ maxWidth: 320 }} label="Continue" />
```

Every component also accepts `ui`, an object keyed by the component's
`data-slot` names. Use it to style internal slots while keeping the
single-structure API:

```tsx
<Card
  title="Deployment"
  description="Production"
  ui={{
    glass: "bg-white/40",
    header: "pb-0",
    title: "tracking-tight",
  }}
>
  <p className="text-sm text-ui-ink/70">Build 128 is live.</p>
</Card>
```

Values are `ClassValue`, so strings, arrays, and class maps work. Merge order is
theme recipe, `ui`, then `className`. For collection components such as
Accordion and Toggle Group, root `ui` is applied first, then each item's `ui`,
then the item's `className`.

Use `style` for values that must be computed at runtime, including per-instance
CSS variables. Inline styles override matching properties from the theme and
`className`; keep color, blur, and shadow changes on the shared tokens.

For full control, import a compiled theme recipe:

```tsx
import buttonTheme from "@xingxingmofashu/ui/theme/button";

const styles = buttonTheme({ size: "lg" });

export function CustomButton() {
  return <button className={styles.root()}>Custom action</button>;
}
```

## Motion and browser support

Transitions and pressed effects include `motion-reduce` variants. Users who set
`prefers-reduced-motion: reduce` keep the layout and state changes but lose the
decorative motion.

The material relies on modern CSS: `backdrop-filter`, `color-mix`, container
units, individual `translate` / `scale` properties, and `:has`. Provide a
fallback background for browsers without `backdrop-filter`, or limit support to
current evergreen browsers.

## Checklist

- Import the package stylesheet exactly once, before app overrides.
- Set `.dark` or `data-theme="dark"` before first paint.
- Use the optional glass preset plugin for `data-glass` materials.
- Override tokens in an unlayered `:root` and `.dark` block.
- Test contrast over the busiest background in the app.
- Prefer `ui` for internal slots, `className` and `style` for layout, and tokens
  for material changes.

## Canonical guide

- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
- [Glass preset plugin](https://xingxingmofashu.github.io/ui/docs/en/plugins/glass-preset)
