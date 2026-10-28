import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group relative inline-flex items-center min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    base: [
      "relative isolate flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center rounded-full",
      "box-border",
      "transition-[background-color,translate,scale] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:-translate-y-[3px] group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
      "transition-[background-color] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:bg-transparent",
      "motion-reduce:transition-none",
    ],
    label: [
      "relative z-[1] min-w-0 truncate font-normal text-ui-ink",
      "group-active:text-ui-ink-active",
    ],
    leadingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    overlay: "ui-glass-rim",
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