import { tv } from "tailwind-variants";

export default tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: [
      "relative isolate w-80 max-w-[calc(100vw-2rem)] bg-ui-dialog-surface",
      "rounded-[1.5rem] text-ui-ink outline-none",
      "transition-[opacity,scale,translate] duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[side=top]:origin-bottom data-[side=bottom]:origin-top",
      "data-[side=left]:origin-right data-[side=right]:origin-left",
      "data-[side=bottom]:data-[starting-style]:-translate-y-1",
      "data-[side=top]:data-[starting-style]:translate-y-1",
      "data-[side=right]:data-[starting-style]:-translate-x-1",
      "data-[side=left]:data-[starting-style]:translate-x-1",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    arrow: [
      "pointer-events-none absolute z-[1] size-3 rotate-45",
      "border-ui-glass-border bg-ui-dialog-surface",
      "drop-shadow-[0_1px_2px_rgb(0_0_0/0.12)]",
      "data-[side=bottom]:-top-[6px] data-[side=bottom]:border-t data-[side=bottom]:border-l",
      "data-[side=top]:-bottom-[6px] data-[side=top]:border-r data-[side=top]:border-b",
      "data-[side=left]:-right-[6px] data-[side=left]:border-t data-[side=left]:border-r",
      "data-[side=right]:-left-[6px] data-[side=right]:border-b data-[side=right]:border-l",
    ],
    content: "relative z-10 flex min-w-0 flex-col p-4",
    title: [
      "min-w-0 text-sm font-semibold tracking-tight text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description:
      "mt-1 min-w-0 text-xs leading-relaxed text-ui-ink opacity-60",
    body: "mt-3 min-w-0 text-sm leading-relaxed text-ui-ink opacity-75",
    footer: "mt-4 flex flex-wrap items-center justify-end gap-2",
  },
});
