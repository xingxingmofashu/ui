"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/checkbox";

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
  ...props
}: CheckboxProps) {
  const ui = theme({ size });

  return (
    <UICheckbox.Root
      {...props}
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
            <CheckIcon indeterminate={indeterminate} />
          </span>
        </UICheckbox.Indicator>
      </span>

      {label || description ? (
        <span data-slot="wrapper" className={ui.wrapper()}>
          {label ? (
            <span data-slot="label" className={ui.label()}>
              {label}
            </span>
          ) : null}
          {description ? (
            <span data-slot="description" className={ui.description()}>
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
