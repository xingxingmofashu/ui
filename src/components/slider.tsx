"use client";

import { Slider as UISlider } from "@base-ui/react/slider";
import { cn } from "cn";
import * as React from "react";

import { hasContent } from "../lib/has-content";
import theme from "../theme/slider";

type SliderThemeSlot =
  | "root"
  | "header"
  | "label"
  | "value"
  | "description"
  | "control"
  | "track"
  | "indicator"
  | "thumb";

type SliderStyle = Partial<Record<SliderThemeSlot, string>>;

type SliderRootProps<Value extends number | readonly number[]> =
  UISlider.Root.Props<Value>;

type SliderClassName<Value extends number | readonly number[]> =
  SliderRootProps<Value>["className"];

type SliderStyleProp<Value extends number | readonly number[]> =
  SliderRootProps<Value>["style"];

interface SliderBaseProps<Value extends number | readonly number[]>
  extends Omit<SliderRootProps<Value>, "className" | "style" | "children"> {
  /** Classes merged into the outer root. Accepts a callback that receives Base UI's slider state. */
  className?: SliderClassName<Value>;
  /** Classes for individual slots. */
  ui?: SliderStyle;
  /** Inline styles merged into the root. Accepts a callback that receives Base UI's slider state. */
  style?: SliderStyleProp<Value>;
  /** Visible label, connected to every thumb through `aria-labelledby`. */
  label?: React.ReactNode;
  /** Optional supporting text connected through `aria-describedby`. */
  description?: React.ReactNode;
  /** Renders the current value (or range) in the header. */
  showValue?: boolean;
  /**
   * Returns an accessible name for each thumb. Use this on range sliders to
   * distinguish the minimum and maximum handles.
   */
  getThumbAriaLabel?: (index: number) => string;
}

type SliderProps<Value extends number | readonly number[] = number> =
  SliderBaseProps<Value> & SliderAccessibleName;

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
  getThumbAriaLabel,
  value,
  defaultValue,
  ...props
}: SliderProps<Value>) {
  const ui = theme();
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const descriptionId = `ui-slider-description-${generatedId || "description"}`;
  const hasLabel = hasContent(label);
  const hasDescription = hasContent(description);
  const hasHeader = hasLabel || showValue;
  const thumbCount = getThumbCount(value, defaultValue);
  const describedBy =
    [props["aria-describedby"], hasDescription ? descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const thumbAria = {
    "aria-label": hasLabel ? undefined : props["aria-label"],
    "aria-labelledby": props["aria-labelledby"],
    "aria-describedby": describedBy,
  };
  const rootClassName =
    typeof className === "function"
      ? (state: UISlider.Root.State) =>
          cn(ui.root(), className(state), uiOverrides?.root)
      : cn(ui.root(), className, uiOverrides?.root);

  return (
    <UISlider.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      data-slot="root"
      className={rootClassName}
      style={style}
    >
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
            getAriaLabel={getThumbAriaLabel}
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
export type { SliderStyle, SliderProps, SliderThemeSlot };
