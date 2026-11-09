"use client";

import { Switch as UISwitch } from "@base-ui/react/switch";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { useFieldsetDisabled } from "../internal/fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/switch";

type Switch = ComponentConfig<typeof theme>;

interface SwitchProps
  extends Omit<
      UISwitch.Root.Props,
      "className" | "children" | "ref"
    >,
    VariantProps<typeof theme> {
  /** Ref to the rendered root element. */
  ref?: React.Ref<HTMLElement>;
  /** Tailwind classes merged into the Base UI switch root. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Switch["slots"];
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function Switch({
  className,
  ui,
  label,
  description,
  size,
  disabled,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SwitchProps) {
  const styles = theme({ size });
  const fieldsetDisabled = useFieldsetDisabled(disabled);
  const labelId = React.useId();
  const descriptionId = React.useId();
  const hasName = Boolean(label || ariaLabel || ariaLabelledBy);
  const labelledBy =
    ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
  const describedBy = mergeIds(
    ariaDescribedBy,
    description && hasName ? descriptionId : undefined,
  );

  return (
    <UISwitch.Root
      {...props}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      disabled={fieldsetDisabled}
      readOnly={readOnly}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <span
        data-slot="container"
        className={cn(styles.container(), ui?.container)}
      >
        <span data-slot="base" className={cn(styles.base(), ui?.base)}>
          <UISwitch.Thumb
            data-slot="thumb"
            aria-hidden="true"
            className={cn(styles.thumb(), ui?.thumb)}
          />
        </span>
      </span>

      {label || description ? (
        <span
          data-slot="wrapper"
          className={cn(styles.wrapper(), ui?.wrapper)}
        >
          {label ? (
            <span
              id={labelId}
              data-slot="label"
              className={cn(styles.label(), ui?.label)}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              id={descriptionId}
              data-slot="description"
              className={cn(styles.description(), ui?.description)}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </UISwitch.Root>
  );
}

export { Switch };
export type { SwitchProps };
