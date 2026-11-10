"use client";

import {
  Button as UIButton,
  type ButtonProps as UIButtonProps,
} from "@base-ui/react/button";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/button";

type Button = ComponentConfig<typeof theme>;

interface ButtonProps
  extends Omit<UIButtonProps, 'style' | "className" | 'children'>,
  VariantProps<typeof theme> {
  label?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  ui?: Button["slots"];
  className?: ClassValue;
  style?: React.CSSProperties;
}

function Button({
  className,
  ui,
  label,
  leadingIcon,
  trailingIcon,
  size,
  disabled,
  ...props
}: ButtonProps) {
  const styles = theme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;

  return (
    <UIButton
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
      {...props}
      disabled={fieldsetDisabled}
    >
      <span data-slot="base" className={cn(styles.base(), ui?.base)}>
        <span
          data-slot="glass"
          aria-hidden="true"
          className={cn(styles.glass(), ui?.glass)}
        >
          <span
            data-slot="overlay"
            className={cn(styles.overlay(), ui?.overlay)}
            aria-hidden="true"
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

        {label ? (
          <span data-slot="label" className={cn(styles.label(), ui?.label)}>
            {label}
          </span>
        ) : null}

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
    </UIButton>
  );
}

export { Button };
export type { ButtonProps };
