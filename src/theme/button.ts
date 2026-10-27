import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group relative z-[500] inline-flex items-center min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0 [filter:contrast(3)]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    base: [
      "relative flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center overflow-hidden rounded-full",
      "box-border",
      "border border-double border-glass-border bg-glass-surface",
      "shadow-glass",
      "backdrop-blur-[2px] [filter:brightness(0.9)]",
      "transition-[background-color,translate,scale] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "before:pointer-events-none before:absolute before:left-1/2 before:top-[35%] before:z-[1] before:h-[calc(100%_-_16px)] before:w-[calc(100%_-_16px)] before:-translate-x-1/2 before:rounded-[inherit] before:border before:border-glass-inner-border before:blur-[8px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,var(--ui-glass-highlight)_0%,transparent_var(--ui-glass-glare-stop),transparent_calc(100%_-_var(--ui-glass-glare-stop)),var(--ui-glass-highlight)_100%)] after:blur-[7px] after:content-['']",
      "group-hover:-translate-y-[3px] group-hover:bg-transparent group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    label: [
      "min-w-0 truncate [font-family:system-ui,-apple-system,sans-serif] font-normal text-ink",
      "group-active:text-ink-active",
    ],
    leadingIcon: [
      "inline-flex shrink-0 items-center justify-center text-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "inline-flex shrink-0 items-center justify-center text-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-full border border-glass-rim blur-[1px]",
    ],
  },
  variants: {
    size: {
      xs: {
        base: "h-6 px-2.5 text-xs gap-1",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      sm: {
        base: "h-7 px-3 text-xs gap-1.5",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      md: {
        base: "h-8 px-3 text-sm gap-1.5",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      lg: {
        base: "h-9 px-3.5 text-sm gap-2",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      xl: {
        base: "h-10 px-3.5 text-base gap-2",
        leadingIcon: "[&_svg]:size-6",
        trailingIcon: "[&_svg]:size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});