"use client";

import { Fieldset as UIFieldset } from "@base-ui/react/fieldset";
import { cn } from "cn";
import * as React from "react";

import {
  FieldsetDisabledProvider,
  useFieldsetDisabled,
} from "../internal/fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/fieldset";

type Fieldset = ComponentConfig<typeof theme>;

interface FieldsetProps
  extends Omit<UIFieldset.Root.Props, "children" | "className"> {
  /** Visible legend naming the group. */
  legend?: React.ReactNode;
  /** Fields and controls grouped by the fieldset. */
  children: React.ReactNode;
  /** Tailwind classes merged into the fieldset root. */
  className?: string;
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
  const legendId = React.useId();
  const inheritedDisabled = useFieldsetDisabled();
  const isDisabled = inheritedDisabled || disabled;
  const labelledBy = ariaLabelledBy ?? (legend ? legendId : undefined);

  return (
    <FieldsetDisabledProvider disabled={isDisabled}>
      <UIFieldset.Root
        {...props}
        disabled={isDisabled}
        {...(labelledBy ? { "aria-labelledby": labelledBy } : {})}
        data-slot="root"
        className={cn(styles.root(), ui?.root, className)}
      >
        {legend ? (
          <UIFieldset.Legend
            id={legendId}
            data-slot="legend"
            className={cn(styles.legend(), ui?.legend)}
          >
            {legend}
          </UIFieldset.Legend>
        ) : null}

        {children}
      </UIFieldset.Root>
    </FieldsetDisabledProvider>
  );
}

export { Fieldset };
export type { FieldsetProps };
