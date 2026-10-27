import { tv } from "tailwind-variants";

const thumbGlass = [
  "bg-[var(--ui-toggle-group-thumb)]",
  "shadow-[var(--ui-toggle-group-thumb-shadow)]",
];

export default tv({
  slots: {
    root: [
      "ui-glass",
      "group/toggle-group relative isolate inline-flex min-w-0 max-w-full items-center",
      "rounded-full",
      "p-[var(--ui-toggle-group-padding)] gap-[var(--ui-toggle-group-gap)]",
      "[--ui-toggle-group-indicator-x:0px] [--ui-toggle-group-indicator-y:0px]",
      "[--ui-toggle-group-indicator-width:0px] [--ui-toggle-group-indicator-height:0px]",
      "[--ui-toggle-group-origin:center]",
      "[--ui-toggle-group-thumb:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      "[--ui-toggle-group-thumb-rim:color-mix(in_srgb,var(--ui-ink)_16%,transparent)]",
      "[--ui-toggle-group-thumb-shadow:inset_2px_1px_0_-1px_rgb(255_255_255/0.9),inset_-1.5px_-1px_0_-1px_rgb(255_255_255/0.7),inset_-2px_-6px_1px_-5px_rgb(255_255_255/0.5),inset_-1px_2px_3px_-1px_rgb(0_0_0/0.16),inset_0_-4px_1px_-2px_rgb(0_0_0/0.08),0_3px_6px_rgb(0_0_0/0.08)]",
      "[font-family:system-ui,-apple-system,sans-serif]",
      "transition-[background-color,box-shadow] duration-[400ms] ease-[cubic-bezier(1,0,0.4,1)]",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[orientation=vertical]:rounded-[var(--ui-toggle-group-vertical-radius)]",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "[&_*]:box-border",
      "motion-reduce:transition-none motion-reduce:[&_*]:transition-none",
    ],
    glass: [
      "ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]",
    ],
    indicator: [
      "pointer-events-none absolute left-0 top-0 z-0",
      "h-[var(--ui-toggle-group-indicator-height)] w-[var(--ui-toggle-group-indicator-width)]",
      "[translate:var(--ui-toggle-group-indicator-x)_var(--ui-toggle-group-indicator-y)]",
      "[transform-origin:var(--ui-toggle-group-origin)]",
      "rounded-full border border-[var(--ui-toggle-group-thumb-rim)]",
      ...thumbGlass,
      "[transition:translate_400ms_cubic-bezier(1,0,0.4,1),width_400ms_cubic-bezier(1,0,0.4,1),height_400ms_cubic-bezier(1,0,0.4,1),scale_220ms_ease,opacity_200ms_ease,background-color_400ms_cubic-bezier(1,0,0.4,1),box-shadow_400ms_cubic-bezier(1,0,0.4,1)]",
      "data-[visible=false]:opacity-0",
      "group-data-[multiple]/toggle-group:hidden",
      "group-data-[orientation=horizontal]/toggle-group:data-[animating=true]:scale-x-110",
      "group-data-[orientation=vertical]/toggle-group:data-[animating=true]:scale-y-110",
      "motion-reduce:transition-none",
    ],
    item: [
      "relative z-10 inline-flex shrink-0 cursor-pointer select-none items-center justify-center",
      "h-[var(--ui-toggle-group-item-height)] gap-[var(--ui-toggle-group-item-gap)]",
      "rounded-full bg-transparent px-[var(--ui-toggle-group-item-px)]",
      "text-[length:var(--ui-toggle-group-font-size)] text-ink",
      "outline-offset-2 focus-visible:outline-2 focus-visible:outline-glass-focus",
      "transition-[color,background-color,box-shadow,scale] duration-200",
      "hover:text-ink-active data-[pressed]:cursor-default data-[pressed]:text-ink",
      "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-[cubic-bezier(0.5,0,0,1)]",
      "[&:hover_svg]:scale-110 data-[pressed]:[&_svg]:scale-100",
      "disabled:pointer-events-none disabled:opacity-50",
      "group-data-[orientation=vertical]/toggle-group:self-stretch",
      "group-data-[multiple]/toggle-group:data-[pressed]:bg-[var(--ui-toggle-group-thumb)]",
      "group-data-[multiple]/toggle-group:data-[pressed]:shadow-[var(--ui-toggle-group-thumb-shadow)]",
      "group-data-[multiple]/toggle-group:data-[pressed]:ring-1 group-data-[multiple]/toggle-group:data-[pressed]:ring-glass-rim group-data-[multiple]/toggle-group:data-[pressed]:ring-inset",
    ],
    content:
      "inline-flex min-w-0 items-center justify-center gap-[var(--ui-toggle-group-item-gap)]",
    icon: "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--ui-toggle-group-icon-size)] [&_svg]:shrink-0",
    label: "min-w-0 truncate leading-none",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-toggle-group-item-height:24px] [--ui-toggle-group-item-px:8px] [--ui-toggle-group-font-size:0.75rem] [--ui-toggle-group-icon-size:16px] [--ui-toggle-group-item-gap:4px] [--ui-toggle-group-padding:3px] [--ui-toggle-group-gap:2px] [--ui-toggle-group-vertical-radius:15px]",
      },
      sm: {
        root: "[--ui-toggle-group-item-height:28px] [--ui-toggle-group-item-px:10px] [--ui-toggle-group-font-size:0.75rem] [--ui-toggle-group-icon-size:16px] [--ui-toggle-group-item-gap:4px] [--ui-toggle-group-padding:3px] [--ui-toggle-group-gap:2px] [--ui-toggle-group-vertical-radius:17px]",
      },
      md: {
        root: "[--ui-toggle-group-item-height:32px] [--ui-toggle-group-item-px:12px] [--ui-toggle-group-font-size:0.875rem] [--ui-toggle-group-icon-size:20px] [--ui-toggle-group-item-gap:6px] [--ui-toggle-group-padding:4px] [--ui-toggle-group-gap:2px] [--ui-toggle-group-vertical-radius:20px]",
      },
      lg: {
        root: "[--ui-toggle-group-item-height:36px] [--ui-toggle-group-item-px:14px] [--ui-toggle-group-font-size:0.875rem] [--ui-toggle-group-icon-size:20px] [--ui-toggle-group-item-gap:6px] [--ui-toggle-group-padding:4px] [--ui-toggle-group-gap:3px] [--ui-toggle-group-vertical-radius:22px]",
      },
      xl: {
        root: "[--ui-toggle-group-item-height:40px] [--ui-toggle-group-item-px:16px] [--ui-toggle-group-font-size:1rem] [--ui-toggle-group-icon-size:24px] [--ui-toggle-group-item-gap:8px] [--ui-toggle-group-padding:4px] [--ui-toggle-group-gap:3px] [--ui-toggle-group-vertical-radius:24px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
