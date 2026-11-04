import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Tooltip } from "../../src/components/tooltip";

function renderTooltip({
  children = "Bold text",
  trigger = (
    <button type="button" aria-label="Bold">
      B
    </button>
  ),
  ...props
}: Partial<ComponentProps<typeof Tooltip>> = {}) {
  return render(
    <Tooltip defaultOpen delay={0} trigger={trigger} {...props}>
      {children}
    </Tooltip>,
  );
}

async function findPopup(text = "Bold text") {
  const content = await screen.findByText(text);
  const popup = content.closest<HTMLElement>('[data-slot="popup"]');

  if (!popup) {
    throw new Error("Tooltip popup was not rendered.");
  }

  return popup;
}

describe("Tooltip", () => {
  describe("structure", () => {
    it("renders the glass popup and its parts", async () => {
      renderTooltip();

      const tooltip = await findPopup();
      const trigger = screen.getByRole("button", { name: "Bold" });
      const positioner = document.querySelector<HTMLElement>(
        '[data-slot="positioner"]',
      );
      const glass = tooltip.querySelector<HTMLElement>('[data-slot="glass"]');
      const overlay = tooltip.querySelector<HTMLElement>(
        '[data-slot="overlay"]',
      );
      const arrow = tooltip.querySelector<HTMLElement>('[data-slot="arrow"]');
      const content = tooltip.querySelector<HTMLElement>(
        '[data-slot="content"]',
      );

      expect(tooltip).toHaveAttribute("data-slot", "popup");
      expect(tooltip).toHaveTextContent("Bold text");
      expect(positioner).toContainElement(tooltip);
      expect(trigger).toHaveAttribute("data-popup-open");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(arrow).toHaveAttribute("aria-hidden", "true");
      expect(arrow).toHaveClass(
        "rotate-45",
        "bg-ui-surface",
        "border-ui-glass-border",
        "data-[side=bottom]:border-t",
        "data-[side=bottom]:border-l",
      );
      expect(content).toHaveTextContent("Bold text");
    });

    it("hides the arrow when arrow is false", async () => {
      renderTooltip({ arrow: false });

      const tooltip = await findPopup();

      expect(tooltip.querySelector('[data-slot="arrow"]')).toBeNull();
    });

    it("renders the provided trigger element", async () => {
      renderTooltip({
        trigger: (
          <button type="button" data-testid="trigger">
            More information
          </button>
        ),
      });

      await findPopup();

      const trigger = screen.getByTestId("trigger");

      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveTextContent("More information");
      expect(trigger).toHaveAttribute("data-popup-open");
    });

    it("renders logical-side arrow styles", async () => {
      renderTooltip({ children: "Logical hint", side: "inline-start" });

      const tooltip = await findPopup("Logical hint");
      const arrow = tooltip.querySelector<HTMLElement>('[data-slot="arrow"]');

      expect(arrow).toHaveAttribute("data-side", "inline-start");
      expect(arrow).toHaveClass(
        "data-[side=inline-start]:-end-[4px]",
        "ltr:data-[side=inline-start]:border-t",
        "rtl:data-[side=inline-start]:border-b",
        "rtl:data-[side=inline-start]:border-e",
      );
    });

    it("merges className and ui slots", async () => {
      renderTooltip({
        className: "custom-popup",
        ui: {
          positioner: "custom-positioner",
          popup: "ui-popup",
          glass: "ui-glass-slot",
          overlay: "ui-overlay",
          arrow: "ui-arrow",
          content: "ui-content",
        },
      });

      const tooltip = await findPopup();
      const positioner = document.querySelector<HTMLElement>(
        '[data-slot="positioner"]',
      );

      expect(positioner).toHaveClass("custom-positioner");
      expect(tooltip).toHaveClass("custom-popup", "ui-popup");
      expect(
        tooltip.querySelector('[data-slot="glass"]'),
      ).toHaveClass("ui-glass-slot");
      expect(
        tooltip.querySelector('[data-slot="overlay"]'),
      ).toHaveClass("ui-overlay");
      expect(
        tooltip.querySelector('[data-slot="arrow"]'),
      ).toHaveClass("ui-arrow");
      expect(
        tooltip.querySelector('[data-slot="content"]'),
      ).toHaveClass("ui-content");
    });
  });

  describe("interaction", () => {
    it("opens on hover and closes when the pointer leaves", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip delay={0} trigger={<button type="button">Bold</button>}>
          Bold text
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", { name: "Bold" });

      expect(screen.queryByText("Bold text")).toBeNull();

      await user.hover(trigger);

      expect(await findPopup()).toHaveTextContent("Bold text");

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText("Bold text")).toBeNull();
      });
    });

    it("opens when the trigger receives focus", async () => {
      render(
        <Tooltip delay={0} trigger={<button type="button">Focus target</button>}>
          Keyboard hint
        </Tooltip>,
      );

      const trigger = screen.getByRole("button", {
        name: "Focus target",
      });

      trigger.focus();

      expect(await findPopup("Keyboard hint")).toHaveTextContent(
        "Keyboard hint",
      );
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Tooltip
          open
          onOpenChange={onOpenChange}
          trigger={<button type="button">Controlled</button>}
        >
          Controlled hint
        </Tooltip>,
      );

      const tooltip = await findPopup("Controlled hint");
      const trigger = screen.getByRole("button", {
        name: "Controlled",
      });

      expect(tooltip).toBeInTheDocument();

      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalled();
      expect(screen.getByText("Controlled hint")).toBeInTheDocument();
    });
  });
});
