"use client";

import { Popover as UIPopover } from "@base-ui/react/popover";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/popover";

type PositionerProps = React.ComponentProps<typeof UIPopover.Positioner>;

type PopoverProps = Omit<UIPopover.Root.Props, "children"> & {
  /** Element that opens the popover. It must forward props and refs. */
  trigger: React.ReactElement;
  /** Popover heading. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Content between the description and the footer. */
  children?: React.ReactNode;
  /** Action area rendered at the bottom of the popover. */
  footer?: React.ReactNode;
  /** Whether to render the directional arrow. */
  arrow?: boolean;
  /** Side of the trigger the popover is placed on. */
  side?: PositionerProps["side"];
  /** Alignment of the popover relative to the trigger. */
  align?: PositionerProps["align"];
  /** Distance between the trigger and the popup in pixels. */
  sideOffset?: PositionerProps["sideOffset"];
  /** Offset along the alignment axis in pixels. */
  alignOffset?: PositionerProps["alignOffset"];
  /** Padding between the popup and the edge of the collision boundary. */
  collisionPadding?: PositionerProps["collisionPadding"];
  /** Tailwind classes merged into the popup. */
  className?: any;
};

function Popover({
  trigger,
  title,
  description,
  children,
  footer,
  arrow = true,
  side,
  align,
  sideOffset = 10,
  alignOffset,
  collisionPadding,
  className,
  ...props
}: PopoverProps) {
  const ui = theme();

  return (
    <UIPopover.Root {...props}>
      <UIPopover.Trigger render={trigger} />

      <UIPopover.Portal>
        <UIPopover.Positioner
          data-slot="positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          className={ui.positioner()}
        >
          <UIPopover.Popup
            data-slot="popup"
            className={cn(ui.popup(), className)}
          >
            <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
              <span
                aria-hidden="true"
                data-slot="overlay"
                className={ui.overlay()}
              />
            </span>

            {arrow ? (
              <UIPopover.Arrow data-slot="arrow" className={ui.arrow()} />
            ) : null}

            <div data-slot="content" className={ui.content()}>
              <UIPopover.Title data-slot="title" className={ui.title()}>
                {title}
              </UIPopover.Title>

              {description ? (
                <UIPopover.Description
                  data-slot="description"
                  className={ui.description()}
                >
                  {description}
                </UIPopover.Description>
              ) : null}

              {children ? (
                <div data-slot="body" className={ui.body()}>
                  {children}
                </div>
              ) : null}

              {footer ? (
                <div data-slot="footer" className={ui.footer()}>
                  {footer}
                </div>
              ) : null}
            </div>
          </UIPopover.Popup>
        </UIPopover.Positioner>
      </UIPopover.Portal>
    </UIPopover.Root>
  );
}

export { Popover };
export type { PopoverProps };
