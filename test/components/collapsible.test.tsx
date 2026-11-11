import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Collapsible } from "../../src/components/collapsible";
import theme from "../../src/theme/collapsible";

const copy =
  "Standard shipping takes 3-5 business days. Express delivery arrives in 1-2 business days.";

function getTrigger(name = "Shipping details") {
  const button = screen.getByRole("button", { name });

  if (!(button instanceof HTMLElement)) {
    throw new Error(`Collapsible trigger "${name}" was not rendered.`);
  }

  return button;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Collapsible slot "${slot}" was not rendered.`);
  }

  return node;
}

function getRoot() {
  const root = getTrigger().closest<HTMLElement>('[data-slot="root"]');

  if (!root) {
    throw new Error("Collapsible root was not rendered.");
  }

  return root;
}

describe("Collapsible", () => {
  describe("structure", () => {
    it("renders a trigger button and hides the closed panel", () => {
      render(
        <Collapsible trigger="Shipping details">{copy}</Collapsible>,
      );

      const trigger = getTrigger();

      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).not.toHaveAttribute("aria-controls");
      expect(getRoot()).toHaveAttribute("data-closed");
      expect(screen.queryByText(copy)).not.toBeInTheDocument();
    });

    it("links the trigger to an open panel", () => {
      render(
        <Collapsible defaultOpen trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      const trigger = getTrigger();
      const panel = getSlot(getRoot(), "panel");

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveAttribute("aria-controls", panel.id);
      expect(trigger).toHaveAttribute("data-panel-open");
      expect(getRoot()).toHaveAttribute("data-open");
      expect(panel).toHaveTextContent(copy);
    });

    it("keeps the material in a private aria-hidden layer", () => {
      render(
        <Collapsible trigger="Shipping details">{copy}</Collapsible>,
      );

      const root = getRoot();
      const glass = getSlot(root, "glass");
      const overlay = getSlot(root, "overlay");
      const content = getSlot(root, "content");
      const trigger = getTrigger();

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(overlay.parentElement).toBe(glass);
      expect(content).not.toHaveAttribute("aria-hidden");
      expect(trigger.closest('[aria-hidden="true"]')).toBeNull();
      expect(content).toContainElement(trigger);
    });

    it("accepts ReactNode trigger and panel content", () => {
      render(
        <Collapsible
          defaultOpen
          trigger={
            <span>
              Shipping <strong>details</strong>
            </span>
          }
        >
          <span data-testid="panel-node">{copy}</span>
        </Collapsible>,
      );

      expect(
        screen.getByRole("button", { name: "Shipping details" }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("panel-node")).toBeInTheDocument();
    });

    it("renders the default plus indicator", () => {
      render(
        <Collapsible trigger="Shipping details">{copy}</Collapsible>,
      );

      const indicator = getSlot(getTrigger(), "indicator");
      const icon = getSlot(getTrigger(), "indicator-icon");

      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
      expect(icon).toHaveClass(
        "block",
        "size-[var(--ui-collapsible-icon-size)]",
      );
    });

    it("supports a custom indicator", () => {
      render(
        <Collapsible
          trigger="Shipping details"
          indicator={<span data-testid="custom-indicator" />}
        >
          {copy}
        </Collapsible>,
      );

      expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
    });

    it("can hide the indicator", () => {
      render(
        <Collapsible trigger="Shipping details" indicator={false}>
          {copy}
        </Collapsible>,
      );

      expect(
        getTrigger().querySelector('[data-slot="indicator"]'),
      ).toBeNull();
    });
  });

  describe("interaction", () => {
    it("toggles the panel from the trigger", async () => {
      const user = userEvent.setup();

      render(
        <Collapsible trigger="Shipping details">{copy}</Collapsible>,
      );

      const trigger = getTrigger();

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });

      expect(screen.getByText(copy)).toBeInTheDocument();

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      });

      await waitFor(() => {
        expect(screen.queryByText(copy)).not.toBeInTheDocument();
      });
    });

    it("toggles with the keyboard", async () => {
      const user = userEvent.setup();

      render(
        <Collapsible trigger="Shipping details">{copy}</Collapsible>,
      );

      await user.tab();
      expect(getTrigger()).toHaveFocus();

      await user.keyboard("{Enter}");
      await waitFor(() => {
        expect(getTrigger()).toHaveAttribute("aria-expanded", "true");
      });

      await user.keyboard(" ");
      await waitFor(() => {
        expect(getTrigger()).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("does not open while disabled", async () => {
      const user = userEvent.setup();

      render(
        <Collapsible disabled trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      const trigger = getTrigger();

      expect(getRoot()).toHaveAttribute("data-disabled");
      expect(trigger).toBeDisabled();

      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByText(copy)).not.toBeInTheDocument();
    });

    it("respects a controlled open prop", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Collapsible
          open={false}
          onOpenChange={onOpenChange}
          trigger="Shipping details"
        >
          {copy}
        </Collapsible>,
      );

      await user.click(getTrigger());

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(true);
      expect(getTrigger()).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByText(copy)).not.toBeInTheDocument();
    });

    it("reports the next open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Collapsible onOpenChange={onOpenChange} trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      await user.click(getTrigger());
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(true);

      await waitFor(() => {
        expect(screen.getByText(copy)).toBeInTheDocument();
      });

      await user.click(getTrigger());
      expect(onOpenChange.mock.calls[1]?.[0]).toBe(false);
    });
  });

  describe("persistence", () => {
    it("unmounts closed panel content by default", async () => {
      const user = userEvent.setup();

      render(
        <Collapsible defaultOpen trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      await user.click(getTrigger());

      await waitFor(() => {
        expect(screen.queryByText(copy)).not.toBeInTheDocument();
      });
    });

    it("keeps closed panel content mounted with keepMounted", async () => {
      const user = userEvent.setup();

      render(
        <Collapsible keepMounted trigger="Shipping details">
          <input aria-label="Draft" />
        </Collapsible>,
      );

      const panel = getSlot(getRoot(), "panel");

      expect(panel).toHaveAttribute("hidden");
      expect(screen.getByLabelText("Draft")).toBeInTheDocument();

      await user.click(getTrigger());
      await waitFor(() => {
        expect(panel).not.toHaveAttribute("hidden");
      });
    });

    it("supports hiddenUntilFound", () => {
      render(
        <Collapsible hiddenUntilFound trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      const panel = getSlot(getRoot(), "panel");

      expect(panel).toHaveAttribute("hidden", "until-found");
      expect(screen.getByText(copy)).toBeInTheDocument();
    });
  });

  describe("presentation", () => {
    it("applies size variants", () => {
      render(
        <Collapsible size="xl" trigger="Shipping details">
          {copy}
        </Collapsible>,
      );

      expect(getRoot()).toHaveClass(
        "[--ui-collapsible-trigger-height:64px]",
      );
    });

    it("merges className, style, and ui slots", () => {
      render(
        <Collapsible
          defaultOpen
          className="max-w-md rounded-none"
          style={{ marginTop: 12 }}
          trigger="Shipping details"
          ui={{ trigger: "bg-red-500", panelContent: "p-6" }}
        >
          {copy}
        </Collapsible>,
      );

      const root = getRoot();
      const trigger = getTrigger();

      expect(root).toHaveClass("max-w-md", "rounded-none");
      expect(root).toHaveStyle({ marginTop: "12px" });
      expect(trigger).toHaveClass("bg-red-500");
      expect(getSlot(root, "panel-content")).toHaveClass("p-6");
    });

    it("forwards native props and ref to the root", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Collapsible
          ref={ref}
          id="shipping"
          data-testid="shipping-collapsible"
          trigger="Shipping details"
        >
          {copy}
        </Collapsible>,
      );

      const root = getRoot();

      expect(ref.current).toBe(root);
      expect(root).toHaveAttribute("id", "shipping");
      expect(root).toHaveAttribute("data-testid", "shipping-collapsible");
    });
  });

  it("matches the theme slots", () => {
    const styles = theme();

    expect(styles.root()).toContain("group/collapsible");
    expect(styles.panel()).toContain("--collapsible-panel-height");
  });
});
