# Lumen

A compact Liquid Glass landing-page starter built with the
[shadcn registry](https://xingxingmofashu.github.io/ui/docs/en/guides/registry),
Vite, React 19, TypeScript, Tailwind CSS 4, and Lucide icons.

The component source is vendored into `src/components/ui/xingxingmofashu/` as
single self-contained files. The theme recipe and shared helpers are inlined, so
you can edit every layer in one place.

The starter is a single responsive page. It includes:

- A full-page photo background that makes the glass material visible.
- A live workspace preview with tabs, a switch, progress, and a toast on publish.
- A header switch for the four global glass presets.
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
- `src/hero-preview.tsx` — the interactive preview card.
- `src/use-theme.ts` — persisted light/dark state.
- `src/index.css` — Tailwind plus the Liquid Glass tokens and material classes.
- `src/components/ui/xingxingmofashu/` — the single-file registry components.
- `src/lib/xingxingmofashu/` — the glass preset library installed from the registry.
- `components.json` — shadcn configuration and the registry namespace.
- `index.html` — metadata and the no-flash theme script.

## Add components

The namespace is configured in `components.json`, so any other registry item can
be added with the shadcn CLI:

```bash
pnpm dlx shadcn@latest add @xingxingmofashu/dialog
```

The CLI copies a single self-contained component file into
`src/components/ui/xingxingmofashu/`, then merges the Liquid Glass styles into
`src/index.css`.

## Customize

- Change the copy, `features` array, and links in `src/App.tsx`.
- Change the preview content in `src/hero-preview.tsx`.
- Swap `public/rqev27.jpg` or edit the background classes on the page shell in
  `src/App.tsx` to change the photo.
- Edit a vendored component file directly. Its theme recipe and shared helpers
  are inline. Re-run `shadcn add` with `--overwrite` to accept upstream changes.
- Override the shared `--ui-*` tokens in `src/index.css`.
- The app is wrapped in `GlassPresetProvider`, so the header switch changes the
  whole page and persists in `localStorage`. Import `GlassPresetScope` from
  `@/lib/xingxingmofashu/glass-preset` when a section needs its own preset.

## Requirements

- Node.js 22 or newer.
- React and React DOM 19.
- Tailwind CSS 4.
- A current shadcn CLI when adding more items.

## Docs

- [Documentation](https://xingxingmofashu.github.io/ui/docs/en)
- [Components](https://xingxingmofashu.github.io/ui/docs/en/components)
- [Registry](https://xingxingmofashu.github.io/ui/docs/en/guides/registry)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
- [Templates](https://xingxingmofashu.github.io/ui/docs/en/guides/templates)

MIT licensed.
