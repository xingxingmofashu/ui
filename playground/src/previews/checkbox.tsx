import { useState } from "react";

import { Checkbox } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const channels = [
  { id: "comments", label: "Comments" },
  { id: "releases", label: "Releases" },
  { id: "billing", label: "Billing" },
];

function CheckboxPreview() {
  const [selected, setSelected] = useState<string[]>(["comments"]);
  const allChecked = selected.length === channels.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex flex-col gap-4">
          <Checkbox
            label="Product updates"
            description="Receive an email when a new release ships."
            defaultChecked
          />
          <Checkbox
            label="Security alerts"
            description="Get notified about sign-ins from new devices."
            defaultChecked
          />
          <Checkbox
            label="Research invites"
            description="Occasional invitations to product interviews."
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <Checkbox
              key={size}
              size={size}
              label={`Size ${size}`}
              defaultChecked
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Indeterminate">
        <div className="flex flex-col gap-3">
          <Checkbox
            label="Email notifications"
            description="Choose the channels you want to hear about."
            checked={allChecked}
            indeterminate={someChecked}
            onCheckedChange={(checked) =>
              setSelected(checked ? channels.map((channel) => channel.id) : [])
            }
          />

          <div className="ms-7 flex flex-col gap-3 border-l border-ui-glass-border pl-4">
            {channels.map((channel) => (
              <Checkbox
                key={channel.id}
                label={channel.label}
                checked={selected.includes(channel.id)}
                onCheckedChange={(checked) =>
                  setSelected((current) =>
                    checked
                      ? [...current, channel.id]
                      : current.filter((id) => id !== channel.id),
                  )
                }
              />
            ))}
          </div>

          <Status>{selected.length} of {channels.length} channels selected.</Status>
        </div>
      </DemoGroup>
    </>
  );
}

export { CheckboxPreview };
