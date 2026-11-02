export type HomeLocale = "zh" | "en";

const zh = {
  hero: {
    badge: "React 19 · Tailwind CSS 4 · Base UI",
    titleLine1: "黑白之间，",
    titleLine2: "玻璃有光。",
    description:
      "为 React 19 与 Tailwind CSS 4 打造的纯 CSS Liquid Glass 风格组件。每个预览都是真实组件，不是截图。",
    readDocs: "阅读文档",
    viewComponents: "查看组件",
    meta: ["真实组件预览", "Light / Dark", "零图片依赖"],
    language: "English",
    languageHref: "/",
    preview: {
      live: "实时",
      cardTitle: "通知中心",
      cardDescription: "玻璃表面与控件都来自真实组件。",
      switchLabel: "启用高光",
      switchDescription: "在玻璃边缘显示斜向高光。",
      sliderLabel: "高光强度",
      footerLabel: "实时交互",
      openSettings: "打开设置",
      dialogTitle: "工作区设置",
      dialogDescription: "这些更改会应用到团队中的所有人。",
      dialogSwitchLabel: "邮件通知",
      dialogSwitchDescription: "队友发布更改时发送摘要。",
      cancel: "取消",
      save: "保存更改",
    },
  },
  components: {
    eyebrow: "组件",
    title: "十六个组件，一套语言",
    description:
      "每个组件共享同一套玻璃 token，因此可以自然组合。下面的内容直接渲染 UI 包里的组件。",
    activity: [
      { time: "09:12", title: "设计评审已安排" },
      { time: "08:47", title: "发布说明已起草" },
      { time: "08:20", title: "Playground 已部署" },
      { time: "昨天", title: "玻璃 token 已更新" },
    ],
    items: {
      accordion: {
        name: "Accordion",
        description: "共享一块玻璃表面的折叠面板。",
        surfaceTitle: "玻璃表面",
        surfaceContent: "内容留在滤镜之外。",
        tokensTitle: "主题 Token",
        tokensContent: "一套 token 同时服务浅色与深色。",
      },
      alertDialog: {
        name: "Alert Dialog",
        description: "带内置取消与确认操作的模态确认框。",
        trigger: "删除项目",
        title: "删除项目？",
        descriptionText: "此操作无法撤销，所有文件都会被永久删除。",
        cancel: "取消",
        confirm: "删除",
      },
      button: {
        name: "Button",
        description: "圆角玻璃按钮，支持图标与五种尺寸。",
        continue: "继续",
        create: "新建",
      },
      card: {
        name: "Card",
        description: "由 header、body 与 footer 组成的玻璃卡片。",
        previewTitle: "玻璃面板",
        previewDescription: "内容留在滤镜之外。",
        previewBody: "放在有细节的背景上，层次自然浮现。",
      },
      checkbox: {
        name: "Checkbox",
        description: "带勾选动画与不确定状态的玻璃方块。",
        productUpdates: "产品更新",
        securityAlerts: "安全提醒",
      },
      dialog: {
        name: "Dialog",
        description: "带自定义操作区的通用模态框。",
        trigger: "编辑资料",
        title: "编辑资料",
        descriptionText: "自定义操作区可以放任意数量的按钮。",
        body: "对话框承载正文内容，并由页面自己管理打开状态。",
        cancel: "取消",
        save: "保存",
      },
      drawer: {
        name: "Drawer",
        description: "贴边滑入、支持滑动关闭的玻璃抽屉。",
        trigger: "打开抽屉",
        title: "工作区设置",
        descriptionText: "从右侧滑入的玻璃抽屉。",
        switchLabel: "邮件通知",
        switchDescription: "队友发布更改时发送摘要。",
        cancel: "取消",
        save: "保存更改",
      },
      input: {
        name: "Input",
        description: "带标签、描述与图标的玻璃输入框。",
        label: "邮箱",
        placeholder: "you@example.com",
      },
      popover: {
        name: "Popover",
        description: "锚定在触发器上的非模态玻璃面板。",
        trigger: "打开设置",
        title: "工作区设置",
        descriptionText: "更改会应用到整个团队。",
        switchLabel: "邮件通知",
      },
      progress: {
        name: "Progress",
        description: "支持确定与不确定状态的线性玻璃进度条。",
        label: "正在导入工作区",
      },
      scrollArea: {
        name: "Scroll Area",
        description: "带自定义滚动条的玻璃滚动区域。",
        ariaLabel: "最近活动",
      },
      slider: {
        name: "Slider",
        description: "支持单值、区间与纵向布局的滑块。",
        label: "音量",
      },
      switch: {
        name: "Switch",
        description: "滑动时会拉伸的液态玻璃开关。",
        label: "接收通知",
      },
      toast: {
        name: "Toast",
        description: "带状态图标与操作的堆叠玻璃通知。",
        trigger: "显示通知",
        title: "更改已保存",
        descriptionText: "工作区设置已为所有人更新。",
      },
      toggle: {
        name: "Toggle",
        description: "带按下滑块的两种状态玻璃按钮。",
        label: "粗体",
      },
      toggleGroup: {
        name: "Toggle Group",
        description: "支持单选与多选的液态玻璃选中态。",
        ariaLabel: "视图",
        grid: "网格",
        list: "列表",
      },
    },
  },
  features: {
    eyebrow: "为什么是 Liquid Glass",
    title: "轻量，但不轻薄",
    description:
      "视觉效果来自 CSS 的多层叠加，交互行为交给 Base UI，主题则完全由 token 控制。",
    items: [
      {
        title: "纯 CSS 玻璃",
        description:
          "边框、高光、内阴影与背板模糊全部由 CSS 绘制，没有贴图，也没有额外运行时。",
      },
      {
        title: "真正的黑白",
        description: "中性色 token 让浅色与深色模式保持同样的黑白层次。",
      },
      {
        title: "主题 Token",
        description:
          "一套 --ui-* 变量同时服务两套主题，无需重写组件即可品牌化。",
      },
      {
        title: "默认可访问",
        description: "Base UI 提供 WAI-ARIA 语义、键盘导航与焦点管理。",
      },
    ],
  },
  quickStart: {
    eyebrow: "快速开始",
    title: "几行代码就能开始",
    description:
      "安装包、引入样式，然后组合真实组件。完整步骤见安装指南。",
    link: "安装指南",
  },
  cta: {
    title: "准备好把玻璃带进项目了吗？",
    description:
      "从文档开始，然后用 token 和 Tailwind 类把它变成你的样子。",
    readDocs: "阅读文档",
    github: "GitHub",
  },
};

