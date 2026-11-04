"use client";

import { useState } from "react";

import { CheckboxGroup } from "@xingxingmofashu/ui";

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

const managementValues = userManagementPermissions.map(
  (permission) => permission.value,
);

export default function CheckboxGroupNestedParentDemo() {
  const [mainValue, setMainValue] = useState<string[]>([]);
  const [managementValue, setManagementValue] = useState<string[]>([]);

  return (
    <CheckboxGroup
      value={mainValue}
      onValueChange={(value) => {
        if (value.includes("manage-users")) {
          setManagementValue([...managementValues]);
        } else if (managementValue.length === managementValues.length) {
          setManagementValue([]);
        }

        setMainValue(value);
      }}
      items={[
        {
          parent: true,
          label: "User Permissions",
          indeterminate:
            managementValue.length > 0 &&
            managementValue.length !== managementValues.length,
        },
        ...mainPermissions,
        {
          value: "manage-users",
          label: "Manage Users",
          selected: managementValue,
          onValueChange: (value) => {
            if (value.length === managementValues.length) {
              setMainValue((current) =>
                Array.from(new Set([...current, "manage-users"])),
              );
            } else {
              setMainValue((current) =>
                current.filter((item) => item !== "manage-users"),
              );
            }

            setManagementValue(value);
          },
          items: userManagementPermissions,
        },
      ]}
      className="w-full max-w-md"
    />
  );
}
