import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/toolbar relative isolate inline-flex min-w-0 max-w-full items-center",
      "rounded-full p-[var(--ui-toolbar-padding)] gap-[var(--ui-toolbar-gap)]",
      "text-ui-ink",
      "[--ui-toolbar-hover:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      "[--ui-toolbar-thumb:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      "[--ui-toolbar-thumb-rim:color-mix(in_srgb,var(--ui-ink)_16%,transparent)]",
      "[--ui-toolbar-thumb-shadow:inset_2px_1px_0_-1px_rgb(255_255_255/0.9),inset_-1.5px_-1px_0_-1px_rgb(255_255_255/0.7),inset_-2px_-6px_1px_-5px_rgb(255_255_255/0.5),inset_-1px_2px_3px_-1px_rgb(0_0_0/0.16),inset_0_-4px_1px_-2px_rgb(0_0_0/0.08),0_3px_6px_rgb(0_0_0/0.08)]",
      "[--ui-toolbar-divider:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[orientation=vertical]:rounded-[var(--ui-toolbar-vertical-radius)]",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "[&_*]:box-border",
      "motion-reduce:[&_*]:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    group: [
      "relative z-10 inline-flex min-w-0 items-center gap-[var(--ui-toolbar-group-gap)]",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[disabled]:opacity-75",
    ],
    item: [
      "relative z-10 inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap",
      "h-[var(--ui-toolbar-item-height)] gap-[var(--ui-toolbar-item-gap)]",
      "rounded-full bg-transparent px-[var(--ui-toolbar-item-px)]",
      "text-[length:var(--ui-toolbar-font-size)] text-ui-ink",
      "outline-offset-2 focus-visible:outline-2 focus-visible:outline-ui-glass-focus",
      "transition-[background-color,color] duration-200 ease-out",
      "hover:bg-[var(--ui-toolbar-hover)] hover:text-ui-ink-active",
      "data-[pressed]:text-ui-ink",
      "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-[cubic-bezier(0.5,0,0,1)]",
      "[&:hover_svg]:scale-110 data-[pressed]:[&_svg]:scale-100",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[orientation=vertical]:w-full data-[orientation=vertical]:aspect-auto",
      "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full",
      "before:bg-[var(--ui-toolbar-thumb)] before:ring-1 before:ring-inset before:ring-[var(--ui-toolbar-thumb-rim)]",
      "before:shadow-[var(--ui-toolbar-thumb-shadow)]",
      "before:opacity-0 before:scale-95",
      "before:transition-[opacity,scale] before:duration-200 before:ease-out",
      "data-[pressed]:before:opacity-100 data-[pressed]:before:scale-100",
      "motion-reduce:before:transition-none",
    ],
    content:
      "relative z-10 inline-flex min-w-0 items-center justify-center gap-[var(--ui-toolbar-item-gap)]",
    icon: "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--ui-toolbar-icon-size)] [&_svg]:shrink-0",
    label: "min-w-0 truncate leading-none",
    separator: [
      "relative z-10 shrink-0 rounded-full bg-[var(--ui-toolbar-divider)]",
      "data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:h-[var(--ui-toolbar-separator-length)] data-[orientation=vertical]:w-px",
      "data-[orientation=horizontal]:my-0.5 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-toolbar-item-height:24px] [--ui-toolbar-item-px:8px] [--ui-toolbar-font-size:0.75rem] [--ui-toolbar-icon-size:16px] [--ui-toolbar-item-gap:4px] [--ui-toolbar-padding:3px] [--ui-toolbar-gap:2px] [--ui-toolbar-group-gap:2px] [--ui-toolbar-vertical-radius:15px] [--ui-toolbar-separator-length:16px]",
      },
      sm: {
        root: "[--ui-toolbar-item-height:28px] [--ui-toolbar-item-px:10px] [--ui-toolbar-font-size:0.75rem] [--ui-toolbar-icon-size:16px] [--ui-toolbar-item-gap:4px] [--ui-toolbar-padding:3px] [--ui-toolbar-gap:2px] [--ui-toolbar-group-gap:2px] [--ui-toolbar-vertical-radius:17px] [--ui-toolbar-separator-length:18px]",
      },
      md: {
        root: "[--ui-toolbar-item-height:32px] [--ui-toolbar-item-px:12px] [--ui-toolbar-font-size:0.875rem] [--ui-toolbar-icon-size:20px] [--ui-toolbar-item-gap:6px] [--ui-toolbar-padding:4px] [--ui-toolbar-gap:2px] [--ui-toolbar-group-gap:2px] [--ui-toolbar-vertical-radius:20px] [--ui-toolbar-separator-length:20px]",
      },
      lg: {
        root: "[--ui-toolbar-item-height:36px] [--ui-toolbar-item-px:14px] [--ui-toolbar-font-size:0.875rem] [--ui-toolbar-icon-size:20px] [--ui-toolbar-item-gap:6px] [--ui-toolbar-padding:4px] [--ui-toolbar-gap:3px] [--ui-toolbar-group-gap:3px] [--ui-toolbar-vertical-radius:22px] [--ui-toolbar-separator-length:22px]",
      },
      xl: {
        root: "[--ui-toolbar-item-height:40px] [--ui-toolbar-item-px:16px] [--ui-toolbar-font-size:1rem] [--ui-toolbar-icon-size:24px] [--ui-toolbar-item-gap:8px] [--ui-toolbar-padding:4px] [--ui-toolbar-gap:3px] [--ui-toolbar-group-gap:3px] [--ui-toolbar-vertical-radius:24px] [--ui-toolbar-separator-length:24px]",
      },
    },
    iconOnly: {
      true: {
        item: "aspect-square px-0",
      },
    },
  },
  defaultVariants: {
    size: "md",
    iconOnly: false,
  },
});
