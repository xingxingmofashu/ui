"use client";

import { Drawer as UIDrawer } from "@base-ui/react/drawer";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/drawer";

type Drawer = ComponentConfig<typeof theme>;

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
  className?: string;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Drawer["slots"];
}

function Drawer({
  title,
  description,
  children,
  footer,
  direction = "down",
  className,
  ui,
  ...props
}: DrawerProps) {
  const styles = theme({ direction });

  return (
    <UIDrawer.Root {...props} swipeDirection={direction}>
      <UIDrawer.Portal>
        <UIDrawer.Backdrop
          data-slot="backdrop"
          className={cn(styles.backdrop(), ui?.backdrop)}
        />

        <UIDrawer.Viewport
          data-slot="viewport"
          className={cn(styles.viewport(), ui?.viewport)}
        >
          <UIDrawer.Popup
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

            <UIDrawer.Content
              data-slot="content"
              className={cn(styles.content(), ui?.content)}
            >
              <UIDrawer.Title
                data-slot="title"
                className={cn(styles.title(), ui?.title)}
              >
                {title}
              </UIDrawer.Title>

              {description ? (
                <UIDrawer.Description
                  data-slot="description"
                  className={cn(styles.description(), ui?.description)}
                >
                  {description}
                </UIDrawer.Description>
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
            </UIDrawer.Content>
          </UIDrawer.Popup>
        </UIDrawer.Viewport>
      </UIDrawer.Portal>
    </UIDrawer.Root>
  );
}

export { Drawer };
export type { DrawerProps };
