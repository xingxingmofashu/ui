"use client";

import { Popover as UIPopover } from "@base-ui/react/popover";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/popover";

type Popover = ComponentConfig<typeof theme>;

type PopoverProps = Omit<UIPopover.Root.Props, "children"> &
  Pick<
    UIPopover.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "collisionPadding"
  > & {
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
    /** Tailwind classes merged into the popup. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Popover["slots"];
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
  ui,
  ...props
}: PopoverProps) {
  const styles = theme();

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
          className={cn(styles.positioner(), ui?.positioner)}
        >
          <UIPopover.Popup
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
              <UIPopover.Arrow
                data-slot="arrow"
                className={cn(styles.arrow(), ui?.arrow)}
              />
            ) : null}

            <div
              data-slot="content"
              className={cn(styles.content(), ui?.content)}
            >
              <UIPopover.Title
                data-slot="title"
                className={cn(styles.title(), ui?.title)}
              >
                {title}
              </UIPopover.Title>

              {description ? (
                <UIPopover.Description
                  data-slot="description"
                  className={cn(styles.description(), ui?.description)}
                >
                  {description}
                </UIPopover.Description>
              ) : null}

              {children ? (
                <div data-slot="body" className={cn(styles.body(), ui?.body)}>
                  {children}
                </div>
              ) : null}

              {footer ? (
                <div
                  data-slot="footer"
                  className={cn(styles.footer(), ui?.footer)}
                >
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
