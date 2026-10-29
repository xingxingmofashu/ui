# Docs Package

Bilingual Fumadocs documentation for `@xingxingmofashu/ui`.

## Commands

From the repository root:

- `pnpm docs:dev` — start on port 3001.
- `pnpm docs:build` — static export to `out/`.
- `pnpm docs:typecheck` — TypeScript check.

From `docs/`, the equivalent commands are `pnpm dev`, `pnpm build`, and
`pnpm typecheck`.

## Editing Content

- Chinese content: `content/docs/zh/**`
- English content: `content/docs/en/**`
- Navigation: per-locale `meta.json` files.
- Add every page to both locales; the loader uses directory-based i18n.
- Prefix internal links with the docs path and locale: `/docs/zh/...` or `/docs/en/...`.

## Components And Theme

- Live examples live in `components/examples/<component>/<demo>.tsx`, one demo
  per file. `components/examples/registry.ts` auto-discovers every demo with
  `import.meta.glob`, so adding a file registers `component/demo` without
  editing the registry. Every `.tsx` file in a component folder must default-export
  a demo component; keep helpers elsewhere.
- MDX renders examples with `<Example name="button/basic" />`. `components/example.tsx`
  renders the live component and the source from the same file; pass
  `showCode={false}` for a preview without the source toggle. Do not duplicate
  the example code in MDX.
- Every component page starts with a basic example that renders the real,
  interactive component.
- Shared example frame: `components/demo-stage.tsx`.
- Examples must stay standalone and copy-pasteable: use English demo text, import only from `@xingxingmofashu/ui`, React, and icon packages, and do not use docs-only helpers or `fd-*` classes.
- The site uses Fumadocs' `black.css` theme and the Glass layout.
- Do not add accent colors. Callouts, code highlighting, and examples are neutral.
- Do not replace live components with screenshots.
- Prefer Fumadocs MDX components registered in `components/mdx.tsx` — `Callout`,
  `Cards`, `Steps`, `Tabs`, `Accordions`, and `TypeTable` — over custom markup.

## SEO

- `lib/site.ts` owns the site origin, base path, absolute URL helper, and Open Graph image metadata.
- `lib/seo.ts` builds page metadata and article JSON-LD; use it from page `generateMetadata` functions.
- `app/sitemap.ts` and `app/robots.ts` are generated at build time.
- `public/og.png` is the 1200×630 social preview image.

## i18n

- `lib/i18n.ts` defines `zh` and `en`, with `parser: "dir"` and `hideLocale: "never"`.
- `lib/layout.shared.tsx` defines navigation and UI translations.
- UI strings use `@fumadocs/language/zh-cn` for Chinese and Fumadocs' English defaults.
- `app/(root)` is the Chinese entry page at `/`; all localized pages, including the home pages, live under `app/docs/[lang]`.
- The header has no Docs/Components links; the docs sidebar uses the page tree, with Get Started (起步) and Components (组件) as top-level folders.
- Locale changes perform a full navigation in `components/docs-root-provider.tsx`, so next-themes' theme script is not re-rendered on the client (React 19 warns about script tags).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
