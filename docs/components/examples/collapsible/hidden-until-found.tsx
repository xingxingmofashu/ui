"use client";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleHiddenUntilFoundDemo() {
  return (
    <Collapsible
      hiddenUntilFound
      className="w-full max-w-md"
      trigger="Warranty coverage"
    >
      Every device includes a two-year warranty. Use the browser's find-in-page
      search for “two-year” to reveal this closed panel without opening it
      first.
    </Collapsible>
  );
}
