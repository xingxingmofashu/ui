"use client";

import { Menu as UIMenu } from "@base-ui/react/menu";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/menu";

type Menu = ComponentConfig<typeof theme>;

/** One action item in the menu. */
type MenuItemProps<Value extends string = string> = Omit<
  UIMenu.Item.Props,
  "children" | "className" | "label" | "onClick"
> & {
  type?: "item";
  /** Value that identifies the item in the menu. */
  value: Value;
  /** Visible content inside the item. */
  label: React.ReactNode;
  /** Plain-text label used for keyboard navigation. Defaults to the rendered text. */
  textValue?: string;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Keyboard shortcut hint rendered after the label. */
  shortcut?: React.ReactNode;
  /** Called when the item is selected. The menu closes by default. */
  onSelect?: React.MouseEventHandler<HTMLElement>;
  /** Tailwind classes merged into the item. */
  className?: string;
  /** Tailwind classes for this item's internal slots. */
  ui?: Partial<
    Pick<Menu["slots"], "item" | "itemIcon" | "itemLabel" | "shortcut">
  >;
};

/** A labelled group of menu items. */
type MenuGroupProps<Value extends string = string> = Omit<
  UIMenu.Group.Props,
  "children" | "className"
> & {
  type: "group";
  /** Group heading. */
  label: React.ReactNode;
  /** Items rendered inside the group. */
  items: readonly MenuItemProps<Value>[];
  /** Tailwind classes merged into the group. */
  className?: string;
  /** Tailwind classes for the group slots. */
  ui?: Partial<
    Pick<
      Menu["slots"],
      | "group"
      | "groupLabel"
      | "item"
      | "itemIcon"
      | "itemLabel"
      | "shortcut"
    >
  >;
};

/** A separator between menu items. */
type MenuSeparatorProps = Omit<
  UIMenu.Separator.Props,
  "children" | "className" | "orientation"
> & {
  type: "separator";
  /** Tailwind classes merged into the separator. */
  className?: string;
  /** Tailwind classes for the separator slot. */
  ui?: Partial<Pick<Menu["slots"], "separator">>;
};

type MenuProps<Value extends string = string> = Omit<
  UIMenu.Root.Props,
  "children" | "className"
> &
  Pick<
    UIMenu.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "collisionPadding"
  > & {
    /** Element that opens the menu. It must forward props and refs. */
    trigger: React.ReactElement;
    /** Items, groups, and separators rendered by the menu. */
    items: readonly (
      | MenuItemProps<Value>
      | MenuGroupProps<Value>
      | MenuSeparatorProps
    )[];
    /** Tailwind classes merged into the popup. */
    className?: string;
    /** Inline styles merged into the popup. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Menu["slots"];
  };

function Menu<Value extends string = string>({
  trigger,
  items,
  side,
  align = "start",
  sideOffset = 8,
  alignOffset,
  collisionPadding,
  className,
  style,
  ui,
  ...props
}: MenuProps<Value>) {
  const styles = theme();

  return (
    <UIMenu.Root {...props}>
      <UIMenu.Trigger render={trigger} />

      <UIMenu.Portal>
        <UIMenu.Positioner
          data-slot="positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          className={cn(styles.positioner(), ui?.positioner)}
        >
          <UIMenu.Popup
            data-slot="popup"
            className={cn(styles.popup(), ui?.popup, className)}
            style={style}
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

            <UIMenu.List data-slot="list" className={cn(styles.list(), ui?.list)}>
              {items.map((entry, index) => {
                if (entry.type === "separator") {
                  return (
                    <MenuSeparator
                      key={`separator-${index}`}
                      {...entry}
                      ui={{
                        separator: cn(ui?.separator, entry.ui?.separator),
                      }}
                    />
                  );
                }

                if (entry.type === "group") {
                  return (
                    <MenuGroup
                      key={`group-${index}`}
                      {...entry}
                      ui={{
                        group: cn(ui?.group, entry.ui?.group),
                        groupLabel: cn(
                          ui?.groupLabel,
                          entry.ui?.groupLabel,
                        ),
                        item: cn(ui?.item, entry.ui?.item),
                        itemIcon: cn(ui?.itemIcon, entry.ui?.itemIcon),
                        itemLabel: cn(ui?.itemLabel, entry.ui?.itemLabel),
                        shortcut: cn(ui?.shortcut, entry.ui?.shortcut),
                      }}
                    />
                  );
                }

                return (
                  <MenuActionItem
                    key={entry.value}
                    {...entry}
                    ui={{
                      item: cn(ui?.item, entry.ui?.item),
                      itemIcon: cn(ui?.itemIcon, entry.ui?.itemIcon),
                      itemLabel: cn(ui?.itemLabel, entry.ui?.itemLabel),
                      shortcut: cn(ui?.shortcut, entry.ui?.shortcut),
                    }}
                  />
                );
              })}
            </UIMenu.List>
          </UIMenu.Popup>
        </UIMenu.Positioner>
      </UIMenu.Portal>
    </UIMenu.Root>
  );
}

function MenuActionItem<Value extends string = string>({
  className,
  ui,
  icon,
  label,
  shortcut,
  textValue,
  onSelect,
  value: _value,
  type: _type,
  ...props
}: MenuItemProps<Value>) {
  const styles = theme();

  return (
    <UIMenu.Item
      {...props}
      label={textValue}
      onClick={onSelect}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      {icon ? (
        <span
          aria-hidden="true"
          data-slot="item-icon"
          className={cn(styles.itemIcon(), ui?.itemIcon)}
        >
          {icon}
        </span>
      ) : null}

      <span
        data-slot="item-label"
        className={cn(styles.itemLabel(), ui?.itemLabel)}
      >
        {label}
      </span>

      {shortcut ? (
        <span
          data-slot="shortcut"
          className={cn(styles.shortcut(), ui?.shortcut)}
        >
          {shortcut}
        </span>
      ) : null}
    </UIMenu.Item>
  );
}

function MenuGroup<Value extends string = string>({
  className,
  ui,
  label,
  items,
  type: _type,
  ...props
}: MenuGroupProps<Value>) {
  const styles = theme();

  return (
    <UIMenu.Group
      {...props}
      data-slot="group"
      className={cn(styles.group(), ui?.group, className)}
    >
      <UIMenu.GroupLabel
        data-slot="group-label"
        className={cn(styles.groupLabel(), ui?.groupLabel)}
      >
        {label}
      </UIMenu.GroupLabel>

      {items.map((item) => (
        <MenuActionItem
          key={item.value}
          {...item}
          ui={{
            item: cn(ui?.item, item.ui?.item),
            itemIcon: cn(ui?.itemIcon, item.ui?.itemIcon),
            itemLabel: cn(ui?.itemLabel, item.ui?.itemLabel),
            shortcut: cn(ui?.shortcut, item.ui?.shortcut),
          }}
        />
      ))}
    </UIMenu.Group>
  );
}

function MenuSeparator({
  className,
  ui,
  type: _type,
  ...props
}: MenuSeparatorProps) {
  const styles = theme();

  return (
    <UIMenu.Separator
      {...props}
      data-slot="separator"
      className={cn(styles.separator(), ui?.separator, className)}
    />
  );
}

export { Menu };
export type {
  MenuGroupProps,
  MenuItemProps,
  MenuProps,
  MenuSeparatorProps,
};
