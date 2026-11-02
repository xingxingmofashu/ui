"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Drawer, Switch } from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "../copy";

export function DrawerPreview({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].components.items.drawer;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        label={copy.trigger}
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction="right"
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
        <Switch
          label={copy.switchLabel}
          description={copy.switchDescription}
          defaultChecked
        />
      </Drawer>
    </>
  );
}
