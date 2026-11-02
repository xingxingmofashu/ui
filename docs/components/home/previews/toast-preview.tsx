"use client";

import { Bell } from "lucide-react";

import {
  Button,
  Toast,
  ToastProvider,
  useToast,
} from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "../copy";

function ToastTrigger({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].components.items.toast;
  const toast = useToast();

  return (
    <Button
      size="sm"
      label={copy.trigger}
      leadingIcon={<Bell />}
      onClick={() =>
        toast.add({
          type: "success",
          title: copy.title,
          description: copy.descriptionText,
        })
      }
    />
  );
}

export function ToastPreview({ lang }: { lang: HomeLocale }) {
  return (
    <ToastProvider>
      <ToastTrigger lang={lang} />
      <Toast />
    </ToastProvider>
  );
}
