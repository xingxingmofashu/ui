"use client";

import { Dialog as UIDialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/dialog";

type DialogProps = Omit<UIDialog.Root.Props, "children"> & {
  /** Dialog heading. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Extra content between the description and the footer. */
  children?: React.ReactNode;
  /** Action area rendered at the bottom of the dialog. */
  footer?: React.ReactNode;
  /** Tailwind classes merged into the popup. */
  className?: any;
};

function Dialog({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: DialogProps) {
  const ui = theme();

  return (
    <UIDialog.Root {...props}>
      <UIDialog.Portal>
        <UIDialog.Backdrop data-slot="backdrop" className={ui.backdrop()} />

        <UIDialog.Viewport data-slot="viewport" className={ui.viewport()}>
          <UIDialog.Popup
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

            <div data-slot="content" className={ui.content()}>
              <UIDialog.Title data-slot="title" className={ui.title()}>
                {title}
              </UIDialog.Title>

              {description ? (
                <UIDialog.Description
                  data-slot="description"
                  className={ui.description()}
                >
                  {description}
                </UIDialog.Description>
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
          </UIDialog.Popup>
        </UIDialog.Viewport>
      </UIDialog.Portal>
    </UIDialog.Root>
  );
}

export { Dialog };
export type { DialogProps };
