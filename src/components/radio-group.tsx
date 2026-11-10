"use client";

import { useLabelableId } from "@base-ui/react/internals/labelable-provider";
import { Radio as UIRadio } from "@base-ui/react/radio";
import { RadioGroup as UIRadioGroup } from "@base-ui/react/radio-group";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useAria } from "../composables/use-aria";
import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/radio-group";

type RadioGroup = ComponentConfig<typeof theme>;

/** One option managed by the radio group. */
type RadioGroupItemProps<Value = any> = Omit<
  UIRadio.Root.Props<Value>,
  "className" | "children" | "style"
> & {
  /** Visible label rendered next to the control. */
  label?: React.ReactNode;
  /** Supporting text rendered under the label. */
  description?: React.ReactNode;
  /** Tailwind classes merged into the item root. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<
      RadioGroup["slots"],
      | "item"
      | "box"
      | "glass"
      | "overlay"
      | "indicator"
      | "dot"
      | "wrapper"
      | "itemLabel"
      | "itemDescription"
    >
  >;
};

type RadioGroupProps<Value = any> = Omit<
  UIRadioGroup.Props<Value>,
  "className" | "children" | "style"
> &
  VariantProps<typeof theme> & {
    /** Options rendered by the radio group. */
    items: readonly RadioGroupItemProps<Value>[];
    /** Visible label for the group. */
    label?: React.ReactNode;
    /** Supporting text rendered under the group label. */
    description?: React.ReactNode;
    /** Tailwind classes merged into the group root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: RadioGroup["slots"];
  };

function RadioGroup<Value>({
  className,
  ui,
  size,
  items,
  label,
  description,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: RadioGroupProps<Value>) {
  const styles = theme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });

  // Match Base UI's CheckboxGroup: the group is the field's control and takes
  // its name from `aria-labelledby`, so `Field.Label` must not point `htmlFor`
  // at one arbitrary radio inside the group. Base UI does not expose this hook
  // publicly, so keep `@base-ui/react` pinned and re-check this workaround when
  // upgrading it.
  useLabelableId({ id: null });

  return (
    <UIRadioGroup
      {...props}
      {...controlProps}
      disabled={fieldsetDisabled}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      {label || description ? (
        <div data-slot="header" className={cn(styles.header(), ui?.header)}>
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
        </div>
      ) : null}

      <div data-slot="items" className={cn(styles.items(), ui?.items)}>
        {items.map((item, index) => (
          <RadioGroupItem
            key={index}
            {...item}
            ui={{
              item: cn(ui?.item, item.ui?.item),
              box: cn(ui?.box, item.ui?.box),
              glass: cn(ui?.glass, item.ui?.glass),
              overlay: cn(ui?.overlay, item.ui?.overlay),
              indicator: cn(ui?.indicator, item.ui?.indicator),
              dot: cn(ui?.dot, item.ui?.dot),
              wrapper: cn(
                styles.wrapper(),
                ui?.wrapper,
                item.ui?.wrapper,
              ),
              itemLabel: cn(ui?.itemLabel, item.ui?.itemLabel),
              itemDescription: cn(
                ui?.itemDescription,
                item.ui?.itemDescription,
              ),
            }}
          />
        ))}
      </div>
    </UIRadioGroup>
  );
}

function RadioGroupItem<Value>({
  className,
  ui,
  label,
  description,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: RadioGroupItemProps<Value>) {
  const styles = theme();
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });

  return (
    <UIRadio.Root
      {...props}
      {...controlProps}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <span data-slot="box" className={cn(styles.box(), ui?.box)}>
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

        <UIRadio.Indicator
          keepMounted
          aria-hidden="true"
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
        >
          <span data-slot="dot" className={cn(styles.dot(), ui?.dot)} />
        </UIRadio.Indicator>
      </span>

      {label || description ? (
        <span data-slot="wrapper" className={cn(styles.wrapper(), ui?.wrapper)}>
          {label ? (
            <span
              {...labelProps}
              data-slot="item-label"
              className={cn(styles.itemLabel(), ui?.itemLabel)}
            >
              {label}
            </span>
          ) : null}

          {description ? (
            <span
              {...descriptionProps}
              data-slot="item-description"
              className={cn(styles.itemDescription(), ui?.itemDescription)}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </UIRadio.Root>
  );
}

export { RadioGroup };
export type { RadioGroupItemProps, RadioGroupProps };
