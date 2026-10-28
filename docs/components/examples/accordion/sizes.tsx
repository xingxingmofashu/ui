"use client";

import { Accordion, AccordionItem } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function AccordionSizesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Accordion defaultValue={["demo"]} size={size}>
            <AccordionItem
              value="demo"
              title={`${size.toUpperCase()} accordion`}
            >
              The trigger height, padding, text, and indicator scale together.
            </AccordionItem>
          </Accordion>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
