# Installation

`@xingxingmofashu/ui` targets React 19, React DOM 19, Tailwind CSS 4, Node.js
22+, and an ESM-capable bundler. The package publishes ES modules only.

## Check the project first

Read `package.json` and the lockfile before installing:

- `react` and `react-dom` must be version 19.
- `tailwindcss` must be version 4.
- Use the package manager already used by the project.

If the project is on React 18 or Tailwind 3, upgrade those dependencies first.
Do not install this package into a CJS-only or non-ESM setup.

## Install

```bash
pnpm add @xingxingmofashu/ui
```

```bash
yarn add @xingxingmofashu/ui
```

```bash
npm install @xingxingmofashu/ui
```

```bash
bun add @xingxingmofashu/ui
```

## Import the stylesheet

Add the package to the same CSS entry that imports Tailwind, after the Tailwind
import:

```css
@import "tailwindcss";
@import "@xingxingmofashu/ui";
```

Import it exactly once. The package root resolves to `dist/index.css` through
its `style` export. The stylesheet includes its own Tailwind source scan, so no
extra `@source` directive is needed.

Optional glass presets are a separate stylesheet:

```css
@import "@xingxingmofashu/ui/plugins/glass-preset/index.css";
```

## Import components

Prefer the package root:

```tsx
import { Button, Card, Switch } from "@xingxingmofashu/ui";
```

Deep imports are available for a single component or theme recipe:

```tsx
import { Button } from "@xingxingmofashu/ui/components/button";
import buttonTheme from "@xingxingmofashu/ui/theme/button";
```

Toast hooks and the manager live under the `composables` export, for example
`@xingxingmofashu/ui/composables/use-toast`. Deep imports are useful when a
server component must guarantee that only the server-safe `Card` module is
loaded.

## Registry installation

The shadcn registry is an alternative to the npm package. Each item installs as
a single self-contained file in `components/ui/xingxingmofashu/`; the theme
recipe and shared helpers are inlined. Use it only when the user asks for
editable source or a shadcn-style install; do not combine both copies in one
project.

```bash
npx shadcn@latest add @xingxingmofashu/button
```

```bash
npx shadcn@latest add xingxingmofashu/ui/button
```

The CLI merges the glass tokens and material classes into the CSS file configured
by `tailwind.css` in `components.json`. Imports use the copied path:

```tsx
import { Button } from "@/components/ui/xingxingmofashu/button";
```

See the
[Registry guide](https://xingxingmofashu.github.io/ui/docs/en/guides/registry)
for namespace setup, version pinning, and updates.

## Theme selection

Light is the default. Switch themes with either mechanism:

```html
<html class="dark">
```

```html
<html data-theme="dark">
```

A nested `.light` or `[data-theme="light"]` subtree switches back to light
tokens inside a dark document. Set the theme before the first paint to avoid a
flash and a hydration mismatch. Read `localStorage` in an inline head script or
use a theme library such as `next-themes` with
`suppressHydrationWarning` on `<html>`.

If the app uses Tailwind `dark:` utilities, register a class-based dark variant
that matches the package selectors:

```css
@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));
```

## Server rendering

`Card` is server-safe and can render from a React Server Component. Every other
component is a client component. A Server Component can import and render a
Client Component, but it cannot pass a function defined on the server as a
prop. Move state and event handlers into a `"use client"` module.

Portals used by `Dialog`, `Drawer`, `Popover`, `Menu`, and `Toast` are
client-only in practice. The trigger and the open state must exist on the
client.

## Verify the install

- The CSS entry contains the Tailwind import first and the package import
  second.
- The package is imported once, not in multiple CSS files.
- A simple `<Button>Continue</Button>` renders with its glass surface.
- `pnpm typecheck` or the project's build succeeds.
- The page works in both light and dark themes.
- No hydration warning appears in a server-rendered app.

## Canonical guides

- [Installation](https://xingxingmofashu.github.io/ui/docs/en/get-started/installation)
- [Registry](https://xingxingmofashu.github.io/ui/docs/en/guides/registry)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
- [Server rendering](https://xingxingmofashu.github.io/ui/docs/en/guides/ssr)
- [Full documentation](https://xingxingmofashu.github.io/ui/llms-full.txt)
