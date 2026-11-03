export const homeCopy = {
  hero: {
    eyebrow: "Liquid Glass / Design system",
    badge: "React 19 / Tailwind CSS 4",
    titleLine1: "Glass is a material.",
    titleLine2: "Build with it.",
    description:
      "Eighteen accessible React components built from one CSS-only Liquid Glass surface. No textures, no canvas, no extra runtime.",
    readDocs: "Read the docs",
    openPlayground: "Open the playground",
    meta: ["18 components", "1 stylesheet", "0 image assets"],
    preview: {
      label: "Live specimen",
      title: "Material controls",
      description: "Real components. Real glass.",
      presetLabel: "Preset",
      presets: {
        thin: "Thin",
        regular: "Regular",
        thick: "Thick",
      },
      glareLabel: "Specular glare",
      switchLabel: "Edge highlight",
      footerLabel: "Rendered from the package",
      footerLink: "Card API",
    },
  },
  material: {
    eyebrow: "01 / Material",
    title: "One surface. Three densities.",
    description:
      "The same glass material moves from quiet decoration to dense, text-heavy interfaces. A preset only changes the shared --ui-glass-* variables; layout and behavior stay exactly the same.",
    link: "Read the preset docs",
    swatches: ["surface", "rim", "glare"],
    presets: [
      {
        value: "thin",
        name: "Thin",
        description: "Quiet panels and decorative surfaces.",
        metric: "20% / 62% veil",
        blur: "4px blur",
      },
      {
        value: "regular",
        name: "Regular",
        description: "The default material for most pages.",
        metric: "35% / 68% veil",
        blur: "16px blur",
      },
      {
        value: "thick",
        name: "Thick",
        description: "Dense text and busy photography.",
        metric: "45% / 72% veil",
        blur: "16px blur",
      },
    ],
  },
  components: {
    eyebrow: "02 / Components",
    title: "Eighteen ways to compose.",
    description:
      "Every component shares one material, one focus ring, and one data-slot contract. Start with an action, a form, or a complete overlay.",
    link: "Browse all components",
    featured: {
      title: "Workspace",
      description: "A live composition built from the same components.",
      overview: "Overview",
      activity: "Activity",
      updatesLabel: "Live updates",
      updatesDescription: "Keep this workspace in sync.",
      syncLabel: "Workspace sync",
      metrics: [
        { value: "18", label: "components" },
        { value: "01", label: "stylesheet" },
        { value: "00", label: "image assets" },
      ],
      activityItems: [
        { time: "09:12", title: "Design review scheduled" },
        { time: "08:47", title: "Release notes drafted" },
        { time: "08:20", title: "Playground deployed" },
      ],
      footer: "One surface, every control.",
    },
  },
  features: {
    eyebrow: "03 / Principles",
    title: "Lightweight, but not thin.",
    description:
      "The material is drawn with CSS, the behavior is built in, and the theme is yours to change.",
    items: [
      {
        number: "01",
        title: "CSS, not canvas.",
        description:
          "Borders, highlights, inner shadows, and backdrop blur are all drawn with CSS. No textures, no extra runtime.",
      },
      {
        number: "02",
        title: "One token set.",
        description:
          "A single set of --ui-* variables serves light and dark. Brand the material without rewriting components.",
      },
      {
        number: "03",
        title: "Accessible by default.",
        description:
          "WAI-ARIA semantics, keyboard navigation, and focus management ship with every interactive component.",
      },
      {
        number: "04",
        title: "Composable by design.",
        description:
          "Every surface follows the same data-slot contract, so primitives and layouts fit together naturally.",
      },
    ],
  },
  quickStart: {
    eyebrow: "04 / Install",
    title: "Three lines to a glass surface.",
    description:
      "Install the package, import the stylesheet, and render the real components. The installation guide covers the rest.",
    link: "Installation guide",
    steps: [
      {
        label: "Install",
        code: "pnpm add @xingxingmofashu/ui",
      },
      {
        label: "Styles",
        code: '@import "@xingxingmofashu/ui";',
      },
      {
        label: "Compose",
        code: 'import { Button } from "@xingxingmofashu/ui";',
      },
    ],
  },
  cta: {
    eyebrow: "05 / Next",
    title: "Put the material to work.",
    description:
      "Read the docs, open the playground, or take the source and make it yours.",
    readDocs: "Read the docs",
    playground: "Open the playground",
    github: "GitHub",
  },
} as const;
