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

    it("forwards inline styles to the group and item roots", () => {
      render(
        <CheckboxGroup
          aria-label="Notifications"
          style={{ opacity: 0.5 }}
          items={[
            {
              value: "comments",
              label: "Comments",
              style: { opacity: 0.25 },
            },
          ]}
        />,
      );

      const group = getGroup();
      const checkbox = screen.getByRole("checkbox", { name: "Comments" });

      expect(group).toHaveStyle({ opacity: "0.5" });
      expect(checkbox).toHaveStyle({ opacity: "0.25" });
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
