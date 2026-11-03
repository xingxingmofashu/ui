"use client";

import { Accordion, Input } from "@xingxingmofashu/ui";

export default function AccordionPersistentDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-sm text-ui-ink/60">keepMounted</span>
        <Accordion
          keepMounted
          defaultValue={["draft"]}
          items={[
            {
              value: "draft",
              title: "Draft title",
              content: (
                <Input
                  aria-label="Draft title"
                  placeholder="Type, close the panel, then reopen it"
                />
              ),
            },
            {
              value: "summary",
              title: "Summary",
              content: "The field above keeps its value while the panel is closed.",
            },
          ]}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <span className="text-sm text-ui-ink/60">hiddenUntilFound</span>
        <Accordion
          hiddenUntilFound
          defaultValue={[]}
          items={[
            {
              value: "warranty",
              title: "Warranty terms",
              content:
                "Search this page for “warranty” to reveal this closed panel without opening it first.",
            },
            {
              value: "shipping",
              title: "Shipping terms",
              content: "Orders ship within one business day.",
            },
          ]}
        />
      </div>
    </div>
  );
}
