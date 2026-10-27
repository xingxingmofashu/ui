# Docs Package

Bilingual Fumadocs documentation for `@xingxingmofashu.me/ui`.

## Commands

- `pnpm --filter @xingxingmofashu.me/docs dev` — start on port 3001.
- `pnpm --filter @xingxingmofashu.me/docs build` — static export to `out/`.
- `pnpm --filter @xingxingmofashu.me/docs typecheck` — TypeScript check.

## Editing Content

- Chinese content: `content/docs/zh/**`
- English content: `content/docs/en/**`
- Navigation: per-locale `meta.json` files.
- Add every page to both locales; the loader uses directory-based i18n.
- Prefix internal links with the locale: `/zh/docs/...` or `/en/docs/...`.

## Components And Theme

- Live previews live in `components/preview.tsx` and render the real UI package.
- `SwitchControlled` lives in `components/examples/switch-controlled.tsx`.
- Previews read the active locale from `components/locale-provider.tsx`.
- The site uses Fumadocs' `black.css` theme and the Glass layout.
- Do not add accent colors. Callouts, code highlighting, and previews are neutral.
- Do not replace live components with screenshots.

## i18n

- `lib/i18n.ts` defines `zh` and `en`, with `parser: "dir"` and `hideLocale: "never"`.
- `lib/layout.shared.tsx` defines navigation, links, and UI translations.
- UI strings use `@fumadocs/language/zh-cn` for Chinese and Fumadocs' English defaults.
- `app/(root)` is the Chinese home page at `/`; all other localized routes live under `app/[lang]`.
- The docs sidebar uses the page tree only; `links={[]}` prevents duplicate Docs/Components entries next to pages.
- Locale changes perform a full navigation in `components/docs-root-provider.tsx`, so next-themes' theme script is not re-rendered on the client (React 19 warns about script tags).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
