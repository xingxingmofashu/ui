import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Select } from "../../src/components/select";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", disabled: true },
] as const;

const groupedItems = [
  {
    label: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    label: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "kale", label: "Kale" },
    ],
  },
] as const;

const shippingMethods = [
  { id: "standard", name: "Standard", price: "$4.99" },
  { id: "express", name: "Express", price: "$9.99" },
];

const methodItems = shippingMethods.map((method) => ({
  value: method,
  label: method.name,
  textValue: method.name,
}));

function renderSelect(
  props: Partial<ComponentProps<typeof Select>> = {},
) {
  return render(
    <Select
      defaultOpen
      label="Fruit"
      description="Choose a fruit."
      placeholder="Pick a fruit"
      items={items}
      {...props}
    />,
  );
}

async function findListbox() {
  return screen.findByRole("listbox");
}

describe("Select", () => {
  describe("structure", () => {
    it("renders the trigger, label, description, and glass popup", async () => {
      renderSelect();

      const listbox = await findListbox();
      const trigger = screen.getByRole("combobox");
      const popup = listbox.closest<HTMLElement>('[data-slot="popup"]');
      const root = trigger.closest<HTMLElement>('[data-slot="root"]');
      const label = root?.querySelector<HTMLElement>('[data-slot="label"]');
      const description = root?.querySelector<HTMLElement>(
        '[data-slot="description"]',
      );
      const glass = trigger.querySelector<HTMLElement>(
        '[data-slot="glass"]',
      );
      const overlay = trigger.querySelector<HTMLElement>(
        '[data-slot="overlay"]',
      );
      const icon = trigger.querySelector<HTMLElement>('[data-slot="icon"]');
      const popupGlass = popup?.querySelector<HTMLElement>(
        '[data-slot="popup-glass"]',
      );

      expect(trigger).toHaveAttribute("data-slot", "trigger");
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveTextContent("Pick a fruit");
      expect(label).not.toBeNull();
      expect(label).toHaveTextContent("Fruit");
      expect(trigger.getAttribute("aria-labelledby")).toBe(label?.id);
      expect(description).toHaveTextContent("Choose a fruit.");
      expect(trigger).toHaveAttribute("aria-describedby", description?.id);
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(icon?.querySelector("svg")).not.toBeNull();
      expect(popup).toHaveAttribute("data-slot", "popup");
      expect(popupGlass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
      );
      expect(listbox).toHaveAttribute("data-slot", "list");
      expect(within(listbox).getAllByRole("option")).toHaveLength(3);
    });

    it("marks the selected option and its indicator", async () => {
      renderSelect({ defaultValue: "banana" });

      const listbox = await findListbox();
      const banana = within(listbox).getByRole("option", {
        name: "Banana",
      });
      const indicator = banana.querySelector<HTMLElement>(
        '[data-slot="item-indicator"]',
      );

      expect(banana).toHaveAttribute("data-selected");
      expect(indicator).toHaveAttribute("data-selected");
      expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
    });

    it("renders grouped options with labelled groups", async () => {
      render(
        <Select
          defaultOpen
          label="Produce"
          items={groupedItems}
          ui={{ group: "ui-group", groupLabel: "ui-group-label" }}
        />,
      );

      const listbox = await findListbox();
      const groups = within(listbox).getAllByRole("group");
      const groupLabel = groups[0].querySelector<HTMLElement>(
        '[data-slot="group-label"]',
      );

      expect(groups).toHaveLength(2);
      expect(groups[0]).toHaveClass("ui-group");
      expect(groupLabel).toHaveClass("ui-group-label");
      expect(groupLabel).toHaveTextContent("Fruits");
      expect(groups[0].getAttribute("aria-labelledby")).toBe(groupLabel?.id);
      expect(within(listbox).getAllByRole("option")).toHaveLength(4);
    });

    it("supports object values that are not string references", async () => {
      render(
        <Select
          defaultOpen
          label="Shipping"
          items={methodItems}
          defaultValue={{ ...shippingMethods[0] }}
          isItemEqualToValue={(item, value) => item.id === value.id}
        />,
      );

      const listbox = await findListbox();
      const standard = within(listbox).getByRole("option", {
        name: "Standard",
      });

      expect(standard).toHaveAttribute("data-selected");
      expect(screen.getByRole("combobox")).toHaveTextContent("Standard");
    });

    it("disables an option", async () => {
      renderSelect();

      const listbox = await findListbox();
      const cherry = within(listbox).getByRole("option", {
        name: "Cherry",
      });

      expect(cherry).toHaveAttribute("data-disabled");
    });

    it("renders a disabled trigger", () => {
      renderSelect({ defaultOpen: false, disabled: true });

      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("merges className and ui slots", async () => {
      renderSelect({
        className: "custom-root",
        ui: {
          root: "ui-root",
          label: "ui-label",
          trigger: "ui-trigger",
          glass: "ui-glass-slot",
          overlay: "ui-overlay",
          value: "ui-value",
          icon: "ui-icon",
          description: "ui-description",
          positioner: "ui-positioner",
          popup: "ui-popup",
          popupGlass: "ui-popup-glass",
          popupOverlay: "ui-popup-overlay",
          list: "ui-list",
          item: "ui-item",
          itemIndicator: "ui-item-indicator",
          itemText: "ui-item-text",
        },
      });

      const listbox = await findListbox();
      const trigger = screen.getByRole("combobox");
      const root = trigger.closest<HTMLElement>('[data-slot="root"]');
      const popup = listbox.closest<HTMLElement>('[data-slot="popup"]');
      const option = within(listbox).getByRole("option", { name: "Apple" });

      expect(root).toHaveClass("custom-root", "ui-root");
      expect(root?.querySelector('[data-slot="label"]')).toHaveClass(
        "ui-label",
      );
      expect(trigger).toHaveClass("ui-trigger");
      expect(
        trigger.querySelector('[data-slot="glass"]'),
      ).toHaveClass("ui-glass-slot");
      expect(
        trigger.querySelector('[data-slot="overlay"]'),
      ).toHaveClass("ui-overlay");
      expect(
        trigger.querySelector('[data-slot="value"]'),
      ).toHaveClass("ui-value");
      expect(
        trigger.querySelector('[data-slot="icon"]'),
      ).toHaveClass("ui-icon");
      expect(root?.querySelector('[data-slot="description"]')).toHaveClass(
        "ui-description",
      );
      expect(
        document.querySelector('[data-slot="positioner"]'),
      ).toHaveClass("ui-positioner");
      expect(popup).toHaveClass("ui-popup");
      expect(
        popup?.querySelector('[data-slot="popup-glass"]'),
      ).toHaveClass("ui-popup-glass");
      expect(
        popup?.querySelector('[data-slot="popup-overlay"]'),
      ).toHaveClass("ui-popup-overlay");
      expect(listbox).toHaveClass("ui-list");
      expect(option).toHaveClass("ui-item");
      expect(
        option.querySelector('[data-slot="item-indicator"]'),
      ).toHaveClass("ui-item-indicator");
      expect(
        option.querySelector('[data-slot="item-text"]'),
      ).toHaveClass("ui-item-text");
    });
  });

  describe("interaction", () => {
    it("opens from the trigger and selects an option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Select
          label="Fruit"
          placeholder="Pick a fruit"
          items={items}
          onValueChange={onValueChange}
        />,
      );

      expect(screen.queryByRole("listbox")).toBeNull();

      await user.click(screen.getByRole("combobox"));

      const listbox = await findListbox();

      await user.click(
        within(listbox).getByRole("option", { name: "Apple" }),
      );

      expect(onValueChange).toHaveBeenCalledWith(
        "apple",
        expect.anything(),
      );

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).toBeNull();
      });

      expect(screen.getByRole("combobox")).toHaveTextContent("Apple");
    });

    it("selects multiple options and keeps the popup open", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Select
          multiple
          defaultOpen
          label="Fruit"
          items={items}
          onValueChange={onValueChange}
        />,
      );

      const listbox = await findListbox();

      expect(listbox).toHaveAttribute("aria-multiselectable", "true");

      await user.click(
        within(listbox).getByRole("option", { name: "Apple" }),
      );

      expect(onValueChange).toHaveBeenLastCalledWith(
        ["apple"],
        expect.anything(),
      );
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(
        within(listbox).getByRole("option", { name: "Banana" }),
      );

      expect(onValueChange).toHaveBeenLastCalledWith(
        ["apple", "banana"],
        expect.anything(),
      );
      expect(screen.getByRole("combobox")).toHaveTextContent(
        "Apple, Banana",
      );
    });

    it("renders a custom multiple value and submits every selection", () => {
      render(
        <Select
          multiple
          name="fruit"
          label="Fruit"
          items={items}
          defaultValue={["apple", "banana"]}
          renderValue={(value) => `${value.length} selected`}
        />,
      );

      expect(screen.getByRole("combobox")).toHaveTextContent("2 selected");

      const inputs = [
        ...document.querySelectorAll<HTMLInputElement>('input[name="fruit"]'),
      ];

      expect(inputs.map((input) => input.value)).toEqual([
        "apple",
        "banana",
      ]);
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();

      renderSelect();

      await findListbox();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).toBeNull();
      });
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      renderSelect({ open: true, onOpenChange });

      await findListbox();

      await user.keyboard("{Escape}");

      expect(onOpenChange).toHaveBeenCalled();
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  describe("styling", () => {
    it("forwards inline styles to the field root", async () => {
      renderSelect({ style: { opacity: 0.5 } });

      await findListbox();

      const trigger = screen.getByRole("combobox");
      const root = trigger.closest<HTMLElement>('[data-slot="root"]');

      expect(root).toHaveStyle({ opacity: "0.5" });
    });
  });
});
