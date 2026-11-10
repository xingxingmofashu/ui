"use client";

import { Fieldset as UIFieldset } from "@base-ui/react/fieldset";
import { cn, type ClassValue } from "cn";
import * as React from "react";

import { useAria } from "../composables/use-aria";
import { FieldsetProvider, useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/fieldset";

type Fieldset = ComponentConfig<typeof theme>;

interface FieldsetProps
  extends Omit<UIFieldset.Root.Props, "children" | "className" | "style"> {
  /** Visible legend naming the group. */
  legend?: React.ReactNode;
  /** Fields and controls grouped by the fieldset. */
  children: React.ReactNode;
  /** Tailwind classes merged into the fieldset root. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Fieldset["slots"];
}

function Fieldset({
  children,
  legend,
  disabled = false,
  className,
  ui,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: FieldsetProps) {
  const styles = theme();
  const inheritedDisabled = useFieldset().disabled;
  const isDisabled = inheritedDisabled || disabled;
  const { controlProps, labelProps } = useAria({
    label: legend,
    "aria-labelledby": ariaLabelledBy,
  });

  return (
    <FieldsetProvider disabled={isDisabled}>
      <UIFieldset.Root
        {...props}
        disabled={isDisabled}
        {...controlProps}
        data-slot="root"
        className={cn(styles.root(), ui?.root, className)}
      >
        {legend ? (
          <UIFieldset.Legend
            {...labelProps}
            data-slot="legend"
            className={cn(styles.legend(), ui?.legend)}
          >
            {legend}
          </UIFieldset.Legend>
        ) : null}

        {children}
      </UIFieldset.Root>
    </FieldsetProvider>
  );
}

export { Fieldset };
export type { FieldsetProps };
