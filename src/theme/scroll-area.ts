import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/scroll-area relative grid w-full min-w-0 overflow-hidden rounded-[1.5rem] text-ui-ink",
      "[--ui-scroll-area-bar-size:6px] [--ui-scroll-area-bar-padding:5px]",
      "[--ui-scroll-area-thumb:color-mix(in_srgb,var(--ui-ink)_26%,transparent)]",
      "[--ui-scroll-area-thumb-hover:color-mix(in_srgb,var(--ui-ink)_42%,transparent)]",
      "[&_*]:box-border",
      "motion-reduce:[&_*]:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none relative col-start-1 row-start-1 h-full w-full overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    viewport: [
      "relative z-10 col-start-1 row-start-1 h-full min-h-0 w-full min-w-0",
      "rounded-[inherit] outline-none overscroll-contain",
      "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ui-glass-focus",
    ],
    content: "min-w-0",
    scrollbar: [
      "group/scrollbar absolute z-20 flex touch-none select-none",
      "p-[var(--ui-scroll-area-bar-padding)] opacity-30",
      "pointer-events-none transition-opacity duration-200 ease-out",
      "data-[hovering]:pointer-events-auto data-[hovering]:opacity-100",
      "data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0",
      "data-[orientation=vertical]:w-[calc(var(--ui-scroll-area-bar-size)+var(--ui-scroll-area-bar-padding)*2)]",
      "data-[orientation=vertical]:justify-center",
      "data-[orientation=horizontal]:h-[calc(var(--ui-scroll-area-bar-size)+var(--ui-scroll-area-bar-padding)*2)]",
      "data-[orientation=horizontal]:items-center",
    ],
    thumb: [
      "relative shrink-0 rounded-full border border-ui-glass-rim",
      "bg-[var(--ui-scroll-area-thumb)]",
      "shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_1px_2px_rgb(0_0_0/0.18)]",
      "transition-[background-color,box-shadow] duration-150 ease-out",
      "group-hover/scrollbar:bg-[var(--ui-scroll-area-thumb-hover)]",
      "data-[scrolling]:bg-[var(--ui-scroll-area-thumb-hover)]",
      "data-[orientation=vertical]:w-[var(--ui-scroll-area-bar-size)]",
      "data-[orientation=horizontal]:h-[var(--ui-scroll-area-bar-size)]",
    ],
    corner: "absolute z-20 bg-transparent",
  },
});
