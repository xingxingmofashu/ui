import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup } from "@xingxingmofashu/ui";

import { Caption, DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const sizeItems = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
];

function ToggleGroupPreview() {
  const [view, setView] = useState<string[]>(["grid"]);
  const selected = view[0] ?? "";

  return (
    <>
      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
          <ToggleGroup
            aria-label="View"
            value={view}
            onValueChange={setView}
            items={[
              { value: "grid", label: "Grid", icon: <LayoutGrid /> },
              { value: "list", label: "List", icon: <List /> },
            ]}
          />
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
                items={sizeItems}
              />
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
          items={[
            { value: "bold", label: "Bold" },
            { value: "italic", label: "Italic" },
            { value: "underline", label: "Underline" },
          ]}
        />
      </DemoGroup>

      <DemoGroup label="Orientation">
        <div className="flex flex-wrap items-start gap-10">
          <div className="flex flex-col items-center gap-2">
            <ToggleGroup
              aria-label="Horizontal position"
              defaultValue={["left"]}
              items={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
            <Caption>horizontal</Caption>
          </div>

          <div className="flex flex-col items-center gap-2">
            <ToggleGroup
              aria-label="Vertical position"
              orientation="vertical"
              defaultValue={["top"]}
              items={[
                { value: "top", label: "Top" },
                { value: "middle", label: "Middle" },
                { value: "bottom", label: "Bottom" },
              ]}
            />
            <Caption>vertical</Caption>
          </div>
        </div>
      </DemoGroup>
    </>
  );
}

export { ToggleGroupPreview };
