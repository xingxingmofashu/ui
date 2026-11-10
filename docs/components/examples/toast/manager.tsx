"use client";

import { Radio } from "lucide-react";

import {
  Button,
  Toast,
  ToastProvider,
  createToastManager,
} from "@xingxingmofashu/ui";

const toastManager = createToastManager();

export default function ToastManagerDemo() {
  return (
    <ToastProvider toastManager={toastManager}>
      <Button
        leadingIcon={<Radio />}
        onClick={() =>
          toastManager.add({
            title: "Deploy finished",
            description:
              "This toast was added by the manager, so any module can call it.",
          })
        }
      >
        Notify from the manager
      </Button>
      <Toast />
    </ToastProvider>
  );
}
