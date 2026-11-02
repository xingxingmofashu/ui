"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button, Dialog } from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "./home/copy";

export function HomeDialog({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].components.items.dialog;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        label={copy.trigger}
        leadingIcon={<Pencil />}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={copy.title}
        description={copy.descriptionText}
        footer={
          <>
            <Button
              size="sm"
              label={copy.cancel}
              onClick={() => setOpen(false)}
            />
            <Button
              size="sm"
              label={copy.save}
              onClick={() => setOpen(false)}
            />
          </>
        }
      >
        <p>{copy.body}</p>
      </Dialog>
    </>
  );
}
