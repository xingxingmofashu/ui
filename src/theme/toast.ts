import { tv } from "tailwind-variants";

export default tv({
  slots: {
    viewport:
      "fixed z-[60] flex w-[calc(100vw_-_2rem)] max-w-sm outline-none",
    root: [
      "[--gap:0.75rem] [--peek:0.75rem]",
      "[--scale:calc(max(0,1_-_var(--toast-index)*0.1))]",
      "[--shrink:calc(1_-_var(--scale))]",
      "[--height:var(--toast-frontmost-height,var(--toast-height))]",
      "absolute inset-x-0 isolate h-[var(--height)] w-full rounded-[1.25rem]",
      "bg-ui-dialog-surface text-ui-ink select-none",
      "z-[calc(1000-var(--toast-index))]",
      "[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
      "data-[expanded]:h-[var(--toast-height)]",
      "data-[limited]:pointer-events-none data-[limited]:opacity-0",
      "data-[swiping]:cursor-grabbing",
      "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    content: [
      "relative z-10 flex h-full min-w-0 items-start gap-3 overflow-hidden p-4",
      "transition-opacity duration-200 ease-out",
      "data-[behind]:opacity-0 data-[expanded]:opacity-100",
      "motion-reduce:transition-none",
    ],
    icon: [
      "mt-0.5 grid size-5 shrink-0 place-items-center text-ui-ink opacity-70",
      "data-[icon=loading]:animate-spin motion-reduce:animate-none",
    ],
    text: "flex min-w-0 flex-1 flex-col gap-0.5",
    title: [
      "min-w-0 text-sm font-semibold tracking-tight text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description:
      "min-w-0 text-sm leading-relaxed text-ui-ink opacity-60",
    actions: "flex shrink-0 items-center gap-1",
    action: [
      "ui-glass-chip inline-flex h-7 shrink-0 items-center rounded-full px-2.5",
      "whitespace-nowrap text-xs font-medium text-ui-ink",
      "transition-[background-color,scale] duration-150 ease-out",
      "hover:bg-ui-ink/10 active:scale-95",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
      "motion-reduce:transition-none",
    ],
    close: [
      "grid size-7 shrink-0 place-items-center rounded-full text-ui-ink opacity-60",
      "transition-[background-color,opacity,scale] duration-150 ease-out",
      "hover:bg-ui-ink/10 hover:opacity-100 active:scale-90",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
    ],
  },
  variants: {
    placement: {
      top: {
        viewport: "top-[max(1rem,env(safe-area-inset-top))] bottom-auto",
        root: [
          "top-0 origin-top",
          "[--offset-y:calc(var(--toast-offset-y)_+_(var(--toast-index)*var(--gap))_+_var(--toast-swipe-movement-y))]",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-index)*var(--peek)_+_var(--shrink)*var(--height)))_scale(var(--scale))]",
          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
          "data-[starting-style]:[transform:translateY(-150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]",
          "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)_-_150%))]",
          "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']",
        ],
      },
      bottom: {
        viewport: "bottom-[max(1rem,env(safe-area-inset-bottom))] top-auto",
        root: [
          "bottom-0 origin-bottom",
          "[--offset-y:calc(var(--toast-offset-y)*-1_+_(var(--toast-index)*var(--gap)*-1)_+_var(--toast-swipe-movement-y))]",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_-_var(--toast-index)*var(--peek)_-_var(--shrink)*var(--height)))_scale(var(--scale))]",
          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
          "data-[starting-style]:[transform:translateY(150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
          "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)_+_150%))]",
          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']",
        ],
      },
    },
    align: {
      left: {
        viewport: "left-[max(1rem,env(safe-area-inset-left))] right-auto",
      },
      center: {
        viewport: "left-1/2 -translate-x-1/2",
      },
      right: {
        viewport: "right-[max(1rem,env(safe-area-inset-right))] left-auto",
      },
    },
  },
  defaultVariants: {
    placement: "bottom",
    align: "right",
  },
});
