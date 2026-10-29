"use client";

import {
  Button as UIButton,
  type ButtonProps as UIButtonProps,
} from "@base-ui/react/button";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/button";

interface ButtonProps
  extends Omit<UIButtonProps, "ref" | "style" | "className">,
    VariantProps<typeof theme> {
  /** Ref to the rendered root element. */
  ref?: React.Ref<HTMLElement>;
  /** Tailwind classes merged into the outer click area. */
  className?: any;
  /** Text or content rendered inside the button. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
}

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

  return (
    <UIButton
      data-slot="root"
      className={cn(ui.root(), className)}
      {...props}
    >
      <span data-slot="base" className={ui.base()}>
        <span data-slot="glass" aria-hidden="true" className={ui.glass()}>
          <span
            data-slot="overlay"
            className={ui.overlay()}
            aria-hidden="true"
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

        <span data-slot="label" className={ui.label()}>
          {label || children}
        </span>

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
    </UIButton>
  );
}

export { Button };
export type { ButtonProps };
