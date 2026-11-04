"use client";

import { Tooltip as UITooltip } from "@base-ui/react/tooltip";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/tooltip";

type Tooltip = ComponentConfig<typeof theme>;

type PositionerProps = UITooltip.Positioner.Props;

type TooltipProps = Omit<UITooltip.Root.Props, "children"> & {
  /** Element that opens the tooltip. It must forward props and refs. */
  trigger: React.ReactElement;
  /** Short hint displayed while the trigger is hovered or focused. */
  content: React.ReactNode;
  /** Whether to render the directional arrow. */
  arrow?: boolean;
  /** Delay before the tooltip opens on hover, in milliseconds. */
  delay?: number;
  /** Delay before the tooltip closes, in milliseconds. */
  closeDelay?: number;
  /** Side of the trigger the tooltip is placed on. */
  side?: PositionerProps["side"];
  /** Alignment of the tooltip relative to the trigger. */
  align?: PositionerProps["align"];
  /** Distance between the trigger and the tooltip in pixels. */
  sideOffset?: PositionerProps["sideOffset"];
  /** Offset along the alignment axis in pixels. */
  alignOffset?: PositionerProps["alignOffset"];
  /** Padding between the tooltip and the edge of the collision boundary. */
  collisionPadding?: PositionerProps["collisionPadding"];
  /** Tailwind classes merged into the tooltip popup. */
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Tooltip["slots"];
};

function Tooltip({
  trigger,
  content,
  arrow = true,
  delay,
  closeDelay,
  side,
  align,
  sideOffset = 8,
  alignOffset,
  collisionPadding,
  className,
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
              {content}
            </span>
          </UITooltip.Popup>
        </UITooltip.Positioner>
      </UITooltip.Portal>
    </UITooltip.Root>
  );
}

export { Tooltip };
export type { TooltipProps };
