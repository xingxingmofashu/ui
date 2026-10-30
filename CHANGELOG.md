# Changelog

## 0.1.2 - 2026-10-30

### Changed

- Split Toast into `ToastProvider` and `Toast`: the provider supplies the
  manager, and `Toast` renders the viewport and stacked notifications.
- Replace the Toast `closeLabel` prop with a `close` slot, remove
  `viewportLabel`, and limit positions to the four corners with per-corner
  swipe directions.
- Improve ARIA relationships for checkbox, input, slider, and switch labels,
  descriptions, and validation messages.
- Extract shared icon components and standardize their SVG viewBox on 24×24.

### Documentation

- Add the Vite starter template and document the updated form control
  accessibility APIs.
- Sort playground components alphabetically.

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
