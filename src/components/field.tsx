"use client";

import { Field as UIField } from "@base-ui/react/field";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/field";

type Field = ComponentConfig<typeof theme>;

interface FieldProps
  extends Omit<UIField.Root.Props, "children" | "className" | "style">,
    VariantProps<typeof theme> {
  /** Single Base UI control labelled and validated by the field. */
  children: React.ReactElement;
  /** Visible label associated with the control. */
  label?: React.ReactNode;
  /** Supporting text rendered under the control. */
  description?: React.ReactNode;
  /** Error message shown under the control. Accepts any React node. */
  error?: React.ReactNode;
  /** Tailwind classes merged into the field root. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Field["slots"];
}

function FieldError({
  error,
  ui,
}: Pick<FieldProps, "error" | "ui">) {
  const styles = theme();

  return (
    <UIField.Error
      {...(error ? { match: true, children: error } : {})}
      data-slot="error"
      className={cn(styles.error(), ui?.error)}
    />
  );
}

function Field({
  children,
  className,
  ui,
  size,
  label,
  description,
  error,
  invalid,
  disabled,
  ...props
}: FieldProps) {
  const styles = theme({ size });

  return (
    <UIField.Root
      {...props}
      disabled={disabled}
      invalid={invalid || (error ? true : undefined)}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      {label ? (
        <UIField.Label
          data-slot="label"
          className={cn(styles.label(), ui?.label)}
        >
          {label}
        </UIField.Label>
      ) : null}

      {children}

      <FieldError error={error} ui={ui} />

      {description ? (
        <UIField.Description
          data-slot="description"
          className={cn(styles.description(), ui?.description)}
        >
          {description}
        </UIField.Description>
      ) : null}
    </UIField.Root>
  );
}

export { Field };
export type { FieldProps };
