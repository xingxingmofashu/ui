"use client";

import { Drawer as UIDrawer } from "@base-ui/react/drawer";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/drawer";

interface DrawerProps
  extends Omit<
    UIDrawer.Root.Props,
    "children" | "className" | "style" | "swipeDirection"
  > {
  /** Drawer heading. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Extra content between the description and the footer. */
  children?: React.ReactNode;
  /** Action area rendered at the bottom of the drawer. */
  footer?: React.ReactNode;
  /** Edge the drawer slides in from. */
  direction?: NonNullable<UIDrawer.Root.Props["swipeDirection"]>;
  /** Tailwind classes merged into the popup. */
  className?: any;
}

function Drawer({
  title,
  description,
  children,
  footer,
  direction = "down",
  className,
  ...props
}: DrawerProps) {
  const ui = theme({ direction });

  return (
    <UIDrawer.Root {...props} swipeDirection={direction}>
      <UIDrawer.Portal>
        <UIDrawer.Backdrop data-slot="backdrop" className={ui.backdrop()} />

        <UIDrawer.Viewport data-slot="viewport" className={ui.viewport()}>
          <UIDrawer.Popup
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

            <UIDrawer.Content data-slot="content" className={ui.content()}>
              <UIDrawer.Title data-slot="title" className={ui.title()}>
                {title}
              </UIDrawer.Title>

              {description ? (
                <UIDrawer.Description
                  data-slot="description"
                  className={ui.description()}
                >
                  {description}
                </UIDrawer.Description>
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
            </UIDrawer.Content>
          </UIDrawer.Popup>
        </UIDrawer.Viewport>
      </UIDrawer.Portal>
    </UIDrawer.Root>
  );
}

export { Drawer };
export type { DrawerProps };
