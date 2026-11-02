"use client";

import { Input as UIInput } from "@base-ui/react/input";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/input";

type Input = ComponentConfig<typeof theme>;

interface InputProps
  extends Omit<
      UIInput.Props,
      "className" | "children" | "size" | "style"
    >,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the root element. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Input["slots"];
  /** Visible label associated with the input. */
  label?: React.ReactNode;
  /** Optional supporting text under the field. */
  description?: React.ReactNode;
  /** Icon rendered before the input. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the input. */
  trailingIcon?: React.ReactNode;
}

function Input({
  className,
  ui,
  label,
  description,
  leadingIcon,
  trailingIcon,
  size,
  id,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const styles = theme({ size });
  const generatedId = React.useId();
  const descriptionId = React.useId();
  const inputId = id ?? generatedId;
  const describedBy = mergeIds(
    ariaDescribedBy,
    description ? descriptionId : undefined,
  );

  return (
    <div
      data-slot="root"
      data-disabled={disabled || undefined}
      className={cn(styles.root(), ui?.root, className)}
    >
      {label ? (
        <label
          htmlFor={inputId}
          data-slot="label"
          className={cn(styles.label(), ui?.label)}
        >
          {label}
        </label>
      ) : null}

      <span
        data-slot="control"
        className={cn(styles.control(), ui?.control)}
      >
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

        {leadingIcon ? (
          <span
            data-slot="leading-icon"
            className={cn(styles.leadingIcon(), ui?.leadingIcon)}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        ) : null}

        <UIInput
          {...props}
          id={inputId}
          disabled={disabled}
          aria-describedby={describedBy}
          data-slot="input"
          className={cn(styles.input(), ui?.input)}
        />

        {trailingIcon ? (
          <span
            data-slot="trailing-icon"
            className={cn(styles.trailingIcon(), ui?.trailingIcon)}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        ) : null}
      </span>

      {description ? (
        <span
          id={descriptionId}
          data-slot="description"
          className={cn(styles.description(), ui?.description)}
        >
          {description}
        </span>
      ) : null}
    </div>
  );
}

export { Input };
export type { InputProps };
