"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { ToggleGroup as UIToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/toggle-group";

type ToggleGroup = ComponentConfig<typeof theme>;

/** One option managed by the toggle group. */
type ToggleGroupItemProps<Value extends string = string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style" | "value" | "pressed" | "defaultPressed"
> & {
  /** Value that identifies the option in the group value. */
  value: Value;
  /** Visible content inside the item. */
  label?: React.ReactNode;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Tailwind classes merged into the item root. */
  className?: string;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<ToggleGroup["slots"], "item" | "content" | "icon" | "label">
  >;
};

type ToggleGroupProps<Value extends string = string> = Omit<
  UIToggleGroup.Props<Value>,
  "className" | "style" | "children"
> &
  VariantProps<typeof theme> & {
    /** Options rendered by the toggle group. */
    items: readonly ToggleGroupItemProps<Value>[];
    /** Tailwind classes merged into the group root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: ToggleGroup["slots"];
  };

function ToggleGroup<Value extends string = string>({
  className,
  ui,
  size,
  items,
  ...props
}: ToggleGroupProps<Value>) {
  const styles = theme({ size });

  return (
    <UIToggleGroup
      {...props}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <span
        aria-hidden="true"
        data-slot="glass"
        className={cn(styles.glass(), ui?.glass)}
      >
        <span
          aria-hidden="true"
          data-layer="rim"
          className={cn(styles.rim(), ui?.rim)}
        />
      </span>

      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          {...item}
          ui={{
            item: cn(ui?.item, item.ui?.item),
            content: cn(ui?.content, item.ui?.content),
            icon: cn(ui?.icon, item.ui?.icon),
            label: cn(ui?.label, item.ui?.label),
          }}
        />
      ))}
    </UIToggleGroup>
  );
}

function ToggleGroupItem<Value extends string = string>({
  className,
  ui,
  icon,
  label,
  ref,
  ...props
}: ToggleGroupItemProps<Value>) {
  const styles = theme();

  return (
    <UIToggle
      {...props}
      ref={ref}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <span data-slot="content" className={cn(styles.content(), ui?.content)}>
        {icon ? (
          <span
            aria-hidden="true"
            data-slot="icon"
            className={cn(styles.icon(), ui?.icon)}
          >
            {icon}
          </span>
        ) : null}

        {label ? (
          <span data-slot="label" className={cn(styles.label(), ui?.label)}>
            {label}
          </span>
        ) : null}
      </span>
    </UIToggle>
  );
}

export { ToggleGroup };
export type { ToggleGroupItemProps, ToggleGroupProps };
