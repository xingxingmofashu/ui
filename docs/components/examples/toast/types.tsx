"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import {
  Button,
  Toast,
  ToastProvider,
  useToast,
} from "@xingxingmofashu/ui";

const notifications = [
  {
    type: "info",
    label: "Info",
    icon: <Info />,
    title: "New comment",
    description: "Mia left a comment on your draft.",
  },
  {
    type: "success",
    label: "Success",
    icon: <CheckCircle2 />,
    title: "Changes saved",
    description: "Your workspace settings were updated.",
  },
  {
    type: "warning",
    label: "Warning",
    icon: <AlertTriangle />,
    title: "Storage almost full",
    description: "You have used 90% of the workspace storage.",
  },
  {
    type: "error",
    label: "Error",
    icon: <XCircle />,
    title: "Upload failed",
    description: "The file could not be uploaded. Try again.",
  },
] as const;

function ToastTypeButtons() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {notifications.map(({ type, label, icon, title, description }) => (
        <Button
          key={type}
          size="sm"
          label={label}
          leadingIcon={icon}
          onClick={() => toast.add({ type, title, description })}
        />
      ))}
    </div>
  );
}

export default function ToastTypesDemo() {
  return (
    <ToastProvider>
      <ToastTypeButtons />
      <Toast />
    </ToastProvider>
  );
}