const en: typeof zh = {
  hero: {
    badge: "React 19 · Tailwind CSS 4 · Base UI",
    titleLine1: "Between black and white,",
    titleLine2: "glass finds its light.",
    description:
      "Pure CSS Liquid Glass style components for React 19 and Tailwind CSS 4. Every preview is a real component, not a screenshot.",
    readDocs: "Read the docs",
    viewComponents: "View components",
    meta: ["Live components", "Light / Dark", "No image assets"],
    language: "简体中文",
    languageHref: "/zh",
    preview: {
      live: "Live",
      cardTitle: "Notification center",
      cardDescription: "The glass surface and controls are the real components.",
      switchLabel: "Enable highlights",
      switchDescription: "Show a diagonal highlight along the glass rim.",
      sliderLabel: "Highlight intensity",
      footerLabel: "Interactive",
      openSettings: "Open settings",
      dialogTitle: "Workspace settings",
      dialogDescription: "Changes apply to everyone on the team.",
      dialogSwitchLabel: "Email notifications",
      dialogSwitchDescription: "Send a summary when a teammate publishes changes.",
      cancel: "Cancel",
      save: "Save changes",
    },
  },
  components: {
    eyebrow: "Components",
    title: "Sixteen components, one language",
    description:
      "Every component shares the same glass tokens, so they compose naturally. Everything below renders directly from the UI package.",
    activity: [
      { time: "09:12", title: "Design review scheduled" },
      { time: "08:47", title: "Release notes drafted" },
      { time: "08:20", title: "Playground deployed" },
      { time: "Yesterday", title: "Glass tokens updated" },
    ],
    items: {
      accordion: {
        name: "Accordion",
        description: "Disclosure rows that share one glass surface.",
        surfaceTitle: "Glass surface",
        surfaceContent: "Content stays outside the filter.",
        tokensTitle: "Theme tokens",
        tokensContent: "One set of tokens serves light and dark.",
      },
      alertDialog: {
        name: "Alert Dialog",
        description: "A modal confirmation with built-in cancel and confirm actions.",
        trigger: "Delete project",
        title: "Delete project?",
        descriptionText:
          "This action cannot be undone. All files will be permanently removed.",
        cancel: "Cancel",
        confirm: "Delete",
      },
      button: {
        name: "Button",
        description: "Rounded glass actions with icon slots and five sizes.",
        continue: "Continue",
        create: "Create",
      },
      card: {
        name: "Card",
        description: "A composed panel with header, body, and footer.",
        previewTitle: "Glass panel",
        previewDescription: "Content stays outside the filter.",
        previewBody:
          "Place it over a detailed background and the layers appear naturally.",
      },
      checkbox: {
        name: "Checkbox",
        description: "A glass tile with an animated check and indeterminate state.",
        productUpdates: "Product updates",
        securityAlerts: "Security alerts",
      },
      dialog: {
        name: "Dialog",
        description: "A general-purpose modal with a custom action area.",
        trigger: "Edit profile",
        title: "Edit profile",
        descriptionText: "The action area accepts any number of buttons.",
        body:
          "The dialog holds the body content while the page owns its open state.",
        cancel: "Cancel",
        save: "Save",
      },
      drawer: {
        name: "Drawer",
        description: "An edge-aligned panel with swipe dismissal.",
        trigger: "Open drawer",
        title: "Workspace settings",
        descriptionText: "A glass drawer that slides in from the right.",
        switchLabel: "Email notifications",
        switchDescription: "Send a summary when a teammate publishes changes.",
        cancel: "Cancel",
        save: "Save changes",
      },
      input: {
        name: "Input",
        description: "A glass text field with labels, descriptions, and icons.",
        label: "Email",
        placeholder: "you@example.com",
      },
      popover: {
        name: "Popover",
        description: "A non-modal glass panel anchored to its trigger.",
        trigger: "Open settings",
        title: "Workspace settings",
        descriptionText: "Changes apply to everyone on the team.",
        switchLabel: "Email notifications",
      },
      progress: {
        name: "Progress",
        description: "A linear glass progress bar with determinate and indeterminate states.",
        label: "Importing workspace",
      },
      scrollArea: {
        name: "Scroll Area",
        description: "A glass panel with custom scrollbars.",
        ariaLabel: "Recent activity",
      },
      slider: {
        name: "Slider",
        description: "Single values, ranges, and vertical controls.",
        label: "Volume",
      },
      switch: {
        name: "Switch",
        description: "A liquid thumb that stretches while it moves.",
        label: "Receive notifications",
      },
      toast: {
        name: "Toast",
        description: "Stacked glass notifications with status icons and actions.",
        trigger: "Show notification",
        title: "Changes saved",
        descriptionText: "Your workspace settings were updated for everyone.",
      },
      toggle: {
        name: "Toggle",
        description: "A two-state glass button with a pressed thumb.",
        label: "Bold",
      },
      toggleGroup: {
        name: "Toggle Group",
        description: "Single and multiple selection with a liquid selected state.",
        ariaLabel: "View",
        grid: "Grid",
        list: "List",
      },
    },
  },
  features: {
    eyebrow: "Why Liquid Glass",
    title: "Lightweight, not shallow",
    description:
      "The visuals come from layered CSS, interactions come from Base UI, and theming is controlled entirely by tokens.",
    items: [
      {
        title: "CSS-only glass",
        description:
          "Borders, highlights, inner shadows, and backdrop blur are all drawn with CSS. No textures, no extra runtime.",
      },
      {
        title: "Truly monochrome",
        description:
          "Neutral tokens keep the same black-and-white depth in light and dark mode.",
      },
      {
        title: "Theme tokens",
        description:
          "One set of --ui-* variables serves both themes. Brand the material without rewriting components.",
      },
      {
        title: "Accessible by default",
        description:
          "Base UI supplies WAI-ARIA semantics, keyboard navigation, and focus management.",
      },
    ],
  },
  quickStart: {
    eyebrow: "Quick start",
    title: "A few lines to start",
    description:
      "Install the package, import the stylesheet, and compose the real components. The installation guide covers the full setup.",
    link: "Installation guide",
  },
  cta: {
    title: "Ready to bring glass into your project?",
    description:
      "Start with the docs, then make it yours with tokens and Tailwind classes.",
    readDocs: "Read the docs",
    github: "GitHub",
  },
};

export const homeCopy = { zh, en };
