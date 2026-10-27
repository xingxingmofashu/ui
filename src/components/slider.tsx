"use client";

import { Slider as UISlider } from "@base-ui/react/slider";
import { cn } from "cn";
import * as React from "react";

import { LIQUID_GLASS_MAP } from "../lib/liquid-glass-map";
import theme from "../theme/slider";

type SliderSlot =
  | "root"
  | "header"
  | "label"
  | "value"
  | "description"
  | "filter"
  | "control"
  | "track"
  | "indicator"
  | "thumb";

type SliderStyle = Partial<Record<SliderSlot, string>>;

type SliderRootProps<Value extends number | readonly number[]> =
  UISlider.Root.Props<Value>;

/**
 * Sliders must have an accessible name. Use a visible `label`, or
 * `aria-label` / `aria-labelledby` for a label rendered elsewhere.
 */
type SliderAccessibleName =
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | {
      label: React.ReactNode;
      "aria-label"?: string;
      "aria-labelledby"?: string;
    };

type SliderProps<Value extends number | readonly number[] = number> = Omit<
  SliderRootProps<Value>,
  "className" | "style" | "children"
> &
  SliderAccessibleName & {
    /** Classes merged into the outer root. */
    className?: string;
    /** Classes for individual slots. */
    ui?: SliderStyle;
    /** Inline styles merged into the root. */
    style?: React.CSSProperties;
    /** Visible label, connected to every thumb through `aria-labelledby`. */
    label?: React.ReactNode;
    /** Optional supporting text connected through `aria-describedby`. */
    description?: React.ReactNode;
    /** Renders the current value (or range) in the header. */
    showValue?: boolean;
  };

type LiquidGlassFilterProps = {
  filterId: string;
  className?: string;
};

function LiquidGlassFilter({ filterId, className }: LiquidGlassFilterProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-layer="filter"
      className={className}
    >
      <defs>
        <filter
          id={filterId}
          primitiveUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            result="map"
            width="100%"
            height="100%"
            x="0"
            y="0"
            href={LIQUID_GLASS_MAP}
            preserveAspectRatio="none"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.035"
            result="blur"
          />
          <feDisplacementMap
            in="blur"
            in2="map"
            scale="0.45"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function hasContent(value: React.ReactNode) {
  return React.Children.toArray(value).some((child) => child !== "");
}

function getThumbCount(
  value: number | readonly number[] | undefined,
  defaultValue: number | readonly number[] | undefined,
) {
  if (Array.isArray(value)) {
    return Math.max(1, value.length);
  }

  if (Array.isArray(defaultValue)) {
    return Math.max(1, defaultValue.length);
  }

  return 1;
}

function Slider<Value extends number | readonly number[] = number>({
  className,
  ui: uiOverrides,
  style,
  label,
  description,
  showValue = false,
  value,
  defaultValue,
  ...props
}: SliderProps<Value>) {
  const ui = theme();
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `ui-slider-${generatedId || "filter"}`;
  const descriptionId = `ui-slider-description-${generatedId || "description"}`;
  const hasLabel = hasContent(label);
  const hasDescription = hasContent(description);
  const hasHeader = hasLabel || showValue;
  const thumbCount = getThumbCount(value, defaultValue);
  const describedBy =
    [props["aria-describedby"], hasDescription ? descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const rootStyle = {
    ...style,
    "--ui-slider-filter": `url(#${filterId})`,
  } as React.CSSProperties;

  const thumbAria = {
    "aria-label": hasLabel ? undefined : props["aria-label"],
    "aria-labelledby": props["aria-labelledby"],
    "aria-describedby": describedBy,
  };

  return (
    <UISlider.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      data-slot="root"
      className={cn(ui.root(), className, uiOverrides?.root)}
      style={rootStyle}
    >
      <LiquidGlassFilter
        filterId={filterId}
        className={cn(ui.filter(), uiOverrides?.filter)}
      />

      {hasHeader ? (
        <div
          data-slot="header"
          className={cn(ui.header(), uiOverrides?.header)}
        >
          {hasLabel ? (
            <UISlider.Label
              data-slot="label"
              className={cn(ui.label(), uiOverrides?.label)}
            >
              {label}
            </UISlider.Label>
          ) : null}

          {showValue ? (
            <UISlider.Value
              data-slot="value"
              className={cn(ui.value(), uiOverrides?.value)}
            />
          ) : null}
        </div>
      ) : null}

      <UISlider.Control
        data-slot="control"
        className={cn(ui.control(), uiOverrides?.control)}
      >
        <UISlider.Track
          data-slot="track"
          className={cn(ui.track(), uiOverrides?.track)}
        >
          <UISlider.Indicator
            data-slot="indicator"
            className={cn(ui.indicator(), uiOverrides?.indicator)}
          />
        </UISlider.Track>

        {Array.from({ length: thumbCount }, (_, index) => (
          <UISlider.Thumb
            key={index}
            index={index}
            data-slot="thumb"
            {...thumbAria}
            className={cn(ui.thumb(), uiOverrides?.thumb)}
          >
            <span aria-hidden="true" data-layer="thumb-glass">
              <span data-layer="thumb-lens" />
              <span data-layer="thumb-specular" />
              <span data-layer="thumb-glare" />
            </span>
          </UISlider.Thumb>
        ))}
      </UISlider.Control>

      {hasDescription ? (
        <p
          data-slot="description"
          id={descriptionId}
          className={cn(ui.description(), uiOverrides?.description)}
        >
          {description}
        </p>
      ) : null}
    </UISlider.Root>
  );
}

export { Slider };
export type { SliderStyle, SliderProps, SliderSlot };
