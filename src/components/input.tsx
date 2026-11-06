"use client";

import { Input as UIInput } from "@base-ui/react/input";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useFieldsetDisabled } from "../internal/fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/input";

type Input = ComponentConfig<typeof theme>;

interface InputProps
  extends Omit<
      UIInput.Props,
      "className" | "children" | "size" | "style"
    >,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the root element. */
  className?: string;
  /** Inline styles merged into the outer root. Use `ui.input` for the native input. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Input["slots"];
  /** Icon rendered before the input. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the input. */
  trailingIcon?: React.ReactNode;
}

function Input({
  className,
  ui,
  leadingIcon,
  trailingIcon,
  size,
  disabled,
  style,
  ...props
}: InputProps) {
  const styles = theme({ size });
  const fieldsetDisabled = useFieldsetDisabled(disabled);

  return (
    <div
      data-slot="root"
      data-disabled={fieldsetDisabled || undefined}
      className={cn(styles.root(), ui?.root, className)}
      style={style}
    >
      <span
        data-slot="control"
        className={cn(styles.control(), ui?.control)}
      >
        <span
          aria-hidden="true"
          data-slot="glass"
          className={cn(styles.glass(), ui?.glass)}
        >
          <span
            aria-hidden="true"
            data-slot="overlay"
            className={cn(styles.overlay(), ui?.overlay)}
          />
        </span>

        {leadingIcon ? (
          <span
            data-slot="leading-icon"
            className={cn(styles.leadingIcon(), ui?.leadingIcon)}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        ) : null}

        <UIInput
          {...props}
          disabled={fieldsetDisabled}
          data-slot="input"
          className={cn(styles.input(), ui?.input)}
        />

        {trailingIcon ? (
          <span
            data-slot="trailing-icon"
            className={cn(styles.trailingIcon(), ui?.trailingIcon)}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export { Input };
export type { InputProps };
