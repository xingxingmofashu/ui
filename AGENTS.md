# UI 组件包规范

本文件约束 `packages/ui` 内的组件、样式、测试和协作方式。当前包内只有 Button，后续组件应沿用同样的分层、命名和验证方式。

## 1. 包定位

- 包名：`@xingxingmofashu.me/ui`
- 公开入口：`src/index.ts`
- 直接导出源码，不维护单独的构建产物或 `dist`。
- `react` / `react-dom` 是 `peerDependencies`，不要改成普通依赖。
- 交互行为基于 `@base-ui/react`，样式基于 `tailwind-variants`，类名合并使用 `cn`。
- UI 包不依赖具体图标库；`lucide-react` 只用于 `packages/web` 预览页。

## 2. Button 的视觉风格

Button 是一个 **玻璃胶囊 CTA**，整体克制、轻量、有物理质感。

### 外层与可见表面

采用两层结构，不要合并：

- `base`：外层交互区域，负责布局、焦点、禁用态，本身不可见。
- `surface`：真正可见的玻璃胶囊，负责背景、边框、阴影、滤镜、尺寸。

玻璃质感由多层效果叠加而成：

- `rounded-full` 胶囊形状。
- 极低透明度的黑色背景 + 双层细边框。
- 多层 `inset` 内阴影模拟玻璃边缘反光。
- 柔和的外部投影制造悬浮感。
- `backdrop-blur`、`brightness`、`contrast` 形成磨砂玻璃质感。
- `before` 伪元素负责内侧模糊暗边。
- `after` 伪元素负责对角线高光。
- `overlay` 负责表面内圈细环。

这些层各有作用，不要为了“简化”随意删除或合并。`z-[500]` / `z-[501]`、伪元素位置和高光方向都是有意的，调整前必须看桌面和移动端效果。

### 文字与图标

- 文字颜色使用 `#3e3e3e`，按下时变为黑色。
- **label 不使用固定偏移的 `drop-shadow`**，否则会在小尺寸下产生重影。
- `leadingIcon` 是普通图标，不加背景。
- `trailingIcon` 是深色圆形徽章，内部图标为浅色。
- 图标大小完全由调用方决定；UI 包不限制 SVG 的宽高。
- 图标容器只负责居中和防止收缩，不替调用方设定图标尺寸。

### 动效

- 整体悬浮：`600ms ease-in-out`，hover 上移 `3px`。
- 按下：`120ms`，恢复位移并缩放至 `0.94`。
- 尾部图标：`250ms`，hover 放大至 `1.1`。
- 必须保留 `motion-reduce` 覆盖，减少动态偏好下关闭位移和缩放。
- 不要改成弹簧动画或更重的过渡，当前动效是明确的产品特征。

## 3. 结构与 slot 约定

| Slot | `data-slot` | 作用 |
| --- | --- | --- |
| `base` | `button` | 外层点击区域、焦点、禁用态 |
| `surface` | `surface` | 可见玻璃胶囊、尺寸和主要视觉 |
| `label` | `label` | 可见文字，负责截断和排版 |
| `leadingIcon` | `leading-icon` | 前置图标容器 |
| `trailingIcon` | `trailing-icon` | 后置圆形徽章 |
| `overlay` | `overlay` | 表面内圈装饰，无交互 |

约定：

- `base` 必须包裹 Base UI 的 `UIButton`，不要替换为原生 `<button>`。
- 所有视觉类名放在 `src/theme/button.ts`，组件文件只负责结构、状态和合并类名。
- `className` 作用于 `base`；要修改可见玻璃表面，使用 `classNames.surface`。
- `classNames` 的 key 使用 camelCase：`base`、`surface`、`label`、`leadingIcon`、`trailingIcon`、`overlay`。
- DOM 的 `data-slot` 使用 kebab-case：`button`、`surface`、`label`、`leading-icon`、`trailing-icon`、`overlay`。
- `overlay` 永远 `aria-hidden="true"`，且不可接收指针事件。

## 4. API 约定

Button 支持：

- `label`：优先使用的可见文字。
- `children`：`label` 的备用写法；两者同时存在时 `label` 优先。
- `icon`：`leadingIcon` 的别名；两者同时存在时 `leadingIcon` 优先。
- `leadingIcon` / `trailingIcon`：任意 `ReactNode`，通常传图标。
- `size`：`xs | sm | md | lg | xl`，默认 `md`。
- `classNames`：按 slot 覆盖样式。
- 其余原生/Base UI 属性透传给 `UIButton`。

示例：

```tsx
<Button label="继续" trailingIcon={<ChevronRight />} />
<Button aria-label="下一步" icon={<ChevronRight />} />
<Button
  label="全宽"
  classNames={{ base: "w-full", surface: "w-full" }}
/>
```

### 可访问名称

按钮必须有可访问名称。类型层面通过 `ButtonAccessibleName` 强制要求至少提供以下之一：

- `label`
- `children`
- `aria-label`
- `aria-labelledby`

不要放宽这个约束。纯图标按钮必须传 `aria-label` 或 `aria-labelledby`。

- 当按钮已有可访问名称时，图标容器设置 `aria-hidden="true"`，避免重复朗读。
- 当没有可访问名称时，不要主动隐藏图标，保留图标自身携带语义的可能。
- 使用 `aria-hidden={condition || undefined}`，不要输出 `aria-hidden="false"`。

## 5. 尺寸与响应式

