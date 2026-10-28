import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/accordion relative grid w-full min-w-0 rounded-[1.5rem] text-ui-ink",
      "[--ui-accordion-divider:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      "[--ui-accordion-hover:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      "data-[disabled]:opacity-60",
      "[&_*]:box-border",
      "motion-reduce:[&_*]:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    content: "relative z-10 overflow-hidden rounded-[inherit]",
    item: [
      "group/item relative min-w-0",
      "border-b border-[var(--ui-accordion-divider)] last:border-b-0",
    ],
    header: "m-0 min-w-0",
    trigger: [
      "group/trigger relative flex w-full min-w-0 cursor-pointer select-none items-center justify-between gap-3",
      "border-b border-transparent text-left text-ui-ink outline-none",
      "min-h-[var(--ui-accordion-trigger-height)]",
      "px-[var(--ui-accordion-trigger-px)] py-[var(--ui-accordion-trigger-py)]",
      "transition-[background-color,border-color,color] duration-200 ease-out",
      "hover:bg-[var(--ui-accordion-hover)] hover:text-ui-ink-active",
      "focus-visible:z-[1] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ui-glass-focus",
      "data-[panel-open]:border-[var(--ui-accordion-divider)] data-[panel-open]:text-ui-ink-active",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    ],
    title: [
      "min-w-0 flex-1 text-[length:var(--ui-accordion-font-size)] font-medium leading-snug",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    indicator: [
      "ui-glass-chip relative inline-flex shrink-0 items-center justify-center rounded-full",
      "size-[var(--ui-accordion-indicator-size)] text-ui-ink",
      "transition-[rotate,background-color,color] duration-300 ease-[cubic-bezier(0.5,0,0,1)]",
      "group-data-[panel-open]/trigger:rotate-45",
      "motion-reduce:transition-none",
    ],
    indicatorIcon: "relative block size-[var(--ui-accordion-icon-size)]",
    indicatorBar: [
      "absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current",
      "data-[orientation=vertical]:rotate-90",
    ],
    panel: [
      "h-[var(--accordion-panel-height)] overflow-hidden text-ui-ink",
      "text-[length:var(--ui-accordion-panel-font-size)]",
      "transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "motion-reduce:transition-none",
    ],
    panelContent: [
      "px-[var(--ui-accordion-panel-px)] pb-[var(--ui-accordion-panel-pb)] pt-2",
      "leading-relaxed opacity-70",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-accordion-trigger-height:36px] [--ui-accordion-trigger-px:12px] [--ui-accordion-trigger-py:8px] [--ui-accordion-font-size:0.75rem] [--ui-accordion-indicator-size:20px] [--ui-accordion-icon-size:9px] [--ui-accordion-panel-px:12px] [--ui-accordion-panel-pb:12px] [--ui-accordion-panel-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-accordion-trigger-height:40px] [--ui-accordion-trigger-px:14px] [--ui-accordion-trigger-py:9px] [--ui-accordion-font-size:0.75rem] [--ui-accordion-indicator-size:24px] [--ui-accordion-icon-size:10px] [--ui-accordion-panel-px:14px] [--ui-accordion-panel-pb:14px] [--ui-accordion-panel-font-size:0.8125rem]",
      },
      md: {
        root: "[--ui-accordion-trigger-height:48px] [--ui-accordion-trigger-px:16px] [--ui-accordion-trigger-py:12px] [--ui-accordion-font-size:0.875rem] [--ui-accordion-indicator-size:28px] [--ui-accordion-icon-size:12px] [--ui-accordion-panel-px:16px] [--ui-accordion-panel-pb:16px] [--ui-accordion-panel-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-accordion-trigger-height:56px] [--ui-accordion-trigger-px:20px] [--ui-accordion-trigger-py:14px] [--ui-accordion-font-size:0.875rem] [--ui-accordion-indicator-size:32px] [--ui-accordion-icon-size:14px] [--ui-accordion-panel-px:20px] [--ui-accordion-panel-pb:20px] [--ui-accordion-panel-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-accordion-trigger-height:64px] [--ui-accordion-trigger-px:24px] [--ui-accordion-trigger-py:16px] [--ui-accordion-font-size:1rem] [--ui-accordion-indicator-size:36px] [--ui-accordion-icon-size:16px] [--ui-accordion-panel-px:24px] [--ui-accordion-panel-pb:24px] [--ui-accordion-panel-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
