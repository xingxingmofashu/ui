"use client";

import { Toast as UIToast } from "@base-ui/react/toast";
import { type ClassValue, tv } from "tailwind-variants";
import * as React from "react";
import { cn } from "cn";

/**
 * Returns the toast manager connected to the nearest `ToastProvider`.
 */
const useToast = UIToast.useToastManager;

/**
 * Creates a toast manager for adding notifications outside the React tree.
 */
const createToastManager = UIToast.createToastManager;

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};

const toastTheme = tv({
  slots: {
    viewport:
      "fixed z-[60] flex w-[calc(100vw_-_2rem)] max-w-sm outline-none",
    root: [
      "[--gap:0.75rem] [--peek:0.75rem]",
      "[--scale:calc(max(0,1_-_var(--toast-index)*0.1))]",
      "[--shrink:calc(1_-_var(--scale))]",
      "[--height:var(--toast-frontmost-height,var(--toast-height))]",
      "absolute inset-x-0 isolate h-[var(--height)] w-full rounded-[1.25rem]",
      "text-ui-ink select-none",
      "z-[calc(1000-var(--toast-index))]",
      "[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
      "data-[expanded]:h-[var(--toast-height)]",
      "data-[limited]:pointer-events-none data-[limited]:opacity-0",
      "data-[swiping]:cursor-grabbing",
      "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)_-_150%))]",
      "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)_+_150%))]",
      "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
    ],
    glass: [
      "ui-glass ui-glass-overlay ui-glass-inner ui-glass-highlight",
      "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    content: [
      "relative z-10 flex h-full min-w-0 items-start gap-3 overflow-hidden p-4",
      "transition-opacity duration-200 ease-out",
      "data-[behind]:opacity-0 data-[expanded]:opacity-100",
      "motion-reduce:transition-none",
    ],
    icon: [
      "mt-0.5 grid size-5 shrink-0 place-items-center text-ui-ink opacity-70",
      "data-[icon=loading]:animate-spin motion-reduce:animate-none",
    ],
    text: "flex min-w-0 flex-1 flex-col gap-0.5",
    title: [
      "min-w-0 text-sm font-semibold tracking-tight text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
    ],
    description:
      "min-w-0 text-sm leading-relaxed text-ui-ink opacity-85",
    actions: "flex shrink-0 items-center gap-1",
    action: [
      "ui-glass-chip inline-flex h-7 shrink-0 items-center rounded-full px-2.5",
      "whitespace-nowrap text-xs font-medium text-ui-ink",
      "transition-[background-color,scale] duration-150 ease-out",
      "hover:bg-ui-ink/10 active:scale-95",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "disabled:pointer-events-none disabled:opacity-50",
      "motion-reduce:transition-none",
    ],
    close: [
      "grid size-7 shrink-0 place-items-center rounded-full text-ui-ink opacity-60",
      "transition-[background-color,opacity,scale] duration-150 ease-out",
      "hover:bg-ui-ink/10 hover:opacity-100 active:scale-90",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus",
      "motion-reduce:transition-none",
    ],
  },
  variants: {
    position: {
      "top-left": {
        viewport:
          "top-[max(1rem,env(safe-area-inset-top))] bottom-auto left-[max(1rem,env(safe-area-inset-left))] right-auto",
      },
      "top-right": {
        viewport:
          "top-[max(1rem,env(safe-area-inset-top))] bottom-auto right-[max(1rem,env(safe-area-inset-right))] left-auto",
      },
      "bottom-left": {
        viewport:
          "bottom-[max(1rem,env(safe-area-inset-bottom))] top-auto left-[max(1rem,env(safe-area-inset-left))] right-auto",
      },
      "bottom-right": {
        viewport:
          "bottom-[max(1rem,env(safe-area-inset-bottom))] top-auto right-[max(1rem,env(safe-area-inset-right))] left-auto",
      },
    },
  },
  compoundVariants: [
    {
      position: ["top-left", "top-right"],
      class: {
        root: [
          "top-0 origin-top",
          "[--offset-y:calc(var(--toast-offset-y)_+_(var(--toast-index)*var(--gap))_+_var(--toast-swipe-movement-y))]",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-index)*var(--peek)_+_var(--shrink)*var(--height)))_scale(var(--scale))]",
          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
          "data-[starting-style]:[transform:translateY(-150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]",
          "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)_-_150%))]",
          "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']",
        ],
      },
    },
    {
      position: ["bottom-left", "bottom-right"],
      class: {
        root: [
          "bottom-0 origin-bottom",
          "[--offset-y:calc(var(--toast-offset-y)*-1_+_(var(--toast-index)*var(--gap)*-1)_+_var(--toast-swipe-movement-y))]",
          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_-_var(--toast-index)*var(--peek)_-_var(--shrink)*var(--height)))_scale(var(--scale))]",
          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
          "data-[starting-style]:[transform:translateY(150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
          "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)_+_150%))]",
          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']",
        ],
      },
    },
  ],
  defaultVariants: {
    position: "bottom-right",
  },
});

function CloseIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ErrorIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5" />
      <path d="M12 16.5h.01" />
    </svg>
  );
}

function InfoIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function LoadingIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="8" opacity="0.25" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}

function SuccessIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.5 3 3 5.5-6" />
    </svg>
  );
}

function WarningIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 4 21 20H3L12 4Z" />
      <path d="M12 10v4" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}

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

type Toast = ComponentConfig<typeof toastTheme>;

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
  const styles = toastTheme({ position });

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
