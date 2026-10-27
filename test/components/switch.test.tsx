import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "../../src/components/switch";
import theme from "../../src/theme/switch";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Switch slot "${slot}" was not rendered.`);
  }

  return node;
}

function getRoot(switchElement: HTMLElement) {
  const root = switchElement.closest<HTMLElement>('[data-slot="root"]');

  if (!root) {
    throw new Error("Switch root was not rendered.");
  }

  return root;
}

function getLayer(element: Element, layer: string) {
  const node = element.querySelector<HTMLElement>(
    `[data-layer="${layer}"]`,
  );

  if (!node) {
    throw new Error(`Switch layer "${layer}" was not rendered.`);
  }

  return node;
}

describe("Switch", () => {
  describe("accessible names", () => {
    it("supports aria-label", () => {
      render(<Switch aria-label="Notifications" />);

      expect(
        screen.getByRole("switch", { name: "Notifications" }),
      ).toBeInTheDocument();
    });

    it("supports aria-labelledby for external labels", () => {
      render(
        <>
          <span id="notifications-label">Notifications</span>
          <Switch aria-labelledby="notifications-label" />
        </>,
      );

      expect(
        screen.getByRole("switch", { name: "Notifications" }),
      ).toBeInTheDocument();
    });

    it("supports a visible label", () => {
      render(<Switch label="Notifications" />);

      expect(
        screen.getByRole("switch", { name: "Notifications" }),
      ).toBeInTheDocument();
    });

    it("requires an accessible name at the type level", () => {
      render(
        // @ts-expect-error Liquid switches must have an accessible name.
        <Switch />,
      );

      expect(screen.getByRole("switch")).toBeInTheDocument();
    });
  });

  describe("structure", () => {
    it("renders the switch with Nuxt slot structure", () => {
      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const root = getRoot(switchElement);

      expect(switchElement.tagName).toBe("SPAN");
      expect(switchElement).toHaveAttribute("data-slot", "base");
      expect(root.tagName).toBe("DIV");
      expect(root).toHaveAttribute("data-slot", "root");
      expect(getSlot(root, "container").tagName).toBe("DIV");
      expect(getSlot(switchElement, "thumb")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(
        switchElement.querySelector('svg[aria-hidden="true"]'),
      ).not.toBeNull();
    });

    it("renders the liquid glass layers as internal data attributes", () => {
      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const layers = [
        "filter",
        "mask",
        "track",
        "track-mask",
        "glass-rim",
        "glass-lens",
        "goo",
        "inner-glow",
        "fill",
        "cover",
      ];

      layers.forEach((layer) => {
        const node = getLayer(switchElement, layer);

        expect(node).toBeInTheDocument();
        expect(node).not.toHaveAttribute("data-slot");
      });
    });

    it("anchors the fill to the glass edge without a left cap", () => {
      const styles = theme();

      expect(styles.base()).toContain("[&_[data-layer=fill]]:left-0");
      expect(styles.base()).toContain(
        "[&_[data-layer=fill]]:rounded-r-[100px]",
      );
      expect(styles.base()).not.toContain(
        "[&_[data-layer=fill]]:rounded-[100px]",
      );
      expect(styles.base()).not.toContain(
        "[&_[data-layer=fill]]:left-[calc",
      );
    });

    it("covers the full thumb when checked", () => {
      const styles = theme();

      expect(styles.base()).toContain(
        "data-[checked]:[&_[data-layer=fill]]:[translate:calc(100cqi_-_100%)_-50%]",
      );
      expect(styles.base()).not.toContain(
        "data-[checked]:[&_[data-layer=fill]]:[translate:calc(100cqi_-_100%_-_6*var(--ui-switch-border))_-50%]",
      );
    });

    it("delays state colors until the thumb starts moving", () => {
      const styles = theme();

      expect(styles.thumb()).toContain(
        "[transition:translate_120ms_ease-out_180ms,scale_300ms_ease-out]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=track]]:[transition:background-color_120ms_ease-out_180ms]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=fill]]:[transition:height_200ms_ease-out,translate_120ms_ease-out_180ms,background-color_120ms_ease-out_180ms]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=inner-glow]]:[transition:box-shadow_120ms_ease-out_180ms]",
      );
    });

    it("renders and connects label and description", () => {
      render(<Switch label="Notifications" description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const root = getRoot(switchElement);
      const label = getSlot(root, "label");
      const description = getSlot(root, "description");

      expect(getSlot(root, "wrapper").tagName).toBe("DIV");
      expect(label.tagName).toBe("LABEL");
      expect(description.tagName).toBe("P");
      expect(label).toHaveTextContent("Notifications");
      expect(description).toHaveTextContent("Receive alerts");
      expect(switchElement).toHaveAttribute("aria-labelledby", label.id);
      expect(switchElement).toHaveAttribute(
        "aria-describedby",
        description.id,
      );
      expect(switchElement).toHaveAccessibleDescription("Receive alerts");
    });

    it("does not render a text wrapper without label or description", () => {
      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      expect(
        getRoot(switchElement).querySelector('[data-slot="wrapper"]'),
      ).toBeNull();
    });

    it("merges className and classNames into their slots", () => {
      render(
        <Switch
          className="custom-root"
          description="Description slot"
          classNames={{
            root: "slot-root",
            container: "slot-container",
            base: "slot-base",
            thumb: "slot-thumb",
            wrapper: "slot-wrapper",
            label: "slot-label",
            description: "slot-description",
          }}
          label="Label slot"
        />,
      );

      const switchElement = screen.getByRole("switch", { name: "Label slot" });
      const root = getRoot(switchElement);

      expect(root).toHaveClass("custom-root", "slot-root");
      expect(getSlot(root, "container")).toHaveClass("slot-container");
      expect(switchElement).toHaveClass("slot-base");
      expect(getSlot(switchElement, "thumb")).toHaveClass("slot-thumb");
      expect(getSlot(root, "wrapper")).toHaveClass("slot-wrapper");
      expect(getSlot(root, "label")).toHaveClass("slot-label");
      expect(getSlot(root, "description")).toHaveClass("slot-description");
    });

    it("generates unique liquid filters for each switch", () => {
      render(
        <>
          <Switch aria-label="First" />
          <Switch aria-label="Second" />
        </>,
      );

      const switches = screen.getAllByRole("switch");
      const filterUrls = switches.map((switchElement) =>
        switchElement.style.getPropertyValue("--ui-switch-filter-goo"),
      );
      const filterIds = filterUrls.map(
        (value) => value.match(/url\(#(.+)-goo\)/)?.[1] ?? "",
      );

      expect(new Set(filterUrls).size).toBe(2);

      switches.forEach((switchElement, index) => {
        const filterId = filterIds[index];
        const gooFilter = switchElement.querySelector(
          `filter[id="${filterId}-goo"]`,
        );
        const removeBlackFilter = switchElement.querySelector(
          `filter[id="${filterId}-remove-black"]`,
        );

        expect(filterId).toMatch(/^ui-switch-/);
        expect(gooFilter).not.toBeNull();
        expect(removeBlackFilter).not.toBeNull();
        expect(gooFilter?.children).toHaveLength(3);
        expect(gooFilter?.children[0].getAttribute("stdDeviation")).toBe("2");
        expect(gooFilter?.children[1].getAttribute("values")).toContain(
          "0 0 0 16 -10",
        );
        expect(gooFilter?.children[2].getAttribute("operator")).toBe("atop");
        expect(removeBlackFilter?.children).toHaveLength(3);
        expect(
          removeBlackFilter?.children[1].getAttribute("radius"),
        ).toBe("0.5");
        expect(
          removeBlackFilter?.children[2].getAttribute("operator"),
        ).toBe("out");
      });
    });

    it("applies the default md size and supports every size", () => {
      const { rerender } = render(<Switch aria-label="Sized" />);

      const base = screen.getByRole("switch", { name: "Sized" });

      expect(base).toHaveClass("[--ui-switch-width:64px]");
      expect(base).toHaveClass("[--ui-switch-height:32px]");
      expect(base).toHaveClass("[--ui-switch-border:3px]");

      rerender(<Switch aria-label="Sized" size="xs" />);

      expect(base).toHaveClass("[--ui-switch-width:48px]");
      expect(base).toHaveClass("[--ui-switch-height:24px]");
      expect(base).toHaveClass("[--ui-switch-border:2px]");
    });
  });

  describe("theme recipe", () => {
    it("uses only the Nuxt public slots and keeps layers inside base", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "container",
        "description",
        "label",
        "root",
        "thumb",
        "wrapper",
      ]);
      expect(styles.base()).toContain("group");
      expect(styles.base()).toContain("h-[var(--ui-switch-height)]");
      expect(styles.base()).toContain("w-[var(--ui-switch-width)]");
      expect(styles.base()).toContain("data-[disabled]:pointer-events-none");
      expect(styles.base()).toContain(
        "[&_[data-layer=fill]]:left-0",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=filter]]:pointer-events-none",
      );
      expect(styles.base()).not.toContain("[&>svg]");
      expect(styles.base()).toContain(
        "[&_[data-layer=track]]:bg-[var(--ui-switch-off)]",
      );
      expect(styles.base()).toContain(
        "data-[checked]:[&_[data-layer=track]]:bg-[var(--ui-switch-on)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=track]]:[box-shadow:var(--ui-switch-track-shadow)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=glass-rim]]:[box-shadow:var(--ui-switch-glass-shadow)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=glass-lens]]:[filter:blur(calc(var(--ui-switch-height)*0.1))]",
      );
      expect(styles.base()).toContain(
        "active:[&_[data-layer=glass-lens]]:[filter:blur(0)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-off)]",
      );
      expect(styles.base()).toContain(
        "data-[checked]:[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-on)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=cover]]:bg-[var(--ui-switch-thumb)]",
      );
      expect(styles.base()).toContain(
        "active:[&_[data-layer=cover]]:opacity-0",
      );
      expect(styles.thumb()).toContain("group-data-[checked]");
      expect(styles.thumb()).toContain("group-active");
      expect(styles.thumb()).toContain("group-data-[animating=true]");
      expect(styles.thumb()).toContain(
        "[box-shadow:var(--ui-switch-thumb-shadow)]",
      );
      expect(styles.root()).toContain("data-[disabled]:opacity-75");
    });

    it("supports the Nuxt switch size scale", () => {
      const sizes = {
        xs: ["48px", "24px", "2px", "text-xs"],
        sm: ["56px", "28px", "2px", "text-xs"],
        md: ["64px", "32px", "3px", "text-sm"],
        lg: ["72px", "36px", "3px", "text-sm"],
        xl: ["80px", "40px", "3px", "text-base"],
      } as const;

      Object.entries(sizes).forEach(
        ([size, [width, height, border, text]]) => {
          const styles = theme({
            size: size as keyof typeof sizes,
          });

          expect(styles.base()).toContain(`[--ui-switch-width:${width}]`);
          expect(styles.base()).toContain(`[--ui-switch-height:${height}]`);
          expect(styles.base()).toContain(`[--ui-switch-border:${border}]`);
          expect(styles.wrapper()).toContain(text);
        },
      );

      expect(theme().base()).toContain("[--ui-switch-width:64px]");
    });

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.container,
        styles.base,
        styles.thumb,
        styles.wrapper,
        styles.label,
        styles.description,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });

  describe("interaction", () => {
    it("toggles on click through Base UI", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "true");
      expect(switchElement).toHaveAttribute("data-checked");
      expect(onCheckedChange).toHaveBeenCalledTimes(1);
      expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
    });

    it("keeps the press bubble until the thumb transition settles", async () => {
      const user = userEvent.setup();

      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const thumb = getSlot(switchElement, "thumb");

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("data-animating", "true");

      fireEvent.transitionEnd(thumb, { propertyName: "translate" });

      expect(switchElement).not.toHaveAttribute("data-animating");
    });

    it("keeps animating until the thumb itself finishes", async () => {
      const user = userEvent.setup();

      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const thumb = getSlot(switchElement, "thumb");
      const cover = getLayer(thumb, "cover");

      await user.click(switchElement);

      fireEvent.transitionEnd(cover, { propertyName: "opacity" });
      fireEvent.transitionEnd(thumb, { propertyName: "opacity" });

      expect(switchElement).toHaveAttribute("data-animating", "true");

      fireEvent.transitionEnd(thumb, { propertyName: "translate" });

      expect(switchElement).not.toHaveAttribute("data-animating");
    });

    it("toggles with the keyboard", async () => {
      const user = userEvent.setup();

      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      switchElement.focus();
      await user.keyboard(" ");

      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("toggles from the visible label", async () => {
      const user = userEvent.setup();

      render(<Switch label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      await user.click(screen.getByText("Notifications"));

      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("respects controlled checked state", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Switch
          aria-label="Notifications"
          checked={false}
          onCheckedChange={onCheckedChange}
        />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      await user.click(switchElement);

      expect(onCheckedChange).toHaveBeenCalled();
      expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("does not change when disabled", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Switch
          label="Notifications"
          disabled
          onCheckedChange={onCheckedChange}
        />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const label = getSlot(getRoot(switchElement), "label");

      expect(switchElement).toHaveAttribute("data-disabled");
      expect(label).not.toHaveAttribute("htmlFor");

      await user.click(switchElement);
      await user.click(label);

      expect(switchElement).toHaveAttribute("aria-checked", "false");
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("does not change when read-only", async () => {
      const user = userEvent.setup();

      render(<Switch aria-label="Notifications" readOnly />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("marks disabled and read-only states on the root", () => {
      const { rerender } = render(
        <Switch aria-label="Notifications" disabled />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const root = getRoot(switchElement);

      expect(root).toHaveAttribute("data-disabled");
      expect(root).not.toHaveAttribute("data-readonly");

      rerender(<Switch aria-label="Notifications" readOnly />);

      expect(root).toHaveAttribute("data-readonly");
      expect(root).not.toHaveAttribute("data-disabled");
    });

    it("submits its value through the hidden input", () => {
      const { container } = render(
        <Switch
          aria-label="Notifications"
          name="notifications"
          value="enabled"
          defaultChecked
        />,
      );

      const input = container.querySelector<HTMLInputElement>(
        'input[type="checkbox"]',
      );

      expect(input).not.toBeNull();
      expect(input).toHaveAttribute("name", "notifications");
      expect(input).toHaveAttribute("value", "enabled");
      expect(input).toBeChecked();
    });

    it("updates the hidden input when toggled", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Switch
          aria-label="Notifications"
          name="notifications"
          value="enabled"
        />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const input = container.querySelector<HTMLInputElement>(
        'input[type="checkbox"]',
      );

      expect(input).not.toBeChecked();

      await user.click(switchElement);

      expect(input).toBeChecked();

      await user.click(switchElement);

      expect(input).not.toBeChecked();
    });
  });
});
