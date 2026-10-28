import {
  ArrowRight,
  Check,
  Layers,
  LayoutGrid,
  List,
  Moon,
  Palette,
  Sparkles,
} from "lucide-react";

import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Slider,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
} from "@xingxingmofashu/ui";

import { HomeAlertDialog } from "./home-alert-dialog";
import { HomeDialog } from "./home-dialog";

type Locale = "zh" | "en";

const githubUrl = "https://github.com/xingxingmofashu/ui";

export function HomePageContent({ lang }: { lang: Locale }) {
  const isZh = lang === "zh";

  const copy = isZh
    ? {
        badge: "React 19 · Tailwind CSS 4 · Base UI",
        titleLine1: "黑白之间，",
        titleLine2: "玻璃有光。",
        description:
          "Liquid Glass UI 是一套可组合、支持主题定制的玻璃组件。文档里的每个预览都是真实组件，不是截图，也不是复刻外观。",
        readDocs: "阅读文档",
        viewComponents: "查看组件",
        meta: ["真实组件预览", "Light / Dark", "零图片依赖"],
        cardTitle: "通知中心",
        cardDescription: "玻璃表面与控件都来自真实组件。",
        cardFooter: "实时交互",
        cardAction: "打开设置",
        switchLabel: "启用高光",
        switchDescription: "在玻璃边缘显示斜向高光。",
        componentsEyebrow: "Components",
        componentsTitle: "九个组件，一套语言",
        componentsDescription:
          "每个组件共享同一套玻璃 token，因此可以自然地组合在一起。下面的内容直接渲染 UI 包里的组件。",
        componentDescriptions: {
          accordion:
            "带可访问标题的玻璃折叠面板，支持单选、多选与高度动画。",
          alertDialog:
            "带内置取消/确认操作的玻璃模态确认对话框。",
          button: "五种尺寸，支持前置与后置图标。",
          card: "由 header、body 与 footer 组成的玻璃卡片。",
          checkbox:
            "带玻璃方块、勾选动画与不确定状态的复选框。",
          dialog:
            "带玻璃弹窗与自定义操作区的通用模态对话框，可放置任意数量按钮。",
          slider: "支持区间选择与纵向布局的玻璃滑块。",
          switch: "带液态玻璃滑块、标签与描述文本的开关。",
          toggleGroup: "带液态玻璃选中态的切换按钮，支持单选、多选与纵向布局。",
        },
        cardPreviewTitle: "玻璃面板",
        cardPreviewDescription: "内容留在滤镜之外。",
        cardPreviewBody: "放在有细节的背景上，层次自然浮现。",
        switchPreviewOn: "启用通知",
        switchPreviewOff: "精简模式",
        whyEyebrow: "Why Liquid Glass",
        whyTitle: "轻量，但不轻薄",
        whyDescription:
          "视觉效果来自 CSS 的多层叠加，交互行为交给 Base UI，主题则完全由 token 控制。",
        features: [
          {
            icon: Sparkles,
            title: "纯 CSS 玻璃",
            description:
              "边框、高光、内阴影与背板模糊全部由 CSS 绘制，没有贴图，也没有额外的运行时。",
          },
          {
            icon: Moon,
            title: "真正的黑白",
            description:
              "文档与组件预览统一使用中性色 token，浅色与深色模式都保持黑白层次。",
          },
          {
            icon: Layers,
            title: "布局可覆盖",
            description:
              "通过 className 调整根元素布局，配合 token 保持默认玻璃视觉。",
          },
          {
            icon: Palette,
            title: "主题 token",
            description:
              "一套 --ui-* 变量同时服务浅色与深色，无需重写组件即可完成品牌化。",
          },
        ],
        quickEyebrow: "Quick start",
        quickTitle: "几行代码就能开始",
        quickDescription:
          "下面是一个最小组合示例；更多组件用法见组件文档。",
        quickLink: "浏览组件文档",
        ctaTitle: "准备好把玻璃带进项目了吗？",
        ctaDescription: "从组件文档开始，了解每个组件的 API 与用法。",
        ctaButton: "阅读文档",
        github: "GitHub",
      }
    : {
        badge: "React 19 · Tailwind CSS 4 · Base UI",
        titleLine1: "Between black and white,",
        titleLine2: "glass finds its light.",
        description:
          "Liquid Glass UI is a composable and themeable set of glass components. Every preview in these docs is a real component — not a screenshot, and not a look-alike.",
        readDocs: "Read the docs",
        viewComponents: "View components",
        meta: ["Live components", "Light / Dark", "No image assets"],
        cardTitle: "Notification center",
        cardDescription: "The glass surface and controls are the real components.",
        cardFooter: "Interactive",
        cardAction: "Open settings",
        switchLabel: "Enable highlights",
        switchDescription: "Show a diagonal highlight along the glass rim.",
        componentsEyebrow: "Components",
        componentsTitle: "Nine components, one language",
        componentsDescription:
          "Every component shares the same glass tokens, so they compose naturally. Everything below renders directly from the UI package.",
        componentDescriptions: {
          accordion:
            "Collapsible glass panels with accessible headings, single or multiple expansion, and height animation.",
          alertDialog:
            "A glass modal confirmation with built-in cancel and confirm actions.",
          button:
            "Five sizes with leading and trailing icons.",
          card: "A glass card built from header, body, and footer slots.",
          checkbox:
            "A checkbox with a glass tile, animated check, and indeterminate state.",
          dialog:
            "A general-purpose modal with a glass popup and a custom action area for any number of buttons.",
          slider:
            "A glass slider with range selection and vertical orientation.",
          switch: "A switch with a liquid glass thumb, label, and description.",
          toggleGroup:
            "Glass selected-state toggles for single, multiple, and vertical layouts.",
        },
        cardPreviewTitle: "Glass panel",
        cardPreviewDescription: "Content stays outside the filter.",
        cardPreviewBody:
          "Place it over a detailed background and the layers appear naturally.",
        switchPreviewOn: "Notifications",
        switchPreviewOff: "Compact mode",
        whyEyebrow: "Why Liquid Glass",
        whyTitle: "Lightweight, not shallow",
        whyDescription:
          "The visuals come from layered CSS, interactions come from Base UI, and theming is controlled entirely by tokens.",
        features: [
          {
            icon: Sparkles,
            title: "CSS-only glass",
            description:
              "Borders, highlights, inner shadows, and backdrop blur are all drawn with CSS. No textures, no extra runtime.",
          },
          {
            icon: Moon,
            title: "Truly monochrome",
            description:
              "Docs and previews share neutral tokens, keeping black-and-white depth in both light and dark mode.",
          },
          {
            icon: Layers,
            title: "Layout overrides",
            description:
              "Use className to adjust root layout while tokens keep the default glass look.",
          },
          {
            icon: Palette,
            title: "Theme tokens",
            description:
              "One set of --ui-* variables serves light and dark, so you can brand components without rewriting them.",
          },
        ],
        quickEyebrow: "Quick start",
        quickTitle: "Start with a few lines",
        quickDescription:
          "A minimal composition; see the component docs for more usage.",
        quickLink: "Browse component docs",
        ctaTitle: "Ready to bring glass into your project?",
        ctaDescription:
          "Start with the component docs to learn each API and usage pattern.",
        ctaButton: "Read the docs",
        github: "GitHub",
      };

  const components = [
    {
      name: "Accordion",
      href: `/${lang}/docs/components/accordion`,
      description: copy.componentDescriptions.accordion,
      preview: (
        <Accordion
          className="w-full"
          defaultValue={["surface"]}
          size="sm"
          items={[
            {
              value: "surface",
              title: isZh ? "玻璃表面" : "Glass surface",
              content: isZh
                ? "内容留在滤镜之外。"
                : "Content stays outside the filter.",
            },
            {
              value: "tokens",
              title: isZh ? "主题 Token" : "Theme tokens",
              content: isZh
                ? "一套 token 同时服务浅色与深色。"
                : "One set of tokens serves light and dark.",
            },
          ]}
        />
      ),
    },
    {
      name: "Alert Dialog",
      href: `/${lang}/docs/components/alert-dialog`,
      description: copy.componentDescriptions.alertDialog,
      preview: <HomeAlertDialog isZh={isZh} />,
    },
    {
      name: "Button",
      href: `/${lang}/docs/components/button`,
      description: copy.componentDescriptions.button,
      preview: (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="sm"
            label={isZh ? "继续" : "Continue"}
            trailingIcon={<ArrowRight />}
          />
          <Button
            size="sm"
            aria-label={isZh ? "新建" : "Create"}
            leadingIcon={<Check />}
          />
        </div>
      ),
    },
    {
      name: "Card",
      href: `/${lang}/docs/components/card`,
      description: copy.componentDescriptions.card,
      preview: (
        <Card
          className="w-full max-w-xs"
          title={copy.cardPreviewTitle}
          description={copy.cardPreviewDescription}
        >
          <p className="text-sm text-ink/70">{copy.cardPreviewBody}</p>
        </Card>
      ),
    },
    {
      name: "Checkbox",
      href: `/${lang}/docs/components/checkbox`,
      description: copy.componentDescriptions.checkbox,
      preview: (
        <div className="flex flex-col gap-3">
          <Checkbox size="sm" label={isZh ? "产品更新" : "Product updates"} defaultChecked />
          <Checkbox size="sm" label={isZh ? "安全提醒" : "Security alerts"} />
        </div>
      ),
    },
    {
      name: "Dialog",
      href: `/${lang}/docs/components/dialog`,
      description: copy.componentDescriptions.dialog,
      preview: <HomeDialog isZh={isZh} />,
    },
    {
      name: "Slider",
      href: `/${lang}/docs/components/slider`,
      description: copy.componentDescriptions.slider,
      preview: (
        <div className="w-full">
          <span id="slider-home-label" className="sr-only">
            {isZh ? "音量" : "Volume"}
          </span>
          <Slider aria-labelledby="slider-home-label" defaultValue={60} />
        </div>
      ),
    },
    {
      name: "Switch",
      href: `/${lang}/docs/components/switch`,
      description: copy.componentDescriptions.switch,
      preview: (
        <div className="flex flex-col gap-4">
          <Switch label={copy.switchPreviewOn} defaultChecked />
          <Switch label={copy.switchPreviewOff} />
        </div>
      ),
    },
    {
      name: "Toggle Group",
      href: `/${lang}/docs/components/toggle-group`,
      description: copy.componentDescriptions.toggleGroup,
      preview: (
        <ToggleGroup
          aria-label={isZh ? "视图" : "View"}
          defaultValue={["grid"]}
        >
          <ToggleGroupItem
            value="grid"
            aria-label={isZh ? "网格" : "Grid"}
            icon={<LayoutGrid />}
          />
          <ToggleGroupItem
            value="list"
            aria-label={isZh ? "列表" : "List"}
            icon={<List />}
          />
        </ToggleGroup>
      ),
    },
  ];

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="docs-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />

      <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fd-muted-foreground">
            <span className="size-1.5 rounded-full bg-fd-foreground" />
            {copy.badge}
          </span>

          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.045em] text-fd-foreground sm:text-6xl lg:text-[4.25rem]">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-fd-muted-foreground">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={<a href={`/${lang}/docs`} />}
              label={copy.readDocs}
              trailingIcon={<ArrowRight />}
            />
            <a
              href="#components"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              {copy.viewComponents}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-fd-muted-foreground">
            {copy.meta.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full border border-fd-foreground/40 bg-fd-foreground/20" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="docs-grid absolute -inset-8 rounded-[3rem] opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
          />
          <Card
            className="relative w-full"
            title={copy.cardTitle}
            description={copy.cardDescription}
            footer={
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-fd-muted-foreground">
                  {copy.cardFooter}
                </span>
                <Button
                  size="sm"
                  label={copy.cardAction}
                  trailingIcon={<ArrowRight />}
                />
              </div>
            }
          >
            <div className="space-y-5">
              <Switch
                label={copy.switchLabel}
                description={copy.switchDescription}
                defaultChecked
              />
              <div className="h-px bg-fd-border" />
              <div className="flex items-center justify-between gap-4 text-xs text-fd-muted-foreground">
                <span>
                  {isZh ? "九个组件 · 同一套玻璃" : "Nine components · one glass"}
                </span>
                <span className="font-mono uppercase tracking-[0.14em]">
                  .light / .dark
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="components"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16"
      >
        <div className="max-w-2xl">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {copy.componentsEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
            {copy.componentsTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
            {copy.componentsDescription}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col rounded-2xl border border-fd-border bg-fd-card/40 p-5 transition-colors hover:bg-fd-accent/40"
            >
              <a
                href={item.href}
                className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-fd-foreground">{item.name}</h3>
                  <ArrowRight className="size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {item.description}
                </p>
              </a>
              <div className="mt-6 flex flex-1 items-center rounded-xl border border-dashed border-fd-border bg-fd-background/50 p-4">
                {item.preview}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {copy.whyEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
            {copy.whyTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
            {copy.whyDescription}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-fd-border bg-fd-card/40 p-5"
            >
              <div className="grid size-9 place-items-center rounded-xl border border-fd-border bg-fd-background text-fd-foreground">
                <feature.icon className="size-4" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fd-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 rounded-3xl border border-fd-border bg-fd-card/40 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
              {copy.quickEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground">
              {copy.quickTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
              {copy.quickDescription}
            </p>
            <a
              href={`/${lang}/docs/components/button`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
            >
              {copy.quickLink}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <pre className="overflow-x-auto rounded-2xl border border-fd-border bg-fd-background p-5 text-xs leading-6 text-fd-foreground">
            <code>{`import { Button, Card, Switch } from "@xingxingmofashu/ui";

<Card title="Liquid glass" description="CSS-only frosted panel.">
  <Switch label="Notifications" defaultChecked />
  <Button label="Continue" />
</Card>`}</code>
          </pre>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8">
        <div className="rounded-3xl border border-fd-border bg-fd-muted/60 px-6 py-12 text-center text-fd-foreground shadow-sm sm:px-12">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {copy.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 opacity-70">
            {copy.ctaDescription}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={`/${lang}/docs`}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              {copy.ctaButton}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={githubUrl}
              className="inline-flex h-9 items-center rounded-full border border-fd-border px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              {copy.github}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
