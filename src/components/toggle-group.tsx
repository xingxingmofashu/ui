"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { ToggleGroup as UIToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/toggle-group";

/** One option managed by the toggle group. */
type ToggleGroupItemProps = Omit<
  UIToggle.Props,
  "className" | "children" | "style" | "value" | "pressed" | "defaultPressed"
> & {
  /** Value that identifies the option in the group value. */
  value: string;
  /** Visible content inside the item. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Tailwind classes merged into the item root. */
  className?: string;
};

type ToggleGroupProps<Value extends string = string> = Omit<
  UIToggleGroup.Props<Value>,
  "className" | "style" | "children"
> &
  VariantProps<typeof theme> & {
    /** Options rendered by the toggle group. */
    items: readonly ToggleGroupItemProps[];
    /** Tailwind classes merged into the group root. */
    className?: any;
  };

function ToggleGroup<Value extends string = string>({
  className,
  size,
  items,
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

      {items.map((item) => (
        <ToggleGroupItem key={item.value} {...item} />
      ))}
    </UIToggleGroup>
  );
}

function ToggleGroupItem({
  className,
  icon,
  label,
  ...props
}: ToggleGroupItemProps) {
  const ui = theme();

  return (
    <UIToggle {...props} data-slot="item" className={cn(ui.item(), className)}>
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

export { ToggleGroup };
export type { ToggleGroupItemProps, ToggleGroupProps };
