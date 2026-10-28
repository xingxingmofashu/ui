import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

import { Caption, DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function ToggleGroupPreview() {
  const [view, setView] = useState<string[]>(["grid"]);
  const selected = view[0] ?? "";

  return (
    <>
      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
          <ToggleGroup aria-label="View" value={view} onValueChange={setView}>
            <ToggleGroupItem
              value="grid"
              aria-label="Grid"
              icon={<LayoutGrid />}
            >
              Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List" icon={<List />}>
              List
            </ToggleGroupItem>
          </ToggleGroup>
          <Status>
            Current view:{" "}
            {selected === "grid"
              ? "Grid"
              : selected === "list"
                ? "List"
                : "None"}
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <ToggleGroup
                aria-label={`${size} toggle group`}
                size={size}
                defaultValue={["one"]}
              >
                <ToggleGroupItem value="one">One</ToggleGroupItem>
                <ToggleGroupItem value="two">Two</ToggleGroupItem>
                <ToggleGroupItem value="three">Three</ToggleGroupItem>
              </ToggleGroup>
              <Caption>{size}</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Multiple">
        <ToggleGroup
          aria-label="Text style"
          multiple
          defaultValue={["bold", "italic"]}
        >
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </DemoGroup>

      <DemoGroup label="Orientation">
        <div className="flex flex-wrap items-start gap-10">
          <div className="flex flex-col items-center gap-2">
            <ToggleGroup
              aria-label="Horizontal position"
              defaultValue={["left"]}
            >
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <Caption>horizontal</Caption>
          </div>

          <div className="flex flex-col items-center gap-2">
            <ToggleGroup
              aria-label="Vertical position"
              orientation="vertical"
              defaultValue={["top"]}
            >
              <ToggleGroupItem value="top">Top</ToggleGroupItem>
              <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
              <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
            </ToggleGroup>
            <Caption>vertical</Caption>
          </div>
        </div>
      </DemoGroup>
    </>
  );
}

export { ToggleGroupPreview };
