"use client";

import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "./home/copy";

export function HomeAlertDialog({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].components.items.alertDialog;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        label={copy.trigger}
        onClick={() => setOpen(true)}
      />

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title={copy.title}
        description={copy.descriptionText}
        cancelLabel={copy.cancel}
        confirmLabel={copy.confirm}
      />
    </>
  );
}
