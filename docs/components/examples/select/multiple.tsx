"use client";

import { useState } from "react";

import { Select } from "@xingxingmofashu/ui";

const items = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "swift", label: "Swift" },
] as const;

type Language = (typeof items)[number]["value"];

export default function SelectMultipleDemo() {
  const [languages, setLanguages] = useState<Language[]>([
    "typescript",
    "rust",
  ]);

  return (
    <div className="w-full max-w-sm">
      <Select
        multiple
        label="Languages"
        description="The popup stays open while you toggle options."
        items={items}
        value={languages}
        onValueChange={setLanguages}
        renderValue={(value) =>
          value.length === 0 ? (
            <span className="text-ui-ink/40">Select languages</span>
          ) : (
            `${value.length} selected: ${value.join(", ")}`
          )
        }
      />
    </div>
  );
}
