import { ArrowRight, Plus, Search } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

import { Caption, DemoGroup } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function ButtonPreview() {
  return (
    <>
      <DemoGroup label="Actions">
        <div className="flex flex-wrap items-center gap-3">
          <Button label="Get started" trailingIcon={<ArrowRight />} />
          <Button label="Create" leadingIcon={<Plus />} />
          <Button label="Search" leadingIcon={<Search />} />
          <Button aria-label="Next" leadingIcon={<ArrowRight />} />
          <Button label="Disabled" disabled />
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Button size={size} label={size.toUpperCase()} />
              <Caption>{size}</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>
    </>
  );
}

export { ButtonPreview };
