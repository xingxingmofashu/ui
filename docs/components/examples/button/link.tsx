"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonLinkDemo() {
  return (
    <Button
      nativeButton={false}
      render={
        <a
          href="https://github.com/xingxingmofashu/ui"
          target="_blank"
          rel="noreferrer noopener"
        />
      }
      label="View on GitHub"
      trailingIcon={<ArrowRight />}
    />
  );
}
