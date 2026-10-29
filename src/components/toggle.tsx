"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/toggle";

type ToggleProps<Value extends string = string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style" | "ref"
> &
  Omit<VariantProps<typeof theme>, "iconOnly"> & {
    /** Ref to the rendered root element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Tailwind classes merged into the toggle root. */
    className?: string;
    /** Visible label rendered inside the toggle. */
    label?: React.ReactNode;
    /** Icon rendered before the label. */
    icon?: React.ReactNode;
  };

function Toggle<Value extends string = string>({
  className,
  icon,
  label,
  size,
  ...props
}: ToggleProps<Value>) {
  const ui = theme({ size, iconOnly: !label });

  return (
    <UIToggle
      {...props}
      data-slot="root"
      className={cn(ui.root(), className)}
    >
      <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
        <span aria-hidden="true" data-slot="overlay" className={ui.rim()} />
      </span>

      <span aria-hidden="true" data-slot="thumb" className={ui.thumb()} />

      <span data-slot="content" className={ui.content()}>
        {icon ? (
          <span data-slot="icon" aria-hidden="true" className={ui.icon()}>
            {icon}
          </span>
        ) : null}

        {label ? (
          <span data-slot="label" className={ui.label()}>
            {label}
          </span>
        ) : null}
      </span>
    </UIToggle>
  );
}

export { Toggle };
export type { ToggleProps };
