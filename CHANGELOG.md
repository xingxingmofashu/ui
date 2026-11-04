# Changelog

## 0.1.8 - 2026-11-04

### Added

- Add the Tooltip component with configurable delay, placement, arrow, and
  controlled visibility.
- Add the Menu component with action items, groups, separators, icons,
  shortcuts, disabled items, and controlled open state.
- Add the Select component with labels, descriptions, disabled options, five
  sizes, controlled values, and form integration.
- Add the `soft` glass preset between `thin` and `regular`, making the shared
  material a four-step, evenly spaced scale.

### Changed

- Rebalance `regular` to a 36.7% light / 68.7% dark veil, a 12px blur, and
  143.3% saturation. `thin` and `thick` are unchanged.

### Fixed

- Keep the specular glass rim concentric on pill-shaped surfaces by drawing
  vertical-only highlights and an unoffset 1px ring.

### Documentation

- Document the four-step preset scale across the README, homepage, and
  bilingual plugin guides.
- Add bilingual Tooltip, Menu, and Select pages with live examples and API
  references.
- Add the new components to the playground and update the homepage and
  component overview counts.
- Point the component overview at the single English homepage instead of the
  retired `/zh` page.

## 0.1.7 - 2026-11-03

### Changed

- Make `thin` the default glass material in the core stylesheet, the
  glass-preset plugin, and the playground. The default now uses a 20% light
  veil, a 62% dark veil, a 4px backdrop blur, and 150% saturation.

### Documentation

- Rebuild the marketing homepage as an English-only page and redirect the old
  `/zh` URL to `/`. Docs pages remain bilingual.
- Deploy the playground with the docs site and align its header and favicon
  with the shared brand mark.

## 0.1.6 - 2026-11-03

### Added

- Add the `data-glass="thin | regular | thick"` shared-material presets in
  `plugins/glass-preset/index.css`. Set the attribute on the root or any
  container; presets inherit into descendants, follow the active
  `color-scheme`, and only override `--ui-glass-*` variables, so switching
  material does not require component or theme changes.
- Add the optional
  `@xingxingmofashu/ui/plugins/glass-preset` entry with
  `GlassPresetProvider`, `useGlassPreset`, `GlassPresetScope`,
  `GlassPresetScript`, `getGlassPresetScript`, and `storageKey` persistence.
  The plugin does not import CSS; the preset stylesheet stays opt-in and the
  main stylesheet keeps the `regular` defaults when it is not imported.

### Changed

- Tune the default `regular` material to a 35% light veil, a 68% dark veil, a
  16px backdrop blur, and 140% saturation.

### Documentation

- Add bilingual Plugins documentation and move glass preset setup out of the
  Theming guide.
- Document the glass presets, their variable values, and the `data-glass`
  attribute, and refresh the Surface Lab screenshots.

## 0.1.5 - 2026-11-03

### Added

- Add the Tabs component with controlled and uncontrolled state, horizontal and
  vertical orientation, `keepMounted` panels, `activateOnFocus`, disabled tabs,
  and icon-only tabs.

### Fixed

- Accept `ReactNode` content in Accordion items. The inherited RDFa `content`
  attribute previously narrowed the prop to strings.

### Documentation

- Add 12 examples covering Accordion persistence, Button form actions, Popover
  offsets, Progress ranges, Scroll Area edge thresholds, Slider constraints,
  Tabs panels and activation, and Toast update, queue, and manager flows.
- Document Toast provider limits, update options, promise options, and
  `createToastManager` without exposing unsupported APIs.
- Clarify AlertDialog Escape behavior, Dialog backdrop dismissal, and Scroll
  Area threshold typing, and localize the Chinese component navigation.

## 0.1.4 - 2026-11-03

### Fixed

- Tune the shared glass material for colorful and image backgrounds: raise the
  light veil, deepen the dark fill, and soften blur, tone, and contrast so
  component text stays legible.

### Documentation

- Replace the README banners with the Surface Lab panel screenshots in light
  and dark mode.

## 0.1.3 - 2026-11-02

### Added

- Add the Progress component with determinate, indeterminate, labeled, and
  sized variants.
- Expose a typed `ui` prop on every component for styling internal slots. Slot
  names follow the public `data-slot` contract.

### Changed

- Rename `--ui-dialog-surface` to `--ui-surface` and the
  `bg-ui-dialog-surface` utility to `bg-ui-surface`.
- Move component-specific custom properties (checkbox rim, slider lens, switch
  shadows) from `src/index.css` into their component theme recipes.
- Type `className` as `string` across component props.
- Standardize component API documentation around the single-structure wrapper
  and `ui` slot model.

### Documentation

- Add the bilingual marketing home, component overview, and guides for theming,
  forms, accessibility, SSR, and templates.
- Add English-only `llms.txt` and `llms-full.txt` exports for agents and
  optional Plausible analytics.
- Add playground light and dark preview screenshots to the README.

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
