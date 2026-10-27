import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "relative grid w-full min-w-0 rounded-[2rem]",
      "[font-family:system-ui,-apple-system,sans-serif]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none relative col-start-1 row-start-1 h-full w-full overflow-hidden rounded-[2rem]",
    ],
    overlay: "ui-glass-rim",
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
