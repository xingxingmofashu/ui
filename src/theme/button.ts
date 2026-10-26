import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    base: [
      "group relative z-[500] inline-flex min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0 [filter:contrast(3)]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    surface: [
      "relative flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center overflow-hidden rounded-full",
      "border border-double border-glass-border bg-glass-surface",
      "shadow-glass",
      "backdrop-blur-[2px] [filter:brightness(0.9)]",
      "transition-[background-color,translate,scale] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "before:pointer-events-none before:absolute before:inset-[2px] before:z-[1] before:rounded-[inherit] before:border before:border-glass-inner-border before:blur-[3px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,var(--ui-glass-highlight)_0%,transparent_var(--ui-glass-glare-stop),transparent_calc(100%_-_var(--ui-glass-glare-stop)),var(--ui-glass-highlight)_100%)] after:blur-[3px] after:content-['']",
      "group-hover:-translate-y-[3px] group-hover:bg-transparent group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    label: [
      "min-w-0 truncate [font-family:system-ui,-apple-system,sans-serif] font-normal text-ink",
      "group-active:text-ink-active",
    ],
    leadingIcon: [
      "grid shrink-0 place-items-center [&_svg]:block [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "grid aspect-square shrink-0 place-items-center rounded-full",
      "bg-glass-icon text-glass-icon-foreground shadow-glass-icon",
      "transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:scale-110 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100",
      "[&_svg]:block [&_svg]:shrink-0",
    ],
    overlay: [
      "pointer-events-none absolute inset-[3px] z-[2] rounded-full border border-glass-rim blur-[1px]",
    ],
  },
  variants: {
    size: {
      xs: {
        surface: "h-6 gap-1 px-2",
        label: "text-xs",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "h-5 [&_svg]:size-4",
      },
      sm: {
        surface: "h-7 gap-1.5 px-2.5",
        label: "text-xs",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "h-5 [&_svg]:size-4",
      },
      md: {
        surface: "h-8 gap-1.5 px-2.5",
        label: "text-sm",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "h-6 [&_svg]:size-5",
      },
      lg: {
        surface: "h-9 gap-2 px-3",
        label: "text-sm",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "h-7 [&_svg]:size-5",
      },
      xl: {
        surface: "h-10 gap-2 px-3",
        label: "text-base",
        leadingIcon: "[&_svg]:size-6",
        trailingIcon: "h-8 [&_svg]:size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default button;
