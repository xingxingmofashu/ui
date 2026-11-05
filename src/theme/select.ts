import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/select flex w-full min-w-0 flex-col gap-1.5 text-ui-ink",
      "data-[disabled]:cursor-not-allowed",
    ],
    label:
      "w-fit font-medium text-ui-ink group-data-[disabled]/select:opacity-60",
    trigger: [
      "group/trigger relative isolate flex w-full min-w-0 items-center justify-between",
      "h-[var(--ui-select-height)] rounded-[var(--ui-select-radius)]",
      "gap-[var(--ui-select-gap)] px-[var(--ui-select-padding)]",
      "bg-transparent text-inherit",
      "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
    ],
    glass: [
      "ui-glass ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
      "[--ui-glass-tone:brightness(1)] [--ui-glass-contrast:1.1]",
      "[--ui-glass-border:color-mix(in_srgb,var(--ui-ink)_18%,transparent)]",
      "[--ui-glass-surface:color-mix(in_srgb,var(--ui-ink)_3%,transparent)]",
      "[--ui-glass-rim:color-mix(in_srgb,var(--ui-ink)_10%,transparent)]",
      "[--ui-shadow-glass:inset_0_1px_0_rgb(255_255_255/0.45),inset_0_0_0_1px_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.08)]",
      "[--ui-glass-rim-inset:4px] [--ui-glass-rim-blur:2px]",
    ],
    overlay: "ui-glass-rim",
    value: [
      "relative z-[1] min-w-0 flex-1 truncate text-left",
      "data-[placeholder]:text-ui-ink/40",
    ],
    icon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink/55",
      "transition-transform duration-200 group-data-[popup-open]/trigger:rotate-180",
      "[&_svg]:size-[var(--ui-select-icon-size)] [&_svg]:shrink-0",
      "motion-reduce:transition-none",
    ],
    description:
      "text-ui-ink opacity-60 group-data-[disabled]/select:opacity-50",
    positioner: "z-50 outline-none",
    popup: [
      "relative isolate min-w-[var(--anchor-width)] max-w-[min(24rem,var(--available-width))]",
      "rounded-2xl p-1.5 text-ui-ink outline-none",
      "transition-[opacity,scale] duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[side=top]:origin-bottom data-[side=bottom]:origin-top",
      "data-[side=left]:origin-right data-[side=right]:origin-left",
      "ltr:data-[side=inline-start]:origin-right ltr:data-[side=inline-end]:origin-left",
      "rtl:data-[side=inline-start]:origin-left rtl:data-[side=inline-end]:origin-right",
      "motion-reduce:transition-none",
    ],
    popupGlass: [
      "ui-glass ui-glass-overlay ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    popupOverlay: "ui-glass-rim",
    list: [
      "relative z-10 flex min-w-0 flex-col gap-0.5",
      "max-h-[min(24rem,var(--available-height))] overflow-y-auto scroll-py-2",
    ],
    item: [
      "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-xl px-2.5",
      "text-sm text-ui-ink outline-none",
      "data-[highlighted]:bg-ui-ink/10",
      "data-[selected]:font-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
    ],
    itemIndicator: [
      "inline-flex size-4 shrink-0 items-center justify-center",
      "opacity-0 transition-opacity data-[selected]:opacity-100",
      "[&_svg]:size-4 [&_svg]:shrink-0",
    ],
    itemText: "min-w-0 flex-1 truncate",
  },
  variants: {
    size: {
      xs: {
        root: "gap-1 text-xs",
        trigger:
          "[--ui-select-height:28px] [--ui-select-radius:8px] [--ui-select-padding:10px] [--ui-select-gap:6px] [--ui-select-icon-size:16px]",
      },
      sm: {
        root: "gap-1 text-xs",
        trigger:
          "[--ui-select-height:32px] [--ui-select-radius:9px] [--ui-select-padding:12px] [--ui-select-gap:7px] [--ui-select-icon-size:16px]",
      },
      md: {
        root: "gap-1.5 text-sm",
        trigger:
          "[--ui-select-height:36px] [--ui-select-radius:10px] [--ui-select-padding:12px] [--ui-select-gap:8px] [--ui-select-icon-size:20px]",
      },
      lg: {
        root: "gap-1.5 text-sm",
        trigger:
          "[--ui-select-height:40px] [--ui-select-radius:11px] [--ui-select-padding:14px] [--ui-select-gap:8px] [--ui-select-icon-size:20px]",
      },
      xl: {
        root: "gap-2 text-base",
        trigger:
          "[--ui-select-height:44px] [--ui-select-radius:12px] [--ui-select-padding:14px] [--ui-select-gap:10px] [--ui-select-icon-size:24px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
