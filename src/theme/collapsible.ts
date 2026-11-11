import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/collapsible relative grid w-full min-w-0 rounded-[1.5rem] text-ui-ink",
      "[--ui-collapsible-divider:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      "[--ui-collapsible-hover:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      "data-[disabled]:opacity-60",
      "[&_*]:box-border",
      "motion-reduce:[&_*]:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
      // Keep the filtered glass on a stable compositor layer so the panel
      // height transition does not re-rasterize the whole surface each frame.
      "will-change-transform",
    ],
    overlay: "ui-glass-rim",
    content: "relative z-10 overflow-hidden rounded-[inherit]",
    trigger: [
      "group/trigger relative flex w-full min-w-0 cursor-pointer select-none items-center justify-between gap-3",
      "border-b border-transparent text-left text-ui-ink outline-none",
      "min-h-[var(--ui-collapsible-trigger-height)]",
      "px-[var(--ui-collapsible-trigger-px)] py-[var(--ui-collapsible-trigger-py)]",
      "transition-[background-color,border-color,color] duration-200 ease-out",
      "hover:bg-[var(--ui-collapsible-hover)] hover:text-ui-ink-active",
      "focus-visible:z-[1] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ui-glass-focus",
      "data-[panel-open]:border-[var(--ui-collapsible-divider)] data-[panel-open]:text-ui-ink-active",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    ],
    title: [
      "min-w-0 flex-1 text-[length:var(--ui-collapsible-font-size)] font-medium leading-snug",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    indicator: [
      "ui-glass-chip relative inline-flex shrink-0 items-center justify-center rounded-full",
      "size-[var(--ui-collapsible-indicator-size)] text-ui-ink",
      "transition-[rotate,background-color,color] duration-300 ease-[cubic-bezier(0.5,0,0,1)]",
      "group-data-[panel-open]/trigger:rotate-45",
      "motion-reduce:transition-none",
    ],
    indicatorIcon: "block size-[var(--ui-collapsible-icon-size)]",
    panel: [
      "h-[var(--collapsible-panel-height)] overflow-hidden text-ui-ink",
      "text-[length:var(--ui-collapsible-panel-font-size)]",
      "transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "motion-reduce:transition-none",
    ],
    panelContent: [
      "px-[var(--ui-collapsible-panel-px)] pb-[var(--ui-collapsible-panel-pb)] pt-2",
      "leading-relaxed opacity-70",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-collapsible-trigger-height:36px] [--ui-collapsible-trigger-px:12px] [--ui-collapsible-trigger-py:8px] [--ui-collapsible-font-size:0.75rem] [--ui-collapsible-indicator-size:20px] [--ui-collapsible-icon-size:9px] [--ui-collapsible-panel-px:12px] [--ui-collapsible-panel-pb:12px] [--ui-collapsible-panel-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-collapsible-trigger-height:40px] [--ui-collapsible-trigger-px:14px] [--ui-collapsible-trigger-py:9px] [--ui-collapsible-font-size:0.75rem] [--ui-collapsible-indicator-size:24px] [--ui-collapsible-icon-size:10px] [--ui-collapsible-panel-px:14px] [--ui-collapsible-panel-pb:14px] [--ui-collapsible-panel-font-size:0.8125rem]",
      },
      md: {
        root: "[--ui-collapsible-trigger-height:48px] [--ui-collapsible-trigger-px:16px] [--ui-collapsible-trigger-py:12px] [--ui-collapsible-font-size:0.875rem] [--ui-collapsible-indicator-size:28px] [--ui-collapsible-icon-size:12px] [--ui-collapsible-panel-px:16px] [--ui-collapsible-panel-pb:16px] [--ui-collapsible-panel-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-collapsible-trigger-height:56px] [--ui-collapsible-trigger-px:20px] [--ui-collapsible-trigger-py:14px] [--ui-collapsible-font-size:0.875rem] [--ui-collapsible-indicator-size:32px] [--ui-collapsible-icon-size:14px] [--ui-collapsible-panel-px:20px] [--ui-collapsible-panel-pb:20px] [--ui-collapsible-panel-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-collapsible-trigger-height:64px] [--ui-collapsible-trigger-px:24px] [--ui-collapsible-trigger-py:16px] [--ui-collapsible-font-size:1rem] [--ui-collapsible-indicator-size:36px] [--ui-collapsible-icon-size:16px] [--ui-collapsible-panel-px:24px] [--ui-collapsible-panel-pb:24px] [--ui-collapsible-panel-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
