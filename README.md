# Docs Package

`@xingxingmofashu.me/docs` is the bilingual documentation site for `@xingxingmofashu.me/ui`. It is built with Next.js and Fumadocs, uses a strict black-and-white theme, and renders real components from the UI package through MDX.

## Commands

```bash
pnpm --filter @xingxingmofashu.me/docs dev
pnpm --filter @xingxingmofashu.me/docs build
pnpm --filter @xingxingmofashu.me/docs typecheck
```

The dev server runs on port 3001. The build uses `output: "export"` and writes to `out/`.

## Routes

- `/` — Chinese home page.
- `/zh` — Chinese home page alias used by the language switcher.
- `/en` — English home page.
- `/zh/docs` — Chinese documentation.
- `/en/docs` — English documentation.
- `/api/search` — statically generated search index.

## Structure

- `content/docs/zh` and `content/docs/en` — MDX content and per-locale `meta.json` files.
- `app/(root)` — the Chinese home page at `/`.
- `app/[lang]` — localized layouts and routes.
- `lib/i18n.ts` — locales, default language, and directory-based locale parsing.
- `lib/source.ts` — Fumadocs loader with i18n.
- `lib/layout.shared.tsx` — navigation, links, and UI translations.
- `components/docs-root-provider.tsx` — Fumadocs provider and locale-change handling.
- `components/preview.tsx` — live component previews used by MDX.
- `components/monochrome-switch.tsx` — real Switch with a black-and-white track.
- `app/globals.css` — Fumadocs black theme, monochrome overrides, and UI source scanning.

## Conventions

- Keep both Chinese and English pages in sync. Every page must exist under both locale folders.
- Internal links in MDX must include the locale prefix, for example `/zh/docs/components/button` or `/en/docs/components/switch`.
- Use the live preview components instead of screenshots or mockups.
- Keep component names and API terms in English in both languages.
- The documentation theme is black and white. Do not introduce accent colors; use neutral `fd-*` tokens.
- The Switch preview uses the real component and only overrides `--ui-switch-on` / `--ui-switch-off` inline.
