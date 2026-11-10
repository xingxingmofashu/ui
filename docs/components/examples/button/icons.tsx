"use client";

import { ArrowRight, Plus, Search } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button leadingIcon={<Plus />}>Create</Button>
      <Button leadingIcon={<Search />}>Search</Button>
      <Button trailingIcon={<ArrowRight />}>Continue</Button>
      <Button aria-label="Next" leadingIcon={<ArrowRight />} />
    </div>
  );
}
