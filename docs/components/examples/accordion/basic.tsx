"use client";

import { Accordion, AccordionItem } from "@xingxingmofashu/ui";

export default function AccordionBasicDemo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["shipping"]}>
      <AccordionItem value="shipping" title="How long does shipping take?">
        Standard shipping takes 3-5 business days. Express delivery arrives in
        1-2 business days.
      </AccordionItem>
      <AccordionItem value="returns" title="What is your return policy?">
        You can return any item within 30 days of delivery. Opened items may be
        subject to a restocking fee.
      </AccordionItem>
      <AccordionItem value="tracking" title="How can I track my order?">
        Once your order ships, you will receive a tracking link by email.
        Tracking updates can take up to 24 hours to appear.
      </AccordionItem>
    </Accordion>
  );
}
