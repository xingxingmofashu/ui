"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonStatesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button trailingIcon={<ArrowRight />}>Save</Button>
      <Button disabled>Unavailable</Button>
      <Button
        disabled
        focusableWhenDisabled
      >
        Focusable when disabled
      </Button>
    </div>
  );
}