| Size | 宽度 | 高度 | 文字 |
| --- | --- | --- | --- |
| `xs` | `9rem` | `2.75rem` | `text-sm` |
| `sm` | `11rem` | `3.25rem` | `text-base` |
| `md` | `16.25rem` | `clamp(3.65rem, 12vw, 4.6875rem)` | `clamp(1.0625rem, 4vw, 1.5625rem)` |
| `lg` | `19rem` | `5.25rem` | `1.75rem` |
| `xl` | `22rem` | `5.75rem` | `2rem` |

规则：

- 宽度通过 `base` 的固定 `w-*` 控制，surface 使用 `w-full` 填满。
- `base` 必须有 `max-w-full` 和 `min-w-0`，确保窄父容器能把按钮压缩到父容器宽度。
- **不要使用 `100vw` 或 `calc(100vw - ...)` 约束宽度。**
- `label` 的 `min-w-0` + `truncate` 是窄容器下的必要行为，不要删除。
- `md` 的高度和字号使用 `clamp + vw` 是流动排版设计，宽度仍然不用视口单位。
- 修改尺寸后至少验证：`200px` 父容器、`390px` 移动端、`1440px` 桌面端均无横向溢出。

## 6. 代码书写规范

### 文件职责

- `src/components/button.tsx`：组件结构、props、类型、可访问性、事件透传。
- `src/theme/button.ts`：唯一的 `tailwind-variants` recipe，只使用 default export。
- `src/index.ts`：公共导出。
- `test/components/button.test.tsx`：组件行为测试。
- `test/setup.ts`：Testing Library 清理和 jest-dom 扩展。
- `vitest.config.ts`：测试环境配置。

### TypeScript 与 React

- `strict: true`，不要使用 `any`；无法避免时先补具体类型。
- 组件文件首行保留 `"use client"`。
- 使用 `React.ReactNode`、`React.ComponentProps` 等 React 命名空间类型。
- 组件使用函数声明，组件名 PascalCase。
- prop、slot、类型名使用 camelCase / PascalCase。
- 条件渲染节点使用 `value != null ? ... : null`，不要用可能渲染 `0` 或空字符串的 `&&`。
- 不为了简单样式引入 `useMemo` 或额外状态。

### 导入与格式

- 使用双引号、分号、2 空格缩进、尾随逗号。
- 第三方依赖在前，本地相对导入在后，中间空一行。
- 类型导入使用 `type` 修饰符，例如 `import { type VariantProps } from "tailwind-variants"`。
- 具名导出优先；只有 theme recipe 使用 default export。
- 公共类型在文件底部集中导出：`export type { ButtonClassNames, ButtonProps }`。
- 给非显然的公共 prop 和类型写简短 JSDoc，不写重复代码本身的注释。

### 样式写法

- 所有组件样式进入 `tailwind-variants`，不要散落静态 class 字符串在 JSX 里。
- 使用 `cn(ui.slot(), classNames?.slot)` 合并 slot 样式。
- 复用现有 token 和层级，不要随意引入新的颜色、圆角或阴影体系。
- 不依赖图标库，不写死 SVG 宽高。
- 新增依赖必须先加到根目录 `pnpm-workspace.yaml` 的 catalog，再在 `package.json` 使用 `catalog:`。
- 当前 `className` 按字符串使用；不要依赖 Base UI 的函数式 `className`，组件尚未实现该解析。

## 7. 测试规范

技术栈：Vitest + jsdom + Testing Library + user-event。

测试文件放在 `test/components/`，命名为 `*.test.tsx`。

### 查询方式

- 优先 `screen.getByRole("button", { name: "..." })`，不要用 CSS 选择器找按钮。
- 需要验证 slot 时使用 `getSlot(element, "surface")` 辅助函数，依赖 `data-slot`。
- 图标测试使用内联 `<svg />`，不要为了测试给 UI 包引入图标库。

### 应覆盖的内容

- 可访问名称：`label`、`children`、`aria-label`、`aria-labelledby`。
- 图标装饰性：有名称时隐藏，无名称时不隐藏。
- 尺寸契约：默认 `md`、每个 size 的宽度和高度 class。
- 响应式契约：不存在 `100vw`，`base` 有 `max-w-full`，`surface` 有 `w-full`。
- 视觉回归点：label 不包含固定 `drop-shadow`。
- slot API：`className` 在 `base`，`classNames` 能覆盖 `surface` 等 slot。
- 交互：点击回调、disabled 状态。
- 类型约束：使用 `@ts-expect-error` 覆盖“纯图标必须有可访问名称”。

测试约定：

- 不做 snapshot 测试。
- 断言行为、可访问性和稳定的 class 契约，不断言容易变化的 DOM 结构细节。
- 修复视觉或布局 bug 时，同时补一个能失败的回归用例。
- 当前 18 个用例来自上述范围，新增行为应继续扩展，不要用跳过测试的方式绕过问题。

## 8. 验证流程

在 `packages/ui` 下修改后，至少运行：

```bash
pnpm test
pnpm typecheck
```

如果改动会影响预览页或构建，再在仓库根目录运行：

```bash
pnpm build
pnpm lint
```

涉及视觉、尺寸、层叠或动效时，还要实际检查预览页：

- 桌面端 `1440px`：尺寸序列和图标徽章正常。
- 移动端 `390px`：页面无横向溢出。
- 父容器 `200px`：所有尺寸都能收敛到容器宽度，不溢出。

清理临时截图、Playwright 产物和其他调试文件，保持工作区干净。

除非用户明确要求，不要自动 push 到远程仓库；本地验证和提交即可。
