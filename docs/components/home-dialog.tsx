"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button, Dialog } from "@xingxingmofashu/ui";

export function HomeDialog({ isZh }: { isZh: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        label={isZh ? "编辑资料" : "Edit profile"}
        leadingIcon={<Pencil />}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={isZh ? "编辑资料" : "Edit profile"}
        description={
          isZh
            ? "自定义操作区可以放任意数量的按钮。"
            : "The action area accepts any number of buttons."
        }
        footer={
          <>
            <Button
              size="sm"
              label={isZh ? "取消" : "Cancel"}
              onClick={() => setOpen(false)}
            />
            <Button
              size="sm"
              label={isZh ? "保存" : "Save"}
              onClick={() => setOpen(false)}
            />
          </>
        }
      >
        <p>
          {isZh
            ? "对话框承载正文内容，并由页面自己管理打开状态。"
            : "The dialog holds the body content while the page owns its open state."}
        </p>
      </Dialog>
    </>
  );
}
