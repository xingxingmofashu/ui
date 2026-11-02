"use client";

import { Progress as UIProgress } from "@base-ui/react/progress";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import theme from "../theme/progress";

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
  };

function Progress({
  className,
  label,
  description,
  size,
  value = null,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ProgressProps) {
  const ui = theme({ size });
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
      className={cn(ui.root(), className)}
    >
      <div data-slot="header" className={ui.header()}>
        {label ? (
          <UIProgress.Label data-slot="label" className={ui.label()}>
            {label}
          </UIProgress.Label>
        ) : null}

        <UIProgress.Value data-slot="value" className={ui.value()} />
      </div>

      <UIProgress.Track data-slot="track" className={ui.track()}>
        <UIProgress.Indicator
          data-slot="indicator"
          className={ui.indicator()}
        />
      </UIProgress.Track>

      {description ? (
        <span
          id={descriptionId}
          data-slot="description"
          className={ui.description()}
        >
          {description}
        </span>
      ) : null}
    </UIProgress.Root>
  );
}

export { Progress };
export type { ProgressProps };
