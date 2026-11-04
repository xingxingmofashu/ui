"use client";

import { Checkbox as UICheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as UICheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../internal/aria";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/checkbox-group";

import { CheckIcon } from "./icons/check";
import { DashIcon } from "./icons/dash";

type CheckboxGroup = ComponentConfig<typeof theme>;

/** One entry in the group: an option, a parent checkbox, or a nested group. */
type CheckboxGroupItemProps<Value extends string = string> = Omit<
  UICheckbox.Root.Props,
  | "checked"
  | "defaultChecked"
  | "children"
  | "className"
  | "onCheckedChange"
  | "parent"
  | "style"
  | "value"
> & {
  /** Visible label rendered next to the control. */
  label?: React.ReactNode;
  /** Supporting text rendered under the label. */
  description?: React.ReactNode;
  /** Tailwind classes merged into the entry root. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: CheckboxGroup["slots"];
} & (
    | {
        /** Marks the entry as a parent checkbox. */
        parent: true;
        value?: never;
        items?: never;
        selected?: never;
        defaultSelected?: never;
        onValueChange?: never;
      }
    | {
        /** Marks the entry as a regular checkbox. */
        parent?: false;
        /** Value that identifies the option in the group value. */
        value: Value;
        items?: never;
        selected?: never;
        defaultSelected?: never;
        onValueChange?: never;
      }
    | {
        /** Marks the entry as a nested group with its own parent checkbox. */
        parent?: false;
        /** Value this nested group contributes to its parent group. */
        value: Value;
        /** Entries rendered inside the nested group. */
        items: readonly CheckboxGroupItemProps<Value>[];
        /** Controlled values for the nested group. */
        selected?: readonly Value[];
        /** Initial values for the nested group when uncontrolled. */
        defaultSelected?: readonly Value[];
        /** Called when a checkbox in the nested group is ticked or unticked. */
        onValueChange?: (
          value: Value[],
          details: UICheckboxGroup.ChangeEventDetails,
        ) => void;
      }
  );

type CheckboxGroupProps<Value extends string = string> = Omit<
  UICheckboxGroup.Props,
  | "allValues"
  | "children"
  | "className"
  | "defaultValue"
  | "onValueChange"
  | "style"
  | "value"
> &
  VariantProps<typeof theme> &
  Pick<UICheckbox.Root.Props, "name" | "form" | "readOnly"> & {
    /** Entries rendered by the group. */
    items: readonly CheckboxGroupItemProps<Value>[];
    /** Visible label for the group. */
    label?: React.ReactNode;
    /** Supporting text rendered under the group label. */
    description?: React.ReactNode;
    /** Controlled checked values. */
    value?: readonly Value[];
    /** Initial checked values when uncontrolled. */
    defaultValue?: readonly Value[];
    /** Called when a checkbox in the group is ticked or unticked. */
    onValueChange?: (
      value: Value[],
      details: UICheckboxGroup.ChangeEventDetails,
    ) => void;
    /** Tailwind classes merged into the group root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: CheckboxGroup["slots"];
  };

function getItemValues<Value extends string>(
  items: readonly CheckboxGroupItemProps<Value>[],
): Value[] {
  const values: Value[] = [];

  for (const item of items) {
    if (!item.parent && item.value !== undefined) {
      values.push(item.value);
    }
  }

  return values;
}

function CheckboxGroup<Value extends string = string>({
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
}: CheckboxGroupProps<Value>) {
  const styles = theme({ size });
  const labelId = React.useId();
  const descriptionId = React.useId();
  const parentItem = items.find((item) => item.parent);
  const parentLabel =
    parentItem?.["aria-label"] ||
    (typeof parentItem?.label === "string" ? parentItem.label : undefined);
  const parentLabelledBy = parentItem?.["aria-labelledby"];
  const accessibleLabel =
    ariaLabel ??
    (label || ariaLabelledBy || parentLabelledBy
      ? undefined
      : (parentLabel as string | undefined));
  const labelledBy =
    ariaLabelledBy ||
    (label && !accessibleLabel ? labelId : undefined) ||
    (!label && !ariaLabel ? parentLabelledBy : undefined);
  const hasName = Boolean(label || accessibleLabel || labelledBy);
  const describedBy = mergeIds(
    ariaDescribedBy,
    description && hasName ? descriptionId : undefined,
  );
  const hasParent = Boolean(parentItem);

  function handleValueChange(
    next: string[],
    details: UICheckboxGroup.ChangeEventDetails,
  ) {
    onValueChange?.(next as Value[], details);
  }

  return (
    <UICheckboxGroup
      {...props}
      aria-describedby={describedBy}
      aria-label={accessibleLabel}
      aria-labelledby={labelledBy}
      disabled={disabled}
      allValues={
        hasParent ? (getItemValues(items) as string[]) : undefined
      }
      value={value as unknown as string[] | undefined}
      defaultValue={defaultValue as unknown as string[] | undefined}
      onValueChange={handleValueChange}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      {label || description ? (
        <div data-slot="header" className={cn(styles.header(), ui?.header)}>
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
        </div>
      ) : null}

      <div
        data-slot="items"
        data-has-parent={hasParent || undefined}
        className={cn(styles.items(), ui?.items)}
      >
        {items.map((item, index) => {
          if (item.items) {
            return (
              <div
                key={item.value ?? `section-${index}`}
                data-slot="section"
                className={cn(styles.section(), ui?.section)}
              >
                <CheckboxGroup
                  items={[
                    {
                      parent: true,
                      id: item.id,
                      inputRef: item.inputRef,
                      indeterminate: item.indeterminate,
                      nativeButton: item.nativeButton,
                      render: item.render,
                      required: item.required,
                      uncheckedValue: item.uncheckedValue,
                      label: item.label,
                      description: item.description,
                    },
                    ...item.items,
                  ]}
                  value={item.selected}
                  defaultValue={item.defaultSelected}
                  onValueChange={item.onValueChange}
                  disabled={disabled || item.disabled}
                  readOnly={item.readOnly ?? readOnly}
                  name={item.name ?? name}
                  form={item.form ?? form}
                  size={size}
                  aria-label={item["aria-label"]}
                  aria-labelledby={item["aria-labelledby"]}
                  aria-describedby={item["aria-describedby"]}
                  className={item.className}
                  ui={item.ui}
                />
              </div>
            );
          }

          return (
            <CheckboxGroupItem
              key={item.value ?? `item-${index}`}
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
          );
        })}
      </div>
    </UICheckboxGroup>
  );
}

function CheckboxGroupItem<Value extends string = string>({
  className,
  ui,
  label,
  description,
  value,
  parent,
  name,
  form,
  readOnly,
  items: _items,
  selected: _selected,
  defaultSelected: _defaultSelected,
  onValueChange: _onValueChange,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxGroupItemProps<Value>) {
  const styles = theme();
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
    <UICheckbox.Root
      {...props}
      parent={parent || undefined}
      value={value}
      name={parent ? undefined : name}
      form={parent ? undefined : form}
      readOnly={readOnly}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      data-slot={parent ? "parent" : "item"}
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
              id={labelId}
              data-slot="item-label"
              className={cn(styles.itemLabel(), ui?.itemLabel)}
            >
              {label}
            </span>
          ) : null}

          {description ? (
            <span
              id={descriptionId}
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
