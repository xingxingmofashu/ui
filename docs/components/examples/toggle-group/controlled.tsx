"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@xingxingmofashu/ui";

export default function ToggleGroupControlledDemo() {
  const [value, setValue] = useState<string[]>(["bold"]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="Text formatting"
        multiple
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          icon={<Bold />}
        />
        <ToggleGroupItem
          value="italic"
          aria-label="Italic"
          icon={<Italic />}
        />
        <ToggleGroupItem
          value="underline"
          aria-label="Underline"
          icon={<Underline />}
        />
      </ToggleGroup>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-ui-ink/60">
          Selected: {value.length ? value.join(", ") : "none"}
        </span>
        <Button
          size="sm"
          label="Clear"
          onClick={() => setValue([])}
          disabled={value.length === 0}
        />
      </div>
    </div>
  );
}
