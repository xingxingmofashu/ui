import { Fieldset as UIFieldset } from "@base-ui/react/fieldset";
import { cn } from "cn";
import * as React from "react";

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
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Fieldset["slots"];
}

function Fieldset({
  children,
  legend,
  className,
  ui,
  ...props
}: FieldsetProps) {
  const styles = theme();

  return (
    <UIFieldset.Root
      {...props}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      {legend ? (
        <UIFieldset.Legend
          data-slot="legend"
          className={cn(styles.legend(), ui?.legend)}
        >
          {legend}
        </UIFieldset.Legend>
      ) : null}

      {children}
    </UIFieldset.Root>
  );
}

export { Fieldset };
export type { FieldsetProps };
