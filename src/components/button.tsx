"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "cn";
import * as React from "react";

import button from "../theme/button";

const ui = button();

type ButtonProps = React.ComponentProps<typeof BaseButton>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      className={cn(ui.base(), className)}
      {...props}
    >
      <span data-slot="surface" className={ui.surface()}>
        <span data-slot="label" className={ui.label()}>
          {children}
        </span>
        <span
          data-slot="trailing-icon"
          className={ui.trailingIcon()}
          aria-hidden="true"
        >
          <svg
            className={ui.trailingIconGlyph()}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path d="M779.180132 473.232045 322.354755 16.406668c-21.413706-21.413706-56.121182-21.413706-77.534887 0-21.413706 21.413706-21.413706 56.122205 0 77.534887l418.057421 418.057421L244.819868 930.057421c-21.413706 21.413706-21.413706 56.122205 0 77.534887 10.706853 10.706853 24.759917 16.059767 38.767955 16.059767s28.061103-5.353938 38.767955-16.059767L779.180132 550.767955C800.593837 529.35425 800.593837 494.64575 779.180132 473.232045z" />
          </svg>
        </span>
        <span data-slot="overlay" className={ui.overlay()} aria-hidden="true" />
      </span>
    </BaseButton>
  );
}

export { Button };
export type { ButtonProps };
