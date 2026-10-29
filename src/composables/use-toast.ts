"use client";

import { Toast as UIToast } from "@base-ui/react/toast";

/**
 * Returns the toast manager connected to the nearest `ToastProvider`.
 */
const useToast = UIToast.useToastManager;

export { useToast };
export type {
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
} from "@base-ui/react/toast";
