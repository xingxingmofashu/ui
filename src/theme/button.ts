import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    base: [
      "group relative z-[500] inline-flex w-max max-w-[calc(100vw_-_2.5rem)] cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(0,0,0,0.6)]",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    surface: [
      "relative flex h-full w-full items-center justify-center rounded-full",
      "border border-double border-[rgba(51,51,51,0.08)] bg-[rgba(0,0,0,0.02)]",
      "shadow-[inset_2px_-2px_1px_-1px_rgba(255,255,255,0.9),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.9),inset_6px_-6px_1px_-6px_rgba(255,255,255,0.55),inset_-6px_6px_1px_-6px_rgba(255,255,255,0.55),inset_0_0_2px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.2)]",
      "backdrop-blur-[2px] [filter:brightness(0.9)_contrast(3)]",
      "transition-[background-color,transform] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "before:pointer-events-none before:absolute before:left-1/2 before:top-[35%] before:z-[1] before:h-[calc(100%_-_16px)] before:w-[calc(100%_-_16px)] before:-translate-x-1/2 before:rounded-[inherit] before:border before:border-[rgba(0,0,0,0.9)] before:blur-[8px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,rgba(255,255,255,0.8)_0%,transparent_15%,transparent_85%,rgba(255,255,255,0.8)_100%)] after:blur-[7px] after:content-['']",
      "group-hover:-translate-y-[3px] group-hover:bg-transparent group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    label: [
      "min-w-0 truncate font-[system-ui,-apple-system,sans-serif] font-normal leading-none text-[#3e3e3e]",
      "[filter:drop-shadow(0_25px_3px_rgba(102,102,102,0.15))]",
      "group-active:text-black",
    ],
    leadingIcon: [
      "grid shrink-0 place-items-center [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "grid shrink-0 place-items-center rounded-full",
      "bg-[#3e3e3e] text-[#f5f5f5] shadow-[0_0_6px_rgba(0,0,0,0.3)]",
      "transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:scale-110 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100",
      "[&_svg]:h-[40%] [&_svg]:w-[40%] [&_svg]:shrink-0",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.2)] blur-[1px]",
    ],
  },
  variants: {
    size: {
      sm: {
        base: "h-10 min-w-[8.5rem]",
        surface: "gap-2 px-3",
        label: "text-sm",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "size-8",
      },
      md: {
        base: "h-[3.25rem] min-w-[11.5rem]",
        surface: "gap-2.5 px-3.5",
        label: "text-base",
        leadingIcon: "[&_svg]:size-[1.125rem]",
        trailingIcon: "size-9",
      },
      lg: {
        base: "h-[clamp(3.65rem,12vw,4.6875rem)] min-w-[min(16.25rem,calc(100vw_-_2.5rem))]",
        surface: "gap-[clamp(0.6rem,3vw,1rem)] px-[0.8rem]",
        label: "text-[clamp(1.0625rem,4vw,1.5625rem)]",
        leadingIcon: "[&_svg]:size-[clamp(1rem,3.6vw,1.125rem)]",
        trailingIcon: "size-[clamp(2rem,7vw,2.5rem)]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default button;
