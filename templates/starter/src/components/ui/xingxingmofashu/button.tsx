"use client";

import * as React from "react";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import { Button as UIButton, type ButtonProps as UIButtonProps } from "@base-ui/react/button";
import { cn } from "cn";

type FieldsetContext = {
  disabled: boolean;
};

/**
 * Registry items install as single files, so each control carries its own copy
 * of this module. A global key keeps the context shared between a Fieldset and
 * controls installed from separate items.
 */
const FIELD_SET_CONTEXT_KEY = "__xingxingmofashuFieldsetContext__";

type FieldsetGlobal = typeof globalThis & {
  [FIELD_SET_CONTEXT_KEY]?: React.Context<FieldsetContext>;
};

const fieldsetGlobal = globalThis as FieldsetGlobal;

const FieldsetContext =
  fieldsetGlobal[FIELD_SET_CONTEXT_KEY] ??
  (fieldsetGlobal[FIELD_SET_CONTEXT_KEY] = React.createContext<FieldsetContext>({
    disabled: false,
  }));

/** Returns the state of the nearest fieldset. */
function useFieldset() {
  return React.useContext(FieldsetContext);
}

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};

const buttonTheme = tv({
  slots: {
    root: [
      "group relative inline-flex items-center min-w-0 max-w-full cursor-pointer select-none whitespace-nowrap",
      "appearance-none rounded-full border-0 bg-transparent p-0",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    ],
    base: [
      "relative isolate flex w-full min-w-0 max-w-full flex-row flex-nowrap items-center justify-center rounded-full",
      "box-border",
      "transition-[background-color,translate,scale] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:-translate-y-[3px] group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
      "transition-[background-color] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:bg-transparent",
      "motion-reduce:transition-none",
    ],
    label: [
      "relative z-[1] min-w-0 truncate font-normal text-ui-ink",
      "group-active:text-ui-ink-active",
    ],
    leadingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    trailingIcon: [
      "relative z-[1] inline-flex shrink-0 items-center justify-center text-ui-ink [&_svg]:block [&_svg]:shrink-0",
    ],
    overlay: "ui-glass-rim",
  },
  variants: {
    size: {
      xs: {
        base: "h-6 px-2.5 text-xs gap-1",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      sm: {
        base: "h-7 px-3 text-xs gap-1.5",
        leadingIcon: "[&_svg]:size-4",
        trailingIcon: "[&_svg]:size-4",
      },
      md: {
        base: "h-8 px-3 text-sm gap-1.5",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      lg: {
        base: "h-9 px-3.5 text-sm gap-2",
        leadingIcon: "[&_svg]:size-5",
        trailingIcon: "[&_svg]:size-5",
      },
      xl: {
        base: "h-10 px-3.5 text-base gap-2",
        leadingIcon: "[&_svg]:size-6",
        trailingIcon: "[&_svg]:size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Button = ComponentConfig<typeof buttonTheme>;

interface ButtonProps
  extends Omit<UIButtonProps, "style" | "className" | "children">,
  VariantProps<typeof buttonTheme> {
  /**
   * Visible button content. Also supplies the accessible name unless an ARIA
   * name is set.
   */
  children?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  ui?: Button["slots"];
  className?: ClassValue;
  style?: React.CSSProperties;
}

function Button({
  className,
  ui,
  children,
  leadingIcon,
  trailingIcon,
  size,
  disabled,
  ...props
}: ButtonProps) {
  const styles = buttonTheme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;

  return (
    <UIButton
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
      {...props}
      disabled={fieldsetDisabled}
    >
      <span data-slot="base" className={cn(styles.base(), ui?.base)}>
        <span
          data-slot="glass"
          aria-hidden="true"
          className={cn(styles.glass(), ui?.glass)}
        >
          <span
            data-slot="overlay"
            className={cn(styles.overlay(), ui?.overlay)}
            aria-hidden="true"
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

        {children ? (
          <span data-slot="label" className={cn(styles.label(), ui?.label)}>
            {children}
          </span>
        ) : null}

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
    </UIButton>
  );
}

export { Button };

export type { ButtonProps };
