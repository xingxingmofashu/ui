import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Tabs, type TabsItemProps } from "../../src/components/tabs";
import theme from "../../src/theme/tabs";

const items = [
  {
    value: "account",
    label: "Account",
    content: "Manage your account.",
  },
  {
    value: "billing",
    label: "Billing",
    content: "Review invoices and payment methods.",
  },
  {
    value: "team",
    label: "Team",
    content: "Invite teammates and assign roles.",
  },
] as const satisfies readonly TabsItemProps[];

function getList(name = "Settings") {
  const list = screen.getByRole("tablist", { name });

  if (!(list instanceof HTMLElement)) {
    throw new Error(`Tabs list "${name}" was not rendered.`);
  }

  return list;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Tabs slot "${slot}" was not rendered.`);
  }

  return node;
}

function getTab(name: string) {
  return screen.getByRole("tab", { name });
}

function ControlledTabs() {
  const [value, setValue] = useState("account");

  return (
    <Tabs
      aria-label="Settings"
      items={items}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) {
          setValue(nextValue);
        }
      }}
    />
  );
}

describe("Tabs", () => {
  describe("accessible names", () => {
    it("renders a labelled tab list and named tabs", () => {
      render(<Tabs aria-label="Settings" items={items} />);

      const list = getList();

      expect(list).toHaveAttribute("data-slot", "list");
      expect(getTab("Account")).toBeInTheDocument();
      expect(getTab("Billing")).toBeInTheDocument();
      expect(getTab("Team")).toBeInTheDocument();
    });

    it("supports aria-labelledby for the tab list", () => {
      render(
        <>
          <span id="tabs-label">Workspace</span>
          <Tabs aria-labelledby="tabs-label" items={items} />
        </>,
      );

      expect(getList("Workspace")).toBeInTheDocument();
    });

    it("names the active panel from its tab", () => {
      render(<Tabs aria-label="Settings" items={items} />);

      const panel = screen.getByRole("tabpanel");

      expect(panel).toHaveAccessibleName("Account");
    });

    it("selects the first enabled tab by default", () => {
      render(
        <Tabs
          aria-label="Settings"
          items={[
            { value: "account", label: "Account", disabled: true },
            { value: "billing", label: "Billing", content: "Billing" },
          ]}
        />,
      );

      expect(getTab("Account")).toHaveAttribute("data-disabled");
      expect(getTab("Billing")).toHaveAttribute("data-active");
      expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing");
    });
  });

  describe("structure", () => {
    it("renders the glass list, indicator, tabs, and panels", () => {
      render(<Tabs aria-label="Settings" items={items} />);

      const list = getList();
      const root = list.closest<HTMLElement>('[data-slot="root"]');
      const glass = getSlot(list, "glass");
      const overlay = getSlot(glass, "overlay");
      const indicator = getSlot(list, "indicator");
      const panels = root ? getSlot(root, "panels") : null;
      const panel = screen.getByRole("tabpanel");
      const panelContent = getSlot(panel, "panel-content");

      expect(root).not.toBeNull();
      expect(root).toHaveAttribute("data-orientation", "horizontal");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass("ui-glass", "ui-glass-inner");
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(indicator).toHaveAttribute("data-slot", "indicator");
      expect(panels).toContainElement(panel);
      expect(panel).toHaveAttribute("data-slot", "panel");
      expect(panelContent).toHaveTextContent("Manage your account.");
      expect(getTab("Account")).toHaveAttribute("aria-controls", panel.id);
    });

    it("renders icon and label slots", () => {
      render(
        <Tabs
          aria-label="Settings"
          items={[
            {
              value: "account",
              label: "Account",
              icon: <svg data-testid="account-icon" />,
              content: "Account",
            },
          ]}
        />,
      );

      const tab = getTab("Account");
      const icon = getSlot(tab, "icon");
      const label = getSlot(tab, "label");

      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toContainElement(screen.getByTestId("account-icon"));
      expect(label).toHaveTextContent("Account");
    });

    it("keeps a panel mounted when requested", () => {
      render(
        <Tabs
          aria-label="Settings"
          items={[
            { value: "account", label: "Account", content: "Account" },
            {
              value: "billing",
              label: "Billing",
              content: "Billing",
              keepMounted: true,
            },
          ]}
        />,
      );

      const panels = document.querySelectorAll('[data-slot="panel"]');

      expect(panels).toHaveLength(2);
      expect(panels[1]).toHaveAttribute("hidden");
      expect(panels[1]).toHaveAttribute("data-hidden");
    });
  });

  describe("selection", () => {
    it("activates a tab and shows its panel on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs
          aria-label="Settings"
          items={items}
          onValueChange={onValueChange}
        />,
      );

      await user.click(getTab("Billing"));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toBe("billing");
      expect(getTab("Billing")).toHaveAttribute("data-active");
      expect(screen.getByRole("tabpanel")).toHaveTextContent(
        "Review invoices and payment methods.",
      );
    });

    it("supports controlled values", async () => {
      const user = userEvent.setup();

      render(<ControlledTabs />);

      await user.click(getTab("Team"));

      expect(getTab("Team")).toHaveAttribute("data-active");
      expect(getTab("Account")).not.toHaveAttribute("data-active");
      expect(screen.getByRole("tabpanel")).toHaveTextContent(
        "Invite teammates and assign roles.",
      );
    });

    it("moves focus with arrow keys and activates with Enter", async () => {
      const user = userEvent.setup();

      render(<Tabs aria-label="Settings" items={items} />);

      const account = getTab("Account");
      const billing = getTab("Billing");

      account.focus();
      await user.keyboard("{ArrowRight}");

      expect(billing).toHaveFocus();
      expect(account).toHaveAttribute("data-active");

      await user.keyboard("{Enter}");

      expect(billing).toHaveAttribute("data-active");
    });

    it("activates tabs on focus when activateOnFocus is set", async () => {
      const user = userEvent.setup();

      render(<Tabs aria-label="Settings" items={items} activateOnFocus />);

      getTab("Account").focus();
      await user.keyboard("{ArrowRight}");

      expect(getTab("Billing")).toHaveFocus();
      expect(getTab("Billing")).toHaveAttribute("data-active");
    });

    it("supports vertical keyboard navigation", async () => {
      const user = userEvent.setup();

      render(<Tabs aria-label="Settings" items={items} orientation="vertical" />);

      getTab("Account").focus();
      await user.keyboard("{ArrowDown}");

      expect(getTab("Billing")).toHaveFocus();
    });
  });

  describe("states", () => {
    it("does not activate a disabled tab", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs
          aria-label="Settings"
          defaultValue="account"
          onValueChange={onValueChange}
          items={[
            { value: "account", label: "Account", content: "Account" },
            {
              value: "billing",
              label: "Billing",
              content: "Billing",
              disabled: true,
            },
          ]}
        />,
      );

      await user.click(getTab("Billing"));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(getTab("Account")).toHaveAttribute("data-active");
    });

    it("disables every tab when the group is disabled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs
          aria-label="Settings"
          items={items}
          disabled
          defaultValue="account"
          onValueChange={onValueChange}
        />,
      );

      const root = getList().closest<HTMLElement>('[data-slot="root"]');

      expect(root).toHaveAttribute("data-disabled");
      expect(getTab("Account")).toHaveAttribute("data-disabled");
      expect(getTab("Billing")).toHaveAttribute("data-disabled");
      expect(getTab("Team")).toHaveAttribute("data-disabled");

      await user.click(getTab("Billing"));

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("renders no active tab when value is null", () => {
      render(<Tabs aria-label="Settings" items={items} value={null} />);

      expect(getTab("Account")).not.toHaveAttribute("data-active");
      expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    });
  });

  describe("styling", () => {
    it("applies className to the root and tab button", () => {
      render(
        <Tabs
          aria-label="Settings"
          className="custom-root"
          items={[
            {
              value: "account",
              label: "Account",
              content: "Account",
              className: "custom-tab",
            },
          ]}
        />,
      );

      const list = getList();
      const root = list.closest<HTMLElement>('[data-slot="root"]');
      const tab = getTab("Account");

      expect(root).toHaveClass("custom-root");
      expect(tab).toHaveClass("custom-tab");
      expect(getSlot(tab, "label")).not.toHaveClass("custom-tab");
    });

    it("forwards inline styles to the root and tab button", () => {
      render(
        <Tabs
          aria-label="Settings"
          style={{ opacity: 0.5 }}
          items={[
            {
              value: "account",
              label: "Account",
              content: "Account",
              style: { opacity: 0.25 },
            },
          ]}
        />,
      );

      const list = getList();
      const root = list.closest<HTMLElement>('[data-slot="root"]');
      const tab = getTab("Account");

      expect(root).toHaveStyle({ opacity: "0.5" });
      expect(tab).toHaveStyle({ opacity: "0.25" });
    });

    it("applies ui classes to root, list, and item slots", () => {
      render(
        <Tabs
          aria-label="Settings"
          ui={{
            root: "ui-root",
            list: "ui-list",
            glass: "ui-glass-slot",
            overlay: "ui-overlay",
            indicator: "ui-indicator",
            tab: "ui-tab",
            icon: "ui-icon",
            label: "ui-label",
            panels: "ui-panels",
            panel: "ui-panel",
            panelContent: "ui-panel-content",
          }}
          items={[
            {
              value: "account",
              label: "Account",
              icon: <svg />,
              content: "Account",
              ui: {
                tab: "item-tab",
                icon: "item-icon",
                label: "item-label",
                panel: "item-panel",
                panelContent: "item-panel-content",
              },
            },
          ]}
        />,
      );

      const list = getList();
      const root = list.closest<HTMLElement>('[data-slot="root"]');
      const tab = getTab("Account");
      const panel = screen.getByRole("tabpanel");

      expect(root).toHaveClass("ui-root");
      expect(list).toHaveClass("ui-list");
      expect(getSlot(list, "glass")).toHaveClass("ui-glass-slot");
      expect(getSlot(list, "overlay")).toHaveClass("ui-overlay");
      expect(getSlot(list, "indicator")).toHaveClass("ui-indicator");
      expect(tab).toHaveClass("ui-tab", "item-tab");
      expect(getSlot(tab, "icon")).toHaveClass("ui-icon", "item-icon");
      expect(getSlot(tab, "label")).toHaveClass("ui-label", "item-label");
      expect(root ? getSlot(root, "panels") : null).toHaveClass("ui-panels");
      expect(panel).toHaveClass("ui-panel", "item-panel");
      expect(getSlot(panel, "panel-content")).toHaveClass(
        "ui-panel-content",
        "item-panel-content",
      );
    });

    it("scales size variables on the root", () => {
      render(
        <>
          <Tabs aria-label="Small" size="xs" items={items} />
          <Tabs aria-label="Large" size="xl" items={items} />
        </>,
      );

      const small = getList("Small").closest<HTMLElement>('[data-slot="root"]');
      const large = getList("Large").closest<HTMLElement>('[data-slot="root"]');

      expect(small).toHaveClass("[--ui-tabs-tab-height:26px]");
      expect(large).toHaveClass("[--ui-tabs-tab-height:44px]");
    });

    it("renders every size variant", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      render(
        <div>
          {sizes.map((size) => (
            <Tabs
              key={size}
              aria-label={`Size ${size}`}
              size={size}
              items={items}
            />
          ))}
        </div>,
      );

      for (const size of sizes) {
        expect(getList(`Size ${size}`)).toBeInTheDocument();
      }
    });
  });

  it("applies the default size variant", () => {
    expect(theme().root()).toContain("[--ui-tabs-tab-height:34px]");
  });
});
