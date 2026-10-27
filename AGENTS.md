# UI Package

Package: `@xingxingmofashu.me/ui`

Visual style: Liquid Glass.

Source files and tests are the source of truth.

## Components

| Component | Component file | Theme file | Test file |
| --- | --- | --- | --- |
| Button | `src/components/button.tsx` | `src/theme/button.ts` | `test/components/button.test.tsx` |
| Card | `src/components/card.tsx` | `src/theme/card.ts` | `test/components/card.test.tsx` |
| Slider | `src/components/slider.tsx` | `src/theme/slider.ts` | `test/components/slider.test.tsx` |
| Switch | `src/components/switch.tsx` | `src/theme/switch.ts` | `test/components/switch.test.tsx` |
| Toggle Group | `src/components/toggle-group.tsx` | `src/theme/toggle-group.ts` | `test/components/toggle-group.test.tsx` |

## Glass

- `src/index.css` owns the standard glass material: `--ui-glass-*` tokens and the
  `.ui-glass`, `.ui-glass-inner`, `.ui-glass-highlight`, `.ui-glass-rim`, and
  `.ui-glass-chip` classes.
- The material is a lens: the surface applies the shared tone and contrast
  filter to its backdrop, border, shadow, inner rim, and glare. Keep text and
  icons out of that filtered element. Render the material as a dedicated,
  `aria-hidden` glass layer and put content in a sibling layer above it.
- Button uses `base` for layout/motion and the private `glass` slot for the
  material. Card uses its private `glass` layer. Toggle Group uses its private
  `glass` layer behind the indicator and items.
- Component recipes compose those classes. Do not restate the surface, border,
  shadow, backdrop blur, inner rim, or highlight gradient in `src/theme/`.
- Size, radius, overflow, layout, and motion remain in the component recipe.
  The glass layer clips its own pseudo-elements; the content wrapper must not
  clip the material's outer shadow.
- Switch and Slider keep their unique optical layers, but shared colors, edge
  shadows, lens blur, and specular values come from `--ui-glass-*` tokens.
- Tune the material through the tokens in `src/index.css`, not through
  per-component one-off overrides.

## Package files

- Public exports: `src/index.ts`
- Design tokens and glass material: `src/index.css`
- Shared token and glass tests: `test/tokens.test.ts`
- Test setup: `test/setup.ts`
- Vitest config: `vitest.config.ts`
- Preview page: `packages/web/app/page.tsx`
