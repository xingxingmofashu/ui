import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    base: [
      "group relative z-[500] inline-flex min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    surface: [
      "relative flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center rounded-full",
      "border border-double border-glass-border bg-glass-surface",
      "shadow-glass",
      "backdrop-blur-[2px] [filter:brightness(0.9)_contrast(3)]",
      "transition-[background-color,transform] duration-[600ms] ease-in-out group-active:duration-[120ms]",
      "before:pointer-events-none before:absolute before:left-1/2 before:top-[35%] before:z-[1] before:h-[calc(100%_-_16px)] before:w-[calc(100%_-_16px)] before:-translate-x-1/2 before:rounded-[inherit] before:border before:border-glass-inner-border before:blur-[8px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,var(--ui-glass-highlight)_0%,transparent_15%,transparent_85%,var(--ui-glass-highlight)_100%)] after:blur-[7px] after:content-['']",
      "group-hover:-translate-y-[3px] group-hover:bg-transparent group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    label: [
      "min-w-0 truncate font-[system-ui,-apple-system,sans-serif] font-normal text-ink",
      "group-active:text-ink-active",
    ],
    leadingIcon: [
      "grid shrink-0 place-items-center [&_svg]:block [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "grid h-[53.33%] aspect-square shrink-0 place-items-center rounded-full",
      "bg-glass-icon text-glass-icon-foreground shadow-glass-icon",
      "transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:scale-110 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100",
      "[&_svg]:block [&_svg]:shrink-0",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-full border border-glass-rim blur-[1px]",
    ],
  },
  variants: {
    size: {
      xs: {
        base: "w-[9rem]",
        surface: "h-11 gap-2 px-3",
        label: "text-sm",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      sm: {
        base: "w-[11rem]",
        surface: "h-[3.25rem] gap-2.5 px-3.5",
        label: "text-base",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      md: {
        base: "w-[16.25rem]",
        surface:
          "h-[clamp(3.65rem,12vw,4.6875rem)] gap-[clamp(0.6rem,3vw,1rem)] px-[0.8rem]",
        label: "text-[clamp(1.0625rem,4vw,1.5625rem)]",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      lg: {
        base: "w-[19rem]",
        surface: "h-[5.25rem] gap-[1.125rem] px-4",
        label: "text-[1.75rem]",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      xl: {
        base: "w-[22rem]",
        surface: "h-[5.75rem] gap-5 px-5",
        label: "text-[2rem]",
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
