"use client";

import { Switch as UISwitch } from "@base-ui/react/switch";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/switch";

type Switch = ComponentConfig<typeof theme>;

interface SwitchProps
  extends Omit<
      UISwitch.Root.Props,
      "className" | "children" | "style" | "ref"
    >,
    VariantProps<typeof theme> {
  /** Ref to the rendered root element. */
  ref?: React.Ref<HTMLElement>;
  /** Tailwind classes merged into the Base UI switch root. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Switch["slots"];
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function LiquidGlassFilter({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" focusable="false" data-layer="filter">
      <defs>
        <filter id={`${id}-goo`}>
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
          id={`${id}-remove-black`}
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
  ui,
  label,
  description,
  size,
  disabled,
  readOnly,
  onCheckedChange,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SwitchProps) {
  const styles = theme({ size });
  const filterId = React.useId();
  const labelId = React.useId();
  const descriptionId = React.useId();
  const hasName = Boolean(label || ariaLabel || ariaLabelledBy);
  const labelledBy =
    ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
  const describedBy = mergeIds(
    ariaDescribedBy,
    description && hasName ? descriptionId : undefined,
  );
  const filterStyles = {
    "--ui-switch-goo-filter": `url("#${filterId}-goo")`,
    "--ui-switch-remove-black-filter": `url("#${filterId}-remove-black")`,
  } as React.CSSProperties;
  const [animating, setAnimating] = React.useState(false);
  const handleCheckedChange: NonNullable<
    SwitchProps["onCheckedChange"]
  > = (checked, details) => {
    onCheckedChange?.(checked, details);

    if (!details.isCanceled) {
      setAnimating(true);
    }
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
    <UISwitch.Root
      {...props}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      disabled={disabled}
      readOnly={readOnly}
      data-slot="root"
      data-animating={animating || undefined}
      onCheckedChange={handleCheckedChange}
      className={cn(styles.root(), ui?.root, className)}
    >
      <span
        data-slot="container"
        className={cn(styles.container(), ui?.container)}
      >
        <span
          data-slot="base"
          className={cn(styles.base(), ui?.base)}
          style={filterStyles}
        >
          <LiquidGlassFilter id={filterId} />

          <span aria-hidden="true" data-layer="mask">
            <span data-layer="track">
              <span data-layer="track-mask" />
            </span>
          </span>

          <UISwitch.Thumb
            data-slot="thumb"
            aria-hidden="true"
            onTransitionEnd={handleThumbTransitionEnd}
            className={cn(styles.thumb(), ui?.thumb)}
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
        </span>
      </span>

      {label || description ? (
        <span
          data-slot="wrapper"
          className={cn(styles.wrapper(), ui?.wrapper)}
        >
          {label ? (
            <span
              id={labelId}
              data-slot="label"
              className={cn(styles.label(), ui?.label)}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              id={descriptionId}
              data-slot="description"
              className={cn(styles.description(), ui?.description)}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </UISwitch.Root>
  );
}

export { Switch };
export type { SwitchProps };
