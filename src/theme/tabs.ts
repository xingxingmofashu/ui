import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/tabs flex w-full min-w-0 flex-col text-ui-ink",
      "gap-[var(--ui-tabs-gap)]",
      "data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-start",
      "[--ui-tabs-thumb:color-mix(in_srgb,var(--ui-ink)_10%,transparent)]",
      "[--ui-tabs-thumb-rim:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      "[--ui-tabs-thumb-shadow:inset_1px_1px_0_-1px_rgb(255_255_255/0.8),inset_-1px_-1px_0_-1px_rgb(255_255_255/0.5),inset_0_-4px_1px_-3px_rgb(0_0_0/0.12),0_2px_5px_rgb(0_0_0/0.1)]",
      "motion-reduce:[&_*]:transition-none",
    ],
    list: [
      "relative isolate flex w-fit max-w-full min-w-0 items-center",
      "rounded-full p-[var(--ui-tabs-list-padding)] gap-[var(--ui-tabs-list-gap)]",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[orientation=vertical]:rounded-[var(--ui-tabs-vertical-radius)]",
      "[&_*]:box-border",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    indicator: [
      "pointer-events-none absolute z-[1] rounded-full",
      "left-[var(--active-tab-left)] top-[var(--active-tab-top)]",
      "h-[var(--active-tab-height)] w-[var(--active-tab-width)]",
      "bg-[var(--ui-tabs-thumb)] ring-1 ring-[var(--ui-tabs-thumb-rim)] ring-inset",
      "shadow-[var(--ui-tabs-thumb-shadow)]",
      "transition-[left,top,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    ],
    tab: [
      "relative z-[2] inline-flex shrink-0 cursor-pointer select-none items-center justify-center",
      "h-[var(--ui-tabs-tab-height)] gap-[var(--ui-tabs-tab-gap)]",
      "rounded-full bg-transparent px-[var(--ui-tabs-tab-px)]",
      "text-[length:var(--ui-tabs-font-size)] font-medium text-ui-ink/65",
      "outline-none transition-colors duration-200",
      "hover:text-ui-ink",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "data-[active]:text-ui-ink",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
      "data-[orientation=vertical]:self-stretch",
    ],
    icon: "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--ui-tabs-icon-size)] [&_svg]:shrink-0",
    label: "min-w-0 truncate leading-none",
    panels: "relative z-10 min-w-0 flex-1",
    panel: [
      "min-w-0 text-ui-ink outline-none",
      "text-[length:var(--ui-tabs-panel-font-size)]",
      "transition-[opacity,translate] duration-200 ease-out",
      "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
      "data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
    ],
    panelContent: "leading-relaxed text-ui-ink/70",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-tabs-gap:12px] [--ui-tabs-list-padding:3px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:26px] [--ui-tabs-tab-px:10px] [--ui-tabs-font-size:0.75rem] [--ui-tabs-icon-size:14px] [--ui-tabs-tab-gap:4px] [--ui-tabs-vertical-radius:16px] [--ui-tabs-panel-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-tabs-gap:14px] [--ui-tabs-list-padding:3px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:30px] [--ui-tabs-tab-px:12px] [--ui-tabs-font-size:0.75rem] [--ui-tabs-icon-size:16px] [--ui-tabs-tab-gap:4px] [--ui-tabs-vertical-radius:18px] [--ui-tabs-panel-font-size:0.8125rem]",
      },
      md: {
        root: "[--ui-tabs-gap:16px] [--ui-tabs-list-padding:4px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:34px] [--ui-tabs-tab-px:14px] [--ui-tabs-font-size:0.875rem] [--ui-tabs-icon-size:18px] [--ui-tabs-tab-gap:6px] [--ui-tabs-vertical-radius:20px] [--ui-tabs-panel-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-tabs-gap:18px] [--ui-tabs-list-padding:4px] [--ui-tabs-list-gap:3px] [--ui-tabs-tab-height:38px] [--ui-tabs-tab-px:16px] [--ui-tabs-font-size:0.875rem] [--ui-tabs-icon-size:20px] [--ui-tabs-tab-gap:6px] [--ui-tabs-vertical-radius:22px] [--ui-tabs-panel-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-tabs-gap:22px] [--ui-tabs-list-padding:5px] [--ui-tabs-list-gap:3px] [--ui-tabs-tab-height:44px] [--ui-tabs-tab-px:20px] [--ui-tabs-font-size:1rem] [--ui-tabs-icon-size:22px] [--ui-tabs-tab-gap:8px] [--ui-tabs-vertical-radius:26px] [--ui-tabs-panel-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
