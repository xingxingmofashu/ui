import { tv } from "tailwind-variants";

const theme = tv({
  slots: {
    root: [
      "group relative flex cursor-pointer items-start",
      "touch-none [-webkit-tap-highlight-color:transparent]",
      "focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "data-[readonly]:cursor-default",
    ],
    container: "flex items-center",
    base: [
      "relative inline-flex h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] shrink-0 select-none overflow-visible rounded-[100px] border-0 bg-transparent p-0 text-inherit",
      "[container-type:inline-size]",
      "[--ui-switch-off:color-mix(in_srgb,var(--ui-ink)_20%,transparent)] [--ui-switch-on:var(--ui-ink)]",
      "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ui-glass-focus",
      "[&_*]:pointer-events-none",
      "motion-reduce:[transition-duration:0.01ms!important] motion-reduce:[transition-delay:0ms!important] motion-reduce:[&_*]:[transition-duration:0.01ms!important] motion-reduce:[&_*]:[transition-delay:0ms!important]",
      "[&_[data-layer=filter]]:pointer-events-none [&_[data-layer=filter]]:absolute [&_[data-layer=filter]]:h-0 [&_[data-layer=filter]]:w-0 [&_[data-layer=filter]]:overflow-hidden",
      "[&_[data-layer=mask]]:absolute [&_[data-layer=mask]]:inset-0 [&_[data-layer=mask]]:rounded-[100px]",
      "[&_[data-layer=mask]]:[filter:var(--ui-switch-filter-remove-black)] [&_[data-layer=mask]]:[transform:translate3d(0,0,0)]",
      "[&_[data-layer=track]]:absolute [&_[data-layer=track]]:left-1/2 [&_[data-layer=track]]:top-1/2 [&_[data-layer=track]]:z-[12] [&_[data-layer=track]]:h-full [&_[data-layer=track]]:w-full [&_[data-layer=track]]:rounded-[100px] [&_[data-layer=track]]:bg-[var(--ui-switch-off)]",
      "[&_[data-layer=track]]:[container-type:inline-size] [&_[data-layer=track]]:[translate:-50%_-50%] [&_[data-layer=track]]:[box-shadow:inset_0_1px_1px_rgb(255_255_255/0.35),inset_0_-1px_2px_rgb(0_0_0/0.12)]",
      "[&_[data-layer=track]]:[transition:background-color_120ms_ease-out_180ms] group-data-[checked]:[&_[data-layer=track]]:bg-[var(--ui-switch-on)]",
      "[&_[data-layer=track-mask]]:absolute [&_[data-layer=track-mask]]:left-[var(--ui-switch-border)] [&_[data-layer=track-mask]]:top-1/2 [&_[data-layer=track-mask]]:h-[calc(100%_-_2*var(--ui-switch-border))] [&_[data-layer=track-mask]]:w-[calc(60%_-_2*var(--ui-switch-border))] [&_[data-layer=track-mask]]:rounded-[100px] [&_[data-layer=track-mask]]:bg-black",
      "[&_[data-layer=track-mask]]:[translate:0_-50%] group-data-[checked]:[&_[data-layer=track-mask]]:[translate:calc(100cqi_-_100%_-_2*var(--ui-switch-border))_-50%]",
      "[&_[data-layer=track-mask]]:[transition:translate_120ms_ease-out_180ms,scale_300ms_ease-out]",
      "group-active:[&_[data-layer=track-mask]]:[scale:1.65] group-data-[animating=true]:[&_[data-layer=track-mask]]:[scale:1.65]",
      "[&_[data-layer=glass-rim]]:absolute [&_[data-layer=glass-rim]]:inset-0 [&_[data-layer=glass-rim]]:z-[20] [&_[data-layer=glass-rim]]:rounded-[100px] [&_[data-layer=glass-rim]]:[box-shadow:var(--ui-glass-edge-shadow)] [&_[data-layer=glass-rim]]:opacity-0",
      "[&_[data-layer=glass-rim]]:transition-opacity [&_[data-layer=glass-rim]]:duration-200 [&_[data-layer=glass-rim]]:ease-out",
      "group-active:[&_[data-layer=glass-rim]]:opacity-100 group-data-[animating=true]:[&_[data-layer=glass-rim]]:opacity-100",
      "[&_[data-layer=glass-lens]]:absolute [&_[data-layer=glass-lens]]:inset-0 [&_[data-layer=glass-lens]]:rounded-[100px] [&_[data-layer=glass-lens]]:[clip-path:inset(0_0_0_0_round_100px)]",
      "[&_[data-layer=glass-lens]]:[filter:blur(calc(var(--ui-switch-height)*0.1))] [&_[data-layer=glass-lens]]:transition-[filter] [&_[data-layer=glass-lens]]:duration-200 [&_[data-layer=glass-lens]]:ease-out",
      "group-active:[&_[data-layer=glass-lens]]:[filter:blur(0)] group-data-[animating=true]:[&_[data-layer=glass-lens]]:[filter:blur(0)]",
      "[&_[data-layer=goo]]:absolute [&_[data-layer=goo]]:inset-0 [&_[data-layer=goo]]:overflow-hidden [&_[data-layer=goo]]:rounded-[100px]",
      "[&_[data-layer=goo]]:[filter:var(--ui-switch-filter-goo)] [&_[data-layer=goo]]:[transform:translate3d(0,0,0)]",
      "[&_[data-layer=inner-glow]]:absolute [&_[data-layer=inner-glow]]:inset-0 [&_[data-layer=inner-glow]]:rounded-[100px]",
      "[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-off)] group-data-[checked]:[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-on)]",
      "[&_[data-layer=inner-glow]]:[transition:box-shadow_120ms_ease-out_180ms]",
      "[&_[data-layer=inner-glow]]:[box-shadow:inset_0_0_calc(var(--ui-switch-height)*0.05)_calc(var(--ui-switch-height)*0.0667)_var(--ui-switch-glow-color),inset_calc(var(--ui-switch-height)*0.133)_0_calc(var(--ui-switch-height)*0.05)_calc(var(--ui-switch-height)*0.0667)_var(--ui-switch-glow-color)]",
      "[&_[data-layer=fill]]:absolute [&_[data-layer=fill]]:left-0 [&_[data-layer=fill]]:top-1/2 [&_[data-layer=fill]]:h-[var(--ui-switch-height)] [&_[data-layer=fill]]:w-[var(--ui-switch-width)] [&_[data-layer=fill]]:rounded-r-[100px] [&_[data-layer=fill]]:bg-[var(--ui-switch-off)]",
      "[&_[data-layer=fill]]:[translate:0_-50%] group-data-[checked]:[&_[data-layer=fill]]:[translate:calc(100cqi_-_100%)_-50%]",
      "[&_[data-layer=fill]]:[transition:height_200ms_ease-out,translate_120ms_ease-out_180ms,background-color_120ms_ease-out_180ms]",
      "group-active:[&_[data-layer=fill]]:h-[calc(var(--ui-switch-height)_-_6*var(--ui-switch-border))] group-data-[animating=true]:[&_[data-layer=fill]]:h-[calc(var(--ui-switch-height)_-_6*var(--ui-switch-border))]",
      "group-data-[checked]:[&_[data-layer=fill]]:bg-[var(--ui-switch-on)]",
      "[&_[data-layer=cover]]:absolute [&_[data-layer=cover]]:inset-0 [&_[data-layer=cover]]:rounded-[100px] [&_[data-layer=cover]]:bg-white",
      "[&_[data-layer=cover]]:transition-opacity [&_[data-layer=cover]]:duration-200 [&_[data-layer=cover]]:ease-out",
      "group-active:[&_[data-layer=cover]]:opacity-0 group-data-[animating=true]:[&_[data-layer=cover]]:opacity-0",
    ],
    thumb: [
      "absolute left-[var(--ui-switch-border)] top-1/2 h-[calc(100%_-_2*var(--ui-switch-border))] w-[calc(60%_-_2*var(--ui-switch-border))] rounded-[100px] bg-transparent [box-shadow:var(--ui-glass-thumb-shadow)]",
      "[container-type:inline-size]",
      "[translate:0_-50%] group-data-[checked]:[translate:calc(100cqi_-_100%_-_2*var(--ui-switch-border))_-50%]",
      "[transition:translate_120ms_ease-out_180ms,scale_300ms_ease-out]",
      "group-active:[scale:1.65] group-data-[animating=true]:[scale:1.65]",
      "motion-reduce:transition-none",
    ],
    wrapper: "ms-2 min-w-0",
    label: "block font-medium text-ui-ink",
    description: "block text-ui-ink opacity-60",
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
