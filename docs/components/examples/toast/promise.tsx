"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastPromise() {
  const toast = useToast();
  const [publishing, setPublishing] = useState(false);

  function publish() {
    setPublishing(true);

    toast
      .promise(
        new Promise<void>((resolve) => {
          setTimeout(resolve, 1500);
        }),
        {
          loading: {
            title: "Publishing release",
            description: "Uploading assets and updating the CDN.",
          },
          success: {
            title: "Release published",
            description: "Version 2.4.0 is live for everyone.",
          },
          error: {
            title: "Publish failed",
            description: "Check your connection and try again.",
          },
        },
      )
      .finally(() => setPublishing(false));
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        label={publishing ? "Publishing..." : "Publish release"}
        leadingIcon={<Rocket />}
        disabled={publishing}
        onClick={publish}
      />
      <p className="text-sm text-ui-ink/60">
        {publishing
          ? "Waiting for the promise to settle."
          : "The toast updates when the promise resolves."}
      </p>
    </div>
  );
}

export default function ToastPromiseDemo() {
  return (
    <ToastProvider>
      <ToastPromise />
      <Toast />
    </ToastProvider>
  );
}
