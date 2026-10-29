import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group flex w-full min-w-0 flex-col gap-1.5 text-ui-ink",
      "data-[disabled]:cursor-not-allowed",
    ],
    label: "w-fit font-medium text-ui-ink group-data-[disabled]:opacity-60",
    control: [
      "relative isolate flex w-full min-w-0 items-center overflow-hidden",
      "h-[var(--ui-input-height)] rounded-[var(--ui-input-radius)]",
      "gap-[var(--ui-input-gap)] px-[var(--ui-input-padding)]",
      "bg-transparent text-inherit",
      "group-data-[disabled]:opacity-60",
      "group-focus-within:outline-2 group-focus-within:outline-offset-2 group-focus-within:outline-ui-glass-focus",
    ],
    glass: [
      "ui-glass ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
      "[--ui-glass-tone:brightness(1)] [--ui-glass-contrast:1.1]",
      "[--ui-glass-border:color-mix(in_srgb,var(--ui-ink)_18%,transparent)]",
      "[--ui-glass-surface:color-mix(in_srgb,var(--ui-ink)_3%,transparent)]",
      "[--ui-glass-rim:color-mix(in_srgb,var(--ui-ink)_10%,transparent)]",
      "[--ui-shadow-glass:inset_0_1px_0_rgb(255_255_255/0.45),inset_0_0_0_1px_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.08)]",
      "[--ui-glass-rim-inset:4px] [--ui-glass-rim-blur:2px]",
    ],
    overlay: "ui-glass-rim",
    leadingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink opacity-55",
      "[&_svg]:block [&_svg]:shrink-0",
    ],
    input: [
      "relative z-[1] h-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-ui-ink",
      "placeholder:text-ui-ink/40",
      "outline-none focus:outline-none",
      "disabled:cursor-not-allowed",
      "[&::-webkit-search-cancel-button]:appearance-none",
    ],
    trailingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink opacity-55",
      "[&_svg]:block [&_svg]:shrink-0",
    ],
    description: "text-ui-ink opacity-60 group-data-[disabled]:opacity-50",
  },
  variants: {
    size: {
      xs: {
        root: "gap-1 text-xs",
        control:
          "[--ui-input-height:28px] [--ui-input-radius:8px] [--ui-input-padding:10px] [--ui-input-gap:6px]",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      sm: {
        root: "gap-1 text-xs",
        control:
          "[--ui-input-height:32px] [--ui-input-radius:9px] [--ui-input-padding:12px] [--ui-input-gap:7px]",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      md: {
        root: "gap-1.5 text-sm",
        control:
          "[--ui-input-height:36px] [--ui-input-radius:10px] [--ui-input-padding:12px] [--ui-input-gap:8px]",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      lg: {
        root: "gap-1.5 text-sm",
        control:
          "[--ui-input-height:40px] [--ui-input-radius:11px] [--ui-input-padding:14px] [--ui-input-gap:8px]",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      xl: {
        root: "gap-2 text-base",
        control:
          "[--ui-input-height:44px] [--ui-input-radius:12px] [--ui-input-padding:14px] [--ui-input-gap:10px]",
        leadingIcon: "[&_svg]:size-6",
        trailingIcon: "[&_svg]:size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
