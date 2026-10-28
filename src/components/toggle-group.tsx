"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { ToggleGroup as UIToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/toggle-group";

type ToggleGroupProps<Value extends string = string> = Omit<
  UIToggleGroup.Props<Value>,
  "className" | "style" | "children"
> &
  VariantProps<typeof theme> & {
    /** Tailwind classes merged into the group root. */
    className?: any;
    children?: React.ReactNode;
  };

type ToggleGroupItemProps<Value extends string = string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style"
> & {
  /** Tailwind classes merged into the item root. */
  className?: any;
  /** Icon rendered inside the item. */
  icon?: React.ReactNode;
  /** Text or custom content rendered inside the item. */
  children?: React.ReactNode;
};

function ToggleGroup<Value extends string = string>({
  className,
  size,
  children,
  ...props
}: ToggleGroupProps<Value>) {
  const ui = theme({ size });

  return (
    <UIToggleGroup
      {...props}
      data-slot="root"
      className={cn(ui.root(), className)}
    >
      <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
        <span aria-hidden="true" data-layer="rim" className={ui.rim()} />
      </span>

      {children}
    </UIToggleGroup>
  );
}

function ToggleGroupItem<Value extends string = string>({
  className,
  icon,
  children,
  ...props
}: ToggleGroupItemProps<Value>) {
  const ui = theme();

  return (
    <UIToggle
      {...props}
      data-slot="item"
      className={cn(ui.item(), className)}
    >
      <span data-slot="content" className={ui.content()}>
        {icon != null ? (
          <span data-slot="icon" aria-hidden="true" className={ui.icon()}>
            {icon}
          </span>
        ) : null}

        <span data-slot="label" className={ui.label()}>
          {children}
        </span>
      </span>
    </UIToggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
