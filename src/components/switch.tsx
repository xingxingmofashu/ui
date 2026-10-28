"use client";

import { Switch as UISwitch } from "@base-ui/react/switch";
import { cn } from "cn";
import * as React from "react";

import { hasContent } from "../lib/has-content";
import theme from "../theme/switch";

type SwitchThemeSlot =
  | "root"
  | "container"
  | "base"
  | "thumb"
  | "wrapper"
  | "label"
  | "description";

type SwitchStyle = Partial<Record<SwitchThemeSlot, string>>;

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

interface SwitchBaseProps
  extends Omit<SwitchRootProps, "className" | "children" | "style"> {
  /** Classes merged into the outer root. Use `ui.base` for the switch itself. */
  className?: string;
  /** Inline styles merged into the outer root. */
  style?: React.CSSProperties;
  /** Classes for individual slots. */
  ui?: SwitchStyle;
  /** Visible label. It is connected to the switch through `aria-labelledby`. */
  label?: React.ReactNode;
  /** Optional supporting text connected through `aria-describedby`. */
  description?: React.ReactNode;
  /** Control size; defaults to `md`. */
  size?: SwitchSize;
}

type SwitchProps = SwitchBaseProps & SwitchAccessibleName;

type LiquidGlassFilterProps = {
  filterId: string;
};

function LiquidGlassFilter({ filterId }: LiquidGlassFilterProps) {
  return (
    <svg aria-hidden="true" focusable="false" data-layer="filter">
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
  ui: uiOverrides,
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
  const animationTimeout = React.useRef<number | null>(null);
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const switchId = props.id ?? generatedId;
  const filterId = `ui-switch-${generatedId || "filter"}`;
  const labelId = `ui-switch-label-${generatedId || "label"}`;
  const descriptionId = `ui-switch-description-${generatedId || "description"}`;
  const hasLabel = hasContent(label);
  const hasDescription = hasContent(description);
  const hasText = hasLabel || hasDescription;
  const labelledBy =
    props["aria-labelledby"] ??
    (hasLabel && props["aria-label"] == null ? labelId : undefined);
  const describedBy =
    props["aria-describedby"] ?? (hasDescription ? descriptionId : undefined);
  const switchStyle = {
    "--ui-switch-filter-goo": `url(#${filterId}-goo)`,
    "--ui-switch-filter-remove-black": `url(#${filterId}-remove-black)`,
  } as React.CSSProperties;
  const clearAnimationTimeout = React.useCallback(() => {
    if (animationTimeout.current !== null) {
      window.clearTimeout(animationTimeout.current);
      animationTimeout.current = null;
    }
  }, []);
  const stopAnimating = () => {
    clearAnimationTimeout();
    setAnimating(false);
  };
  const handleCheckedChange: NonNullable<
    SwitchRootProps["onCheckedChange"]
  > = (checked, details) => {
    onCheckedChange?.(checked, details);

    if (details.isCanceled) {
      return;
    }

    clearAnimationTimeout();
    setAnimating(true);
    animationTimeout.current = window.setTimeout(stopAnimating, 400);
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
      stopAnimating();
    }
  };

  React.useEffect(
    () => () => {
      clearAnimationTimeout();
    },
    [clearAnimationTimeout],
  );

  return (
    <div
      data-slot="root"
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cn(ui.root(), className, uiOverrides?.root)}
      style={style}
    >
      <div
        data-slot="container"
        className={cn(ui.container(), uiOverrides?.container)}
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
          className={cn(ui.base(), uiOverrides?.base)}
          style={switchStyle}
        >
          <LiquidGlassFilter filterId={filterId} />

          <span aria-hidden="true" data-layer="mask">
            <span data-layer="track">
              <span data-layer="track-mask" />
            </span>
          </span>

          <UISwitch.Thumb
            data-slot="thumb"
            aria-hidden="true"
            onTransitionEnd={handleThumbTransitionEnd}
            className={cn(ui.thumb(), uiOverrides?.thumb)}
          >
            <span aria-hidden="true" data-layer="glass-rim" />
            <span data-layer="glass-lens">
              <span data-layer="goo">
                <span data-layer="inner-glow" />
                <span data-layer="fill" />
              </span>
            </span>
            <span data-layer="cover" />
          </UISwitch.Thumb>
        </UISwitch.Root>
      </div>

      {hasText ? (
        <div
          data-slot="wrapper"
          className={cn(ui.wrapper(), uiOverrides?.wrapper)}
        >
          {hasLabel ? (
            <label
              data-slot="label"
              id={labelId}
              htmlFor={disabled || readOnly ? undefined : switchId}
              className={cn(ui.label(), uiOverrides?.label)}
            >
              {label}
            </label>
          ) : null}
          {hasDescription ? (
            <p
              data-slot="description"
              id={descriptionId}
              className={cn(ui.description(), uiOverrides?.description)}
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
export type { SwitchStyle, SwitchProps, SwitchSize };
