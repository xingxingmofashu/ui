"use client";

import { Button as UIButton } from "@base-ui/react/button";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import button from "../theme/button";

type ButtonProps = React.ComponentProps<typeof UIButton> &
  VariantProps<typeof button> & {
  /** Text or content rendered inside the button. */
  label?: React.ReactNode;
  /** Leading icon. Alias for `leadingIcon`. */
  icon?: React.ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label, inside the circular badge. */
  trailingIcon?: React.ReactNode;
};

function Button({
  className,
  children,
  label,
  icon,
  leadingIcon,
  trailingIcon,
  size,
  ...props
}: ButtonProps) {
  const ui = button({ size });
  const content = label ?? children;
  const leading = leadingIcon ?? icon;
  const hasLabel = content !== undefined && content !== null;

  return (
    <UIButton
      data-slot="button"
      className={cn(ui.base(), className)}
      {...props}
    >
      <span data-slot="surface" className={ui.surface()}>
        {leading != null ? (
          <span
            data-slot="leading-icon"
            className={ui.leadingIcon()}
            aria-hidden="true"
          >
            {leading}
          </span>
        ) : null}

        {hasLabel ? (
          <span data-slot="label" className={ui.label()}>
            {content}
          </span>
        ) : null}

        {trailingIcon != null ? (
          <span
            data-slot="trailing-icon"
            className={ui.trailingIcon()}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        ) : null}

        <span data-slot="overlay" className={ui.overlay()} aria-hidden="true" />
      </span>
    </UIButton>
  );
}

export { Button };
export type { ButtonProps };
