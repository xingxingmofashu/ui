"use client";

import * as React from "react";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import { Progress as UIProgress } from "@base-ui/react/progress";
import { cn } from "cn";

type AriaProps = Pick<
  React.AriaAttributes,
  "aria-describedby" | "aria-label" | "aria-labelledby"
>;

type IdProps = {
  id: string;
};

type DescriptionAssociation = "named" | "always";

type AriaOptions = {
  /** Visible label content, when the component renders one. */
  label?: React.ReactNode;
  /** Supporting text content, when the component renders one. */
  description?: React.ReactNode;
  /** Explicit accessible name. */
  "aria-label"?: string;
  /** ID references for the accessible name. */
  "aria-labelledby"?: string;
  /** Additional description IDs. */
  "aria-describedby"?: string;
  /**
   * When to link the visible description. `"named"` links it only when the
   * control already has a name; `"always"` links it unconditionally.
   */
  descriptionAssociation?: DescriptionAssociation;
};

type AriaResult = {
  /** Props for the element that owns the control's role. */
  controlProps: AriaProps;
  /** Props for the visible description element. */
  descriptionProps: IdProps;
  /** Props for the visible label element. */
  labelProps: IdProps;
};

/**
 * Wires a control's accessible name and description.
 *
 * The visible label supplies the name unless `aria-label` or
 * `aria-labelledby` is set. Explicit `aria-describedby` IDs are preserved.
 */
function useAria({
  label,
  description,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  descriptionAssociation = "named",
}: AriaOptions = {}): AriaResult {
  const labelId = React.useId();
  const descriptionId = React.useId();
  const labelledBy =
    ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
  const shouldDescribe =
    Boolean(description) &&
    (descriptionAssociation === "always" ||
      Boolean(label || ariaLabel || ariaLabelledBy));
  const describedBy = shouldDescribe
    ? [ariaDescribedBy, descriptionId].filter(Boolean).join(" ")
    : ariaDescribedBy;

  return {
    controlProps: {
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      ...(labelledBy ? { "aria-labelledby": labelledBy } : {}),
      ...(describedBy ? { "aria-describedby": describedBy } : {}),
    },
    descriptionProps: { id: descriptionId },
    labelProps: { id: labelId },
  };
}

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};

const progressTheme = tv({
  slots: {
    root: [
      "group/progress relative flex w-full min-w-0 flex-col gap-[var(--ui-progress-gap)] text-ui-ink",
      "[--ui-progress-track:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      "[--ui-progress-fill-from:var(--ui-ink)] [--ui-progress-fill-to:var(--ui-ink-active)]",
      "[--ui-progress-glow:color-mix(in_srgb,var(--ui-ink)_28%,transparent)]",
      "[--ui-progress-height:6px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
    ],
    header: "flex min-w-0 items-baseline justify-between gap-3",
    label: [
      "min-w-0 truncate font-medium text-ui-ink",
      "text-[length:var(--ui-progress-font-size)]",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    value: [
      "ms-auto shrink-0 font-mono tabular-nums text-ui-ink opacity-60",
      "text-[length:calc(var(--ui-progress-font-size)*0.875)]",
    ],
    track: [
      "relative h-[var(--ui-progress-height)] w-full overflow-hidden rounded-full",
      "border border-ui-glass-border bg-[var(--ui-progress-track)]",
      "shadow-[inset_0_1px_2px_rgb(0_0_0/0.14),inset_0_-1px_0_rgb(255_255_255/0.35)]",
      "[backdrop-filter:blur(2px)] [-webkit-backdrop-filter:blur(2px)]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-full before:bg-[linear-gradient(180deg,rgb(255_255_255/0.24),transparent_60%)] before:content-['']",
    ],
    indicator: [
      "relative h-full rounded-full",
      "bg-[linear-gradient(117deg,var(--ui-progress-fill-from)_0%,var(--ui-progress-fill-to)_100%)]",
      "shadow-[0_0_10px_var(--ui-progress-glow),inset_0_1px_0_rgb(255_255_255/0.35)]",
      "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(180deg,rgb(255_255_255/0.3),transparent_60%)] after:content-['']",
      "data-[indeterminate]:w-[38%] data-[indeterminate]:[animation:ui-progress-indeterminate_1.4s_ease-in-out_infinite]",
      "motion-reduce:transition-none motion-reduce:data-[indeterminate]:[animation:none]",
    ],
    description: [
      "min-w-0 leading-relaxed text-ui-ink opacity-60",
      "text-[length:var(--ui-progress-font-size)]",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-progress-height:4px] [--ui-progress-gap:6px] [--ui-progress-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-progress-height:5px] [--ui-progress-gap:6px] [--ui-progress-font-size:0.75rem]",
      },
      md: {
        root: "[--ui-progress-height:6px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-progress-height:8px] [--ui-progress-gap:8px] [--ui-progress-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-progress-height:10px] [--ui-progress-gap:10px] [--ui-progress-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Progress = ComponentConfig<typeof progressTheme>;

type ProgressProps = Omit<
  UIProgress.Root.Props,
  "children" | "className" | "style" | "value"
> &
  VariantProps<typeof progressTheme> & {
    /** Current value. Use `null` for an indeterminate progress bar. */
    value?: number | null;
    /** Visible label for the progress bar. */
    label?: React.ReactNode;
    /** Supporting text rendered below the bar. */
    description?: React.ReactNode;
    /** Tailwind classes merged into the root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Progress["slots"];
  };

function Progress({
  className,
  ui,
  label,
  description,
  size,
  value = null,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ProgressProps) {
  const styles = progressTheme({ size });
  const { controlProps, descriptionProps } = useAria({
    description,
    "aria-describedby": ariaDescribedBy,
    descriptionAssociation: "always",
  });

  return (
    <UIProgress.Root
      {...props}
      value={value}
      {...controlProps}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <div data-slot="header" className={cn(styles.header(), ui?.header)}>
        {label ? (
          <UIProgress.Label
            data-slot="label"
            className={cn(styles.label(), ui?.label)}
          >
            {label}
          </UIProgress.Label>
        ) : null}

        <UIProgress.Value
          data-slot="value"
          className={cn(styles.value(), ui?.value)}
        />
      </div>

      <UIProgress.Track
        data-slot="track"
        className={cn(styles.track(), ui?.track)}
      >
        <UIProgress.Indicator
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
        />
      </UIProgress.Track>

      {description ? (
        <span
          {...descriptionProps}
          data-slot="description"
          className={cn(styles.description(), ui?.description)}
        >
          {description}
        </span>
      ) : null}
    </UIProgress.Root>
  );
}

export { Progress };

export type { ProgressProps };
