"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/checkbox";

interface CheckboxProps
  extends Omit<
      React.ComponentProps<typeof UICheckbox.Root>,
      "className" | "children" | "style"
    >,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the Base UI checkbox root. */
  className?: string;
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function CheckIcon({ indeterminate }: { indeterminate: boolean }) {
  return (
    <svg
      aria-hidden="true"
      data-icon={indeterminate ? "dash" : "check"}
      focusable="false"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d={indeterminate ? "M3.5 8h9" : "m2.5 8.5 4 4 7-9"} />
    </svg>
  );
}

function Checkbox({
  className,
  label,
  description,
  size,
  indeterminate = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxProps) {
  const ui = theme({ size });
  const id = React.useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <UICheckbox.Root
      {...props}
      indeterminate={indeterminate}
      aria-label={ariaLabel}
      aria-labelledby={
        ariaLabelledBy ??
        (label != null && ariaLabel == null ? labelId : undefined)
      }
      aria-describedby={
        ariaDescribedBy ?? (description != null ? descriptionId : undefined)
      }
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
            <CheckIcon indeterminate={indeterminate} />
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
