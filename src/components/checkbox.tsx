"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/checkbox";

import { CheckIcon } from "./icons/check";
import { DashIcon } from "./icons/dash";

type Checkbox = ComponentConfig<typeof theme>;

interface CheckboxProps
  extends Omit<
      UICheckbox.Root.Props,
      "className" | "children" | "style" | "ref"
    >,
    VariantProps<typeof theme> {
  /** Ref to the rendered root element. */
  ref?: React.Ref<HTMLElement>;
  /** Tailwind classes merged into the Base UI checkbox root. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Checkbox["slots"];
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function Checkbox({
  className,
  ui,
  label,
  description,
  size,
  indeterminate = false,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxProps) {
  const styles = theme({ size });
  const labelId = React.useId();
  const descriptionId = React.useId();
  const hasName = Boolean(label || ariaLabel || ariaLabelledBy);
  const labelledBy =
    ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
  const describedBy = mergeIds(
    ariaDescribedBy,
    description && hasName ? descriptionId : undefined,
  );

  return (
    <UICheckbox.Root
      {...props}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      indeterminate={indeterminate}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <span data-slot="box" className={cn(styles.box(), ui?.box)}>
        <span
          aria-hidden="true"
          data-slot="fill"
          className={cn(styles.fill(), ui?.fill)}
        />

        <span
          aria-hidden="true"
          data-slot="glass"
          className={cn(styles.glass(), ui?.glass)}
        >
          <span
            aria-hidden="true"
            data-slot="overlay"
            className={cn(styles.overlay(), ui?.overlay)}
          />
        </span>

        <UICheckbox.Indicator
          keepMounted
          aria-hidden="true"
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
        >
          <span
            data-slot="indicator-icon"
            className={cn(styles.indicatorIcon(), ui?.indicatorIcon)}
          >
            {indeterminate ? <DashIcon /> : <CheckIcon />}
          </span>
        </UICheckbox.Indicator>
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
    </UICheckbox.Root>
  );
}

export { Checkbox };
export type { CheckboxProps };
