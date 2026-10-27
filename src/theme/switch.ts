import { tv } from "tailwind-variants";

const theme = tv({
  slots: {
    root: [
      "relative flex cursor-pointer items-start",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "data-[readonly]:cursor-default",
    ],
    container: "flex items-center",
    base: [
      "group relative inline-flex h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] shrink-0 cursor-pointer select-none overflow-visible rounded-[100px] border-0 bg-transparent p-0 text-inherit outline-offset-2",
      "[container-type:inline-size] touch-none [-webkit-tap-highlight-color:transparent]",
      "[--ui-switch-width:64px] [--ui-switch-height:32px] [--ui-switch-border:3px]",
      "[--ui-switch-hue:144] [--ui-switch-off:hsl(var(--ui-switch-hue)_8%_81%)] [--ui-switch-on:hsl(var(--ui-switch-hue)_92%_43%)] [--ui-switch-thumb:#fff]",
      "[--ui-switch-thumb-shadow:0_1px_3px_rgb(0_0_0/0.2),inset_0_0_0_1px_rgb(255_255_255/0.55)]",
      "[--ui-switch-track-shadow:inset_0_1px_1px_rgb(255_255_255/0.35),inset_0_-1px_2px_rgb(0_0_0/0.12)]",
      "[--ui-switch-glass-shadow:inset_1px_-1px_2px_rgb(255_255_255/0.55),inset_-1px_1px_2px_rgb(0_0_0/0.18),0_1px_3px_rgb(0_0_0/0.2)]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glass-focus",
      "data-[disabled]:pointer-events-none data-[readonly]:pointer-events-none",
      "[&_*]:pointer-events-none",
      "motion-reduce:[transition-duration:0.01ms!important] motion-reduce:[transition-delay:0ms!important] motion-reduce:[&_*]:[transition-duration:0.01ms!important] motion-reduce:[&_*]:[transition-delay:0ms!important]",
    ],
    thumb: [
      "absolute left-[var(--ui-switch-border)] top-1/2 h-[calc(100%_-_2*var(--ui-switch-border))] w-[calc(60%_-_2*var(--ui-switch-border))] rounded-[100px] bg-transparent [box-shadow:var(--ui-switch-thumb-shadow)]",
      "[container-type:inline-size]",
      "[translate:0_-50%] group-data-[checked]:[translate:calc(100cqi_-_100%_-_2*var(--ui-switch-border))_-50%]",
      "[transition:translate_120ms_ease-out_180ms,scale_300ms_ease-out]",
      "group-active:[scale:1.65] group-data-[animating=true]:[scale:1.65]",
      "motion-reduce:transition-none",
    ],
    wrapper: "ms-2 min-w-0",
    label: "block font-medium text-ink",
    description: "block text-ink opacity-60",
  },
  variants: {
    size: {
      xs: {
        base: "[--ui-switch-width:48px] [--ui-switch-height:24px] [--ui-switch-border:2px]",
        wrapper: "text-xs",
      },
      sm: {
        base: "[--ui-switch-width:56px] [--ui-switch-height:28px] [--ui-switch-border:2px]",
        wrapper: "text-xs",
      },
      md: {
        base: "[--ui-switch-width:64px] [--ui-switch-height:32px] [--ui-switch-border:3px]",
        wrapper: "text-sm",
      },
      lg: {
        base: "[--ui-switch-width:72px] [--ui-switch-height:36px] [--ui-switch-border:3px]",
        wrapper: "text-sm",
      },
      xl: {
        base: "[--ui-switch-width:80px] [--ui-switch-height:40px] [--ui-switch-border:3px]",
        wrapper: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default theme;
