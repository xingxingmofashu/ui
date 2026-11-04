import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Menu } from "../../src/components/menu";

function renderMenu({
  trigger = <button type="button">Actions</button>,
  items = [
    { value: "rename", label: "Rename", shortcut: "⌘R" },
    { value: "duplicate", label: "Duplicate" },
    { type: "separator" },
    { value: "delete", label: "Delete", disabled: true },
  ],
  ...props
}: Partial<ComponentProps<typeof Menu>> = {}) {
  return render(
    <Menu defaultOpen trigger={trigger} items={items} {...props} />,
  );
}

async function findMenu() {
  const list = await screen.findByRole("menu");
  const popup = list.closest<HTMLElement>('[data-slot="popup"]');

  if (!popup) {
    throw new Error("Menu popup was not rendered.");
  }

  return popup;
}

describe("Menu", () => {
  describe("structure", () => {
    it("renders the glass popup, items, shortcut, and separator", async () => {
      renderMenu();

      const menu = await findMenu();
      const trigger = screen.getByRole("button", { name: "Actions" });
      const positioner = document.querySelector<HTMLElement>(
        '[data-slot="positioner"]',
      );
      const glass = menu.querySelector<HTMLElement>('[data-slot="glass"]');
      const overlay = menu.querySelector<HTMLElement>(
        '[data-slot="overlay"]',
      );
      const list = menu.querySelector<HTMLElement>('[data-slot="list"]');
      const rename = screen.getByRole("menuitem", { name: /Rename/ });
      const shortcut = rename.querySelector<HTMLElement>(
        '[data-slot="shortcut"]',
      );
      const separator = menu.querySelector<HTMLElement>(
        '[data-slot="separator"]',
      );

      expect(menu).toHaveAttribute("data-slot", "popup");
      expect(list).toHaveAttribute("role", "menu");
      expect(positioner).toContainElement(menu);
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(list).toContainElement(rename);
      expect(shortcut).toHaveTextContent("⌘R");
      expect(separator).toHaveAttribute("role", "separator");
      expect(separator).toHaveClass("bg-ui-glass-border");
    });

    it("renders groups with labels", async () => {
      renderMenu({
        items: [
          { value: "cut", label: "Cut" },
          {
            type: "group",
            label: "Danger zone",
            items: [{ value: "delete", label: "Delete" }],
          },
        ],
      });

      const menu = await findMenu();
      const group = menu.querySelector<HTMLElement>('[data-slot="group"]');
      const groupLabel = menu.querySelector<HTMLElement>(
        '[data-slot="group-label"]',
      );

      expect(group).toContainElement(
        within(menu).getByRole("menuitem", { name: "Delete" }),
      );
      expect(groupLabel).toHaveTextContent("Danger zone");
    });

    it("renders icons and the provided trigger", async () => {
      renderMenu({
        trigger: (
          <button type="button" data-testid="trigger">
            More actions
          </button>
        ),
        items: [
          {
            value: "rename",
            label: "Rename",
            icon: <svg data-testid="icon" />,
          },
        ],
      });

      const menu = await findMenu();
      const trigger = screen.getByTestId("trigger");
      const icon = screen.getByTestId("icon");

      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveTextContent("More actions");
      expect(menu.querySelector('[data-slot="item-icon"]')).toContainElement(
        icon,
      );
    });

    it("does not forward wrapper-only value and type to the item element", async () => {
      renderMenu({
        items: [{ type: "item", value: "rename", label: "Rename" }],
      });

      const rename = await screen.findByRole("menuitem", { name: "Rename" });

      expect(rename).not.toHaveAttribute("value");
      expect(rename).not.toHaveAttribute("type");
    });

    it("merges className and ui slots", async () => {
      renderMenu({
        className: "custom-popup",
        ui: {
          positioner: "custom-positioner",
          popup: "ui-popup",
          glass: "ui-glass-slot",
          overlay: "ui-overlay",
          list: "ui-list",
          item: "ui-item",
          itemIcon: "ui-icon",
          itemLabel: "ui-label",
          shortcut: "ui-shortcut",
          group: "ui-group",
          groupLabel: "ui-group-label",
          separator: "ui-separator",
        },
      });

      const menu = await findMenu();
      const positioner = document.querySelector<HTMLElement>(
        '[data-slot="positioner"]',
      );
      const rename = screen.getByRole("menuitem", { name: /Rename/ });

      expect(positioner).toHaveClass("custom-positioner");
      expect(menu).toHaveClass("custom-popup", "ui-popup");
      expect(
        menu.querySelector('[data-slot="glass"]'),
      ).toHaveClass("ui-glass-slot");
      expect(
        menu.querySelector('[data-slot="overlay"]'),
      ).toHaveClass("ui-overlay");
      expect(menu.querySelector('[data-slot="list"]')).toHaveClass("ui-list");
      expect(rename).toHaveClass("ui-item");
      expect(
        rename.querySelector('[data-slot="item-label"]'),
      ).toHaveClass("ui-label");
      expect(
        rename.querySelector('[data-slot="shortcut"]'),
      ).toHaveClass("ui-shortcut");
      expect(
        menu.querySelector('[data-slot="separator"]'),
      ).toHaveClass("ui-separator");
    });
  });

  describe("interaction", () => {
    it("opens from its trigger and closes after selecting an item", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Menu
          trigger={<button type="button">Actions</button>}
          items={[
            { value: "rename", label: "Rename", onSelect },
            { value: "delete", label: "Delete" },
          ]}
        />,
      );

      const trigger = screen.getByRole("button", { name: "Actions" });

      expect(screen.queryByRole("menu")).toBeNull();

      await user.click(trigger);

      const menu = await findMenu();

      expect(menu).toHaveTextContent("Rename");

      await user.click(
        within(menu).getByRole("menuitem", { name: "Rename" }),
      );

      expect(onSelect).toHaveBeenCalledOnce();

      await waitFor(() => {
        expect(screen.queryByRole("menu")).toBeNull();
      });
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();

      renderMenu();

      await findMenu();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("menu")).toBeNull();
      });
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      renderMenu({ open: true, onOpenChange });

      await findMenu();

      await user.keyboard("{Escape}");

      expect(onOpenChange).toHaveBeenCalled();
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("does not select a disabled item", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      renderMenu({
        items: [
          {
            value: "delete",
            label: "Delete",
            disabled: true,
            onSelect,
          },
        ],
      });

      const menu = await findMenu();
      const deleteItem = within(menu).getByRole("menuitem", {
        name: "Delete",
      });

      expect(deleteItem).toHaveAttribute("data-disabled");

      await user.click(deleteItem);

      expect(onSelect).not.toHaveBeenCalled();
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });
});
