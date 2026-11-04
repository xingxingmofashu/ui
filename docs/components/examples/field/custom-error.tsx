"use client";

import { KeyRound } from "lucide-react";

import { Field, Input } from "@xingxingmofashu/ui";

export default function FieldCustomErrorDemo() {
  return (
    <Field
      label="API key"
      description="Keys rotate every 90 days."
      error={
        <span className="flex min-w-0 items-center gap-2">
          <KeyRound aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span className="min-w-0">
            This key expired on May 1.{" "}
            <button
              type="button"
              className="font-medium underline underline-offset-4"
            >
              Generate a new key
            </button>
          </span>
        </span>
      }
      className="w-full max-w-sm"
    >
      <Input defaultValue="sk_live_..." />
    </Field>
  );
}
