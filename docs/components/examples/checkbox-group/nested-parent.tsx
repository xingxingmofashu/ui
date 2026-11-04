"use client";

import { useState } from "react";

import { Checkbox, CheckboxGroup } from "@xingxingmofashu/ui";

const mainPermissions = [
  { value: "view-dashboard", label: "View Dashboard" },
  { value: "access-reports", label: "Access Reports" },
] as const;

const userManagementPermissions = [
  { value: "create-user", label: "Create User" },
  { value: "edit-user", label: "Edit User" },
  { value: "delete-user", label: "Delete User" },
  { value: "assign-roles", label: "Assign Roles" },
] as const;

const mainValues = mainPermissions.map((permission) => permission.value);
const managementValues = userManagementPermissions.map(
  (permission) => permission.value,
);

export default function CheckboxGroupNestedParentDemo() {
  const [mainValue, setMainValue] = useState<string[]>([]);
  const [managementValue, setManagementValue] = useState<string[]>([]);

  const allSelected =
    mainValue.length === mainValues.length &&
    managementValue.length === managementValues.length;
  const someSelected =
    (mainValue.length > 0 || managementValue.length > 0) && !allSelected;
  const allManagementSelected =
    managementValue.length === managementValues.length;
  const someManagementSelected =
    managementValue.length > 0 && !allManagementSelected;

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Checkbox
        label="User Permissions"
        checked={allSelected}
        indeterminate={someSelected}
        onCheckedChange={(checked) => {
          setMainValue(checked ? [...mainValues] : []);
          setManagementValue(checked ? [...managementValues] : []);
        }}
      />
      <CheckboxGroup
        aria-label="Main permissions"
        value={mainValue}
        onValueChange={setMainValue}
        items={mainPermissions}
        className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
      />
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Manage Users"
          className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
          checked={allManagementSelected}
          indeterminate={someManagementSelected}
          onCheckedChange={(checked) => {
            setManagementValue(checked ? [...managementValues] : []);
          }}
        />
        <CheckboxGroup
          aria-label="User management permissions"
          value={managementValue}
          onValueChange={setManagementValue}
          items={userManagementPermissions}
          className="ms-[calc(2*(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap)))]"
        />
      </div>
    </div>
  );
}
