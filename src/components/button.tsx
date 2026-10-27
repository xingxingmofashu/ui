"use client";

import { Button as UIButton } from "@base-ui/react/button";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/button";

type ButtonSlot =
  | "root"
  | "base"
  | "label"
  | "leadingIcon"
  | "trailingIcon"
  | "overlay";

type ButtonClassNames = Partial<Record<ButtonSlot, string>>;

type ButtonContentProps = {
  /** Text or content rendered inside the button. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label, inside the circular badge. */
  trailingIcon?: React.ReactNode;
  /** Classes for individual slots. Use `base` to style the visible glass pill and `root` for the outer click area. */
  classNames?: ButtonClassNames;
};

/**
 * Buttons must have an accessible name. Use `label`/`children` for visible
 * text, or `aria-label`/`aria-labelledby` for icon-only buttons.
 */
type ButtonAccessibleName =
  | { label: React.ReactNode }
  | { children: React.ReactNode }
  | { "aria-label": string }
  | { "aria-labelledby": string };

type ButtonProps = React.ComponentProps<typeof UIButton> &
  VariantProps<typeof theme> &
  ButtonContentProps &
  ButtonAccessibleName;

function Button({
  className,
  classNames,
  children,
  label,
  leadingIcon,
  trailingIcon,
  size,
  ...props
}: ButtonProps) {
  const ui = theme({ size });
  const content = label ?? children;
  const hasLabel =
    content !== undefined &&
    content !== null &&
    content !== "" &&
    content !== false;
  const hasAccessibleName =
    hasLabel ||
    Boolean(props["aria-label"]) ||
    Boolean(props["aria-labelledby"]);
  const iconIsDecorative = hasAccessibleName;

  return (
    <UIButton
      data-slot="root"
      className={cn(ui.root(), className, classNames?.root)}
      {...props}
    >
      <span data-slot="base" className={cn(ui.base(), classNames?.base)}>
        {leadingIcon != null ? (
          <span
            data-slot="leading-icon"
            className={cn(ui.leadingIcon(), classNames?.leadingIcon)}
            aria-hidden={iconIsDecorative || undefined}
          >
            {leadingIcon}
          </span>
        ) : null}

        {hasLabel ? (
          <span
            data-slot="label"
            className={cn(ui.label(), classNames?.label)}
          >
            {content}
          </span>
        ) : null}

        {trailingIcon != null ? (
          <span
            data-slot="trailing-icon"
            className={cn(ui.trailingIcon(), classNames?.trailingIcon)}
            aria-hidden={iconIsDecorative || undefined}
          >
            {trailingIcon}
          </span>
        ) : null}

        <span
          data-slot="overlay"
          className={cn(ui.overlay(), classNames?.overlay)}
          aria-hidden="true"
        />
      </span>
    </UIButton>
  );
}

export { Button };
export type { ButtonClassNames, ButtonProps };
