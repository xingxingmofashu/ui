"use client";

import { ArrowRight, Plus, Search } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button label="Create" leadingIcon={<Plus />} />
      <Button label="Search" leadingIcon={<Search />} />
      <Button label="Continue" trailingIcon={<ArrowRight />} />
      <Button aria-label="Next" leadingIcon={<ArrowRight />} />
    </div>
  );
}
