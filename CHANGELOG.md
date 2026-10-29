# Changelog

## 0.1.1 - 2026-10-29

### Changed

- Ship the Tailwind source scan inside `dist/index.css`. Consumers no longer
  need to add an explicit `@source` directive for the package `dist` directory.

## 0.1.0 - 2026-10-29

The first non-beta release, published under the `latest` dist-tag.

### Components

- Accordion
- Alert Dialog
- Button
- Card
- Checkbox
- Dialog
- Drawer
- Input
- Popover
- Scroll Area
- Slider
- Switch
- Toast
- Toggle
- Toggle Group

### Packaging

- ES modules built as `.mjs` with TypeScript declarations as `.d.ts`.
- The package root exposes the stylesheet through the `style` export, so
  `@import "@xingxingmofashu/ui"` resolves to `dist/index.css`.
- Component, composable, and theme subpath exports are available for deep
  imports.
- Toast manager hooks live under `@xingxingmofashu/ui/composables`.

### Documentation

- Bilingual English and Chinese documentation with live examples.
- Installation, theming, accessibility, and component API pages.
- A Vite playground covering every component in light and dark themes.
