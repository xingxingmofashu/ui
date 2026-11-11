"use client";

import { Collapsible as UICollapsible } from "@base-ui/react/collapsible";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/collapsible";

import { PlusIcon } from "./icons/plus";

type Collapsible = ComponentConfig<typeof theme>;

type CollapsibleProps = Omit<
  UICollapsible.Root.Props,
  "children" | "className" | "style"
> &
  Pick<UICollapsible.Panel.Props, "hiddenUntilFound" | "keepMounted"> &
  VariantProps<typeof theme> & {
    /** Visible label inside the trigger. */
    trigger: React.ReactNode;
    /** Panel content revealed by the trigger. */
    children?: React.ReactNode;
    /**
     * Replaces the default plus icon with decorative content. Set to `false`
     * to hide the indicator.
     */
    indicator?: React.ReactNode | false;
    /** Tailwind classes merged into the root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Collapsible["slots"];
  };

function Collapsible({
  trigger,
  children,
  indicator,
  size,
  disabled,
  keepMounted,
  hiddenUntilFound,
  className,
  style,
  ui,
  ...props
}: CollapsibleProps) {
  const styles = theme({ size });

  return (
    <UICollapsible.Root
      {...props}
      disabled={disabled}
      style={style}
      data-slot="root"
      data-disabled={disabled || undefined}
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

      <div data-slot="content" className={cn(styles.content(), ui?.content)}>
        <UICollapsible.Trigger
          data-slot="trigger"
          className={cn(styles.trigger(), ui?.trigger)}
        >
          <span data-slot="title" className={cn(styles.title(), ui?.title)}>
            {trigger}
          </span>

          {indicator === false ? null : (
            <span
              aria-hidden="true"
              data-slot="indicator"
              className={cn(styles.indicator(), ui?.indicator)}
            >
              {indicator === undefined ? (
                <PlusIcon
                  data-slot="indicator-icon"
                  className={cn(styles.indicatorIcon(), ui?.indicatorIcon)}
                />
              ) : (
                indicator
              )}
            </span>
          )}
        </UICollapsible.Trigger>

        <UICollapsible.Panel
          keepMounted={keepMounted}
          hiddenUntilFound={hiddenUntilFound}
          data-slot="panel"
          className={cn(styles.panel(), ui?.panel)}
        >
          <div
            data-slot="panel-content"
            className={cn(styles.panelContent(), ui?.panelContent)}
          >
            {children}
          </div>
        </UICollapsible.Panel>
      </div>
    </UICollapsible.Root>
  );
}

export { Collapsible };
export type { CollapsibleProps };
