"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonStatesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button label="Save" trailingIcon={<ArrowRight />} />
      <Button label="Unavailable" disabled />
    </div>
  );
}
