"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastUpdate() {
  const toast = useToast();
  const idRef = useRef<string | null>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("No upload in progress.");

  function advance() {
    if (idRef.current === null) {
      idRef.current = toast.add({
        title: "Uploading files",
        description: "0 of 3 files uploaded.",
        type: "loading",
        timeout: 0,
      });
      setStatus("Upload started.");
      return;
    }

    const next = step + 1;

    if (next >= 3) {
      toast.update(idRef.current, {
        title: "Upload complete",
        description: "All three files are now available.",
        type: "success",
        timeout: 5000,
      });
      idRef.current = null;
      setStep(0);
      setStatus("Upload finished.");
      return;
    }

    toast.update(idRef.current, {
      description: `${next} of 3 files uploaded.`,
    });
    setStep(next);
    setStatus(`Uploaded ${next} of 3 files.`);
  }

  function dismiss() {
    if (idRef.current === null) {
      return;
    }

    toast.close(idRef.current);
    idRef.current = null;
    setStep(0);
    setStatus("Upload dismissed.");
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          size="sm"
          leadingIcon={<Upload />}
          onClick={advance}
        >
          Upload next file
        </Button>
        <Button size="sm" onClick={dismiss}>Dismiss</Button>
      </div>
      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}

export default function ToastUpdateDemo() {
  return (
    <ToastProvider>
      <ToastUpdate />
      <Toast />
    </ToastProvider>
  );
}
