import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/radio-group flex w-full min-w-0 flex-col text-ui-ink",
      "gap-[var(--ui-radio-group-gap)]",
    ],
    header: "flex min-w-0 flex-col gap-1",
    label: [
      "font-medium text-ui-ink",
      "text-[length:var(--ui-radio-group-label-size)]",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description: [
      "text-ui-ink opacity-60 leading-relaxed",
      "text-[length:var(--ui-radio-group-description-size)]",
    ],
    items: "flex min-w-0 flex-col gap-[var(--ui-radio-group-item-gap)]",
    item: [
      "group relative inline-flex min-w-0 cursor-pointer select-none items-start align-top text-ui-ink",
      "touch-none [-webkit-tap-highlight-color:transparent]",
      "focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
      "data-[readonly]:cursor-default",
    ],
    box: [
      "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
      "h-[var(--ui-radio-size)] w-[var(--ui-radio-size)] rounded-full",
      "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ui-glass-focus",
      "transition-[scale] duration-200 ease-out group-active:scale-95",
      "motion-reduce:transition-none",
      "[--ui-glass-tone:brightness(1)] [--ui-glass-contrast:1.1]",
      "[--ui-glass-border:color-mix(in_srgb,var(--ui-ink)_26%,transparent)]",
      "[--ui-glass-rim:rgb(255_255_255/0.16)]",
      "[--ui-glass-surface:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      "[--ui-shadow-glass:inset_0_0_0_1px_color-mix(in_srgb,var(--ui-ink)_6%,transparent),0_1px_2px_rgb(0_0_0/0.3)]",
      "[--ui-glass-rim-inset:2px]",
    ],
    glass: [
      "ui-glass",
      "pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    indicator: [
      "relative z-10 flex items-center justify-center",
      "scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out",
      "group-data-[checked]:scale-100 group-data-[checked]:opacity-100",
      "motion-reduce:transition-none",
    ],
    dot: [
      "block rounded-full bg-ui-ink",
      "size-[var(--ui-radio-dot-size)]",
      "shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    ],
    wrapper: "ms-[var(--ui-radio-gap)] min-w-0",
    itemLabel: "block font-medium text-ui-ink leading-[var(--ui-radio-size)]",
    itemDescription: "block text-ui-ink opacity-60",
  },
  variants: {
    size: {
      xs: {
        root: [
          "[--ui-radio-size:16px] [--ui-radio-dot-size:8px] [--ui-radio-gap:6px]",
          "[--ui-radio-group-gap:10px] [--ui-radio-group-item-gap:10px]",
          "[--ui-radio-group-label-size:0.75rem] [--ui-radio-group-description-size:0.75rem]",
        ],
        wrapper: "text-xs",
      },
      sm: {
        root: [
          "[--ui-radio-size:18px] [--ui-radio-dot-size:9px] [--ui-radio-gap:7px]",
          "[--ui-radio-group-gap:10px] [--ui-radio-group-item-gap:10px]",
          "[--ui-radio-group-label-size:0.75rem] [--ui-radio-group-description-size:0.75rem]",
        ],
        wrapper: "text-xs",
      },
      md: {
        root: [
          "[--ui-radio-size:20px] [--ui-radio-dot-size:10px] [--ui-radio-gap:8px]",
          "[--ui-radio-group-gap:12px] [--ui-radio-group-item-gap:12px]",
          "[--ui-radio-group-label-size:0.875rem] [--ui-radio-group-description-size:0.875rem]",
        ],
        wrapper: "text-sm",
      },
      lg: {
        root: [
          "[--ui-radio-size:24px] [--ui-radio-dot-size:12px] [--ui-radio-gap:9px]",
          "[--ui-radio-group-gap:12px] [--ui-radio-group-item-gap:14px]",
          "[--ui-radio-group-label-size:0.875rem] [--ui-radio-group-description-size:0.875rem]",
        ],
        wrapper: "text-sm",
      },
      xl: {
        root: [
          "[--ui-radio-size:28px] [--ui-radio-dot-size:14px] [--ui-radio-gap:10px]",
          "[--ui-radio-group-gap:14px] [--ui-radio-group-item-gap:16px]",
          "[--ui-radio-group-label-size:1rem] [--ui-radio-group-description-size:1rem]",
        ],
        wrapper: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
