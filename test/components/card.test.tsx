import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "../../src/components/card";
import card from "../../src/theme/card";

function getSlot(element: HTMLElement, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Card slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: HTMLElement, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function getPrivateGlass(element: HTMLElement) {
  const glass = element.querySelector<HTMLElement>('[aria-hidden="true"]');

  if (!(glass instanceof HTMLElement)) {
    throw new Error("Card private glass layer was not rendered.");
  }

  return glass;
}

function getCard(text: string, index = 0) {
  const node = screen
    .getAllByText(text)
    [index]?.closest<HTMLElement>('[data-slot="root"]');

  if (!node) {
    throw new Error(`Card containing "${text}" was not rendered.`);
  }

  return node;
}

describe("Card", () => {
  describe("content", () => {
    it("renders the Nuxt UI card sections", () => {
      render(
        <Card
          title="Liquid glass"
          description="Refractive surface"
          footer={<button type="button">Open</button>}
        >
          <p>Card body</p>
        </Card>,
      );

      const cardElement = getCard("Liquid glass");
      const header = getSlot(cardElement, "header");

      expect(cardElement).toHaveAttribute("data-slot", "root");
      expect(getSlot(cardElement, "title")).toHaveTextContent("Liquid glass");
      expect(getSlot(cardElement, "description")).toHaveTextContent(
        "Refractive surface",
      );
      expect(getSlot(cardElement, "body")).toHaveTextContent("Card body");
      expect(getSlot(cardElement, "footer")).toHaveTextContent("Open");
      expect(header).toContainElement(getSlot(cardElement, "title"));
      expect(header).toContainElement(getSlot(cardElement, "description"));
    });

    it("does not render an empty header or footer", () => {
      render(<Card>Body only</Card>);

      const cardElement = getCard("Body only");

      expect(querySlot(cardElement, "header")).toBeNull();
      expect(querySlot(cardElement, "title")).toBeNull();
      expect(querySlot(cardElement, "description")).toBeNull();
      expect(querySlot(cardElement, "footer")).toBeNull();
    });

    it("omits empty strings and false", () => {
      render(
        <Card title="" description={false} footer={false}>
          Body only
        </Card>,
      );

      const cardElement = getCard("Body only");

      expect(querySlot(cardElement, "header")).toBeNull();
      expect(querySlot(cardElement, "title")).toBeNull();
      expect(querySlot(cardElement, "description")).toBeNull();
      expect(querySlot(cardElement, "footer")).toBeNull();
    });

    it("keeps a non-empty description when the title is empty", () => {
      render(
        <Card title="" description="Description">
          Body
        </Card>,
      );

      const cardElement = getCard("Description");

      expect(querySlot(cardElement, "title")).toBeNull();
      expect(getSlot(cardElement, "description")).toHaveTextContent(
        "Description",
      );
    });

    it("does not render a body for an empty children array", () => {
      render(<Card title="Empty body">{[]}</Card>);

      expect(querySlot(getCard("Empty body"), "body")).toBeNull();
    });

    it("renders falsy but renderable slot content", () => {
      render(
        <Card title={0} description={0}>
          {0}
        </Card>,
      );

      const cardElement = getCard("0");

      expect(getSlot(cardElement, "title")).toHaveTextContent("0");
      expect(getSlot(cardElement, "description")).toHaveTextContent("0");
      expect(getSlot(cardElement, "body")).toHaveTextContent("0");
    });

    it("keeps the body content outside the decorative glass layer", () => {
      render(<Card title="Accessible">Body</Card>);

      const cardElement = getCard("Accessible");
      const body = getSlot(cardElement, "body");
      const glassLayers = Array.from(cardElement.children).filter(
        (child) => child.getAttribute("aria-hidden") === "true",
      );

      expect(body.closest('[aria-hidden="true"]')).toBeNull();
      expect(glassLayers.length).toBeGreaterThan(0);
    });
  });

  describe("nuxt ui structure", () => {
    it("uses the fixed section paddings", () => {
      render(
        <Card title="Padded" description="Description">
          Body
        </Card>,
      );

      const cardElement = getCard("Padded");

      expect(getSlot(cardElement, "header")).toHaveClass("p-4", "sm:px-6");
      expect(getSlot(cardElement, "body")).toHaveClass("p-4", "sm:p-6");
    });

    it("does not accept a size prop", () => {
      render(
        // @ts-expect-error Card follows Nuxt UI and has no size variant.
        <Card size="md">Body</Card>,
      );

      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("keeps the glass layers private", () => {
      render(
        // @ts-expect-error The glass layer is an implementation detail.
        <Card ui={{ surface: "custom-surface" }}>Body</Card>,
      );

      const cardElement = getCard("Body");

      expect(querySlot(cardElement, "surface")).toBeNull();
      expect(querySlot(cardElement, "overlay")).toBeNull();
      expect(getPrivateGlass(cardElement)).not.toHaveClass("custom-surface");
    });
  });

  describe("styling", () => {
    it("applies className to the root and ui to each public slot", () => {
      render(
        <Card
          title="Styled"
          description="Slot overrides"
          footer="Footer"
          className="custom-root"
          ui={{
            root: "slot-root",
            header: "slot-header",
            title: "slot-title",
            description: "slot-description",
            body: "slot-body",
            footer: "slot-footer",
          }}
        >
          Body
        </Card>,
      );

      const cardElement = getCard("Styled");

      expect(cardElement).toHaveClass("custom-root", "slot-root");
      expect(getSlot(cardElement, "header")).toHaveClass("slot-header");
      expect(getSlot(cardElement, "title")).toHaveClass("slot-title");
      expect(getSlot(cardElement, "description")).toHaveClass(
        "slot-description",
      );
      expect(getSlot(cardElement, "body")).toHaveClass("slot-body");
      expect(getSlot(cardElement, "footer")).toHaveClass("slot-footer");
    });

    it("uses the standard glass composition", () => {
      const styles = card();

      expect(styles.root()).toContain("grid");
      expect(styles.root()).toContain("rounded-[2rem]");
      expect(styles.root()).not.toContain("100vw");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("pointer-events-none");
      expect(styles.glass()).not.toContain("bg-glass-surface");
      expect(styles.glass()).not.toContain("border-double");
      expect(styles.glass()).not.toContain("shadow-glass");
      expect(styles.glass()).not.toContain("backdrop-blur-[2px]");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.overlay()).not.toContain("border-glass-rim");
      expect(styles.layout()).toContain("z-10");
      expect(styles.layout()).toContain("flex-col");
    });

    it("clips content to the rounded panel", () => {
      const styles = card();

      expect(styles.layout()).toContain("overflow-hidden");
      expect(styles.layout()).toContain("rounded-[inherit]");
    });

    it("uses the Nuxt UI typography and padding", () => {
      const styles = card();

      expect(styles.title()).toContain("font-semibold");
      expect(styles.title()).toContain("text-ink");
      expect(styles.title()).toContain("var(--ui-drop-shadow-label)");
      expect(styles.description()).toContain("mt-1");
      expect(styles.description()).toContain("text-sm");
      expect(styles.description()).toContain("opacity-60");
      expect(styles.body()).toContain("text-ink");
      expect(styles.footer()).toContain("p-4");
      expect(styles.footer()).toContain("sm:px-6");
    });

    it("does not render SVG or filter markup", () => {
      render(<Card>Body</Card>);

      const cardElement = getCard("Body");

      expect(cardElement.querySelector("svg")).toBeNull();
      expect(cardElement.querySelector("filter")).toBeNull();
    });
  });
});
