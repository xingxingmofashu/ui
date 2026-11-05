import { tv } from "tailwind-variants";

export default tv({
  slots: {
    positioner: "z-50 outline-none",
    popup: [
      "relative isolate max-w-64 rounded-xl px-2.5 py-1.5",
      "text-xs font-medium leading-tight text-ui-ink outline-none",
      "transition-[opacity,scale] duration-100 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[side=top]:origin-bottom data-[side=bottom]:origin-top",
      "data-[side=left]:origin-right data-[side=right]:origin-left",
      "ltr:data-[side=inline-start]:origin-right ltr:data-[side=inline-end]:origin-left",
      "rtl:data-[side=inline-start]:origin-left rtl:data-[side=inline-end]:origin-right",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-overlay ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    arrow: [
      "pointer-events-none absolute z-[1] size-2 rotate-45",
      "border-ui-glass-border bg-ui-glass-overlay-surface",
      "drop-shadow-[0_1px_1px_rgb(0_0_0/0.12)]",
      "data-[side=bottom]:-top-[4px] data-[side=bottom]:border-t data-[side=bottom]:border-l",
      "data-[side=top]:-bottom-[4px] data-[side=top]:border-r data-[side=top]:border-b",
      "data-[side=left]:-right-[4px] data-[side=left]:border-t data-[side=left]:border-r",
      "data-[side=right]:-left-[4px] data-[side=right]:border-b data-[side=right]:border-l",
      "data-[side=inline-start]:-end-[4px]",
      "ltr:data-[side=inline-start]:border-t ltr:data-[side=inline-start]:border-e",
      "rtl:data-[side=inline-start]:border-b rtl:data-[side=inline-start]:border-e",
      "data-[side=inline-end]:-start-[4px]",
      "ltr:data-[side=inline-end]:border-b ltr:data-[side=inline-end]:border-s",
      "rtl:data-[side=inline-end]:border-t rtl:data-[side=inline-end]:border-s",
    ],
    content: "relative z-10",
  },
});
