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

function getBase(switchElement: HTMLElement) {
  return getSlot(getRoot(switchElement), "base");
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

    it("uses the visible label as its name and links the description", () => {
      render(<Switch label="Notifications" description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
        description: "Receive alerts",
      });
      const root = getRoot(switchElement);
      const label = getSlot(root, "label");
      const description = getSlot(root, "description");

      expect(switchElement).toHaveAttribute("aria-labelledby", label.id);
      expect(switchElement).toHaveAttribute(
        "aria-describedby",
        description.id,
      );
    });

    it("merges external aria-describedby with the visible description", () => {
      render(
        <>
          <span id="alerts-hint">Sent once per release.</span>
          <Switch
            label="Notifications"
            description="Receive alerts"
            aria-describedby="alerts-hint"
          />
        </>,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
        description: "Sent once per release. Receive alerts",
      });
      const description = getSlot(getRoot(switchElement), "description");

      expect(switchElement).toHaveAttribute(
        "aria-describedby",
        `alerts-hint ${description.id}`,
      );
    });

    it("keeps aria-label and still links the description", () => {
      render(<Switch aria-label="Notifications" description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
        description: "Receive alerts",
      });

      expect(switchElement).not.toHaveAttribute("aria-labelledby");
      expect(switchElement).toHaveAttribute("aria-describedby");
    });

    it("uses a description-only control as its name", () => {
      render(<Switch description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: "Receive alerts",
      });

      expect(switchElement).not.toHaveAttribute("aria-describedby");
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
      expect(switchElement).toHaveAttribute("data-slot", "root");
      expect(root).toBe(switchElement);
      expect(getSlot(root, "container").tagName).toBe("SPAN");
      expect(getSlot(root, "base").tagName).toBe("SPAN");
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
        "group-data-[checked]:[&_[data-layer=fill]]:[translate:calc(100cqi_-_100%)_-50%]",
      );
      expect(styles.base()).not.toContain(
        "group-data-[checked]:[&_[data-layer=fill]]:[translate:calc(100cqi_-_100%_-_6*var(--ui-switch-border))_-50%]",
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

    it("keeps reduced-motion transitions observable", () => {
      const styles = theme();

      expect(styles.thumb()).not.toContain("motion-reduce:transition-none");
      expect(styles.base()).toContain(
        "motion-reduce:[&_*]:[transition-duration:0.01ms!important]",
      );
    });

    it("renders label and description", () => {
      render(<Switch label="Notifications" description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });
      const root = getRoot(switchElement);
      const label = getSlot(root, "label");
      const description = getSlot(root, "description");

      expect(getSlot(root, "wrapper").tagName).toBe("SPAN");
      expect(label.tagName).toBe("SPAN");
      expect(description.tagName).toBe("SPAN");
      expect(label).toHaveTextContent("Notifications");
      expect(description).toHaveTextContent("Receive alerts");
      expect(label).toHaveAttribute("id");
      expect(description).toHaveAttribute("id");
      expect(switchElement).toHaveAttribute("aria-labelledby", label.id);
      expect(switchElement).toHaveAttribute(
        "aria-describedby",
        description.id,
      );
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

    it("applies className to the root only", () => {
      render(<Switch className="custom-root" label="Label slot" />);

      const switchElement = screen.getByRole("switch", { name: "Label slot" });
      const root = getRoot(switchElement);

      expect(root).toHaveClass("custom-root");
      expect(getSlot(root, "container")).not.toHaveClass("custom-root");
      expect(getSlot(root, "base")).not.toHaveClass("custom-root");
      expect(getSlot(root, "thumb")).not.toHaveClass("custom-root");
      expect(getSlot(root, "wrapper")).not.toHaveClass("custom-root");
      expect(getSlot(root, "label")).not.toHaveClass("custom-root");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Switch no longer accepts a ui prop.
        <Switch aria-label="Internal" ui={{ base: "h-10" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles on the wrapper or Base UI root", () => {
      const invalidElement = (
        <>
          {/* @ts-expect-error The glass theme owns inline styles. */}
          <Switch aria-label="Styled" style={{ width: 120 }} />
          {/* @ts-expect-error Base UI internals are theme-controlled. */}
          <Switch aria-label="Styled" baseStyle={{ width: 120 }} />
          {/* @ts-expect-error Base UI internals are theme-controlled. */}
          <Switch aria-label="Styled" baseClassName="base" />
        </>
      );

      expect(invalidElement).toBeTruthy();
    });

    it("forwards nativeButton and render to the Base UI switch", () => {
      render(
        <Switch
          aria-label="Native switch"
          nativeButton
          render={<button type="button" />}
        />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Native switch",
      });

      expect(switchElement.tagName).toBe("BUTTON");
    });

    it("does not render arbitrary children", () => {
      render(
        // @ts-expect-error Switch owns its internal children.
        <Switch aria-label="Notifications">Child</Switch>,
      );

      expect(screen.queryByText("Child")).not.toBeInTheDocument();
    });

    it("does not render an empty label", () => {
      render(<Switch label="" aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      expect(
        getRoot(switchElement).querySelector('[data-slot="label"]'),
      ).toBeNull();
    });

    it("scopes the liquid glass filters to each switch", () => {
      render(
        <>
          <Switch aria-label="First" />
          <Switch aria-label="Second" />
        </>,
      );

      const switches = screen.getAllByRole("switch");
      const filterIds = switches.flatMap((switchElement) =>
        Array.from(switchElement.querySelectorAll("filter")).map(
          (filter) => filter.id,
        ),
      );

      expect(filterIds).toHaveLength(4);
      expect(new Set(filterIds).size).toBe(filterIds.length);

      switches.forEach((switchElement) => {
        const filters = Array.from(
          switchElement.querySelectorAll("filter"),
        );
        const gooFilter = filters.find((filter) =>
          filter.id.endsWith("-goo"),
        );
        const removeBlackFilter = filters.find((filter) =>
          filter.id.endsWith("-remove-black"),
        );
        const base = getBase(switchElement);

        expect(gooFilter).toBeDefined();
        expect(removeBlackFilter).toBeDefined();
        expect(base.style.getPropertyValue("--ui-switch-goo-filter")).toBe(
          `url("#${gooFilter?.id}")`,
        );
        expect(
          base.style.getPropertyValue("--ui-switch-remove-black-filter"),
        ).toBe(`url("#${removeBlackFilter?.id}")`);
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

      const switchElement = screen.getByRole("switch", { name: "Sized" });

      expect(getBase(switchElement)).toHaveClass("[--ui-switch-width:64px]");
      expect(getBase(switchElement)).toHaveClass("[--ui-switch-height:32px]");
      expect(getBase(switchElement)).toHaveClass("[--ui-switch-border:3px]");

      rerender(<Switch aria-label="Sized" size="xs" />);

      const resizedSwitch = screen.getByRole("switch", { name: "Sized" });

      expect(getBase(resizedSwitch)).toHaveClass("[--ui-switch-width:48px]");
      expect(getBase(resizedSwitch)).toHaveClass("[--ui-switch-height:24px]");
      expect(getBase(resizedSwitch)).toHaveClass("[--ui-switch-border:2px]");
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
      expect(styles.root()).toContain("group");
      expect(styles.base()).toContain("h-[var(--ui-switch-height)]");
      expect(styles.base()).toContain("w-[var(--ui-switch-width)]");
      expect(styles.root()).toContain("data-[disabled]:cursor-not-allowed");
      expect(styles.base()).toContain(
        "[&_[data-layer=fill]]:left-0",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=filter]]:pointer-events-none",
      );
      expect(styles.base()).not.toContain("[&>svg]");
      expect(styles.base()).not.toContain("--ui-switch-hue");
      expect(styles.base()).not.toContain("--ui-switch-thumb");
      expect(styles.base()).not.toContain("--ui-switch-track-shadow");
      expect(styles.base()).not.toContain("--ui-switch-glass-shadow");
      expect(styles.thumb()).not.toContain("--ui-switch-thumb-shadow");
      expect(styles.base()).not.toContain(
        "[&_[data-layer=mask]]:h-[var(--ui-switch-height)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=track]]:bg-[var(--ui-switch-off)]",
      );
      expect(styles.base()).toContain(
        "group-data-[checked]:[&_[data-layer=track]]:bg-[var(--ui-switch-on)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=track]]:[box-shadow:inset_0_1px_1px_rgb(255_255_255/0.35),inset_0_-1px_2px_rgb(0_0_0/0.12)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=glass-rim]]:[box-shadow:var(--ui-glass-edge-shadow)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=glass-lens]]:[filter:blur(calc(var(--ui-switch-height)*0.1))]",
      );
      expect(styles.base()).toContain(
        "group-active:[&_[data-layer=glass-lens]]:[filter:blur(0)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-off)]",
      );
      expect(styles.base()).toContain(
        "group-data-[checked]:[&_[data-layer=inner-glow]]:[--ui-switch-glow-color:var(--ui-switch-on)]",
      );
      expect(styles.base()).toContain(
        "[&_[data-layer=cover]]:bg-white",
      );
      expect(styles.base()).toContain(
        "group-active:[&_[data-layer=cover]]:opacity-0",
      );
      expect(styles.thumb()).toContain("group-data-[checked]");
      expect(styles.thumb()).toContain("group-active");
      expect(styles.thumb()).toContain("group-data-[animating=true]");
      expect(styles.thumb()).toContain(
        "[box-shadow:var(--ui-glass-thumb-shadow)]",
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

    it("does not start the animation when the change is canceled", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn(
        (_checked: boolean, details: { cancel: () => void }) =>
          details.cancel(),
      );

      render(
        <Switch
          aria-label="Notifications"
          onCheckedChange={onCheckedChange}
        />,
      );

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      await user.click(switchElement);

      expect(onCheckedChange).toHaveBeenCalled();
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

    it("toggles from the description because the whole row is interactive", async () => {
      const user = userEvent.setup();

      render(<Switch label="Notifications" description="Receive alerts" />);

      const switchElement = screen.getByRole("switch", {
        name: /Notifications/,
      });

      await user.click(screen.getByText("Receive alerts"));

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
      expect(label.tagName).toBe("SPAN");
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
