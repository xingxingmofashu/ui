# @xingxingmofashu/ui

Liquid Glass UI components for React 19 and Tailwind CSS 4.

The package ships five components: Button, Card, Slider, Switch, and Toggle
Group. Glass surfaces, rim highlights, and inner shadows are drawn entirely
with CSS. There are no textures and no extra runtime.

## Install

```bash
pnpm add @xingxingmofashu/ui
```

`react` and `react-dom` 19 are peer dependencies. Tailwind CSS 4 is required.

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

Components are client components and opt into `"use client"` themselves.

## Components

- `Button`
- `Card`
- `Slider`
- `Switch`
- `ToggleGroup` / `ToggleGroupItem`

Each component exposes its slots through the `ui` prop for per-instance
overrides. Shared colors and glass parameters live in the `--ui-glass-*` tokens
in `src/index.css`.

## Development

```bash
pnpm install
pnpm build        # build dist with unbuild
pnpm test         # run the Vitest suite
pnpm typecheck    # typecheck the package
pnpm docs:dev     # start the Fumadocs site on port 3001
pnpm docs:build   # export the docs site to docs/out
```

The documentation site lives in `docs/` and imports this package from the
workspace, so changes under `src/` are picked up directly during docs
development.

## License

MIT
