# Lumen

A compact Liquid Glass landing-page starter for
[`@xingxingmofashu/ui`](https://www.npmjs.com/package/@xingxingmofashu/ui),
built with Vite, React 19, TypeScript, Tailwind CSS 4, and Lucide icons.

The starter is a single responsive page. It includes:

- A CSS-only atmospheric background that makes the glass material visible.
- A live workspace preview with tabs, a switch, progress, four glass presets,
  and a toast on publish.
- A persisted light/dark theme toggle.
- Three short feature cards and a compact call to action.
- No router or data layer.

## Start

```bash
pnpm install
pnpm dev
```

Open the URL printed by Vite. Edit `src/App.tsx` and save to test HMR.

```bash
pnpm build
pnpm preview
```

## Files

- `src/App.tsx` — page layout, hero copy, features, CTA, and footer.
- `src/hero-preview.tsx` — the interactive preview card and scoped glass preset.
- `src/use-theme.ts` — persisted light/dark state.
- `src/index.css` — Tailwind, the package stylesheet, the glass preset
  stylesheet, and the page canvas.
- `index.html` — metadata and the no-flash theme script.

## Customize

- Change the copy, `features` array, and links in `src/App.tsx`.
- Change the preview content in `src/hero-preview.tsx`.
- Override the shared `--ui-*` tokens or the `--starter-*` canvas tokens in
  `src/index.css`.
- The preview uses `GlassPresetScope`, so its material switch only affects the
  preview card. Wrap the app in `GlassPresetProvider` from
  `@xingxingmofashu/ui/plugins/glass-preset` when you want a global, persisted
  preset.

Every component in `@xingxingmofashu/ui` is installed. Import only the ones you
use; the package ships an ESM build with deep imports for individual components
and theme recipes.

## Requirements

- Node.js 22 or newer.
- React and React DOM 19.
- Tailwind CSS 4.

## Docs

- [Documentation](https://xingxingmofashu.github.io/ui/docs/en)
- [Components](https://xingxingmofashu.github.io/ui/docs/en/components)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
- [Templates](https://xingxingmofashu.github.io/ui/docs/en/guides/templates)

MIT licensed.
