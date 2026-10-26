import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    base: [
      "group relative z-[500] inline-flex items-center min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0 [filter:contrast(3)]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    surface: [
      "relative flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center rounded-full",
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
      "[filter:var(--ui-drop-shadow-label)]",
      "group-active:text-ink-active",
    ],
    leadingIcon: [
      "inline-flex shrink-0 items-center justify-center [&_svg]:block [&_svg]:shrink-0 [&_svg]:[filter:var(--ui-drop-shadow-icon)]",
    ],
    trailingIcon: [
      "inline-flex h-[53.33%] aspect-square shrink-0 items-center justify-center rounded-full text-ink",
      "transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:scale-110 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100",
      "[&_svg]:block [&_svg]:shrink-0 [&_svg]:[filter:var(--ui-drop-shadow-icon)]",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-full border border-glass-rim blur-[1px]",
    ],
  },
  variants: {
    size: {
      xs: {
        surface: "px-2.5 py-1 text-xs gap-1",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      sm: {
        surface: "px-3 py-1.5 text-xs gap-1.5",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      md: {
        surface: "px-3 py-1.5 text-sm gap-1.5",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      lg: {
        surface: "px-3.5 py-2 text-sm gap-2",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      xl: {
        surface: "px-3.5 py-2 text-base gap-2",
        leadingIcon: "[&_svg]:size-6",
        trailingIcon: "[&_svg]:size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default button;
