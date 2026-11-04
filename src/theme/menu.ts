import { tv } from "tailwind-variants";

export default tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: [
      "relative isolate min-w-48 max-w-80 rounded-2xl bg-ui-surface p-1.5",
      "text-ui-ink outline-none",
      "transition-[opacity,scale] duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[side=top]:origin-bottom data-[side=bottom]:origin-top",
      "data-[side=left]:origin-right data-[side=right]:origin-left",
      "ltr:data-[side=inline-start]:origin-right ltr:data-[side=inline-end]:origin-left",
      "rtl:data-[side=inline-start]:origin-left rtl:data-[side=inline-end]:origin-right",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    list: [
      "relative z-10 flex min-w-0 flex-col gap-0.5",
      "max-h-[min(24rem,var(--available-height))] overflow-y-auto scroll-py-2",
    ],
    item: [
      "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-xl px-2.5",
      "text-sm text-ui-ink outline-none",
      "data-[highlighted]:bg-ui-ink/10",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
    ],
    itemIcon: [
      "inline-flex size-4 shrink-0 items-center justify-center text-ui-ink/60",
      "[&_svg]:size-4 [&_svg]:shrink-0",
    ],
    itemLabel: "min-w-0 flex-1 truncate",
    shortcut: [
      "ml-auto shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.12em]",
      "text-ui-ink/45",
    ],
    group: "flex min-w-0 flex-col gap-0.5",
    groupLabel: [
      "px-2.5 pb-1 pt-2 text-[0.65rem] font-medium uppercase tracking-[0.14em]",
      "text-ui-ink/45",
    ],
    separator: "mx-1 my-1 h-px bg-ui-glass-border",
  },
});
