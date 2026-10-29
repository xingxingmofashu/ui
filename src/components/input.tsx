"use client";

import { Input as UIInput } from "@base-ui/react/input";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/input";

interface InputProps
  extends Omit<
      React.ComponentProps<typeof UIInput>,
      "className" | "children" | "size" | "style"
    >,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the root element. */
  className?: string;
  /** Visible label associated with the input. */
  label?: React.ReactNode;
  /** Optional supporting text under the field. */
  description?: React.ReactNode;
  /** Icon rendered before the input. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the input. */
  trailingIcon?: React.ReactNode;
  /** The native input is a void element and does not accept children. */
  children?: never;
}

function Input({
  className,
  label,
  description,
  leadingIcon,
  trailingIcon,
  size,
  id,
  disabled,
  children: _children,
  ...props
}: InputProps) {
  void _children;
  const ui = theme({ size });
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div
      data-slot="root"
      data-disabled={disabled || undefined}
      className={cn(ui.root(), className)}
    >
      {label ? (
        <label htmlFor={inputId} data-slot="label" className={ui.label()}>
          {label}
        </label>
      ) : null}

      <span data-slot="control" className={ui.control()}>
        <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
          <span
            aria-hidden="true"
            data-slot="overlay"
            className={ui.overlay()}
          />
        </span>

        {leadingIcon ? (
          <span
            data-slot="leading-icon"
            className={ui.leadingIcon()}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        ) : null}

        <UIInput
          {...props}
          id={inputId}
          disabled={disabled}
          data-slot="input"
          className={ui.input()}
        />

        {trailingIcon ? (
          <span
            data-slot="trailing-icon"
            className={ui.trailingIcon()}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        ) : null}
      </span>

      {description ? (
        <span data-slot="description" className={ui.description()}>
          {description}
        </span>
      ) : null}
    </div>
  );
}

export { Input };
export type { InputProps };
