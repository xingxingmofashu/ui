"use client";

import { Switch as UISwitch } from "@base-ui/react/switch";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/switch";

type SwitchSlot =
  | "root"
  | "container"
  | "base"
  | "thumb"
  | "wrapper"
  | "label"
  | "description";

type SwitchClassNames = Partial<Record<SwitchSlot, string>>;

type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Switch uses a visible `label`, or an external accessible name through
 * `aria-label` / `aria-labelledby`.
 */
type SwitchAccessibleName =
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | {
      label: React.ReactNode;
      "aria-label"?: string;
      "aria-labelledby"?: string;
    };

type SwitchRootProps = React.ComponentProps<typeof UISwitch.Root>;

type SwitchProps = Omit<SwitchRootProps, "className" | "nativeButton"> & {
  /** Classes merged into the outer root. Use `classNames.base` for the switch itself. */
  className?: string;
  /** Classes for individual slots. */
  classNames?: SwitchClassNames;
  /** Visible label. It is connected to the switch through `aria-labelledby`. */
  label?: React.ReactNode;
  /** Optional supporting text connected through `aria-describedby`. */
  description?: React.ReactNode;
  /** Control size; defaults to `md`. */
  size?: SwitchSize;
} & SwitchAccessibleName;

type LiquidGlassFilterProps = {
  filterId: string;
};

function LiquidGlassFilter({ filterId }: LiquidGlassFilterProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter id={`${filterId}-goo`}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 16 -10"
            type="matrix"
            result="matrix"
          />
          <feComposite in="matrix" operator="atop" result="goo" />
        </filter>
        <filter
          id={`${filterId}-remove-black`}
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -255 -255 -255 0 1"
            result="black-pixels"
          />
          <feMorphology
            in="black-pixels"
            operator="dilate"
            radius="0.5"
            result="smoothed"
          />
          <feComposite in="SourceGraphic" in2="smoothed" operator="out" />
        </filter>
      </defs>
    </svg>
  );
}

