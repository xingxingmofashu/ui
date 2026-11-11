"use client";

import * as React from "react";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import { Switch as UISwitch } from "@base-ui/react/switch";
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

const switchTheme = tv({
  slots: {
    root: [
      "group relative flex cursor-pointer items-start",
      "touch-none [-webkit-tap-highlight-color:transparent]",
      "focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75",
      "data-[readonly]:cursor-default",
      "[--ui-switch-thumb-size:calc(var(--ui-switch-height)_-_2*var(--ui-switch-inset))]",
      "[--ui-switch-travel:calc(var(--ui-switch-width)_-_var(--ui-switch-thumb-size)_-_2*var(--ui-switch-inset))]",
    ],
    container: "flex items-center",
    base: [
      "relative inline-flex h-[var(--ui-switch-height)] w-[var(--ui-switch-width)] shrink-0 select-none overflow-hidden rounded-full",
      "border-0 bg-[var(--ui-switch-off)] p-0 text-inherit",
      "[background-image:linear-gradient(180deg,rgb(255_255_255/0.14),transparent_55%)]",
      "[box-shadow:inset_0_1px_1px_rgb(255_255_255/0.3),inset_0_-1px_2px_rgb(0_0_0/0.14)]",
      "transition-[background-color,box-shadow] duration-200 ease-out",
      "group-data-[checked]:bg-[var(--ui-switch-on)]",
      "group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
      "[--ui-switch-off:color-mix(in_srgb,var(--ui-ink)_20%,transparent)] [--ui-switch-on:var(--ui-ink)]",
    ],
    thumb: [
      "absolute left-[var(--ui-switch-inset)] top-1/2 z-10 block h-[var(--ui-switch-thumb-size)] w-[var(--ui-switch-thumb-size)] rounded-full bg-ui-surface",
      "[box-shadow:0_1px_3px_rgb(0_0_0/0.22),inset_0_0_0_1px_rgb(255_255_255/0.5),inset_0_1px_1px_rgb(255_255_255/0.65),inset_0_-1px_2px_rgb(0_0_0/0.08)]",
      "[translate:0_-50%] group-data-[checked]:[translate:var(--ui-switch-travel)_-50%]",
      "transition-[translate,scale] duration-200 ease-out",
      "group-active:scale-95",
      "motion-reduce:transition-none",
    ],
    wrapper: "ms-2 min-w-0",
    label: "block font-medium text-ui-ink leading-[var(--ui-switch-height)]",
    description: "block text-ui-ink opacity-60",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-switch-width:48px] [--ui-switch-height:24px] [--ui-switch-inset:2px]",
        wrapper: "text-xs",
      },
      sm: {
        root: "[--ui-switch-width:56px] [--ui-switch-height:28px] [--ui-switch-inset:2px]",
        wrapper: "text-xs",
      },
      md: {
        root: "[--ui-switch-width:64px] [--ui-switch-height:32px] [--ui-switch-inset:3px]",
        wrapper: "text-sm",
      },
      lg: {
        root: "[--ui-switch-width:72px] [--ui-switch-height:36px] [--ui-switch-inset:3px]",
        wrapper: "text-sm",
      },
      xl: {
        root: "[--ui-switch-width:80px] [--ui-switch-height:40px] [--ui-switch-inset:3px]",
        wrapper: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Switch = ComponentConfig<typeof switchTheme>;

interface SwitchProps
  extends Omit<UISwitch.Root.Props, "className" | "children" | "style">,
    VariantProps<typeof switchTheme> {
  /** Tailwind classes merged into the Base UI switch root. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
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
  onCheckedChange,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SwitchProps) {
  const styles = switchTheme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });
  const [animating, setAnimating] = React.useState(false);
  const animationTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const stopAnimating = () => {
    clearTimeout(animationTimer.current);
    setAnimating(false);
  };
  React.useEffect(
    () => () => {
      clearTimeout(animationTimer.current);
    },
    [],
  );
  const handleCheckedChange: NonNullable<
    SwitchProps["onCheckedChange"]
  > = (checked, details) => {
    onCheckedChange?.(checked, details);

    if (!details.isCanceled) {
      setAnimating(true);
      clearTimeout(animationTimer.current);
      // Reduced motion disables the transition, so no transitionend fires.
      animationTimer.current = setTimeout(stopAnimating, 300);
    }
  };
  const handleThumbTransitionEnd = (
    event: React.TransitionEvent<HTMLSpanElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (
      event.propertyName === "translate" ||
      event.propertyName === "scale"
    ) {
      stopAnimating();
    }
  };

  return (
    <UISwitch.Root
      {...props}
      {...controlProps}
      disabled={fieldsetDisabled}
      readOnly={readOnly}
      data-slot="root"
      data-animating={animating || undefined}
      onCheckedChange={handleCheckedChange}
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
            onTransitionEnd={handleThumbTransitionEnd}
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
              {...labelProps}
              data-slot="label"
              className={cn(styles.label(), ui?.label)}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              {...descriptionProps}
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
