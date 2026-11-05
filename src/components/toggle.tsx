"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useFieldsetDisabled } from "../internal/fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/toggle";

type Toggle = ComponentConfig<typeof theme>;

type ToggleProps<Value extends string = string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style" | "ref"
> &
  Omit<VariantProps<typeof theme>, "iconOnly"> & {
    /** Ref to the rendered root element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Tailwind classes merged into the toggle root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Toggle["slots"];
    /** Visible label rendered inside the toggle. */
    label?: React.ReactNode;
    /** Icon rendered before the label. */
    icon?: React.ReactNode;
  };

function Toggle<Value extends string = string>({
  className,
  ui,
  icon,
  label,
  size,
  disabled,
  ...props
}: ToggleProps<Value>) {
  const styles = theme({ size, iconOnly: !label });
  const fieldsetDisabled = useFieldsetDisabled(disabled);

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
