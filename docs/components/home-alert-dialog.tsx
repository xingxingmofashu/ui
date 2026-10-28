"use client";

import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export function HomeAlertDialog({ isZh }: { isZh: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        label={isZh ? "删除项目" : "Delete project"}
        onClick={() => setOpen(true)}
      />

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title={isZh ? "删除项目？" : "Delete project?"}
        description={
          isZh
            ? "此操作无法撤销，所有文件都会被永久删除。"
            : "This action cannot be undone. All files will be permanently removed."
        }
        cancelLabel={isZh ? "取消" : "Cancel"}
        confirmLabel={isZh ? "删除" : "Delete"}
      />
    </>
  );
}
