"use client";

import { Layers } from "lucide-react";
import { useState } from "react";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

function ToastQueue() {
  const toast = useToast();
  const [count, setCount] = useState(0);

  function addToast() {
    const next = count + 1;

    setCount(next);
    toast.add({
      title: `Background task ${next}`,
      description: "This toast stays open until you close it.",
      timeout: 0,
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        size="sm"
        label="Add toast"
        leadingIcon={<Layers />}
        onClick={addToast}
      />
      <Button size="sm" label="Close all" onClick={() => toast.close()} />
    </div>
  );
}

export default function ToastQueueDemo() {
  return (
    <ToastProvider limit={2} timeout={0}>
      <ToastQueue />
      <Toast />
    </ToastProvider>
  );
}
