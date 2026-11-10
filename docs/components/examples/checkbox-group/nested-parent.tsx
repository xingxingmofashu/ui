"use client";

import { useState } from "react";

import {
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupItemProps,
} from "@xingxingmofashu/ui";

const indent = "ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]";
const deeperIndent =
  "ms-[calc(2*(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap)))]";

const mainPermissions = [
  { value: "view-dashboard", label: "View Dashboard" },
  { value: "access-reports", label: "Access Reports" },
] as const satisfies readonly CheckboxGroupItemProps[];

const userManagementPermissions = [
  { value: "create-user", label: "Create User", className: indent },
  { value: "edit-user", label: "Edit User", className: indent },
  { value: "delete-user", label: "Delete User", className: indent },
  { value: "assign-roles", label: "Assign Roles", className: indent },
] as const satisfies readonly CheckboxGroupItemProps[];

const mainValues = mainPermissions.map((permission) => permission.value);
const managementValues = userManagementPermissions.map(
  (permission) => permission.value,
);

const managementItems = [
  { parent: true, label: "Manage Users" },
  ...userManagementPermissions,
] as const satisfies readonly CheckboxGroupItemProps[];

export default function CheckboxGroupNestedParentDemo() {
  const [mainValue, setMainValue] = useState<string[]>([]);
  const [managementValue, setManagementValue] = useState<string[]>([]);

  const allSelected =
    mainValue.length === mainValues.length &&
    managementValue.length === managementValues.length;
  const someSelected =
    (mainValue.length > 0 || managementValue.length > 0) && !allSelected;

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
        className={indent}
      />
      <CheckboxGroup
        aria-label="User management permissions"
        allValues={managementValues}
        value={managementValue}
        onValueChange={setManagementValue}
        items={managementItems}
        className={deeperIndent}
      />
    </div>
  );
}
