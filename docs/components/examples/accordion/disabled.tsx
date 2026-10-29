"use client";

import { Accordion } from "@xingxingmofashu/ui";

const items = [
  {
    value: "surface",
    title: "Glass surface",
    content:
      "The shared material combines a translucent fill, rim highlight, and backdrop blur.",
  },
  {
    value: "motion",
    title: "Motion",
    content:
      "Panels animate their height, and the plus indicator rotates into a close icon.",
  },
];

export default function AccordionDisabledDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-ui-ink/60">Disabled item</span>
        <Accordion
          defaultValue={["surface"]}
          items={[
            items[0],
            {
              ...items[1],
              disabled: true,
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-ui-ink/60">Disabled accordion</span>
        <Accordion disabled items={items} />
      </div>
    </div>
  );
}
