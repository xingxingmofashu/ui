"use client";

import { Accordion } from "@xingxingmofashu/ui";

export default function AccordionMultipleDemo() {
  return (
    <Accordion
      className="w-full max-w-md"
      multiple
      defaultValue={["surface", "tokens"]}
      items={[
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
      ]}
    />
  );
}
