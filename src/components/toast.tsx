"use client";

import { Toast as UIToast } from "@base-ui/react/toast";
import { cn } from "cn";
import * as React from "react";

import { useToast } from "../composables/use-toast";
import theme from "../theme/toast";

import { CloseIcon } from "./icons/close";
import { ErrorIcon } from "./icons/error";
import { InfoIcon } from "./icons/info";
import { LoadingIcon } from "./icons/loading";
import { SuccessIcon } from "./icons/success";
import { WarningIcon } from "./icons/warning";

/** Corner where the toast stack is anchored. */
type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const SWIPE_DIRECTIONS = {
  "top-left": ["up", "left"],
  "top-right": ["up", "right"],
  "bottom-left": ["down", "left"],
  "bottom-right": ["down", "right"],
} satisfies Record<
  ToastPosition,
  ("up" | "down" | "left" | "right")[]
>;

interface ToastProviderProps
  extends Omit<UIToast.Provider.Props, "children"> {
  /** App content that can call `useToast`. */
  children?: React.ReactNode;
}

interface ToastProps
  extends Omit<
    UIToast.Root.Props,
    "children" | "className" | "swipeDirection" | "toast"
  > {
  /** Corner where the toast stack is anchored. */
  position?: ToastPosition;
  /** Content rendered in place of the default close button. */
  close?: React.ReactNode;
  /** Tailwind classes merged into each toast. */
  className?: string;
}

const STATUS_ICONS = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  loading: LoadingIcon,
} as const;

function ToastStatusIcon({
  type,
  className,
}: {
  type: string | undefined;
  className: string;
}) {
  const Icon = type
    ? STATUS_ICONS[type as keyof typeof STATUS_ICONS]
    : undefined;

  if (!Icon) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      data-slot="icon"
      data-icon={type}
      className={className}
    >
      <Icon className="size-full" />
    </span>
  );
}

function ToastProvider({ children, ...props }: ToastProviderProps) {
  return <UIToast.Provider {...props}>{children}</UIToast.Provider>;
}

function Toast({
  position = "bottom-right",
  close,
  className,
  ...props
}: ToastProps) {
  const { toasts } = useToast();
  const ui = theme({ position });

  return (
    <UIToast.Portal>
      <UIToast.Viewport
        data-slot="viewport"
        data-position={position}
        className={ui.viewport()}
      >
        {toasts.map((toast) => (
          <UIToast.Root
            {...props}
            key={toast.id}
            toast={toast}
            data-slot="toast"
            className={cn(ui.root(), className)}
            swipeDirection={SWIPE_DIRECTIONS[position]}
          >
            <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
              <span
                aria-hidden="true"
                data-slot="overlay"
                className={ui.overlay()}
              />
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
                {close ? (
                  close
                ) : (
                  <UIToast.Close data-slot="close" className={ui.close()}>
                    <CloseIcon className="size-4" />
                  </UIToast.Close>
                )}
              </div>
            </UIToast.Content>
          </UIToast.Root>
        ))}
      </UIToast.Viewport>
    </UIToast.Portal>
  );
}

export { Toast, ToastProvider };
export type { ToastPosition, ToastProps, ToastProviderProps };
