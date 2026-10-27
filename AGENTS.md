# UI Package

Package: `@xingxingmofashu.me/ui`

Visual style: Liquid Glass.

Source files and tests are the source of truth.

## Components

| Component | Component file | Theme file | Test file |
| --- | --- | --- | --- |
| Button | `src/components/button.tsx` | `src/theme/button.ts` | `test/components/button.test.tsx` |
| Card | `src/components/card.tsx` | `src/theme/card.ts` | `test/components/card.test.tsx` |
| Switch | `src/components/switch.tsx` | `src/theme/switch.ts` | `test/components/switch.test.tsx` |

## Package files

- Public exports: `src/index.ts`
- Design tokens: `src/index.css`
- Shared token tests: `test/tokens.test.ts`
- Test setup: `test/setup.ts`
- Vitest config: `vitest.config.ts`
- Preview page: `packages/web/app/page.tsx`
