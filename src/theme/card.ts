import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "relative grid w-full min-w-0 rounded-[2rem]",
      "[font-family:system-ui,-apple-system,sans-serif]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
    ],
    glass: [
      "pointer-events-none relative col-start-1 row-start-1 h-full w-full overflow-hidden rounded-[2rem]",
      "border border-double border-glass-border bg-glass-surface shadow-glass",
      "backdrop-blur-[2px] [filter:brightness(0.9)_contrast(3)]",
      "before:pointer-events-none before:absolute before:inset-[8px] before:z-[1] before:rounded-[inherit] before:border before:border-glass-inner-border before:blur-[8px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,var(--ui-glass-highlight)_0%,transparent_var(--ui-glass-glare-stop),transparent_calc(100%_-_var(--ui-glass-glare-stop)),var(--ui-glass-highlight)_100%)] after:blur-[7px] after:content-['']",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-[inherit] border border-glass-rim blur-[1px]",
    ],
    layout: [
      "relative z-10 col-start-1 row-start-1 flex min-w-0 flex-col",
      "overflow-hidden rounded-[inherit]",
    ],
    header: "min-w-0 p-4 sm:px-6",
    title:
      "min-w-0 font-semibold text-ink [filter:var(--ui-drop-shadow-label)]",
    description: "mt-1 min-w-0 text-sm text-ink opacity-60",
    body: "min-w-0 p-4 text-ink sm:p-6",
    footer: "min-w-0 p-4 sm:px-6",
  },
});
