"use client";

import { useState } from "react";

import { Accordion, Button } from "@xingxingmofashu/ui";

const items = [
  {
    value: "surface",
    title: "Glass surface",
    content:
      "The shared material combines a translucent fill, rim highlight, and backdrop blur.",
  },
  {
    value: "tokens",
    title: "Theme tokens",
    content:
      "Override the --ui-* variables to carry the same glass language into light and dark themes.",
  },
  {
    value: "motion",
    title: "Motion",
    content:
      "Panels animate their height, and the plus indicator rotates into a close icon.",
  },
];

const allValues = items.map((item) => item.value);

export default function AccordionControlledDemo() {
  const [value, setValue] = useState<string[]>(["surface"]);
  const allOpen = value.length === allValues.length;

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Accordion
        multiple
        value={value}
        onValueChange={setValue}
        items={items}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-ui-ink/60">
          Open panels: {value.length ? value.join(", ") : "none"}
        </span>
        <Button
          size="sm"
          label={allOpen ? "Collapse all" : "Expand all"}
          onClick={() => setValue(allOpen ? [] : allValues)}
        />
      </div>
    </div>
  );
}
