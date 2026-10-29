import { useState } from "react";

import { Accordion, ToggleGroup } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

type AccordionSize = (typeof sizes)[number];

function AccordionPreview() {
  const [size, setSize] = useState<AccordionSize>("md");

  return (
    <>
      <DemoGroup label="Size">
        <ToggleGroup
          aria-label="Accordion size"
          size="xs"
          value={[size]}
          onValueChange={(value) => {
            const next = sizes.find((candidate) => candidate === value[0]);

            if (next) {
              setSize(next);
            }
          }}
          items={sizes.map((candidate) => ({
            value: candidate,
            label: candidate.toUpperCase(),
          }))}
        />
      </DemoGroup>

      <DemoGroup label="Preview">
        <Accordion
          className="w-full max-w-xl"
          size={size}
          defaultValue={["shipping"]}
          items={[
            {
              value: "shipping",
              title: "How long does shipping take?",
              content:
                "Standard shipping takes 3-5 business days. Express delivery arrives in 1-2 business days.",
            },
            {
              value: "returns",
              title: "What is your return policy?",
              content:
                "You can return any item within 30 days of delivery. Opened items may be subject to a restocking fee.",
            },
            {
              value: "tracking",
              title: "How can I track my order?",
              content:
                "Once your order ships, you will receive a tracking link by email. Tracking updates can take up to 24 hours to appear.",
            },
          ]}
        />
      </DemoGroup>
    </>
  );
}

export { AccordionPreview };
