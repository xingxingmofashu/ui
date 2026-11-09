import { tv } from "tailwind-variants";

const theme = tv({
  slots: {
    root: [
      "group relative flex cursor-pointer items-start",
      "touch-none [-webkit-tap-highlight-color:transparent]",
      "focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "data-[readonly]:cursor-default",
      "[--ui-switch-thumb-size:calc(var(--ui-switch-height)_-_2*var(--ui-switch-inset))]",
      "[--ui-switch-travel:calc(var(--ui-switch-width)_-_var(--ui-switch-thumb-size)_-_2*var(--ui-switch-inset))]",
    ],
    container: "flex items-center",
    base: [
      "relative inline-flex h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] shrink-0 select-none overflow-hidden rounded-full",
      "border-0 bg-[var(--ui-switch-off)] p-0 text-inherit",
      "[background-image:linear-gradient(180deg,rgb(255_255_255/0.14),transparent_55%)]",
      "[box-shadow:inset_0_1px_1px_rgb(255_255_255/0.3),inset_0_-1px_2px_rgb(0_0_0/0.14)]",
      "transition-[background-color,box-shadow] duration-200 ease-out",
      "group-data-[checked]:bg-[var(--ui-switch-on)]",
      "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
      "[--ui-switch-off:color-mix(in_srgb,var(--ui-ink)_20%,transparent)] [--ui-switch-on:var(--ui-ink)]",
    ],
    thumb: [
      "absolute left-[var(--ui-switch-inset)] top-1/2 z-10 block h-[var(--ui-switch-thumb-size)] w-[var(--ui-switch-thumb-size)] rounded-full bg-ui-surface",
      "[box-shadow:0_1px_3px_rgb(0_0_0/0.22),inset_0_0_0_1px_rgb(255_255_255/0.5),inset_0_1px_1px_rgb(255_255_255/0.65),inset_0_-1px_2px_rgb(0_0_0/0.08)]",
      "[translate:0_-50%] group-data-[checked]:[translate:var(--ui-switch-travel)_-50%]",
      "transition-[translate,scale] duration-200 ease-out",
      "group-active:scale-95",
      "motion-reduce:transition-none",
    ],
    wrapper: "ms-2 min-w-0",
    label: "block font-medium text-ui-ink leading-[var(--ui-switch-height)]",
    description: "block text-ui-ink opacity-60",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-switch-width:48px] [--ui-switch-height:24px] [--ui-switch-inset:2px]",
        wrapper: "text-xs",
      },
      sm: {
        root: "[--ui-switch-width:56px] [--ui-switch-height:28px] [--ui-switch-inset:2px]",
        wrapper: "text-xs",
      },
      md: {
        root: "[--ui-switch-width:64px] [--ui-switch-height:32px] [--ui-switch-inset:3px]",
        wrapper: "text-sm",
      },
      lg: {
        root: "[--ui-switch-width:72px] [--ui-switch-height:36px] [--ui-switch-inset:3px]",
        wrapper: "text-sm",
      },
      xl: {
        root: "[--ui-switch-width:80px] [--ui-switch-height:40px] [--ui-switch-inset:3px]",
        wrapper: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default theme;
