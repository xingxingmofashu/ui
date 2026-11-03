# Lumen

A minimal Liquid Glass landing-page starter for
[`@xingxingmofashu/ui`](https://www.npmjs.com/package/@xingxingmofashu/ui), built
with Vite, React 19, TypeScript, Tailwind CSS 4, and Lucide icons.

The starter includes:

- The package stylesheet and theme tokens.
- A light/dark toggle that follows the system preference on first load.
- A hero, six feature cards, and two call-to-action sections.
- Buttons rendered as anchors, plus the `Card` and `Toggle` components.

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

- `src/App.tsx` — the whole page: theme toggle, features, CTAs, and footer.
- `src/index.css` — Tailwind, the package stylesheet, and the page background.
- `src/main.tsx` — React entry point.
- `index.html` — title and the no-flash theme script.

## Customize

- Change the copy and `features` array in `src/App.tsx`.
- Import more components from `@xingxingmofashu/ui`; all 18 are installed.
- Override the shared `--ui-*` tokens in `src/index.css` to match your brand.

## Requirements

- Node.js 22 or newer.
- React and React DOM 19.
- Tailwind CSS 4.

## Docs

- [Documentation](https://xingxingmofashu.github.io/ui/docs/en)
- [Components](https://xingxingmofashu.github.io/ui/docs/en/components)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)

MIT licensed.
