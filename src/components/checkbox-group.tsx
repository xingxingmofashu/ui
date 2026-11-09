"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as UICheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useAria } from "../composables/use-aria";
import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/checkbox-group";

import { CheckIcon } from "./icons/check";
import { DashIcon } from "./icons/dash";

type CheckboxGroup = ComponentConfig<typeof theme>;

/** One entry in the group. */
type CheckboxGroupItemProps = Omit<
  UICheckbox.Root.Props,
  | "checked"
  | "defaultChecked"
  | "children"
  | "className"
  | "onCheckedChange"
  | "parent"
  | "value"
> & {
  /** Value that identifies the option in the group value. */
  value: string;
  /** Visible label rendered next to the control. */
  label?: React.ReactNode;
  /** Supporting text rendered under the label. */
  description?: React.ReactNode;
  /** Tailwind classes merged into the entry root. */
  className?: ClassValue;
  /** Tailwind classes for control slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<
      CheckboxGroup["slots"],
      | "item"
      | "box"
      | "fill"
      | "glass"
      | "overlay"
      | "indicator"
      | "indicatorIcon"
      | "wrapper"
      | "itemLabel"
      | "itemDescription"
    >
  >;
};

type CheckboxGroupProps = Omit<
  UICheckboxGroup.Props,
  "allValues" | "children" | "className"
> &
  VariantProps<typeof theme> &
  Pick<UICheckbox.Root.Props, "name" | "form" | "readOnly"> & {
    /** Entries rendered by the group. */
    items: readonly CheckboxGroupItemProps[];
    /** Visible label for the group. */
    label?: React.ReactNode;
    /** Supporting text rendered under the group label. */
    description?: React.ReactNode;
    /** Tailwind classes merged into the group root. */
    className?: ClassValue;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: CheckboxGroup["slots"];
  };

function CheckboxGroup({
  className,
  ui,
  size,
  items,
  label,
  description,
  name,
  form,
  readOnly,
  disabled,
  value,
  defaultValue,
  onValueChange,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxGroupProps) {
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

  function handleValueChange(
    next: string[],
    details: UICheckboxGroup.ChangeEventDetails,
  ) {
    onValueChange?.(next, details);
  }

  return (
    <UICheckboxGroup
      {...props}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
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
        {items.map((item) => (
          <CheckboxGroupItem
            key={item.value}
            {...item}
            name={item.name ?? name}
            form={item.form ?? form}
            readOnly={item.readOnly ?? readOnly}
            ui={{
              item: cn(ui?.item, item.ui?.item),
              box: cn(ui?.box, item.ui?.box),
              fill: cn(ui?.fill, item.ui?.fill),
              glass: cn(ui?.glass, item.ui?.glass),
              overlay: cn(ui?.overlay, item.ui?.overlay),
              indicator: cn(ui?.indicator, item.ui?.indicator),
              indicatorIcon: cn(
                ui?.indicatorIcon,
                item.ui?.indicatorIcon,
              ),
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
    </UICheckboxGroup>
  );
}

function CheckboxGroupItem({
  className,
  ui,
  label,
  description,
  value,
  name,
  form,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxGroupItemProps) {
  const styles = theme();
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });

  return (
    <UICheckbox.Root
      {...props}
      value={value}
      name={name}
      form={form}
      readOnly={readOnly}
      {...controlProps}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <span
        data-slot="box"
        className={cn(styles.box(), ui?.box)}
      >
        <span
          aria-hidden="true"
          data-slot="fill"
          className={cn(styles.fill(), ui?.fill)}
        />

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

        <UICheckbox.Indicator
          keepMounted
          aria-hidden="true"
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
          render={(indicatorProps, state) => (
            <span {...indicatorProps}>
              <span
                data-slot="indicator-icon"
                className={cn(styles.indicatorIcon(), ui?.indicatorIcon)}
              >
                {state.indeterminate ? <DashIcon /> : <CheckIcon />}
              </span>
            </span>
          )}
        />
      </span>

      {label || description ? (
        <span
          data-slot="wrapper"
          className={cn(styles.wrapper(), ui?.wrapper)}
        >
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
              className={cn(
                styles.itemDescription(),
                ui?.itemDescription,
              )}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </UICheckbox.Root>
  );
}

export { CheckboxGroup };
export type { CheckboxGroupItemProps, CheckboxGroupProps };
