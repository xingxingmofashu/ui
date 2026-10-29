"use client";

import { Toast as UIToast } from "@base-ui/react/toast";
import { cn } from "cn";
import * as React from "react";

import { useToast } from "../composables/use-toast";
import theme from "../theme/toast";

/** Corner or edge where the toast stack is anchored. */
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastPlacement = "top" | "bottom";
type ToastAlign = "left" | "center" | "right";

interface ToastProviderProps
  extends Omit<UIToast.Provider.Props, "children"> {
  /** App content that can call `useToast`. */
  children?: React.ReactNode;
  /** Corner or edge where the toast stack is anchored. */
  position?: ToastPosition;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Accessible label for the notification region. */
  viewportLabel?: string;
  /** Tailwind classes merged into the viewport. */
  className?: string;
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-4"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

function statusIconContent(type: string | undefined): React.ReactNode {
  const svgProps = {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "size-full",
  } as const;

  switch (type) {
    case "info":
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="10" r="7.25" />
          <path d="M10 9.25v4" />
          <path d="M10 6.75h.01" />
        </svg>
      );
    case "success":
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="10" r="7.25" />
          <path d="m6.75 10.25 2.1 2.1 4.4-4.7" />
        </svg>
      );
    case "warning":
      return (
        <svg {...svgProps}>
          <path d="M10 3.25 17 16.5H3L10 3.25Z" />
          <path d="M10 8v3.5" />
          <path d="M10 14.25h.01" />
        </svg>
      );
    case "error":
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="10" r="7.25" />
          <path d="M10 6.5v4.25" />
          <path d="M10 13.75h.01" />
        </svg>
      );
    case "loading":
      return (
        <svg {...svgProps}>
          <circle cx="10" cy="10" r="6.75" opacity="0.25" />
          <path d="M10 3.25a6.75 6.75 0 0 1 6.75 6.75" />
        </svg>
      );
    default:
      return null;
  }
}

function ToastStatusIcon({
  type,
  className,
}: {
  type: string | undefined;
  className: string;
}) {
  const content = statusIconContent(type);

  if (!content) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      data-slot="icon"
      data-icon={type}
      className={className}
    >
      {content}
    </span>
  );
}

function ToastList({
  placement,
  closeLabel,
}: {
  placement: ToastPlacement;
  closeLabel: string;
}) {
  const { toasts } = useToast();
  const ui = theme({ placement });

  return toasts.map((toast) => (
    <UIToast.Root
      key={toast.id}
      toast={toast}
      data-slot="toast"
      className={ui.root()}
      swipeDirection={placement === "top" ? "up" : "down"}
    >
      <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
        <span aria-hidden="true" data-slot="overlay" className={ui.overlay()} />
      </span>

      <UIToast.Content data-slot="content" className={ui.content()}>
        <ToastStatusIcon type={toast.type} className={ui.icon()} />

        <div data-slot="text" className={ui.text()}>
          <UIToast.Title data-slot="title" className={ui.title()} />
          <UIToast.Description
            data-slot="description"
            className={ui.description()}
          />
        </div>

        <div data-slot="actions" className={ui.actions()}>
          <UIToast.Action data-slot="action" className={ui.action()} />
          <UIToast.Close
            data-slot="close"
            className={ui.close()}
            aria-label={closeLabel}
          >
            <CloseIcon />
          </UIToast.Close>
        </div>
      </UIToast.Content>
    </UIToast.Root>
  ));
}

function ToastProvider({
  children,
  position = "bottom-right",
  closeLabel = "Dismiss",
  viewportLabel = "Notifications",
  className,
  ...props
}: ToastProviderProps) {
  const [placement, align] = position.split("-") as [
    ToastPlacement,
    ToastAlign,
  ];
  const ui = theme({ placement, align });

  return (
    <UIToast.Provider {...props}>
      {children}
      <UIToast.Portal>
        <UIToast.Viewport
          data-slot="viewport"
          data-position={position}
          aria-label={viewportLabel}
          className={cn(ui.viewport(), className)}
        >
          <ToastList placement={placement} closeLabel={closeLabel} />
        </UIToast.Viewport>
      </UIToast.Portal>
    </UIToast.Provider>
  );
}

export { ToastProvider };
export type { ToastPosition, ToastProviderProps };
