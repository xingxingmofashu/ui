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

## Component Pages

Every component page uses the same skeleton in both locales:

1. Frontmatter with a one-sentence description.
2. A lead paragraph of two or three sentences: what the component renders,
   when to use it, and the one behavior a reader must know.
3. `Basic example` with a live, interactive example.
4. Feature sections in a useful order, each followed by an example or a short
   explanation.
5. `Accessibility`.
6. `API reference`.
7. Optional `Theming` or `Styling`.
8. `Related components`.

Headings use these exact translations:

| English | Chinese |
| --- | --- |
| Basic example | 基础示例 |
| Sizes | 尺寸 |
| Controlled usage | 受控用法 |
| Placement | 定位 |
| Disabled | 禁用 |
| Accessibility | 无障碍 |
| API reference | API 参考 |
| Theming | 主题 |
| Styling | 样式 |
| Related components | 相关组件 |

Keep component names, prop names, ARIA terms, and `Liquid Glass` in English in
both locales. Do not translate `Liquid Glass` as 液态玻璃.

Frontmatter descriptions follow one sentence and mention React and Liquid
Glass:

- English: `An accessible React <component> with a Liquid Glass ...` for
  interactive components, or `A React <component> with a Liquid Glass ...` for
  display-only components.
- Chinese: `可访问的 React <组件>，采用 Liquid Glass ...` for interactive
  components, or `一个 React <组件>，采用 Liquid Glass ...` for display-only
  components.

The `Accessibility` section is required. It must cover, as applicable:

- Where the accessible name comes from, and what to do without a visible label.
- Roles, states, and relationships the component supplies.
- Keyboard behavior, including activation and navigation keys.
- Focus management and dismissal for overlays.
- Icon-only controls, live regions, and form submission.
- A link to the accessibility guide with `<Example>`-free prose.

The `Related components` section is required and contains two to four
locale-prefixed links with short reasons. Do not repeat the whole catalog.

API reference rules:

- Start with a bold component name (`**Menu**`), then one `Props` table per
  public type. Order props by purpose: content and state, behavior, form and
  ARIA pass-through, rendering, styling.
- Use `| Prop | Type | Default | Description |` and
  `| 属性 | 类型 | 默认值 | 说明 |`.
- Follow with one `| Attribute | Description |` table (Chinese:
  `| 属性 | 说明 |`) when the component exposes data attributes, and list the
  `data-slot` values.
- Explain that additional Base UI root props are forwarded when the wrapper
  accepts them.
- Keep `ui` as the derived slot object; do not hand-write a second slot type.

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
  `Cards`, `Steps`, `Tabs`, and `Accordions` — over custom markup.
- Document component APIs with an `## API reference` section (Chinese:
  `## API 参考`) that contains Markdown `Props` and `Attribute` tables. Do not
  use `TypeTable`.

## SEO

- `lib/site.ts` owns the site origin, base path, absolute URL helper, and Open Graph image metadata.
- `lib/seo.ts` builds page metadata and article JSON-LD; use it from page `generateMetadata` functions.
- `lib/llms.ts` builds `/llms.txt` and `/llms-full.txt` from the MDX sources at build time.
- `app/sitemap.ts` and `app/robots.ts` are generated at build time.
- `public/og.png` is the 1200×630 social preview image.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables the optional Plausible loader; `NEXT_PUBLIC_PLAUSIBLE_SRC` overrides the script URL.

## i18n

- `lib/i18n.ts` defines `zh` and `en`, with `parser: "dir"` and `hideLocale: "never"`.
- `lib/layout.shared.tsx` defines navigation and UI translations.
- UI strings use `@fumadocs/language/zh-cn` for Chinese and Fumadocs' English defaults.
- `app/(root)` is the English-only marketing page at `/`; `app/(root)/zh`
  redirects the old `/zh` URL back to `/`. All localized docs pages still live
  under `app/docs/[lang]`.
- Docs locale choices are stored in `localStorage` under `ui-locale`; the
  homepage does not expose a language switch.
- The header has no Docs/Components links; the docs sidebar uses the page tree,
  with Get Started (起步), Guides (指南), Plugins (插件), and Components (组件)
  as top-level folders.
- Locale changes perform a full navigation in `components/docs-root-provider.tsx`, so next-themes' theme script is not re-rendered on the client (React 19 warns about script tags).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
