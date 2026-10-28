"use client";

import { AlertDialog as UIAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/alert-dialog";
import { Button } from "./button";

type AlertDialogProps = Omit<UIAlertDialog.Root.Props, "children"> & {
  /** Element that opens the dialog. Omit it for a fully controlled dialog. */
  trigger?: React.ReactElement;
  /** Dialog heading. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Extra content between the description and the actions. */
  children?: React.ReactNode;
  /** Cancel button label. Set to `null` to hide it. */
  cancelLabel?: React.ReactNode;
  /** Confirm button label. Set to `null` to hide it. */
  confirmLabel?: React.ReactNode;
  /** Called when the confirm button is pressed. */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  /** Called when the cancel button is pressed. */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  /** Tailwind classes merged into the popup. */
  className?: any;
};

function AlertDialog({
  trigger,
  title,
  description,
  children,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  className,
  ...props
}: AlertDialogProps) {
  const ui = theme();
  const hasActions = cancelLabel != null || confirmLabel != null;

  return (
    <UIAlertDialog.Root {...props}>
      {trigger ? <UIAlertDialog.Trigger render={trigger} /> : null}

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

              {hasActions ? (
                <div data-slot="footer" className={ui.footer()}>
                  {cancelLabel != null ? (
                    <UIAlertDialog.Close
                      onClick={onCancel}
                      render={<Button label={cancelLabel} />}
                    />
                  ) : null}

                  {confirmLabel != null ? (
                    <UIAlertDialog.Close
                      onClick={onConfirm}
                      render={<Button label={confirmLabel} />}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </UIAlertDialog.Popup>
        </UIAlertDialog.Viewport>
      </UIAlertDialog.Portal>
    </UIAlertDialog.Root>
  );
}

export { AlertDialog };
export type { AlertDialogProps };
