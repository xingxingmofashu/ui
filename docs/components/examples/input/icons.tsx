"use client";

import { ArrowRight, Mail, Search } from "lucide-react";

import { Input } from "@xingxingmofashu/ui";

export default function InputIconsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        aria-label="Search components"
        leadingIcon={<Search />}
        placeholder="Search components"
      />
      <Input
        label="Email"
        type="email"
        leadingIcon={<Mail />}
        placeholder="you@example.com"
      />
      <Input
        label="Invite link"
        defaultValue="https://xingxingmofashu.github.io/ui/"
        trailingIcon={<ArrowRight />}
      />
    </div>
  );
}
