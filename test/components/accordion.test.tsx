import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Accordion } from "../../src/components/accordion";
import theme from "../../src/theme/accordion";

const copy = {
  shipping:
    "Standard shipping takes 3-5 business days. Express delivery arrives in 1-2 business days.",
  returns:
    "You can return any item within 30 days of delivery. Opened items may be subject to a restocking fee.",
  international:
    "Yes, we ship to over 40 countries. International orders typically arrive within 7-14 business days.",
};

const items = [
  {
    value: "shipping",
    title: "How long does shipping take?",
    content: copy.shipping,
  },
  {
    value: "returns",
    title: "What is your return policy?",
    content: copy.returns,
  },
  {
    value: "international",
    title: "Do you ship internationally?",
    content: copy.international,
  },
] as const;

function getButton(name: string) {
  const button = screen.getByRole("button", { name });

  if (!(button instanceof HTMLElement)) {
    throw new Error(`Accordion trigger "${name}" was not rendered.`);
  }

  return button;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Accordion slot "${slot}" was not rendered.`);
  }

  return node;
}

function getRoot(text: string) {
  const node = screen
    .getByText(text)
    .closest<HTMLElement>('[data-slot="root"]');

  if (!node) {
    throw new Error(`Accordion containing "${text}" was not rendered.`);
  }

  return node;
}

function BasicAccordion({
  defaultValue,
  value,
  ...props
}: Omit<ComponentProps<typeof Accordion>, "items">) {
  const controlled = value !== undefined;

  return (
    <Accordion
      {...props}
      items={items}
      value={value}
      defaultValue={controlled ? undefined : (defaultValue ?? ["shipping"])}
    />
  );
}

describe("Accordion", () => {
  describe("structure", () => {
    it("renders headings, triggers, and labelled panels", () => {
      render(<BasicAccordion />);

      const shipping = getButton("How long does shipping take?");
      const returns = getButton("What is your return policy?");
      const heading = screen.getByRole("heading", {
        level: 3,
        name: "How long does shipping take?",
      });
      const panel = screen.getByRole("region", {
        name: "How long does shipping take?",
      });

      expect(heading.tagName).toBe("H3");
      expect(heading).toContainElement(shipping);
      expect(shipping).toHaveAttribute("aria-expanded", "true");
      expect(returns).toHaveAttribute("aria-expanded", "false");
      expect(panel).toHaveAttribute("data-slot", "panel");
      expect(panel).toHaveAttribute("aria-labelledby", shipping.id);
      expect(shipping).toHaveAttribute("aria-controls", panel.id);
      expect(panel).toHaveTextContent(copy.shipping);
      expect(screen.queryByText(copy.returns)).not.toBeInTheDocument();
    });

    it("keeps the material in a private aria-hidden layer", () => {
      render(<BasicAccordion />);

      const root = getRoot("How long does shipping take?");
      const glass = getSlot(root, "glass");
      const overlay = getSlot(root, "overlay");
      const content = getSlot(root, "content");
      const trigger = getButton("How long does shipping take?");

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

    it("renders the default plus indicator", () => {
      render(<BasicAccordion />);

      const trigger = getButton("How long does shipping take?");
      const indicator = getSlot(trigger, "indicator");
      const icon = getSlot(trigger, "indicator-icon");

      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
      expect(icon).toHaveClass("block", "size-[var(--ui-accordion-icon-size)]");
    });
  });

  describe("interaction", () => {
    it("opens one panel at a time by default", async () => {
      const user = userEvent.setup();

      render(<BasicAccordion />);

      const shipping = getButton("How long does shipping take?");
      const returns = getButton("What is your return policy?");

      await user.click(returns);

      await waitFor(() => {
        expect(returns).toHaveAttribute("aria-expanded", "true");
      });

      expect(shipping).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText(copy.returns)).toBeInTheDocument();
      expect(screen.queryByText(copy.shipping)).not.toBeInTheDocument();

      await user.click(returns);

      await waitFor(() => {
        expect(returns).toHaveAttribute("aria-expanded", "false");
      });

      expect(screen.queryByText(copy.returns)).not.toBeInTheDocument();
    });

    it("supports multiple open panels", async () => {
      const user = userEvent.setup();

      render(
        <BasicAccordion multiple defaultValue={["shipping", "returns"]} />,
      );

      const shipping = getButton("How long does shipping take?");
      const returns = getButton("What is your return policy?");
      const international = getButton("Do you ship internationally?");

      expect(shipping).toHaveAttribute("aria-expanded", "true");
      expect(returns).toHaveAttribute("aria-expanded", "true");

      await user.click(international);

      await waitFor(() => {
        expect(international).toHaveAttribute("aria-expanded", "true");
      });

      expect(shipping).toHaveAttribute("aria-expanded", "true");
      expect(returns).toHaveAttribute("aria-expanded", "true");

      await user.click(shipping);

      await waitFor(() => {
        expect(shipping).toHaveAttribute("aria-expanded", "false");
      });

      expect(returns).toHaveAttribute("aria-expanded", "true");
      expect(international).toHaveAttribute("aria-expanded", "true");
    });

    it("respects a controlled value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const { rerender } = render(
        <BasicAccordion value={["shipping"]} onValueChange={onValueChange} />,
      );

      const shipping = getButton("How long does shipping take?");
      const returns = getButton("What is your return policy?");

      await user.click(returns);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toEqual(["returns"]);
      expect(shipping).toHaveAttribute("aria-expanded", "true");
      expect(returns).toHaveAttribute("aria-expanded", "false");

      rerender(
        <BasicAccordion value={["returns"]} onValueChange={onValueChange} />,
      );

      expect(returns).toHaveAttribute("aria-expanded", "true");
      expect(shipping).toHaveAttribute("aria-expanded", "false");
    });

    it("disables every trigger from the root", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(<BasicAccordion disabled onValueChange={onValueChange} />);

      const trigger = getButton("How long does shipping take?");

      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute("data-disabled");

      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("disables a single item", async () => {
      const user = userEvent.setup();

      render(
        <Accordion
          defaultValue={["shipping"]}
          items={[
            { value: "shipping", title: "Shipping", content: "Shipping content" },
            {
              value: "returns",
              title: "Returns",
              content: "Returns content",
              disabled: true,
            },
          ]}
        />,
      );

      const disabled = getButton("Returns");

      expect(disabled).toBeDisabled();

      await user.click(disabled);

      expect(disabled).toHaveAttribute("aria-expanded", "false");
    });

    it("toggles from the keyboard", async () => {
      const user = userEvent.setup();

      render(<BasicAccordion defaultValue={[]} />);

      const shipping = getButton("How long does shipping take?");

      await user.tab();

      expect(shipping).toHaveFocus();

      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(shipping).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("styling", () => {
    it("applies className to the root and item only", () => {
      render(
        <Accordion
          defaultValue={["one"]}
          className="custom-root"
          items={[
            {
              value: "one",
              title: "One",
              content: "Panel",
              className: "custom-item",
            },
          ]}
        />,
      );

      const root = getRoot("One");
      const item = getSlot(root, "item");
      const trigger = getButton("One");

      expect(root).toHaveClass("custom-root");
      expect(item).toHaveClass("custom-item");
      expect(trigger).not.toHaveClass("custom-root", "custom-item");
      expect(getSlot(root, "glass")).not.toHaveClass("custom-root");
      expect(getSlot(root, "content")).not.toHaveClass("custom-root");
      expect(getSlot(item, "header")).not.toHaveClass("custom-item");
      expect(getSlot(item, "panel")).not.toHaveClass("custom-item");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Accordion does not accept a ui prop.
        <Accordion items={items} ui={{ root: "custom-root" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        <>
          {/* @ts-expect-error The glass theme owns inline styles. */}
          <Accordion items={items} style={{ opacity: 0.5 }} />
          <Accordion
            items={[
              {
                value: "one",
                title: "One",
                // @ts-expect-error Item entries do not accept inline styles.
                style: { opacity: 0.5 },
              },
            ]}
          />
        </>
      );

      expect(element).toBeTruthy();
    });

    it("forwards render and ref to the Base UI root", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Accordion
          ref={ref}
          render={<section />}
          defaultValue={["one"]}
          items={[{ value: "one", title: "One", content: "Panel" }]}
        />,
      );

      const root = getRoot("One");

      expect(root.tagName).toBe("SECTION");
      expect(ref.current).toBe(root);
    });

    it("applies the default md size and shares it with items", () => {
      const { rerender } = render(<BasicAccordion />);

      let root = getRoot("How long does shipping take?");
      let button = getButton("How long does shipping take?");

      expect(root).toHaveClass("[--ui-accordion-trigger-height:48px]");
      expect(button).toHaveClass(
        "min-h-[var(--ui-accordion-trigger-height)]",
      );

      rerender(<BasicAccordion size="xs" />);

      root = getRoot("How long does shipping take?");
      button = getButton("How long does shipping take?");

      expect(root).toHaveClass("[--ui-accordion-trigger-height:36px]");
      expect(button).toHaveClass(
        "min-h-[var(--ui-accordion-trigger-height)]",
      );
    });
  });

  describe("theme recipe", () => {
    it("defines every public slot", () => {
      const styles = theme();

      [
        "root",
        "glass",
        "overlay",
        "content",
        "item",
        "header",
        "trigger",
        "title",
        "indicator",
        "indicatorIcon",
        "panel",
        "panelContent",
      ].forEach((slot) => {
        expect(styles).toHaveProperty(slot);
      });
    });

    it("builds the liquid glass surface and animated panel", () => {
      const styles = theme();

      expect(styles.root()).not.toContain("ui-glass");
      expect(styles.root()).toContain(
        "[--ui-accordion-divider:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      );
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("overflow-hidden");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.panel()).toContain("h-[var(--accordion-panel-height)]");
      expect(styles.panel()).toContain("data-[starting-style]:h-0");
      expect(styles.panel()).toContain("data-[ending-style]:h-0");
      expect(styles.indicator()).toContain(
        "group-data-[panel-open]/trigger:rotate-45",
      );
      expect(styles.trigger()).toContain(
        "data-[panel-open]:border-[var(--ui-accordion-divider)]",
      );
    });

    it.each([
      [
        "xs",
        "36px",
        "12px",
        "8px",
        "0.75rem",
        "20px",
        "9px",
        "12px",
        "12px",
        "0.75rem",
      ],
      [
        "sm",
        "40px",
        "14px",
        "9px",
        "0.75rem",
        "24px",
        "10px",
        "14px",
        "14px",
        "0.8125rem",
      ],
      [
        "md",
        "48px",
        "16px",
        "12px",
        "0.875rem",
        "28px",
        "12px",
        "16px",
        "16px",
        "0.875rem",
      ],
      [
        "lg",
        "56px",
        "20px",
        "14px",
        "0.875rem",
        "32px",
        "14px",
        "20px",
        "20px",
        "0.875rem",
      ],
      [
        "xl",
        "64px",
        "24px",
        "16px",
        "1rem",
        "36px",
        "16px",
        "24px",
        "24px",
        "1rem",
      ],
    ] as const)(
      "applies the %s size scale",
      (
        size,
        height,
        paddingX,
        paddingY,
        fontSize,
        indicatorSize,
        iconSize,
        panelPaddingX,
        panelPaddingBottom,
        panelFontSize,
      ) => {
        const styles = theme({ size });

        expect(styles.root()).toContain(
          `[--ui-accordion-trigger-height:${height}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-trigger-px:${paddingX}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-trigger-py:${paddingY}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-font-size:${fontSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-indicator-size:${indicatorSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-icon-size:${iconSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-panel-px:${panelPaddingX}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-panel-pb:${panelPaddingBottom}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-accordion-panel-font-size:${panelFontSize}]`,
        );
      },
    );

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.glass,
        styles.overlay,
        styles.content,
        styles.item,
        styles.header,
        styles.trigger,
        styles.title,
        styles.indicator,
        styles.indicatorIcon,
        styles.panel,
        styles.panelContent,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
