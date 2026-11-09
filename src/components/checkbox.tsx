"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useAria } from "../composables/use-aria";
import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/checkbox";

import { CheckIcon } from "./icons/check";
import { DashIcon } from "./icons/dash";

type Checkbox = ComponentConfig<typeof theme>;

interface CheckboxProps
  extends Omit<UICheckbox.Root.Props, "className" | "children">,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the Base UI checkbox root. */
  className?: ClassValue;
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
  disabled,
  indeterminate = false,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxProps) {
  const styles = theme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });

  return (
    <UICheckbox.Root
      {...props}
      {...controlProps}
      disabled={fieldsetDisabled}
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
              {...labelProps}
              data-slot="label"
              className={cn(styles.label(), ui?.label)}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              {...descriptionProps}
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