function Switch({
  className,
  classNames,
  style,
  label,
  description,
  size,
  disabled,
  readOnly,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const ui = theme({ size });
  const [animating, setAnimating] = React.useState(false);
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const switchId = props.id ?? generatedId;
  const filterId = `ui-switch-${generatedId || "filter"}`;
  const labelId = `ui-switch-label-${generatedId || "label"}`;
  const descriptionId = `ui-switch-description-${generatedId || "description"}`;
  const hasLabel = label != null;
  const hasDescription = description != null;
  const hasText = hasLabel || hasDescription;
  const labelledBy =
    props["aria-labelledby"] ??
    (hasLabel && props["aria-label"] == null ? labelId : undefined);
  const describedBy =
    props["aria-describedby"] ?? (hasDescription ? descriptionId : undefined);
  const switchStyle = {
    ...style,
    "--ui-switch-filter-goo": `url(#${filterId}-goo)`,
    "--ui-switch-filter-remove-black": `url(#${filterId}-remove-black)`,
  } as React.CSSProperties;
  const handleCheckedChange: NonNullable<
    SwitchRootProps["onCheckedChange"]
  > = (checked, details) => {
    setAnimating(true);
    onCheckedChange?.(checked, details);
  };
  const handleThumbTransitionEnd = (
    event: React.TransitionEvent<HTMLSpanElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (
      event.propertyName === "translate" ||
      event.propertyName === "scale"
    ) {
      setAnimating(false);
    }
  };

  return (
    <div
      data-slot="root"
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cn(ui.root(), className, classNames?.root)}
    >
      <div
        data-slot="container"
        className={cn(ui.container(), classNames?.container)}
      >
        <UISwitch.Root
          {...props}
          id={switchId}
          disabled={disabled}
          readOnly={readOnly}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          data-slot="base"
          data-animating={animating || undefined}
          onCheckedChange={handleCheckedChange}
          className={cn(ui.base(), classNames?.base)}
          style={switchStyle}
        >
          <LiquidGlassFilter filterId={filterId} />

          <span
            aria-hidden="true"
            data-layer="mask"
            className={cn(
              "absolute inset-0 h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] rounded-[100px]",
              "[filter:var(--ui-switch-filter-remove-black)] [transform:translate3d(0,0,0)]",
            )}
          >
            <span
              data-layer="track"
              className={cn(
                "absolute left-1/2 top-1/2 z-[12] h-full w-full rounded-[100px] bg-[var(--ui-switch-off)] [container-type:inline-size] [translate:-50%_-50%]",
                "[box-shadow:var(--ui-switch-track-shadow)]",
                "[transition:background-color_120ms_ease-out_180ms]",
                "group-data-[checked]:bg-[var(--ui-switch-on)] motion-reduce:transition-none",
              )}
            >
              <span
                data-layer="track-mask"
                className={cn(
                  "absolute left-[var(--ui-switch-border)] top-1/2 h-[calc(100%_-_2*var(--ui-switch-border))] w-[calc(60%_-_2*var(--ui-switch-border))] rounded-[100px] bg-black",
                  "[translate:0_-50%] group-data-[checked]:[translate:calc(100cqi_-_100%_-_2*var(--ui-switch-border))_-50%]",
                  "[transition:translate_120ms_ease-out_180ms,scale_300ms_ease-out]",
                  "group-active:[scale:1.65] group-data-[animating=true]:[scale:1.65]",
                  "motion-reduce:transition-none",
                )}
              />
            </span>
          </span>

          <UISwitch.Thumb
            data-slot="thumb"
            aria-hidden="true"
            onTransitionEnd={handleThumbTransitionEnd}
            className={cn(ui.thumb(), classNames?.thumb)}
          >
            <span
              aria-hidden="true"
              data-layer="glass-rim"
              className={cn(
                "absolute inset-0 z-[20] rounded-[100px] [box-shadow:var(--ui-switch-glass-shadow)] opacity-0",
                "transition-opacity duration-200 ease-out group-active:opacity-100 group-data-[animating=true]:opacity-100",
                "motion-reduce:transition-none",
              )}
            />
            <span
              data-layer="glass-lens"
              className={cn(
                "absolute inset-0 rounded-[100px] [clip-path:inset(0_0_0_0_round_100px)] [filter:blur(calc(var(--ui-switch-height)*0.1))]",
                "transition-[filter] duration-200 ease-out group-active:[filter:blur(0)] group-data-[animating=true]:[filter:blur(0)]",
                "motion-reduce:transition-none",
              )}
            >
              <span
                data-layer="goo"
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-[100px]",
                  "[filter:var(--ui-switch-filter-goo)] [transform:translate3d(0,0,0)]",
                )}
              >
                <span
                  data-layer="inner-glow"
                  className={cn(
                    "absolute inset-0 rounded-[100px]",
                    "[--ui-switch-glow-color:var(--ui-switch-off)] group-data-[checked]:[--ui-switch-glow-color:var(--ui-switch-on)]",
                    "[transition:box-shadow_120ms_ease-out_180ms]",
                    "[box-shadow:inset_0_0_calc(var(--ui-switch-height)*0.05)_calc(var(--ui-switch-height)*0.0667)_var(--ui-switch-glow-color),inset_calc(var(--ui-switch-height)*0.133)_0_calc(var(--ui-switch-height)*0.05)_calc(var(--ui-switch-height)*0.0667)_var(--ui-switch-glow-color)]",
                  )}
                />
                <span
                  data-layer="fill"
                  className={cn(
                    "absolute left-0 top-1/2 h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] rounded-[100px] bg-[var(--ui-switch-off)]",
                    "[translate:0_-50%] group-data-[checked]:[translate:calc(100cqi_-_100%_-_6*var(--ui-switch-border))_-50%]",
                    "[transition:height_200ms_ease-out,translate_120ms_ease-out_180ms,background-color_120ms_ease-out_180ms]",
                    "group-active:h-[calc(var(--ui-switch-height)_-_6*var(--ui-switch-border))]",
                    "group-data-[animating=true]:h-[calc(var(--ui-switch-height)_-_6*var(--ui-switch-border))]",
                    "group-data-[checked]:bg-[var(--ui-switch-on)]",
                    "motion-reduce:transition-none",
                  )}
                />
              </span>
            </span>
            <span
              data-layer="cover"
              className={cn(
                "absolute inset-0 rounded-[100px] bg-[var(--ui-switch-thumb)]",
                "transition-opacity duration-200 ease-out group-active:opacity-0 group-data-[animating=true]:opacity-0",
                "motion-reduce:transition-none",
              )}
            />
          </UISwitch.Thumb>
        </UISwitch.Root>
      </div>

      {hasText ? (
        <div
          data-slot="wrapper"
          className={cn(ui.wrapper(), classNames?.wrapper)}
        >
          {hasLabel ? (
            <label
              data-slot="label"
              id={labelId}
              htmlFor={disabled || readOnly ? undefined : switchId}
              className={cn(ui.label(), classNames?.label)}
            >
              {label}
            </label>
          ) : null}
          {hasDescription ? (
            <p
              data-slot="description"
              id={descriptionId}
              className={cn(ui.description(), classNames?.description)}
            >
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { Switch };
export type { SwitchClassNames, SwitchProps, SwitchSize };
