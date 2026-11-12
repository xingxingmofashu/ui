"use client";

import { Menu as UIMenu } from "@base-ui/react/menu";
import { cn, type ClassValue } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/menu";
import { mergeUI } from "../utils/ui";

type Menu = ComponentConfig<typeof theme>;

/** One action item in the menu. */
type MenuItemProps = Omit<
  UIMenu.Item.Props,
  "children" | "className" | "label" | "onClick" | "onSelect" | "style"
> & {
  type?: "item";
  /** Value that identifies the item in the menu and keys its React element. */
  value: string;
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
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots. */
  ui?: Partial<
    Pick<Menu["slots"], "item" | "itemIcon" | "itemLabel" | "shortcut">
  >;
};

/** A labelled group of menu items. */
type MenuGroupProps = Omit<
  UIMenu.Group.Props,
  "children" | "className" | "style"
> & {
  type: "group";
  /** Group heading. */
  label: React.ReactNode;
  /** Items rendered inside the group. */
  items: readonly MenuItemProps[];
  /** Tailwind classes merged into the group. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
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
  "children" | "className" | "orientation" | "style"
> & {
  type: "separator";
  /** Tailwind classes merged into the separator. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for the separator slot. */
  ui?: Partial<Pick<Menu["slots"], "separator">>;
};

type MenuProps = Omit<UIMenu.Root.Props, "children"> &
  Pick<
    UIMenu.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "collisionPadding"
  > & {
    /** Element that opens the menu. It must forward props and refs. */
    trigger: React.ReactElement;
    /** Items, groups, and separators rendered by the menu. */
    items: readonly (
      | MenuItemProps
      | MenuGroupProps
      | MenuSeparatorProps
    )[];
    /** Tailwind classes merged into the popup. */
    className?: ClassValue;
    /** Inline styles merged into the popup. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Menu["slots"];
  };

function Menu({
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
}: MenuProps) {
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
                      ui={mergeUI(ui, entry.ui)}
                    />
                  );
                }

                if (entry.type === "group") {
                  return (
                    <MenuGroup
                      key={`group-${index}`}
                      {...entry}
                      ui={mergeUI(ui, entry.ui)}
                    />
                  );
                }

                return (
                  <MenuActionItem
                    key={entry.value}
                    {...entry}
                    ui={mergeUI(ui, entry.ui)}
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

function MenuActionItem({
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
}: MenuItemProps) {
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

function MenuGroup({
  className,
  ui,
  label,
  items,
  type: _type,
  ...props
}: MenuGroupProps) {
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
          ui={mergeUI(ui, item.ui)}
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
