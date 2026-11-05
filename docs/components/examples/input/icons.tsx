"use client";

import { ArrowRight, Mail, Search } from "lucide-react";

import { Field, Input } from "@xingxingmofashu/ui";

export default function InputIconsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        aria-label="Search components"
        leadingIcon={<Search />}
        placeholder="Search components"
      />

      <Field label="Email">
        <Input
          type="email"
          leadingIcon={<Mail />}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Invite link">
        <Input
          defaultValue="https://xingxingmofashu.github.io/ui/"
          trailingIcon={<ArrowRight />}
        />
      </Field>
    </div>
  );
}
