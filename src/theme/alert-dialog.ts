import { tv } from "tailwind-variants";

export default tv({
  slots: {
    backdrop: [
      "fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]",
      "transition-opacity duration-200 ease-out",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "motion-reduce:transition-none",
    ],
    viewport:
      "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4",
    popup: [
      "relative isolate w-full max-w-md",
      "rounded-[1.75rem] text-ui-ink outline-none",
      "transition-[opacity,scale,translate] duration-200 ease-out",
      "data-[starting-style]:translate-y-2 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    content: "relative z-10 flex min-w-0 flex-col p-5 sm:p-6",
    title: [
      "min-w-0 text-lg font-semibold tracking-tight text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description:
      "mt-2 min-w-0 text-sm leading-relaxed text-ui-ink opacity-60",
    body: "mt-4 min-w-0 text-sm leading-relaxed text-ui-ink opacity-75",
    footer: "mt-6 flex flex-wrap items-center justify-end gap-2",
  },
});
