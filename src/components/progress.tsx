"use client";

import { Progress as UIProgress } from "@base-ui/react/progress";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/progress";

type Progress = ComponentConfig<typeof theme>;

type ProgressProps = Omit<
  UIProgress.Root.Props,
  "children" | "className" | "style" | "value"
> &
  VariantProps<typeof theme> & {
    /** Current value. Use `null` for an indeterminate progress bar. */
    value?: number | null;
    /** Visible label for the progress bar. */
    label?: React.ReactNode;
    /** Supporting text rendered below the bar. */
    description?: React.ReactNode;
    /** Tailwind classes merged into the root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Progress["slots"];
  };

function Progress({
  className,
  ui,
  label,
  description,
  size,
  value = null,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ProgressProps) {
  const styles = theme({ size });
  const descriptionId = React.useId();
  const describedBy = mergeIds(
    ariaDescribedBy,
    description ? descriptionId : undefined,
  );

  return (
    <UIProgress.Root
      {...props}
      value={value}
      aria-describedby={describedBy}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <div data-slot="header" className={cn(styles.header(), ui?.header)}>
        {label ? (
          <UIProgress.Label
            data-slot="label"
            className={cn(styles.label(), ui?.label)}
          >
            {label}
          </UIProgress.Label>
        ) : null}

        <UIProgress.Value
          data-slot="value"
          className={cn(styles.value(), ui?.value)}
        />
      </div>

      <UIProgress.Track
        data-slot="track"
        className={cn(styles.track(), ui?.track)}
      >
        <UIProgress.Indicator
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
        />
      </UIProgress.Track>

      {description ? (
        <span
          id={descriptionId}
          data-slot="description"
          className={cn(styles.description(), ui?.description)}
        >
          {description}
        </span>
      ) : null}
    </UIProgress.Root>
  );
}

export { Progress };
export type { ProgressProps };
