import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group relative inline-flex min-w-0 cursor-pointer select-none items-start align-top text-ui-ink",
      "touch-none [-webkit-tap-highlight-color:transparent]",
      "focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
      "data-[readonly]:cursor-default",
    ],
    box: [
      "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
      "h-[var(--ui-checkbox-size)] w-[var(--ui-checkbox-size)]",
      "rounded-[var(--ui-checkbox-radius)]",
      "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ui-glass-focus",
      "transition-[scale] duration-200 ease-out group-active:scale-95",
      "motion-reduce:transition-none",
      "[--ui-glass-tone:brightness(1)] [--ui-glass-contrast:1.1]",
      "[--ui-glass-border:color-mix(in_srgb,var(--ui-ink)_26%,transparent)]",
      "[--ui-glass-rim:var(--ui-checkbox-rim)]",
      "[--ui-glass-surface:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      "[--ui-shadow-glass:var(--ui-checkbox-shadow)]",
      "[--ui-glass-rim-inset:2px]",
    ],
    fill: [
      "absolute inset-0 z-0 rounded-[inherit] bg-ui-ink",
      "[background-image:linear-gradient(145deg,color-mix(in_srgb,var(--ui-ink)_88%,var(--ui-dialog-surface)),var(--ui-ink))]",
      "scale-0 transition-transform duration-200 ease-out",
      "group-data-[checked]:scale-100 group-data-[indeterminate]:scale-100",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass",
      "pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    indicator: [
      "relative z-10 flex items-center justify-center text-[var(--ui-checkbox-mark)]",
      "scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out",
      "group-data-[checked]:scale-100 group-data-[checked]:opacity-100",
      "group-data-[indeterminate]:scale-100 group-data-[indeterminate]:opacity-100",
      "motion-reduce:transition-none",
    ],
    indicatorIcon: "block size-[var(--ui-checkbox-icon-size)]",
    wrapper: "ms-[var(--ui-checkbox-gap)] min-w-0",
    label:
      "block font-medium text-ui-ink leading-[var(--ui-checkbox-size)]",
    description: "block text-ui-ink opacity-60",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-checkbox-size:16px] [--ui-checkbox-radius:5px] [--ui-checkbox-icon-size:10px] [--ui-checkbox-gap:6px]",
        wrapper: "text-xs",
      },
      sm: {
        root: "[--ui-checkbox-size:18px] [--ui-checkbox-radius:5px] [--ui-checkbox-icon-size:11px] [--ui-checkbox-gap:7px]",
        wrapper: "text-xs",
      },
      md: {
        root: "[--ui-checkbox-size:20px] [--ui-checkbox-radius:6px] [--ui-checkbox-icon-size:12px] [--ui-checkbox-gap:8px]",
        wrapper: "text-sm",
      },
      lg: {
        root: "[--ui-checkbox-size:24px] [--ui-checkbox-radius:7px] [--ui-checkbox-icon-size:14px] [--ui-checkbox-gap:9px]",
        wrapper: "text-sm",
      },
      xl: {
        root: "[--ui-checkbox-size:28px] [--ui-checkbox-radius:8px] [--ui-checkbox-icon-size:16px] [--ui-checkbox-gap:10px]",
        wrapper: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
