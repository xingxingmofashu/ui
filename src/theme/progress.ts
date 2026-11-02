import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/progress relative flex w-full min-w-0 flex-col gap-[var(--ui-progress-gap)] text-ui-ink",
      "[--ui-progress-track:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      "[--ui-progress-fill-from:var(--ui-ink)] [--ui-progress-fill-to:var(--ui-ink-active)]",
      "[--ui-progress-glow:color-mix(in_srgb,var(--ui-ink)_28%,transparent)]",
      "[--ui-progress-height:6px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
    ],
    header: "flex min-w-0 items-baseline justify-between gap-3",
    label: [
      "min-w-0 truncate font-medium text-ui-ink",
      "text-[length:var(--ui-progress-font-size)]",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    value: [
      "ms-auto shrink-0 font-mono tabular-nums text-ui-ink opacity-60",
      "text-[length:calc(var(--ui-progress-font-size)*0.875)]",
    ],
    track: [
      "relative h-[var(--ui-progress-height)] w-full overflow-hidden rounded-full",
      "border border-ui-glass-border bg-[var(--ui-progress-track)]",
      "shadow-[inset_0_1px_2px_rgb(0_0_0/0.14),inset_0_-1px_0_rgb(255_255_255/0.35)]",
      "[backdrop-filter:blur(2px)] [-webkit-backdrop-filter:blur(2px)]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-full before:bg-[linear-gradient(180deg,rgb(255_255_255/0.24),transparent_60%)] before:content-['']",
    ],
    indicator: [
      "relative h-full rounded-full",
      "bg-[linear-gradient(117deg,var(--ui-progress-fill-from)_0%,var(--ui-progress-fill-to)_100%)]",
      "shadow-[0_0_10px_var(--ui-progress-glow),inset_0_1px_0_rgb(255_255_255/0.35)]",
      "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(180deg,rgb(255_255_255/0.3),transparent_60%)] after:content-['']",
      "data-[indeterminate]:w-[38%] data-[indeterminate]:[animation:ui-progress-indeterminate_1.4s_ease-in-out_infinite]",
      "motion-reduce:transition-none motion-reduce:data-[indeterminate]:[animation:none]",
    ],
    description: [
      "min-w-0 leading-relaxed text-ui-ink opacity-60",
      "text-[length:var(--ui-progress-font-size)]",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-progress-height:4px] [--ui-progress-gap:6px] [--ui-progress-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-progress-height:5px] [--ui-progress-gap:6px] [--ui-progress-font-size:0.75rem]",
      },
      md: {
        root: "[--ui-progress-height:6px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-progress-height:8px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-progress-height:10px] [--ui-progress-gap:10px] [--ui-progress-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
