"use client";

import { Toast as UIToast } from "@base-ui/react/toast";
import { cn, type ClassValue } from "cn";
import * as React from "react";

import { createToastManager, useToast } from "../composables/use-toast";
import { type ComponentConfig } from "../internal/tv";
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

type ToastProviderProps = Omit<UIToast.Provider.Props, "children"> & {
  /** App content that can access the toast manager. */
  children?: React.ReactNode;
};

type Toast = ComponentConfig<typeof theme>;

interface ToastProps
  extends Omit<
    UIToast.Root.Props,
    "children" | "className" | "style" | "swipeDirection" | "toast"
  > {
  /** Corner where the toast stack is anchored. */
  position?: ToastPosition;
  /** Content rendered in place of the default close button. */
  close?: React.ReactNode;
  /** Tailwind classes merged into each toast. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Toast["slots"];
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
  ui,
  ...props
}: ToastProps) {
  const { toasts } = useToast();
  const styles = theme({ position });

  return (
    <UIToast.Portal>
      <UIToast.Viewport
        data-slot="viewport"
        data-position={position}
        className={cn(styles.viewport(), ui?.viewport)}
      >
        {toasts.map((toast) => (
          <UIToast.Root
            {...props}
            key={toast.id}
            toast={toast}
            data-slot="root"
            className={cn(styles.root(), ui?.root, className)}
            swipeDirection={SWIPE_DIRECTIONS[position]}
          >
            <span
              key="glass"
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

            <UIToast.Content
              key="content"
              data-slot="content"
              className={cn(styles.content(), ui?.content)}
            >
              <ToastStatusIcon
                type={toast.type}
                className={cn(styles.icon(), ui?.icon)}
              />

              <div data-slot="text" className={cn(styles.text(), ui?.text)}>
                <UIToast.Title
                  data-slot="title"
                  className={cn(styles.title(), ui?.title)}
                />
                <UIToast.Description
                  data-slot="description"
                  className={cn(styles.description(), ui?.description)}
                />
              </div>

              <div
                data-slot="actions"
                className={cn(styles.actions(), ui?.actions)}
              >
                <UIToast.Action
                  data-slot="action"
                  className={cn(styles.action(), ui?.action)}
                />
                {close ? (
                  close
                ) : (
                  <UIToast.Close
                    data-slot="close"
                    className={cn(styles.close(), ui?.close)}
                  >
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

export { Toast, ToastProvider, createToastManager, useToast };
export type { ToastPosition, ToastProps, ToastProviderProps };
