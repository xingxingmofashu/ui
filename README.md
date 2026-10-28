# @xingxingmofashu/ui

Liquid Glass UI components for React 19 and Tailwind CSS 4.

The package ships seven components: Accordion, Alert Dialog, Button, Card,
Slider, Switch, and Toggle Group. Glass surfaces, rim highlights, and inner
shadows are drawn entirely with CSS. The interactive components are built on
Base UI and do not add a custom rendering engine; `Card` is a native layout
primitive.

## Requirements

- Node.js 22 or newer.
- React and React DOM 19.
- Tailwind CSS 4.
- An ESM-capable bundler. The package publishes ES modules only.

`Accordion`, `AlertDialog`, `Button`, `Slider`, `Switch`, and `ToggleGroup` are
client components. `Card` is server-safe and can be rendered from a React
Server Component.

## Install

```bash
pnpm add @xingxingmofashu/ui
```

## Setup

Import the design tokens and glass material from your Tailwind entry file:

```css
@import "tailwindcss";
@import "@xingxingmofashu/ui/index.css";

/* Adjust this path to point at the package inside node_modules. */
@source "../node_modules/@xingxingmofashu/ui/dist";
```

The package ships component class names in `dist`, so Tailwind must scan that
directory. The `@source` path is relative to the CSS file that contains it.

## Usage

```tsx
import { Button, Card, Switch } from "@xingxingmofashu/ui";

export function Example() {
  return (
    <Card title="Liquid glass" description="CSS-only frosted panel.">
      <Switch label="Notifications" defaultChecked />
      <Button label="Continue" />
    </Card>
  );
}
```

Deep imports are available for each component and theme recipe:

```tsx
import { Button } from "@xingxingmofashu/ui/components/button";
import buttonTheme from "@xingxingmofashu/ui/theme/button";
```

Use them when you want to import a single component without going through the
package root.

## Theming

Light and dark values are selected by `.light` / `.dark`, or by
`data-theme="light"` / `data-theme="dark"`:

```html
<html class="dark">
  <!-- or -->
  <html data-theme="dark">
</html>
```

A nested `.light` / `[data-theme="light"]` subtree can switch back to light
tokens. Shared colors and glass parameters live in the `--ui-*` tokens in the
package stylesheet; override them in your own theme layer. Tailwind aliases use
the `ui-` prefix (`text-ui-ink`, `outline-ui-glass-focus`, and so on) to avoid
colliding with host design tokens.

`Button`, `Card`, `Slider`, `Switch`, `ToggleGroup`, `Accordion`, and
`AlertDialog` inherit the host font and do not force a font family.

The visual material relies on modern CSS: `backdrop-filter`, `color-mix`,
container units, individual `translate` / `scale` properties, and `:has`.
Use a current evergreen browser.

## Components

- `Accordion`
- `AlertDialog`
- `Button`
- `Card`
- `Slider`
- `Switch`
- `ToggleGroup` / `ToggleGroupItem`


## Development

```bash
pnpm install
pnpm build           # build dist with unbuild
pnpm lint            # lint with oxlint
pnpm lint:fix        # apply oxlint's safe fixes
pnpm test            # run the Vitest suite
pnpm typecheck       # typecheck the package
pnpm docs:dev        # start the Fumadocs site on port 3001
pnpm docs:build      # export the docs site to docs/out
pnpm playground:dev  # start the component playground on port 3002
```

The documentation site lives in `docs/` and imports this package from the
workspace, so changes under `src/` are picked up directly during docs
development. The playground in `playground/` also imports the source directly
and adds a persistent light/dark toggle for previewing every component.

## License

MIT
