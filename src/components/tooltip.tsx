"use client";

import { Tooltip as UITooltip } from "@base-ui/react/tooltip";
import { cn, type ClassValue } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/tooltip";

type Tooltip = ComponentConfig<typeof theme>;

type TooltipProps = Omit<UITooltip.Root.Props, "children"> &
  Pick<UITooltip.Trigger.Props, "delay" | "closeDelay"> &
  Pick<
    UITooltip.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "collisionPadding"
  > & {
    /** Element that opens the tooltip. It must forward props and refs. */
    trigger: React.ReactElement;
    /** Short hint displayed while the trigger is hovered or focused. */
    children: React.ReactNode;
    /** Whether to render the directional arrow. */
    arrow?: boolean;
    /** Tailwind classes merged into the tooltip popup. */
    className?: ClassValue;
    /** Inline styles merged into the tooltip popup. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Tooltip["slots"];
  };

function Tooltip({
  trigger,
  children,
  arrow = true,
  delay,
  closeDelay,
  side,
  align,
  sideOffset = 8,
  alignOffset,
  collisionPadding,
  className,
  style,
  ui,
  ...props
}: TooltipProps) {
  const styles = theme();

  return (
    <UITooltip.Root {...props}>
      <UITooltip.Trigger
        render={trigger}
        delay={delay}
        closeDelay={closeDelay}
      />

      <UITooltip.Portal>
        <UITooltip.Positioner
          data-slot="positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          className={cn(styles.positioner(), ui?.positioner)}
        >
          <UITooltip.Popup
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

            {arrow ? (
              <UITooltip.Arrow
                data-slot="arrow"
                className={cn(styles.arrow(), ui?.arrow)}
              />
            ) : null}

            <span
              data-slot="content"
              className={cn(styles.content(), ui?.content)}
            >
              {children}
            </span>
          </UITooltip.Popup>
        </UITooltip.Positioner>
      </UITooltip.Portal>
    </UITooltip.Root>
  );
}

export { Tooltip };
export type { TooltipProps };
