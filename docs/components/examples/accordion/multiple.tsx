"use client";

import { Accordion, AccordionItem } from "@xingxingmofashu/ui";

export default function AccordionMultipleDemo() {
  return (
    <Accordion
      className="w-full max-w-md"
      multiple
      defaultValue={["surface", "tokens"]}
    >
      <AccordionItem value="surface" title="Glass surface">
        The shared material combines a translucent fill, rim highlight, and
        backdrop blur.
      </AccordionItem>
      <AccordionItem value="tokens" title="Theme tokens">
        Override the --ui-* variables to carry the same glass language into
        light and dark themes.
      </AccordionItem>
      <AccordionItem value="motion" title="Motion">
        Panels animate their height, and the plus indicator rotates into a
        close icon.
      </AccordionItem>
    </Accordion>
  );
}
