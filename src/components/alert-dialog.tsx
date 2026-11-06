"use client";

import { AlertDialog as UIAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/alert-dialog";

import { Button } from "./button";

type AlertDialog = ComponentConfig<typeof theme>;

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
  className?: string;
  /** Inline styles merged into the popup. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: AlertDialog["slots"];
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
  style,
  ui,
  ...props
}: AlertDialogProps) {
  const styles = theme();

  return (
    <UIAlertDialog.Root {...props}>
      <UIAlertDialog.Portal>
        <UIAlertDialog.Backdrop
          data-slot="backdrop"
          className={cn(styles.backdrop(), ui?.backdrop)}
        />

        <UIAlertDialog.Viewport
          data-slot="viewport"
          className={cn(styles.viewport(), ui?.viewport)}
        >
          <UIAlertDialog.Popup
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

            <div
              data-slot="content"
              className={cn(styles.content(), ui?.content)}
            >
              <UIAlertDialog.Title
                data-slot="title"
                className={cn(styles.title(), ui?.title)}
              >
                {title}
              </UIAlertDialog.Title>

              {description ? (
                <UIAlertDialog.Description
                  data-slot="description"
                  className={cn(styles.description(), ui?.description)}
                >
                  {description}
                </UIAlertDialog.Description>
              ) : null}

              {children ? (
                <div data-slot="body" className={cn(styles.body(), ui?.body)}>
                  {children}
                </div>
              ) : null}

              <div
                data-slot="footer"
                className={cn(styles.footer(), ui?.footer)}
              >
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
