"use client";

import { AlertDialog as UIAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/alert-dialog";
import { Button } from "./button";

type AlertDialogProps = Omit<UIAlertDialog.Root.Props, "children"> & {
  /** Dialog heading. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Extra content between the description and the actions. */
  children?: React.ReactNode;
  /** Cancel button label. */
  cancelLabel?: React.ReactNode;
  /** Confirm button label. */
  confirmLabel?: React.ReactNode;
  /** Called when the cancel button is pressed. */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  /** Called when the confirm button is pressed. */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  /** Tailwind classes merged into the popup. */
  className?: any;
};

function AlertDialog({
  title,
  description,
  children,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  className,
  ...props
}: AlertDialogProps) {
  const ui = theme();

  return (
    <UIAlertDialog.Root {...props}>
      <UIAlertDialog.Portal>
        <UIAlertDialog.Backdrop
          data-slot="backdrop"
          className={ui.backdrop()}
        />

        <UIAlertDialog.Viewport data-slot="viewport" className={ui.viewport()}>
          <UIAlertDialog.Popup
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
              <UIAlertDialog.Title data-slot="title" className={ui.title()}>
                {title}
              </UIAlertDialog.Title>

              {description != null ? (
                <UIAlertDialog.Description
                  data-slot="description"
                  className={ui.description()}
                >
                  {description}
                </UIAlertDialog.Description>
              ) : null}

              {children != null ? (
                <div data-slot="body" className={ui.body()}>
                  {children}
                </div>
              ) : null}

              <div data-slot="footer" className={ui.footer()}>
                <UIAlertDialog.Close
                  onClick={onCancel}
                  render={<Button label={cancelLabel} />}
                />

                <UIAlertDialog.Close
                  onClick={onConfirm}
                  render={<Button label={confirmLabel} />}
                />
              </div>
            </div>
          </UIAlertDialog.Popup>
        </UIAlertDialog.Viewport>
      </UIAlertDialog.Portal>
    </UIAlertDialog.Root>
  );
}

export { AlertDialog };
export type { AlertDialogProps };
