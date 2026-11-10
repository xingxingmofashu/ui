"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/toggle";

type Toggle = ComponentConfig<typeof theme>;

type ToggleProps<Value extends string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style"
> &
  Omit<VariantProps<typeof theme>, "iconOnly"> & {
    /** Tailwind classes merged into the toggle root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Toggle["slots"];
    /** Visible label rendered inside the toggle. */
    label?: React.ReactNode;
    /** Icon rendered before the label. */
    icon?: React.ReactNode;
  };

function Toggle<Value extends string>({
  className,
  ui,
  icon,
  label,
  size,
  disabled,
  ...props
}: ToggleProps<Value>) {
  const styles = theme({ size, iconOnly: !label });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;

  return (
    <UIToggle
      {...props}
      disabled={fieldsetDisabled}
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
          data-slot="rim"
          className={cn(styles.rim(), ui?.rim)}
        />
      </span>

      <span
        aria-hidden="true"
        data-slot="thumb"
        className={cn(styles.thumb(), ui?.thumb)}
      />

      <span data-slot="content" className={cn(styles.content(), ui?.content)}>
        {icon ? (
          <span
            data-slot="icon"
            aria-hidden="true"
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

export { Toggle };
export type { ToggleProps };
