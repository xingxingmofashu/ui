"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonLinkDemo() {
  return (
    <Button
      nativeButton={false}
      render={<a href="/docs" />}
      label="Read the docs"
      trailingIcon={<ArrowRight />}
    />
  );
}
