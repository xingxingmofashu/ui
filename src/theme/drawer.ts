import { tv } from "tailwind-variants";

export default tv({
  slots: {
    backdrop: [
      "fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]",
      "[opacity:calc(1-var(--drawer-swipe-progress))]",
      "transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
      "data-[swiping]:duration-0",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*300ms)]",
      "motion-reduce:transition-none",
    ],
    viewport: "fixed inset-0 z-50 flex overflow-hidden",
    popup: [
      "relative isolate flex min-h-0 flex-col overflow-hidden bg-ui-dialog-surface",
      "text-ui-ink outline-none touch-auto overscroll-contain will-change-transform",
      "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
      "data-[swiping]:select-none",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    content: [
      "relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto",
      "touch-auto overscroll-contain p-5 sm:p-6",
    ],
    title: [
      "min-w-0 text-lg font-semibold tracking-tight text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description:
      "mt-2 min-w-0 text-sm leading-relaxed text-ui-ink opacity-60",
    body: "mt-4 min-w-0 text-sm leading-relaxed text-ui-ink opacity-75",
    footer: "mt-6 flex flex-wrap items-center justify-end gap-2",
  },
  variants: {
    direction: {
      down: {
        viewport: "items-end justify-center",
        popup: [
          "max-h-[85dvh] w-full rounded-t-[1.75rem]",
          "pb-[env(safe-area-inset-bottom)]",
          "[transform:translateY(calc(var(--drawer-snap-point-offset)_+_var(--drawer-swipe-movement-y)))]",
          "data-[starting-style]:[transform:translateY(calc(100%_+_2px))]",
          "data-[ending-style]:[transform:translateY(calc(100%_+_2px))]",
        ],
        content: "pt-4 sm:pt-5",
      },
      up: {
        viewport: "items-start justify-center",
        popup: [
          "max-h-[85dvh] w-full rounded-b-[1.75rem]",
          "pt-[env(safe-area-inset-top)]",
          "[transform:translateY(calc(var(--drawer-snap-point-offset)_+_var(--drawer-swipe-movement-y)))]",
          "data-[starting-style]:[transform:translateY(calc(-100%_-_2px))]",
          "data-[ending-style]:[transform:translateY(calc(-100%_-_2px))]",
        ],
        content: "pb-4 sm:pb-5",
      },
      left: {
        viewport: "items-stretch justify-start",
        popup: [
          "h-full w-[min(20rem,100vw)] rounded-r-[1.75rem]",
          "pl-[env(safe-area-inset-left)]",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[starting-style]:[transform:translateX(calc(-100%_-_2px))]",
          "data-[ending-style]:[transform:translateX(calc(-100%_-_2px))]",
        ],
      },
      right: {
        viewport: "items-stretch justify-end",
        popup: [
          "h-full w-[min(20rem,100vw)] rounded-l-[1.75rem]",
          "pr-[env(safe-area-inset-right)]",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-[starting-style]:[transform:translateX(calc(100%_+_2px))]",
          "data-[ending-style]:[transform:translateX(calc(100%_+_2px))]",
        ],
      },
    },
  },
  defaultVariants: {
    direction: "down",
  },
});
