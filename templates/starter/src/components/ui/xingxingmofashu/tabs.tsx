"use client";

import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import { cn } from "cn";
import { Tabs as UITabs } from "@base-ui/react/tabs";
import * as React from "react";

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};

const tabsTheme = tv({
  slots: {
    root: [
      "group/tabs flex w-full min-w-0 flex-col text-ui-ink",
      "gap-[var(--ui-tabs-gap)]",
      "data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-start",
      "[--ui-tabs-thumb:color-mix(in_srgb,var(--ui-ink)_10%,transparent)]",
      "[--ui-tabs-thumb-rim:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      "[--ui-tabs-thumb-shadow:inset_1px_1px_0_-1px_rgb(255_255_255/0.8),inset_-1px_-1px_0_-1px_rgb(255_255_255/0.5),inset_0_-4px_1px_-3px_rgb(0_0_0/0.12),0_2px_5px_rgb(0_0_0/0.1)]",
      "motion-reduce:[&_*]:transition-none",
    ],
    list: [
      "relative isolate flex w-fit max-w-full min-w-0 items-center",
      "rounded-full p-[var(--ui-tabs-list-padding)] gap-[var(--ui-tabs-list-gap)]",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[orientation=vertical]:rounded-[var(--ui-tabs-vertical-radius)]",
      "[&_*]:box-border",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    indicator: [
      "pointer-events-none absolute z-[1] rounded-full",
      "left-[var(--active-tab-left)] top-[var(--active-tab-top)]",
      "h-[var(--active-tab-height)] w-[var(--active-tab-width)]",
      "bg-[var(--ui-tabs-thumb)] ring-1 ring-[var(--ui-tabs-thumb-rim)] ring-inset",
      "shadow-[var(--ui-tabs-thumb-shadow)]",
      "transition-[left,top,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    ],
    tab: [
      "relative z-[2] inline-flex shrink-0 cursor-pointer select-none items-center justify-center",
      "h-[var(--ui-tabs-tab-height)] gap-[var(--ui-tabs-tab-gap)]",
      "rounded-full bg-transparent px-[var(--ui-tabs-tab-px)]",
      "text-[length:var(--ui-tabs-font-size)] font-medium text-ui-ink/65",
      "outline-none transition-colors duration-200",
      "hover:text-ui-ink",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "data-[active]:text-ui-ink",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
      "data-[orientation=vertical]:self-stretch",
    ],
    icon: "inline-flex shrink-0 items-center justify-center [&_svg]:size-[var(--ui-tabs-icon-size)] [&_svg]:shrink-0",
    label: "min-w-0 truncate leading-none",
    panels: "relative z-10 min-w-0 flex-1",
    panel: [
      "min-w-0 text-ui-ink outline-none",
      "text-[length:var(--ui-tabs-panel-font-size)]",
      "transition-[opacity,translate] duration-200 ease-out",
      "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
      "data-[ending-style]:pointer-events-none data-[ending-style]:absolute data-[ending-style]:inset-x-0 data-[ending-style]:top-0 data-[ending-style]:translate-y-1 data-[ending-style]:opacity-0",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
    ],
    panelContent: "leading-relaxed text-ui-ink/70",
  },
  variants: {
    size: {
      xs: {
        root: "[--ui-tabs-gap:12px] [--ui-tabs-list-padding:3px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:26px] [--ui-tabs-tab-px:10px] [--ui-tabs-font-size:0.75rem] [--ui-tabs-icon-size:14px] [--ui-tabs-tab-gap:4px] [--ui-tabs-vertical-radius:16px] [--ui-tabs-panel-font-size:0.75rem]",
      },
      sm: {
        root: "[--ui-tabs-gap:14px] [--ui-tabs-list-padding:3px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:30px] [--ui-tabs-tab-px:12px] [--ui-tabs-font-size:0.75rem] [--ui-tabs-icon-size:16px] [--ui-tabs-tab-gap:4px] [--ui-tabs-vertical-radius:18px] [--ui-tabs-panel-font-size:0.8125rem]",
      },
      md: {
        root: "[--ui-tabs-gap:16px] [--ui-tabs-list-padding:4px] [--ui-tabs-list-gap:2px] [--ui-tabs-tab-height:34px] [--ui-tabs-tab-px:14px] [--ui-tabs-font-size:0.875rem] [--ui-tabs-icon-size:18px] [--ui-tabs-tab-gap:6px] [--ui-tabs-vertical-radius:20px] [--ui-tabs-panel-font-size:0.875rem]",
      },
      lg: {
        root: "[--ui-tabs-gap:18px] [--ui-tabs-list-padding:4px] [--ui-tabs-list-gap:3px] [--ui-tabs-tab-height:38px] [--ui-tabs-tab-px:16px] [--ui-tabs-font-size:0.875rem] [--ui-tabs-icon-size:20px] [--ui-tabs-tab-gap:6px] [--ui-tabs-vertical-radius:22px] [--ui-tabs-panel-font-size:0.875rem]",
      },
      xl: {
        root: "[--ui-tabs-gap:22px] [--ui-tabs-list-padding:5px] [--ui-tabs-list-gap:3px] [--ui-tabs-tab-height:44px] [--ui-tabs-tab-px:20px] [--ui-tabs-font-size:1rem] [--ui-tabs-icon-size:22px] [--ui-tabs-tab-gap:8px] [--ui-tabs-vertical-radius:26px] [--ui-tabs-panel-font-size:1rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** A component's `ui` slot map, derived from its theme slots. */
type UISlots<Slots> = {
  [Key in keyof Slots]?: ClassValue;
};

/**
 * Merges `ui` slot maps in order. Later sources win conflicts through `cn`.
 *
 * Call it with the root `ui` first, then each narrower item or group map:
 *
 * ```ts
 * mergeUI(ui, group.ui, item.ui)
 * ```
 */
function mergeUI<Slots = Record<string, ClassValue>>(
  ui?: UISlots<Slots> | undefined,
  ...rest: Array<UISlots<NoInfer<Slots>> | undefined>
): UISlots<Slots> {
  const merged: UISlots<Slots> = {};

  for (const source of [ui, ...rest]) {
    if (!source) {
      continue;
    }

    for (const key of Object.keys(source) as Array<keyof Slots>) {
      merged[key] = cn(merged[key], source[key]);
    }
  }

  return merged;
}

type Tabs = ComponentConfig<typeof tabsTheme>;

/** One tab and its related panel. */
type TabsItemProps = Omit<
  UITabs.Tab.Props,
  "children" | "className" | "content" | "style"
> & {
  /** Visible label inside the tab. */
  label?: React.ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Panel content shown while the tab is active. */
  content?: React.ReactNode;
  /** Whether to keep the panel mounted while another tab is active. */
  keepMounted?: boolean;
  /** Tailwind classes merged into the tab button. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<Tabs["slots"], "tab" | "icon" | "label" | "panel" | "panelContent">
  >;
};

type TabsTabProps = Omit<
  TabsItemProps,
  "content" | "keepMounted"
>;

type TabsProps = Omit<
  UITabs.Root.Props,
  "children" | "className" | "style"
> &
  Pick<UITabs.List.Props, "activateOnFocus" | "loopFocus"> &
  VariantProps<typeof tabsTheme> & {
    /** Tabs and panels rendered by the component. */
    items: readonly TabsItemProps[];
    /** Disables every tab. */
    disabled?: boolean;
    /** Tailwind classes merged into the root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Tabs["slots"];
  };

function Tabs({
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
}: TabsProps) {
  const styles = tabsTheme({ size });
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
          (
            { content: _content, keepMounted: _keepMounted, ui: itemUi, ...item },
            index,
          ) => (
            <TabsItem
              key={index}
              {...item}
              disabled={disabled || item.disabled}
              ui={mergeUI(ui, itemUi)}
            />
          ),
        )}
      </UITabs.List>

      <div data-slot="panels" className={cn(styles.panels(), ui?.panels)}>
        {items.map((item, index) => {
          const itemUi = mergeUI(ui, item.ui);

          return (
            <UITabs.Panel
              key={index}
              value={item.value}
              keepMounted={item.keepMounted}
              data-slot="panel"
              className={cn(styles.panel(), itemUi.panel)}
            >
              <div
                data-slot="panel-content"
                className={cn(styles.panelContent(), itemUi.panelContent)}
              >
                {item.content}
              </div>
            </UITabs.Panel>
          );
        })}
      </div>
    </UITabs.Root>
  );
}

function TabsItem({
  className,
  ui,
  label,
  icon,
  ...props
}: TabsTabProps) {
  const styles = tabsTheme();

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
