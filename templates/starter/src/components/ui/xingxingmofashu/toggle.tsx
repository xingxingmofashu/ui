"use client";

import * as React from "react";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { cn } from "cn";

type FieldsetContext = {
  disabled: boolean;
};

/**
 * Registry items install as single files, so each control carries its own copy
 * of this module. A global key keeps the context shared between a Fieldset and
 * controls installed from separate items.
 */
const FIELDSET_CONTEXT_KEY = "__XINGXINGMOFASHU_FIELDSET_CONTEXT__";

type FieldsetGlobal = typeof globalThis & {
  [FIELDSET_CONTEXT_KEY]?: React.Context<FieldsetContext>;
};

const fieldsetGlobal = globalThis as FieldsetGlobal;

const FieldsetContext =
  fieldsetGlobal[FIELDSET_CONTEXT_KEY] ??
  (fieldsetGlobal[FIELDSET_CONTEXT_KEY] = React.createContext<FieldsetContext>({
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

const toggleTheme = tv({
  slots: {
    root: [
      "group/toggle relative isolate inline-flex shrink-0 cursor-pointer select-none items-center justify-center",
      "h-[var(--ui-toggle-height)] gap-[var(--ui-toggle-gap)] px-[var(--ui-toggle-px)]",
      "rounded-full bg-transparent text-[length:var(--ui-toggle-font-size)] text-ui-ink",
      "outline-offset-2 focus-visible:outline-2 focus-visible:outline-ui-glass-focus",
      "transition-[scale] duration-200 ease-out active:scale-[0.97]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[--ui-toggle-thumb:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      "[--ui-toggle-thumb-rim:color-mix(in_srgb,var(--ui-ink)_16%,transparent)]",
      "[--ui-toggle-thumb-shadow:inset_2px_1px_0_-1px_rgb(255_255_255/0.9),inset_-1.5px_-1px_0_-1px_rgb(255_255_255/0.7),inset_-2px_-6px_1px_-5px_rgb(255_255_255/0.5),inset_-1px_2px_3px_-1px_rgb(0_0_0/0.16),inset_0_-4px_1px_-2px_rgb(0_0_0/0.08),0_3px_6px_rgb(0_0_0/0.08)]",
      "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-[cubic-bezier(0.5,0,0,1)]",
      "[&:hover_svg]:scale-110 data-[pressed]:[&_svg]:scale-100",
      "motion-reduce:transition-none motion-reduce:[&_svg]:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    thumb: [
      "pointer-events-none absolute inset-[3px] z-[1] rounded-full",
      "bg-[var(--ui-toggle-thumb)] ring-1 ring-inset ring-[var(--ui-toggle-thumb-rim)]",
      "shadow-[var(--ui-toggle-thumb-shadow)]",
      "opacity-0 scale-95",
      "transition-[opacity,scale] duration-200 ease-out",
      "group-data-[pressed]/toggle:opacity-100 group-data-[pressed]/toggle:scale-100",
      "motion-reduce:transition-none",
    ],
    rim: "ui-glass-rim",
    content:
      "relative z-10 inline-flex min-w-0 items-center justify-center gap-[var(--ui-toggle-gap)]",
    icon: "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--ui-toggle-icon-size)] [&_svg]:shrink-0",
    label: "min-w-0 truncate leading-none",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-toggle-height:24px] [--ui-toggle-px:8px] [--ui-toggle-font-size:0.75rem] [--ui-toggle-icon-size:16px] [--ui-toggle-gap:4px]",
      },
      sm: {
        root: "[--ui-toggle-height:28px] [--ui-toggle-px:10px] [--ui-toggle-font-size:0.75rem] [--ui-toggle-icon-size:16px] [--ui-toggle-gap:4px]",
      },
      md: {
        root: "[--ui-toggle-height:32px] [--ui-toggle-px:12px] [--ui-toggle-font-size:0.875rem] [--ui-toggle-icon-size:20px] [--ui-toggle-gap:6px]",
      },
      lg: {
        root: "[--ui-toggle-height:36px] [--ui-toggle-px:14px] [--ui-toggle-font-size:0.875rem] [--ui-toggle-icon-size:20px] [--ui-toggle-gap:6px]",
      },
      xl: {
        root: "[--ui-toggle-height:40px] [--ui-toggle-px:16px] [--ui-toggle-font-size:1rem] [--ui-toggle-icon-size:24px] [--ui-toggle-gap:8px]",
      },
    },
    iconOnly: {
      true: {
        root: "aspect-square px-0",
      },
    },
  },
  defaultVariants: {
    size: "md",
    iconOnly: false,
  },
});

type Toggle = ComponentConfig<typeof toggleTheme>;

type ToggleProps<Value extends string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children" | "style"
> &
  Omit<VariantProps<typeof toggleTheme>, "iconOnly"> & {
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
  const styles = toggleTheme({ size, iconOnly: !label });
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
