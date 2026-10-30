"use client";

import { Archive } from "lucide-react";
import { useState } from "react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastAction() {
  const toast = useToast();
  const [status, setStatus] = useState("Nothing archived yet.");

  function archive() {
    const id = toast.add({
      title: "Message archived",
      description: "The conversation moved to your archive.",
      timeout: 8000,
      actionProps: {
        children: "Undo",
        onClick: () => {
          toast.close(id);
          setStatus("Message restored to your inbox.");
        },
      },
    });

    setStatus("Message archived. Use Undo in the toast.");
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button label="Archive message" leadingIcon={<Archive />} onClick={archive} />
      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}

export default function ToastActionDemo() {
  return (
    <ToastProvider>
      <ToastAction />
      <Toast />
    </ToastProvider>
  );
}
