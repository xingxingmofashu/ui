"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import theme from "../theme/checkbox";

import { CheckIcon } from "./icons/check";
import { DashIcon } from "./icons/dash";

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
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function Checkbox({
  className,
  label,
  description,
  size,
  indeterminate = false,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxProps) {
  const ui = theme({ size });
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
      className={cn(ui.root(), className)}
    >
      <span data-slot="box" className={ui.box()}>
        <span aria-hidden="true" data-slot="fill" className={ui.fill()} />

        <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
          <span
            aria-hidden="true"
            data-slot="overlay"
            className={ui.overlay()}
          />
        </span>

        <UICheckbox.Indicator
          keepMounted
          aria-hidden="true"
          data-slot="indicator"
          className={ui.indicator()}
        >
          <span data-slot="indicator-icon" className={ui.indicatorIcon()}>
            {indeterminate ? <DashIcon /> : <CheckIcon />}
          </span>
        </UICheckbox.Indicator>
      </span>

      {label || description ? (
        <span data-slot="wrapper" className={ui.wrapper()}>
          {label ? (
            <span id={labelId} data-slot="label" className={ui.label()}>
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              id={descriptionId}
              data-slot="description"
              className={ui.description()}
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
