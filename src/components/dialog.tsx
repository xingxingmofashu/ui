"use client";

import { Dialog as UIDialog } from "@base-ui/react/dialog";
import { cn, type ClassValue } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/dialog";

type Dialog = ComponentConfig<typeof theme>;

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
  className?: ClassValue;
  /** Inline styles merged into the popup. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Dialog["slots"];
};

function Dialog({
  title,
  description,
  children,
  footer,
  className,
  style,
  ui,
  ...props
}: DialogProps) {
  const styles = theme();

  return (
    <UIDialog.Root {...props}>
      <UIDialog.Portal>
        <UIDialog.Backdrop
          data-slot="backdrop"
          className={cn(styles.backdrop(), ui?.backdrop)}
        />

        <UIDialog.Viewport
          data-slot="viewport"
          className={cn(styles.viewport(), ui?.viewport)}
        >
          <UIDialog.Popup
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
              <UIDialog.Title
                data-slot="title"
                className={cn(styles.title(), ui?.title)}
              >
                {title}
              </UIDialog.Title>

              {description ? (
                <UIDialog.Description
                  data-slot="description"
                  className={cn(styles.description(), ui?.description)}
                >
                  {description}
                </UIDialog.Description>
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
          </UIDialog.Popup>
        </UIDialog.Viewport>
      </UIDialog.Portal>
    </UIDialog.Root>
  );
}

export { Dialog };
export type { DialogProps };
