"use client";

import { Toolbar as UIToolbar } from "@base-ui/react/toolbar";
import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/toolbar";
import { mergeUI } from "../utils/ui";

type Toolbar = ComponentConfig<typeof theme>;

type ToolbarItemSlots = Pick<
  Toolbar["slots"],
  "item" | "content" | "icon" | "label"
>;

/** An action button inside the toolbar. */
type ToolbarButtonProps = Omit<
  UIToolbar.Button.Props,
  "children" | "className" | "style"
> & {
  /** Marks the entry as an action button. Optional for button entries. */
  kind?: "button";
  /** Visible label inside the button. */
  label?: React.ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Tailwind classes merged into the button. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<ToolbarItemSlots>;
};

/** A two-state button inside the toolbar. */
type ToolbarToggleProps = Omit<
  UIToggle.Props<string>,
  "children" | "className" | "nativeButton" | "render" | "style" | "value"
> & {
  kind: "toggle";
  /** Visible label inside the toggle. */
  label?: React.ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Keeps a disabled toggle in the toolbar's keyboard navigation. */
  focusableWhenDisabled?: boolean;
  /** Tailwind classes merged into the toggle. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<ToolbarItemSlots>;
};

/** A link inside the toolbar. */
type ToolbarLinkProps = Omit<
  UIToolbar.Link.Props,
  "children" | "className" | "style"
> & {
  kind: "link";
  /** Destination of the link. */
  href: string;
  /** Visible label inside the link. */
  label?: React.ReactNode;
  /** Decorative icon rendered before the label. */
  icon?: React.ReactNode;
  /** Tailwind classes merged into the link. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<ToolbarItemSlots>;
};

/** An item allowed inside a toolbar group. */
type ToolbarGroupItemProps =
  | ToolbarButtonProps
  | ToolbarToggleProps
  | ToolbarLinkProps;

/** A labelled group of toolbar items. */
type ToolbarGroupProps = Omit<
  UIToolbar.Group.Props,
  "children" | "className" | "style"
> & {
  kind: "group";
  /** Items rendered inside the group. */
  items: readonly ToolbarGroupItemProps[];
  /** Tailwind classes merged into the group. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for the group and its items, keyed by `data-slot`. */
  ui?: Partial<Pick<Toolbar["slots"], "group"> & ToolbarItemSlots>;
};

/** A separator between toolbar items. */
type ToolbarSeparatorProps = Omit<
  UIToolbar.Separator.Props,
  "children" | "className" | "style"
> & {
  kind: "separator";
  /** Tailwind classes merged into the separator. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for the separator slot. */
  ui?: Partial<Pick<Toolbar["slots"], "separator">>;
};

/** An action, toggle, link, group, or separator rendered by the toolbar. */
type ToolbarItemProps =
  | ToolbarButtonProps
  | ToolbarToggleProps
  | ToolbarLinkProps
  | ToolbarGroupProps
  | ToolbarSeparatorProps;

type ToolbarProps = Omit<
  UIToolbar.Root.Props,
  "children" | "className" | "style"
> &
  Omit<VariantProps<typeof theme>, "iconOnly"> & {
    /** Actions, toggles, links, groups, and separators rendered by the toolbar. */
    items: readonly ToolbarItemProps[];
    /** Tailwind classes merged into the toolbar root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Toolbar["slots"];
  };

type ToolbarItemContentProps = {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  ui?: Partial<Pick<Toolbar["slots"], "content" | "icon" | "label">>;
};

/**
 * A glass bar that groups actions and toggles with roving focus.
 *
 * Actions are passed through `items`. Use `kind: "separator"` for a divider,
 * `kind: "group"` for a labelled set, `kind: "toggle"` for a pressed button,
 * and `kind: "link"` for navigation.
 */
function Toolbar({ items, size, className, style, ui, ...props }: ToolbarProps) {
  const styles = theme({ size });

  return (
    <UIToolbar.Root
      {...props}
      style={style}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
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

      {items.map((entry, index) => {
        switch (entry.kind) {
          case "separator":
            return (
              <ToolbarSeparator
                key={`separator-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          case "group":
            return (
              <ToolbarGroup
                key={`group-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          case "link":
            return (
              <ToolbarLink
                key={`link-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          case "toggle":
            return (
              <ToolbarToggle
                key={`toggle-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          default:
            return (
              <ToolbarButton
                key={`button-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );
        }
      })}
    </UIToolbar.Root>
  );
}

function ToolbarButton({
  kind: _kind,
  className,
  ui,
  icon,
  label,
  ref,
  ...props
}: ToolbarButtonProps) {
  const styles = theme({ iconOnly: label === undefined || label === null });

  return (
    <UIToolbar.Button
      {...props}
      ref={ref}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <ToolbarItemContent icon={icon} label={label} ui={ui} />
    </UIToolbar.Button>
  );
}

function ToolbarToggle({
  kind: _kind,
  className,
  ui,
  icon,
  label,
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  focusableWhenDisabled,
  ref,
  ...props
}: ToolbarToggleProps) {
  const styles = theme({ iconOnly: label === undefined || label === null });

  return (
    <UIToolbar.Button
      {...props}
      ref={ref}
      render={
        <UIToggle
          pressed={pressed}
          defaultPressed={defaultPressed}
          onPressedChange={onPressedChange}
        />
      }
      disabled={disabled}
      focusableWhenDisabled={focusableWhenDisabled}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <ToolbarItemContent icon={icon} label={label} ui={ui} />
    </UIToolbar.Button>
  );
}

function ToolbarLink({
  kind: _kind,
  className,
  ui,
  icon,
  label,
  ref,
  ...props
}: ToolbarLinkProps) {
  const styles = theme({ iconOnly: label === undefined || label === null });

  return (
    <UIToolbar.Link
      {...props}
      ref={ref}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <ToolbarItemContent icon={icon} label={label} ui={ui} />
    </UIToolbar.Link>
  );
}

function ToolbarGroup({
  kind: _kind,
  className,
  ui,
  items,
  ref,
  ...props
}: ToolbarGroupProps) {
  const styles = theme();

  return (
    <UIToolbar.Group
      {...props}
      ref={ref}
      data-slot="group"
      className={cn(styles.group(), ui?.group, className)}
    >
      {items.map((entry, index) => {
        switch (entry.kind) {
          case "link":
            return (
              <ToolbarLink
                key={`link-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          case "toggle":
            return (
              <ToolbarToggle
                key={`toggle-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );

          default:
            return (
              <ToolbarButton
                key={`button-${index}`}
                {...entry}
                ui={mergeUI(ui, entry.ui)}
              />
            );
        }
      })}
    </UIToolbar.Group>
  );
}

function ToolbarSeparator({
  kind: _kind,
  className,
  ui,
  ref,
  ...props
}: ToolbarSeparatorProps) {
  const styles = theme();

  return (
    <UIToolbar.Separator
      {...props}
      ref={ref}
      data-slot="separator"
      className={cn(styles.separator(), ui?.separator, className)}
    />
  );
}

function ToolbarItemContent({ icon, label, ui }: ToolbarItemContentProps) {
  const styles = theme();

  if (icon === undefined && label === undefined) {
    return null;
  }

  return (
    <span data-slot="content" className={cn(styles.content(), ui?.content)}>
      {icon !== undefined ? (
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
    </span>
  );
}

export { Toolbar };
export type {
  ToolbarButtonProps,
  ToolbarGroupItemProps,
  ToolbarGroupProps,
  ToolbarItemProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
  ToolbarToggleProps,
};
