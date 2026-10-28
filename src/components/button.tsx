"use client";

import { Button as UIButton } from "@base-ui/react/button";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { hasContent } from "../lib/has-content";
import theme from "../theme/button";

type ButtonSlot =
  | "root"
  | "base"
  | "glass"
  | "label"
  | "leadingIcon"
  | "trailingIcon"
  | "overlay";

type ButtonStyle = Partial<Record<ButtonSlot, string>>;

type ButtonContentProps = {
  /** Text or content rendered inside the button. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Classes for individual slots. Use `glass` to style the visible glass surface and `root` for the outer click area. */
  ui?: ButtonStyle;
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

type ButtonProps = Omit<React.ComponentProps<typeof UIButton>, "className"> &
  VariantProps<typeof theme> &
  ButtonContentProps & {
    /** Classes merged into the outer click area. */
    className?: string;
  } & ButtonAccessibleName;

function Button({
  className,
  ui: uiOverrides,
  children,
  label,
  leadingIcon,
  trailingIcon,
  size,
  ...props
}: ButtonProps) {
  const ui = theme({ size });
  const content = hasContent(label) ? label : children;
  const hasLabel = hasContent(content);
  const hasAccessibleName =
    hasLabel ||
    Boolean(props["aria-label"]) ||
    Boolean(props["aria-labelledby"]);
  const iconIsDecorative = hasAccessibleName;

  return (
    <UIButton
      data-slot="root"
      className={cn(ui.root(), className, uiOverrides?.root)}
      {...props}
    >
      <span data-slot="base" className={cn(ui.base(), uiOverrides?.base)}>
        <span
          data-slot="glass"
          aria-hidden="true"
          className={cn(ui.glass(), uiOverrides?.glass)}
        >
          <span
            data-slot="overlay"
            className={cn(ui.overlay(), uiOverrides?.overlay)}
            aria-hidden="true"
          />
        </span>

        {leadingIcon != null ? (
          <span
            data-slot="leading-icon"
            className={cn(ui.leadingIcon(), uiOverrides?.leadingIcon)}
            aria-hidden={iconIsDecorative || undefined}
          >
            {leadingIcon}
          </span>
        ) : null}

        {hasLabel ? (
          <span
            data-slot="label"
            className={cn(ui.label(), uiOverrides?.label)}
          >
            {content}
          </span>
        ) : null}

        {trailingIcon != null ? (
          <span
            data-slot="trailing-icon"
            className={cn(ui.trailingIcon(), uiOverrides?.trailingIcon)}
            aria-hidden={iconIsDecorative || undefined}
          >
            {trailingIcon}
          </span>
        ) : null}
      </span>
    </UIButton>
  );
}

export { Button };
export type { ButtonStyle, ButtonProps };
