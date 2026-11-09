"use client";

import { Select as UISelect } from "@base-ui/react/select";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { mergeIds } from "../composables/use-aria";
import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/select";

import { CheckIcon } from "./icons/check";
import { ChevronDownIcon } from "./icons/chevron-down";

type Select = ComponentConfig<typeof theme>;

/** One option rendered by the select. */
type SelectItemProps = {
  /** Value submitted and passed to `onValueChange`. */
  value: any;
  /** Visible content inside the option and the trigger. */
  label: React.ReactNode;
  /** Plain-text label used for keyboard navigation. Defaults to a string label. */
  textValue?: string;
  /** Whether the option is disabled. */
  disabled?: boolean;
};

/** A labelled group of options. */
type SelectItemGroupProps = {
  /** Visible heading rendered above the group. */
  label: React.ReactNode;
  /** Options in the group. */
  items: readonly SelectItemProps[];
};

/** An option or a labelled group of options. */
type SelectEntry = SelectItemProps | SelectItemGroupProps;

/** Value shape exposed to `renderValue` for the active selection mode. */
type SelectValue<Value, Multiple extends boolean | undefined> =
  Multiple extends true ? readonly Value[] : Value | null;

type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = Omit<UISelect.Root.Props<Value, Multiple>, "children" | "items"> &
  VariantProps<typeof theme> &
  Pick<
    UISelect.Positioner.Props,
    | "side"
    | "align"
    | "sideOffset"
    | "alignOffset"
    | "collisionPadding"
    | "alignItemWithTrigger"
  > & {
    /** Options rendered by the select, optionally grouped. */
    items: readonly SelectEntry[];
    /** Visible label associated with the trigger. */
    label?: React.ReactNode;
    /** Supporting text under the trigger. */
    description?: React.ReactNode;
    /** Text shown when no value is selected. */
    placeholder?: React.ReactNode;
    /**
     * Formats the selected value inside the trigger.
     * When provided, it overrides `placeholder`.
     */
    renderValue?: (value: SelectValue<Value, Multiple>) => React.ReactNode;
    /** Accessible name for the trigger when no visible label is rendered. */
    "aria-label"?: string;
    /** Names the trigger from another element. */
    "aria-labelledby"?: string;
    /** Additional description IDs applied to the trigger. */
    "aria-describedby"?: string;
    /** Tailwind classes merged into the root element. */
    className?: ClassValue;
    /** Inline styles merged into the root element. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Select["slots"];
  };

function Select<Value, Multiple extends boolean | undefined = false>({
  className,
  ui,
  size,
  items,
  label,
  description,
  placeholder,
  renderValue,
  side,
  align,
  sideOffset = 6,
  alignOffset,
  collisionPadding,
  alignItemWithTrigger = false,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  style,
  ...props
}: SelectProps<Value, Multiple>) {
  const styles = theme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;
  const descriptionId = React.useId();
  const describedBy = mergeIds(
    ariaDescribedBy,
    description ? descriptionId : undefined,
  );
  // Leave aria-labelledby absent so Base UI can associate Select.Label.
  const triggerAriaProps = {
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}),
    ...(describedBy ? { "aria-describedby": describedBy } : {}),
  };
  // Base UI discovers labels from the flat item list; groups only affect layout.
  const flatItems = items.flatMap((entry) =>
    "items" in entry ? entry.items : [entry],
  );

  function renderItem(item: SelectItemProps, key: React.Key) {
    return (
      <UISelect.Item
        key={key}
        value={item.value}
        disabled={item.disabled}
        label={
          item.textValue ??
          (typeof item.label === "string" ? item.label : undefined)
        }
        data-slot="item"
        className={cn(styles.item(), ui?.item)}
      >
        <UISelect.ItemIndicator
          keepMounted
          data-slot="item-indicator"
          className={cn(styles.itemIndicator(), ui?.itemIndicator)}
        >
          <CheckIcon />
        </UISelect.ItemIndicator>

        <UISelect.ItemText
          data-slot="item-text"
          className={cn(styles.itemText(), ui?.itemText)}
        >
          {item.label}
        </UISelect.ItemText>
      </UISelect.Item>
    );
  }

  return (
    <UISelect.Root {...props} items={flatItems} disabled={fieldsetDisabled}>
      <div
        data-slot="root"
        data-disabled={fieldsetDisabled || undefined}
        className={cn(styles.root(), ui?.root, className)}
        style={style}
      >
        {label ? (
          <UISelect.Label
            data-slot="label"
            className={cn(styles.label(), ui?.label)}
          >
            {label}
          </UISelect.Label>
        ) : null}

        <UISelect.Trigger
          data-slot="trigger"
          {...triggerAriaProps}
          disabled={fieldsetDisabled}
          className={cn(styles.trigger(), ui?.trigger)}
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

          <UISelect.Value
            data-slot="value"
            placeholder={placeholder}
            className={cn(styles.value(), ui?.value)}
          >
            {renderValue}
          </UISelect.Value>

          <UISelect.Icon
            data-slot="icon"
            className={cn(styles.icon(), ui?.icon)}
          >
            <ChevronDownIcon />
          </UISelect.Icon>
        </UISelect.Trigger>

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

      <UISelect.Portal>
        <UISelect.Positioner
          data-slot="positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          alignItemWithTrigger={alignItemWithTrigger}
          className={cn(styles.positioner(), ui?.positioner)}
        >
          <UISelect.Popup
            data-slot="popup"
            className={cn(styles.popup(), ui?.popup)}
          >
            <span
              aria-hidden="true"
              data-slot="popup-glass"
              className={cn(styles.popupGlass(), ui?.popupGlass)}
            >
              <span
                aria-hidden="true"
                data-slot="popup-overlay"
                className={cn(styles.popupOverlay(), ui?.popupOverlay)}
              />
            </span>

            <UISelect.List
              data-slot="list"
              className={cn(styles.list(), ui?.list)}
            >
              {items.map((entry, index) =>
                "items" in entry ? (
                  <UISelect.Group
                    key={`group-${index}`}
                    data-slot="group"
                    className={cn(styles.group(), ui?.group)}
                  >
                    <UISelect.GroupLabel
                      data-slot="group-label"
                      className={cn(styles.groupLabel(), ui?.groupLabel)}
                    >
                      {entry.label}
                    </UISelect.GroupLabel>

                    {entry.items.map((item, itemIndex) =>
                      renderItem(item, itemIndex),
                    )}
                  </UISelect.Group>
                ) : (
                  renderItem(entry, index)
                ),
              )}
            </UISelect.List>
          </UISelect.Popup>
        </UISelect.Positioner>
      </UISelect.Portal>
    </UISelect.Root>
  );
}

export { Select };
export type {
  SelectEntry,
  SelectItemGroupProps,
  SelectItemProps,
  SelectProps,
};
