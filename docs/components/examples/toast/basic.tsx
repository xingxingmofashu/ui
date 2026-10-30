"use client";

import { Bell } from "lucide-react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastTrigger() {
  const toast = useToast();

  return (
    <Button
      label="Show notification"
      leadingIcon={<Bell />}
      onClick={() =>
        toast.add({
          title: "Changes saved",
          description: "Your workspace settings were updated for everyone.",
        })
      }
    />
  );
}

export default function ToastBasicDemo() {
  return (
    <ToastProvider>
      <ToastTrigger />
      <Toast />
    </ToastProvider>
  );
}
