import { useState } from "react";

import { Progress, Slider } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function ProgressPreview() {
  const [value, setValue] = useState(64);

  return (
    <>
      <DemoGroup label="Controlled">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Progress
            label="Workspace import"
            description="You can keep working while the import runs."
            value={value}
          />
          <Slider
            aria-label="Progress value"
            value={value}
            onValueChange={setValue}
          />
          <Status>{value}% complete.</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Indeterminate">
        <div className="w-full max-w-md">
          <Progress
            label="Preparing workspace"
            description="This can take a few moments."
            value={null}
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex w-full max-w-md flex-col gap-4">
          {sizes.map((size, index) => (
            <Progress
              key={size}
              size={size}
              label={`Size ${size}`}
              value={25 + index * 15}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Format">
        <div className="w-full max-w-md">
          <Progress
            label="Uploading assets"
            description="Seven of ten files have been uploaded."
            value={7}
            max={10}
            format={{ style: "decimal", maximumFractionDigits: 0 }}
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { ProgressPreview };
