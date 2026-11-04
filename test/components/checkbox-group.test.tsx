import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  CheckboxGroup,
  type CheckboxGroupItemProps,
} from "../../src/components/checkbox-group";

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
] as const satisfies readonly CheckboxGroupItemProps[];

function ControlledGroup() {
  const [value, setValue] = useState<string[]>(["comments"]);

  return (
    <CheckboxGroup
      aria-label="Notifications"
      items={channels}
      value={value}
      onValueChange={setValue}
    />
  );
}

function getGroup(name = "Notifications") {
  const group = screen.getByRole("group", { name });

  if (!(group instanceof HTMLElement)) {
    throw new Error(`Checkbox group "${name}" was not rendered.`);
  }

  return group;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Checkbox group slot "${slot}" was not rendered.`);
  }

  return node;
}

function getCheckboxes(group: HTMLElement) {
  return within(group).getAllByRole("checkbox");
}

describe("CheckboxGroup", () => {
  describe("accessible names", () => {
    it("renders a labelled group with named options", () => {
      render(
        <CheckboxGroup
          label="Notifications"
          description="Choose the channels you want to hear about."
          items={channels}
          defaultValue={["releases"]}
        />,
      );

      const group = getGroup();

      expect(group).toHaveAttribute("data-slot", "root");
      expect(group).toHaveAccessibleDescription(
        "Choose the channels you want to hear about.",
      );
      expect(getCheckboxes(group)).toHaveLength(3);
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Billing" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).toBeChecked();
    });

    it("supports aria-label without a visible group label", () => {
      render(
        <CheckboxGroup aria-label="Notifications" items={channels} />,
      );

      const group = getGroup();

      expect(group).not.toHaveAttribute("aria-labelledby");
      expect(group).toHaveAttribute("aria-label", "Notifications");
    });

    it("supports item aria-label when no visible label is rendered", () => {
      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={[
            { value: "comments", "aria-label": "Comment notifications" },
            { value: "releases", "aria-label": "Release notifications" },
          ]}
        />,
      );

      expect(
        screen.getByRole("checkbox", { name: "Comment notifications" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Release notifications" }),
      ).toBeInTheDocument();
    });

    it("uses the visible item label and links its description", () => {
      render(<CheckboxGroup aria-label="Notifications" items={channels} />);

      const checkbox = screen.getByRole("checkbox", { name: "Comments" });
      const label = getSlot(checkbox, "item-label");
      const description = getSlot(checkbox, "item-description");

      expect(checkbox).toHaveAttribute("aria-labelledby", label.id);
      expect(checkbox).toHaveAttribute("aria-describedby", description.id);
      expect(checkbox).toHaveAccessibleDescription(
        "Replies and mentions on your posts.",
      );
    });

    it("toggles an option when its visible label is clicked", async () => {
      const user = userEvent.setup();

      render(<CheckboxGroup aria-label="Notifications" items={channels} />);

      await user.click(screen.getByText("Releases"));

      expect(screen.getByRole("checkbox", { name: "Releases" })).toBeChecked();
    });
  });

  describe("structure", () => {
    it("renders the header, items, and hidden inputs", () => {
      render(
        <CheckboxGroup
          label="Notifications"
          description="Choose the channels you want to hear about."
          items={channels}
          defaultValue={["comments"]}
        />,
      );

      const group = getGroup();
      const header = getSlot(group, "header");
      const items = getSlot(group, "items");
      const checkboxes = getCheckboxes(group);

      expect(getSlot(header, "label")).toHaveTextContent("Notifications");
      expect(getSlot(header, "description")).toHaveTextContent(
        "Choose the channels you want to hear about.",
      );
      expect(items).toContainElement(checkboxes[0] ?? null);
      expect(checkboxes[0]).toHaveAttribute("data-slot", "item");
      expect(getSlot(checkboxes[0]!, "box")).toHaveAttribute(
        "data-slot",
        "box",
      );
      expect(document.querySelectorAll('input[type="checkbox"]')).toHaveLength(
        3,
      );
    });

    it("does not render the header when label and description are omitted", () => {
      render(<CheckboxGroup aria-label="Notifications" items={channels} />);

      const group = getGroup();

      expect(group.querySelector('[data-slot="header"]')).toBeNull();
    });
  });

  describe("states", () => {
    it("reports the next value when an option is toggled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={channels}
          defaultValue={["comments"]}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("checkbox", { name: "Releases" }));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toEqual([
        "comments",
        "releases",
      ]);
      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).toBeChecked();
    });

    it("supports controlled values", async () => {
      const user = userEvent.setup();

      render(<ControlledGroup />);

      await user.click(screen.getByRole("checkbox", { name: "Billing" }));

      expect(screen.getByRole("checkbox", { name: "Billing" })).toBeChecked();
    });

    it("does not change a controlled value without a state update", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={channels}
          value={["comments"]}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("checkbox", { name: "Releases" }));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).not.toBeChecked();
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).toBeChecked();
    });

    it("disables every option when the group is disabled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={channels}
          disabled
          onValueChange={onValueChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox", { name: "Releases" });

      expect(checkbox).toHaveAttribute("aria-disabled", "true");
      await user.click(checkbox);

      expect(onValueChange).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });

    it("disables a single option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={[
            { value: "comments", label: "Comments" },
            { value: "releases", label: "Releases", disabled: true },
            { value: "billing", label: "Billing" },
          ]}
          onValueChange={onValueChange}
        />,
      );

      const checkbox = screen.getByRole("checkbox", { name: "Releases" });

      expect(checkbox).toHaveAttribute("aria-disabled", "true");
      await user.click(checkbox);

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("prevents changes in read-only mode", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={channels}
          readOnly
          defaultValue={["comments"]}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("checkbox", { name: "Releases" }));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).toBeChecked();
      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).not.toBeChecked();
    });

    it("submits every checked value under the group name", () => {
      render(
        <form>
          <CheckboxGroup
            aria-label="Notifications"
            name="channels"
            items={channels}
            defaultValue={["comments", "billing"]}
          />
        </form>,
      );

      const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"][name="channels"]',
      );

      expect(inputs).toHaveLength(3);
      expect(inputs[0]).toHaveAttribute("value", "comments");
      expect(inputs[0]).toBeChecked();
      expect(inputs[1]).not.toBeChecked();
      expect(inputs[2]).toBeChecked();
    });

    it("submits checked values through FormData", async () => {
      const user = userEvent.setup();

      render(
        <form data-testid="form">
          <CheckboxGroup
            aria-label="Notifications"
            name="channels"
            items={channels}
            defaultValue={["comments"]}
          />
        </form>,
      );

      await user.click(screen.getByRole("checkbox", { name: "Billing" }));

      const data = new FormData(
        screen.getByTestId("form") as HTMLFormElement,
      );

      expect(data.getAll("channels")).toEqual(["comments", "billing"]);
    });

    it("links hidden inputs to an external form", () => {
      render(
        <>
          <form id="notifications" />
          <CheckboxGroup
            aria-label="Notifications"
            name="channels"
            form="notifications"
            items={channels}
          />
        </>,
      );

      const input = document.querySelector<HTMLInputElement>(
        'input[type="checkbox"][name="channels"]',
      );

      expect(input).toHaveAttribute("form", "notifications");
    });
  });

  describe("parent checkbox", () => {
    it("names the group and reports a mixed state", () => {
      render(
        <CheckboxGroup
          items={[
            { parent: true, label: "All channels" },
            ...channels,
          ]}
          defaultValue={["comments"]}
        />,
      );

      const group = getGroup("All channels");
      const parent = screen.getByRole("checkbox", { name: "All channels" });

      expect(group).toContainElement(parent);
      expect(parent).toHaveAttribute("data-slot", "parent");
      expect(parent).toHaveAttribute("aria-checked", "mixed");
      expect(parent).toHaveAttribute("data-indeterminate");
      expect(
        parent
          .querySelector('[data-slot="indicator-icon"]')
          ?.querySelector("svg"),
      ).toHaveAttribute("data-icon", "dash");
    });

    it("selects and clears every option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={[
            { parent: true, label: "All channels" },
            ...channels,
          ]}
          onValueChange={onValueChange}
        />,
      );

      const parent = screen.getByRole("checkbox", { name: "All channels" });

      await user.click(parent);

      expect(onValueChange).toHaveBeenLastCalledWith(
        ["comments", "releases", "billing"],
        expect.anything(),
      );
      expect(screen.getByRole("checkbox", { name: "Comments" })).toBeChecked();
      expect(parent).toHaveAttribute("aria-checked", "true");

      await user.click(parent);

      expect(onValueChange).toHaveBeenLastCalledWith([], expect.anything());
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).not.toBeChecked();
      expect(parent).toHaveAttribute("aria-checked", "false");
    });

    it("keeps disabled options checked when clearing the group", async () => {
      const user = userEvent.setup();

      render(
        <CheckboxGroup
          aria-label="Notifications"
          items={[
            { parent: true, label: "All channels" },
            { value: "comments", label: "Comments" },
            { value: "releases", label: "Releases", disabled: true },
            { value: "billing", label: "Billing" },
          ]}
          defaultValue={["comments", "releases", "billing"]}
        />,
      );

      await user.click(screen.getByRole("checkbox", { name: "All channels" }));

      expect(
        screen.getByRole("checkbox", { name: "Releases" }),
      ).toBeChecked();
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).not.toBeChecked();
    });

    it("uses the parent accessibility name for the group", () => {
      render(
        <CheckboxGroup
          items={[
            {
              parent: true,
              label: <span>All channels</span>,
              "aria-label": "Everything",
            },
            { value: "comments", label: "Comments" },
          ]}
        />,
      );

      expect(
        screen.getByRole("group", { name: "Everything" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Everything" }),
      ).toBeInTheDocument();
    });

    it("supports a manually mixed parent", () => {
      render(
        <CheckboxGroup
          items={[
            {
              parent: true,
              label: "User permissions",
              indeterminate: true,
            },
            { value: "view-dashboard", label: "View Dashboard" },
            { value: "access-reports", label: "Access Reports" },
          ]}
        />,
      );

      const parent = screen.getByRole("checkbox", {
        name: "User permissions",
      });

      expect(parent).toHaveAttribute("aria-checked", "mixed");
      expect(parent).toHaveAttribute("data-indeterminate");
      expect(
        parent
          .querySelector('[data-slot="indicator-icon"]')
          ?.querySelector("svg"),
      ).toHaveAttribute("data-icon", "dash");
    });
  });

  describe("nested group", () => {
    const userManagement = [
      { value: "create-user", label: "Create user" },
      { value: "edit-user", label: "Edit user" },
      { value: "delete-user", label: "Delete user" },
      { value: "assign-roles", label: "Assign roles" },
    ] as const;

    function NestedGroup() {
      const [main, setMain] = useState<string[]>([]);
      const [management, setManagement] = useState<string[]>([]);

      return (
        <CheckboxGroup
          aria-label="Permissions"
          value={main}
          onValueChange={(next) => {
            if (next.includes("manage-users")) {
              setManagement(userManagement.map((item) => item.value));
            } else if (management.length === userManagement.length) {
              setManagement([]);
            }

            setMain(next);
          }}
          items={[
            {
              parent: true,
              label: "All permissions",
              indeterminate:
                management.length > 0 &&
                management.length !== userManagement.length,
            },
            { value: "view-dashboard", label: "View dashboard" },
            { value: "access-reports", label: "Access reports" },
            {
              value: "manage-users",
              label: "Manage users",
              selected: management,
              onValueChange: (next) => {
                if (next.length === userManagement.length) {
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
              items: userManagement,
            },
          ]}
        />
      );
    }

    it("renders parent, direct options, then nested children in order", () => {
      render(<NestedGroup />);

      expect(
        screen.getAllByRole("checkbox").map((checkbox) => checkbox.textContent),
      ).toEqual([
        "All permissions",
        "View dashboard",
        "Access reports",
        "Manage users",
        "Create user",
        "Edit user",
        "Delete user",
        "Assign roles",
      ]);
    });

    it("forwards parent checkbox props to a nested entry", () => {
      render(
        <CheckboxGroup
          items={[
            {
              value: "manage-users",
              label: "Manage users",
              indeterminate: true,
              items: [{ value: "create-user", label: "Create user" }],
            },
          ]}
        />,
      );

      const parent = screen.getByRole("checkbox", { name: "Manage users" });

      expect(parent).toHaveAttribute("aria-checked", "mixed");
      expect(parent).toHaveAttribute("data-indeterminate");
    });

    it("inherits disabled and read-only state in nested groups", () => {
      render(
        <CheckboxGroup
          aria-label="Permissions"
          disabled
          readOnly
          items={[
            { value: "view-dashboard", label: "View dashboard" },
            {
              value: "manage-users",
              label: "Manage users",
              items: [{ value: "create-user", label: "Create user" }],
            },
          ]}
        />,
      );

      for (const name of ["View dashboard", "Manage users", "Create user"]) {
        const checkbox = screen.getByRole("checkbox", { name });

        expect(checkbox).toHaveAttribute("aria-disabled", "true");
        expect(checkbox).toHaveAttribute("aria-readonly", "true");
      }
    });

    it("renders a nested parent and syncs both levels", async () => {
      const user = userEvent.setup();

      render(<NestedGroup />);

      const mainParent = screen.getByRole("checkbox", {
        name: "All permissions",
      });
      const nestedParent = screen.getByRole("checkbox", {
        name: "Manage users",
      });
      const group = getGroup("Permissions");
      const section = getSlot(group, "section");
      const items = getSlot(group, "items");

      expect(group.querySelector('[data-slot="section"]')).not.toBeNull();
      expect(items).toHaveAttribute("data-has-parent");
      expect(items).toHaveClass(
        "data-[has-parent]:ms-[calc(var(--ui-checkbox-size)+var(--ui-checkbox-gap))]",
      );
      expect(mainParent).toHaveClass(
        "data-[parent]:-ms-[calc(var(--ui-checkbox-size)+var(--ui-checkbox-gap))]",
      );
      expect(section).toHaveAttribute("data-slot", "section");
      expect(mainParent).toHaveAttribute("aria-checked", "false");
      expect(nestedParent).toHaveAttribute("aria-checked", "false");

      await user.click(screen.getByRole("checkbox", { name: "Create user" }));

      expect(nestedParent).toHaveAttribute("aria-checked", "mixed");
      expect(mainParent).toHaveAttribute("aria-checked", "mixed");

      await user.click(nestedParent);

      expect(nestedParent).toHaveAttribute("aria-checked", "true");
      expect(mainParent).toHaveAttribute("aria-checked", "mixed");
      expect(
        screen.getByRole("checkbox", { name: "Assign roles" }),
      ).toBeChecked();

      await user.click(mainParent);

      expect(mainParent).toHaveAttribute("aria-checked", "true");
      expect(
        screen.getByRole("checkbox", { name: "View dashboard" }),
      ).toBeChecked();
      expect(nestedParent).toHaveAttribute("aria-checked", "true");

      await user.click(mainParent);

      expect(mainParent).toHaveAttribute("aria-checked", "false");
      expect(nestedParent).toHaveAttribute("aria-checked", "false");
      expect(
        screen.getByRole("checkbox", { name: "Create user" }),
      ).not.toBeChecked();
    });

    it("selects everything from a manually mixed parent", async () => {
      const user = userEvent.setup();

      render(<NestedGroup />);

      const mainParent = screen.getByRole("checkbox", {
        name: "All permissions",
      });

      await user.click(screen.getByRole("checkbox", { name: "Create user" }));

      expect(mainParent).toHaveAttribute("aria-checked", "mixed");

      await user.click(mainParent);

      expect(mainParent).toHaveAttribute("aria-checked", "true");
      expect(
        screen.getByRole("checkbox", { name: "View dashboard" }),
      ).toBeChecked();
      expect(
        screen.getByRole("checkbox", { name: "Assign roles" }),
      ).toBeChecked();
    });

    it("clears the parent value when the nested group is cleared", async () => {
      const user = userEvent.setup();

      render(<NestedGroup />);

      const mainParent = screen.getByRole("checkbox", {
        name: "All permissions",
      });
      const nestedParent = screen.getByRole("checkbox", {
        name: "Manage users",
      });

      await user.click(mainParent);
      await user.click(nestedParent);

      expect(nestedParent).toHaveAttribute("aria-checked", "false");
      expect(mainParent).toHaveAttribute("aria-checked", "mixed");
      expect(
        screen.getByRole("checkbox", { name: "View dashboard" }),
      ).toBeChecked();
      expect(
        screen.getByRole("checkbox", { name: "Create user" }),
      ).not.toBeChecked();
    });
  });

  describe("styling", () => {
    it("applies className to the group and item roots", () => {
      render(
        <CheckboxGroup
          aria-label="Notifications"
          className="custom-group"
          items={[
            {
              value: "comments",
              label: "Comments",
              className: "custom-item",
            },
          ]}
        />,
      );

      const group = getGroup();
      const checkbox = screen.getByRole("checkbox", { name: "Comments" });

      expect(group).toHaveClass("custom-group");
      expect(checkbox).toHaveClass("custom-item");
      expect(getSlot(checkbox, "box")).not.toHaveClass("custom-item");
    });

    it("applies ui classes to group and item slots", () => {
      render(
        <CheckboxGroup
          aria-label="Notifications"
          label="Notifications"
          description="Choose the channels you want to hear about."
          ui={{
            root: "ui-root",
            header: "ui-header",
            label: "ui-label",
            description: "ui-description",
            items: "ui-items",
            item: "ui-item",
            box: "ui-box",
            fill: "ui-fill",
            glass: "ui-glass-slot",
            overlay: "ui-overlay",
            indicator: "ui-indicator",
            indicatorIcon: "ui-indicator-icon",
            wrapper: "ui-wrapper",
            itemLabel: "ui-item-label",
            itemDescription: "ui-item-description",
          }}
          items={[
            {
              value: "comments",
              label: "Comments",
              description: "Replies and mentions on your posts.",
              ui: {
                item: "item-item",
                box: "item-box",
                fill: "item-fill",
                glass: "item-glass",
                overlay: "item-overlay",
                indicator: "item-indicator",
                indicatorIcon: "item-indicator-icon",
                wrapper: "item-wrapper",
                itemLabel: "item-label",
                itemDescription: "item-description",
              },
            },
          ]}
        />,
      );

      const group = getGroup();
      const checkbox = screen.getByRole("checkbox", { name: "Comments" });

      expect(group).toHaveClass("ui-root");
      expect(getSlot(group, "header")).toHaveClass("ui-header");
      expect(getSlot(group, "label")).toHaveClass("ui-label");
      expect(getSlot(group, "description")).toHaveClass("ui-description");
      expect(getSlot(group, "items")).toHaveClass("ui-items");
      expect(checkbox).toHaveClass("ui-item", "item-item");
      expect(getSlot(checkbox, "box")).toHaveClass("ui-box", "item-box");
      expect(getSlot(checkbox, "fill")).toHaveClass("ui-fill", "item-fill");
      expect(getSlot(checkbox, "glass")).toHaveClass(
        "ui-glass-slot",
        "item-glass",
      );
      expect(getSlot(checkbox, "overlay")).toHaveClass(
        "ui-overlay",
        "item-overlay",
      );
      expect(getSlot(checkbox, "indicator")).toHaveClass(
        "ui-indicator",
        "item-indicator",
      );
      expect(getSlot(checkbox, "indicator-icon")).toHaveClass(
        "ui-indicator-icon",
        "item-indicator-icon",
      );
      expect(getSlot(checkbox, "wrapper")).toHaveClass(
        "ui-wrapper",
        "item-wrapper",
      );
      expect(getSlot(checkbox, "item-label")).toHaveClass(
        "ui-item-label",
        "item-label",
      );
      expect(getSlot(checkbox, "item-description")).toHaveClass(
        "ui-item-description",
        "item-description",
      );
    });

    it("scales item text with the group size", () => {
      render(
        <>
          <CheckboxGroup
            aria-label="Small"
            size="xs"
            items={[{ value: "one", label: "One" }]}
          />
          <CheckboxGroup
            aria-label="Large"
            size="xl"
            items={[{ value: "one", label: "One" }]}
          />
        </>,
      );

      const small = within(getGroup("Small")).getByRole("checkbox", {
        name: "One",
      });
      const large = within(getGroup("Large")).getByRole("checkbox", {
        name: "One",
      });

      expect(getSlot(small, "wrapper")).toHaveClass("text-xs");
      expect(getSlot(large, "wrapper")).toHaveClass("text-base");
    });

    it("renders every size variant", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      render(
        <div>
          {sizes.map((size) => (
            <CheckboxGroup
              key={size}
              aria-label={`Size ${size}`}
              size={size}
              items={[{ value: "one", label: "One" }]}
            />
          ))}
        </div>,
      );

      for (const size of sizes) {
        expect(getGroup(`Size ${size}`)).toBeInTheDocument();
      }
    });
  });
});
