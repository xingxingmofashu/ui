import { useState } from "react";

import { Checkbox, CheckboxGroup } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const mainPermissions = [
  { value: "view-dashboard", label: "View dashboard" },
  { value: "access-reports", label: "Access reports" },
];

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

const channelValues = channels.map((channel) => channel.value);

function ParentChannels() {
  const [value, setValue] = useState<string[]>(["comments"]);

  const allSelected = value.length === channelValues.length;
  const someSelected = value.length > 0 && !allSelected;

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Notifications"
        checked={allSelected}
        indeterminate={someSelected}
        onCheckedChange={(checked) => {
          setValue(checked ? [...channelValues] : []);
        }}
      />
      <CheckboxGroup
        aria-label="Notification channels"
        value={value}
        onValueChange={setValue}
        items={channels}
        className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
      />
    </div>
  );
}

function NestedPermissions() {
  const [main, setMain] = useState<string[]>([]);
  const [management, setManagement] = useState<string[]>([]);
  const mainValues = mainPermissions.map((permission) => permission.value);
  const managementValues = managementPermissions.map(
    (permission) => permission.value,
  );
  const allSelected =
    main.length === mainValues.length &&
    management.length === managementValues.length;
  const someSelected =
    (main.length > 0 || management.length > 0) && !allSelected;
  const allManagementSelected = management.length === managementValues.length;
  const someManagementSelected =
    management.length > 0 && !allManagementSelected;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Checkbox
          label="User permissions"
          checked={allSelected}
          indeterminate={someSelected}
          onCheckedChange={(checked) => {
            setMain(checked ? [...mainValues] : []);
            setManagement(checked ? [...managementValues] : []);
          }}
        />
        <CheckboxGroup
          aria-label="Main permissions"
          value={main}
          onValueChange={setMain}
          items={mainPermissions}
          className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
        />
        <div className="flex flex-col gap-3">
          <Checkbox
            label="Manage users"
            className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
            checked={allManagementSelected}
            indeterminate={someManagementSelected}
            onCheckedChange={(checked) => {
              setManagement(checked ? [...managementValues] : []);
            }}
          />
          <CheckboxGroup
            aria-label="User management permissions"
            value={management}
            onValueChange={setManagement}
            items={managementPermissions}
            className="ms-[calc(2*(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap)))]"
          />
        </div>
      </div>
      <Status>
        {main.length + management.length} permissions selected across both
        levels.
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
        <ParentChannels />
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
