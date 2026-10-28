"use client";

import {
  Button as UIButton,
  type ButtonProps as UIButtonProps,
  type ButtonState as UIButtonState,
} from "@base-ui/react/button";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { hasContent } from "../lib/has-content";
import { resolveThemeClassName } from "../lib/resolve-theme-class-name";
import { withoutStyle } from "../lib/without-style";
import theme from "../theme/button";

interface ButtonContentProps {
  /** Text or content rendered inside the button. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
}

/**
 * Buttons must have an accessible name. Use `label`/`children` for visible
 * text, or `aria-label`/`aria-labelledby` for icon-only buttons.
 */
type ButtonAccessibleName =
  | { label: React.ReactNode }
  | { children: React.ReactNode }
  | { "aria-label": string }
  | { "aria-labelledby": string };

interface ButtonBaseProps
  extends Omit<UIButtonProps, "ref" | "style">,
    ButtonContentProps {
  /** Ref to the rendered root element. */
  ref?: React.Ref<HTMLElement>;
  /**
   * Classes merged into the outer click area. Accepts a callback that
   * receives Base UI's button state, like Base UI's own `className` prop.
   */
  className?: UIButtonProps["className"];
}

type ButtonProps = ButtonBaseProps &
  VariantProps<typeof theme> &
  ButtonAccessibleName;

function Button({
  className,
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
  const rootClassName = resolveThemeClassName<UIButtonState>(
    ui.root(),
    className,
  );
  const { ui: _ui, ...buttonProps } = props as typeof props & {
    /** Retained only so removed style overrides never leak to the DOM. */
    ui?: unknown;
  };

  return (
    <UIButton
      data-slot="root"
      className={rootClassName}
      {...withoutStyle(buttonProps)}
    >
      <span data-slot="base" className={ui.base()}>
        <span data-slot="glass" aria-hidden="true" className={ui.glass()}>
          <span
            data-slot="overlay"
            className={ui.overlay()}
            aria-hidden="true"
          />
        </span>

        {leadingIcon != null ? (
          <span
            data-slot="leading-icon"
            className={ui.leadingIcon()}
            aria-hidden={iconIsDecorative || undefined}
          >
            {leadingIcon}
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
export type { ButtonProps };
