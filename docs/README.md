# Docs Package

`@xingxingmofashu/docs` is the bilingual documentation site for `@xingxingmofashu/ui`. It is built with Next.js and Fumadocs, uses a strict black-and-white theme, and renders real components from the UI package through MDX.

## Commands

From the repository root:

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:typecheck
```

Or from `docs/`:

```bash
pnpm dev
pnpm build
pnpm typecheck
```

The dev server runs on port 3001. The build uses `output: "export"` and writes to `out/`.

## Deployment

The site is deployed to GitHub Pages at
`https://xingxingmofashu.github.io/ui/` by the `Docs` workflow. The workflow
reads the Pages base path into `NEXT_PUBLIC_BASE_PATH`, so the site works under
the `/ui/` project path.

## Routes

- `/` — Chinese entry page.
- `/docs/zh` — Chinese home page and documentation.
- `/docs/en` — English home page and documentation.
- `/api/search` — statically generated search index.

## Structure

- `content/docs/zh` and `content/docs/en` — MDX content and per-locale `meta.json` files.
- `app/(root)` — the Chinese entry page at `/`.
- `app/docs/[lang]` — the single localized page tree for `/docs/zh` and `/docs/en`.
- `app/docs/[lang]/(home)` — localized home pages.
- `app/docs/[lang]/(docs)` — the Fumadocs layout and catch-all documentation routes.
- `lib/i18n.ts` — locales, default language, and directory-based locale parsing.
- `lib/source.ts` — Fumadocs loader with i18n.
- `lib/layout.shared.tsx` — navigation, links, and UI translations.
- `components/docs-root-provider.tsx` — Fumadocs provider and locale-change handling.
- `components/examples/<component>/<demo>.tsx` — one live example per file.
- `components/examples/registry.ts` — auto-discovers demos and their raw source with `import.meta.glob`.
- `components/example.tsx` — renders a live example with optional collapsible source.
- `components/demo-stage.tsx` — shared frame for live examples.
- `components/mdx.tsx` — exposes `Example` to MDX.
- `app/docs/[lang]/(docs)/[...slug]/page.tsx` — renders docs pages and their metadata.
- `app/globals.css` — Fumadocs black theme, monochrome overrides, and UI source scanning (`../../src`).

## Conventions

- Keep both Chinese and English pages in sync. Every page must exist under both locale folders.
- Internal links in MDX must include the docs and locale prefixes, for example `/docs/zh/components/button` or `/docs/en/components/switch`.
- Use `<Example name="component/demo" />` instead of duplicating example code in MDX. Pass `showCode={false}` for a preview without the source toggle.
- Add a demo by creating `components/examples/<component>/<demo>.tsx` with a default export; the registry discovers it automatically. Every `.tsx` in that folder is treated as a demo, so keep helpers elsewhere.
- Keep example source standalone and copy-pasteable: English demo text, package imports only, and no docs-only helpers or `fd-*` classes.
- Keep component names and API terms in English in both languages.
- The documentation theme is black and white. Do not introduce accent colors; use neutral `fd-*` tokens.
- The Switch example uses the real component and only overrides `--ui-switch-on` / `--ui-switch-off` inline.
