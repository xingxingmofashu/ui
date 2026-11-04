import { useState } from "react";

import { CheckboxGroup } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const managementPermissions = [
  { value: "create-user", label: "Create user" },
  { value: "edit-user", label: "Edit user" },
  { value: "delete-user", label: "Delete user" },
  { value: "assign-roles", label: "Assign roles" },
];

const channels = [
  {
    value: "comments",
    label: "Comments",
    description: "Replies and mentions on your posts.",
  },
  {
    value: "releases",
    label: "Releases",
    description: "A summary when a new version ships.",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Invoices, receipts, and plan changes.",
  },
];

function NestedPermissions() {
  const [main, setMain] = useState<string[]>([]);
  const [management, setManagement] = useState<string[]>([]);
  const selectedCount =
    main.filter((value) => value !== "manage-users").length +
    management.length;

  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup
        value={main}
        onValueChange={(next) => {
          if (next.includes("manage-users")) {
            setManagement(
              managementPermissions.map((permission) => permission.value),
            );
          } else if (management.length === managementPermissions.length) {
            setManagement([]);
          }

          setMain(next);
        }}
        items={[
          {
            parent: true,
            label: "User permissions",
            indeterminate:
              management.length > 0 &&
              management.length !== managementPermissions.length,
          },
          { value: "view-dashboard", label: "View dashboard" },
          { value: "access-reports", label: "Access reports" },
          {
            value: "manage-users",
            label: "Manage users",
            selected: management,
            onValueChange: (next) => {
              if (next.length === managementPermissions.length) {
                setMain((current) =>
                  Array.from(new Set([...current, "manage-users"])),
                );
              } else {
                setMain((current) =>
                  current.filter((value) => value !== "manage-users"),
                );
              }

              setManagement(next);
            },
            items: managementPermissions,
          },
        ]}
      />
      <Status>
        {selectedCount} permissions selected across both levels.
      </Status>
    </div>
  );
}

function CheckboxGroupPreview() {
  const [selected, setSelected] = useState<string[]>(["comments"]);

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex flex-col gap-4">
          <CheckboxGroup
            label="Notifications"
            description="Choose the channels you want to hear about."
            value={selected}
            onValueChange={setSelected}
            items={channels}
          />
          <Status>
            {selected.length === 0
              ? "No channels selected."
              : `Selected: ${selected.join(", ")}`}
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Parent">
        <CheckboxGroup
          items={[
            {
              parent: true,
              label: "Notifications",
              description: "Select or clear every channel.",
            },
            ...channels,
          ]}
          defaultValue={["comments"]}
        />
      </DemoGroup>

      <DemoGroup label="Nested">
        <NestedPermissions />
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-col gap-5">
          {sizes.map((size) => (
            <CheckboxGroup
              key={size}
              size={size}
              label={`Size ${size}`}
              defaultValue={["one"]}
              items={[
                { value: "one", label: "First option" },
                { value: "two", label: "Second option" },
              ]}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex flex-col gap-5">
          <CheckboxGroup
            label="Disabled"
            disabled
            defaultValue={["comments"]}
            items={channels}
          />
          <CheckboxGroup
            label="Read only"
            readOnly
            defaultValue={["releases"]}
            items={channels}
          />
          <CheckboxGroup
            label="One disabled option"
            defaultValue={["comments"]}
            items={[
              { value: "comments", label: "Comments" },
              { value: "releases", label: "Releases", disabled: true },
              { value: "billing", label: "Billing" },
            ]}
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { CheckboxGroupPreview };
