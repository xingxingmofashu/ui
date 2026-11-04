"use client";

import { Tabs as UITabs } from "@base-ui/react/tabs";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/tabs";

type Tabs = ComponentConfig<typeof theme>;

/** One tab and its related panel. */
type TabsItemProps<Value extends string = string> = Omit<
  UITabs.Tab.Props,
  "children" | "className" | "content" | "style" | "value"
> & {
  /** Value that identifies the tab and its panel. */
  value: Value;
  /** Visible label inside the tab. */
  label?: React.ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Panel content shown while the tab is active. */
  content?: React.ReactNode;
  /** Whether to keep the panel mounted while another tab is active. */
  keepMounted?: boolean;
  /** Tailwind classes merged into the tab button. */
  className?: string;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<Tabs["slots"], "tab" | "icon" | "label" | "panel" | "panelContent">
  >;
};

type TabsTabProps<Value extends string = string> = Omit<
  TabsItemProps<Value>,
  "content" | "keepMounted"
>;

type TabsProps<Value extends string = string> = Omit<
  UITabs.Root.Props,
  "children" | "className" | "style" | "value" | "defaultValue" | "onValueChange"
> &
  Pick<UITabs.List.Props, "activateOnFocus" | "loopFocus"> &
  VariantProps<typeof theme> & {
    /** Tabs and panels rendered by the component. */
    items: readonly TabsItemProps<Value>[];
    /** Controlled active value. Use `null` to render no active tab. */
    value?: Value | null;
    /** Initial active value when uncontrolled. */
    defaultValue?: Value | null;
    /** Called when the active value changes. */
    onValueChange?: (
      value: Value,
      details: UITabs.Root.ChangeEventDetails,
    ) => void;
    /** Disables every tab. */
    disabled?: boolean;
    /** Tailwind classes merged into the root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Tabs["slots"];
  };

function Tabs<Value extends string = string>({
  className,
  ui,
  size,
  items,
  value,
  defaultValue,
  onValueChange,
  activateOnFocus,
  loopFocus,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TabsProps<Value>) {
  const styles = theme({ size });
  const initialValue =
    defaultValue !== undefined
      ? defaultValue
      : items.find((item) => !item.disabled)?.value;

  return (
    <UITabs.Root
      {...props}
      value={value}
      defaultValue={initialValue}
      onValueChange={onValueChange}
      data-slot="root"
      data-disabled={disabled || undefined}
      className={cn(styles.root(), ui?.root, className)}
    >
      <UITabs.List
        activateOnFocus={activateOnFocus}
        loopFocus={loopFocus}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-slot="list"
        className={cn(styles.list(), ui?.list)}
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

        <UITabs.Indicator
          data-slot="indicator"
          className={cn(styles.indicator(), ui?.indicator)}
        />

        {items.map(
          ({ content: _content, keepMounted: _keepMounted, ui: itemUi, ...item }) => (
            <TabsItem
              key={item.value}
              {...item}
              disabled={disabled || item.disabled}
              ui={{
                tab: cn(ui?.tab, itemUi?.tab),
                icon: cn(ui?.icon, itemUi?.icon),
                label: cn(ui?.label, itemUi?.label),
              }}
            />
          ),
        )}
      </UITabs.List>

      <div data-slot="panels" className={cn(styles.panels(), ui?.panels)}>
        {items.map((item) => (
          <UITabs.Panel
            key={item.value}
            value={item.value}
            keepMounted={item.keepMounted}
            data-slot="panel"
            className={cn(styles.panel(), ui?.panel, item.ui?.panel)}
          >
            <div
              data-slot="panel-content"
              className={cn(
                styles.panelContent(),
                ui?.panelContent,
                item.ui?.panelContent,
              )}
            >
              {item.content}
            </div>
          </UITabs.Panel>
        ))}
      </div>
    </UITabs.Root>
  );
}

function TabsItem<Value extends string = string>({
  className,
  ui,
  label,
  icon,
  ...props
}: TabsTabProps<Value>) {
  const styles = theme();

  return (
    <UITabs.Tab
      {...props}
      data-slot="tab"
      className={cn(styles.tab(), ui?.tab, className)}
    >
      {icon ? (
        <span
          aria-hidden="true"
          data-slot="icon"
          className={cn(styles.icon(), ui?.icon)}
        >
          {icon}
        </span>
      ) : null}

      {label !== undefined && label !== null ? (
        <span data-slot="label" className={cn(styles.label(), ui?.label)}>
          {label}
        </span>
      ) : null}
    </UITabs.Tab>
  );
}

export { Tabs };
export type { TabsItemProps, TabsProps };
