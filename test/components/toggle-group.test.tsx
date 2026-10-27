import {
  act,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../src/components/toggle-group";
import theme from "../../src/theme/toggle-group";

function getGroup(name: string) {
  const group = screen.getByRole("group", { name });

  if (!(group instanceof HTMLElement)) {
    throw new Error(`Toggle group "${name}" was not rendered.`);
  }

  return group;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Toggle group slot "${slot}" was not rendered.`);
  }

  return node;
}

function getItems(group: HTMLElement) {
  return within(group).getAllByRole("button");
}

function mockGeometry(
  items: HTMLElement[],
  geometry: Array<{ x: number; y: number; width: number; height: number }>,
) {
  items.forEach((item, index) => {
    const value = geometry[index];

    if (!value) {
      throw new Error(`Missing geometry for item ${index}.`);
    }

    Object.defineProperty(item, "offsetLeft", {
      configurable: true,
      value: value.x,
    });
    Object.defineProperty(item, "offsetTop", {
      configurable: true,
      value: value.y,
    });
    Object.defineProperty(item, "offsetWidth", {
      configurable: true,
      value: value.width,
    });
    Object.defineProperty(item, "offsetHeight", {
      configurable: true,
      value: value.height,
    });
  });
}

class MockResizeObserver implements ResizeObserver {
  static instances: MockResizeObserver[] = [];

  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  trigger() {
    this.callback([], this);
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  MockResizeObserver.instances = [];
});

function ThemeGroup() {
  return (
    <ToggleGroup defaultValue={["light"]} aria-label="Theme">
      <ToggleGroupItem value="light" aria-label="Light">
        <svg data-testid="light-icon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark">
        <svg data-testid="dark-icon" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dim" aria-label="Dim">
        <svg data-testid="dim-icon" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

describe("ToggleGroup", () => {
  describe("accessible names", () => {
    it("renders a labelled group of toggle buttons", () => {
      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const items = getItems(group);

      expect(group).toHaveAttribute("data-slot", "root");
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveAttribute("aria-pressed", "true");
      expect(items[1]).toHaveAttribute("aria-pressed", "false");
      expect(items[2]).toHaveAttribute("aria-pressed", "false");
    });

    it("uses children as the item accessible name", () => {
      render(
        <ToggleGroup aria-label="View">
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(
        screen.getByRole("button", { name: "Grid" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "List" }),
      ).toBeInTheDocument();
    });

    it("supports aria-labelledby for icon-only items", () => {
      render(
        <>
          <span id="bold-label">Bold</span>
          <ToggleGroup aria-label="Formatting">
            <ToggleGroupItem
              value="bold"
              aria-labelledby="bold-label"
              icon={<svg />}
            />
          </ToggleGroup>
        </>,
      );

      expect(
        screen.getByRole("button", { name: "Bold" }),
      ).toBeInTheDocument();
    });

    it("requires an accessible name for icon-only items at the type level", () => {
      render(
        <ToggleGroup aria-label="Formatting">
          {/* @ts-expect-error Icon-only toggle items must have an accessible name. */}
          <ToggleGroupItem value="bold" icon={<svg />} />
        </ToggleGroup>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("hides an icon from assistive technology when the item has a name", () => {
      render(
        <ToggleGroup aria-label="Theme">
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            icon={<svg />}
          />
        </ToggleGroup>,
      );

      const item = screen.getByRole("button", { name: "Light" });

      expect(getSlot(item, "icon")).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("structure", () => {
    it("renders the shared indicator and clipped glass layer", () => {
      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const indicator = getSlot(group, "indicator");
      const glass = getSlot(group, "glass");

      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(indicator).toHaveAttribute("data-visible", "false");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "overflow-hidden",
        "ui-glass",
        "ui-glass-inner",
      );
      expect(
        glass.querySelector('[data-layer="rim"]'),
      ).toHaveClass("ui-glass-rim");
      expect(indicator).not.toHaveAttribute("data-slot", "item");
    });

    it("stores each item value for stable indicator targeting", () => {
      render(<ThemeGroup />);

      const items = getItems(getGroup("Theme"));

      expect(items[0]).toHaveAttribute("data-value", "light");
      expect(items[1]).toHaveAttribute("data-value", "dark");
      expect(items[2]).toHaveAttribute("data-value", "dim");
    });

    it("merges className and ui into their slots", () => {
      render(
        <ToggleGroup
          aria-label="Styled"
          className="custom-root"
          ui={{
            root: "slot-root",
            glass: "slot-glass",
            indicator: "slot-indicator",
          }}
        >
          <ToggleGroupItem
            value="one"
            className="custom-item"
            ui={{
              root: "slot-item",
              content: "slot-content",
              icon: "slot-icon",
              label: "slot-label",
            }}
            icon={<svg />}
          >
            One
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Styled");
      const item = screen.getByRole("button", { name: "One" });

      expect(group).toHaveClass("custom-root", "slot-root");
      expect(getSlot(group, "glass")).toHaveClass("slot-glass");
      expect(getSlot(group, "indicator")).toHaveClass("slot-indicator");
      expect(item).toHaveClass("custom-item", "slot-item");
      expect(getSlot(item, "content")).toHaveClass("slot-content");
      expect(getSlot(item, "icon")).toHaveClass("slot-icon");
      expect(getSlot(item, "label")).toHaveClass("slot-label");
    });

    it("applies the default md size and supports every size", () => {
      const { rerender } = render(
        <ToggleGroup aria-label="Sized" defaultValue={["one"]}>
          <ToggleGroupItem value="one" aria-label="One" icon={<svg />} />
        </ToggleGroup>,
      );

      let group = getGroup("Sized");
      let item = getItems(group)[0];

      expect(group).toHaveClass("[--ui-toggle-group-item-height:32px]");
      expect(item).toHaveClass("h-[var(--ui-toggle-group-item-height)]");
      expect(item).toHaveClass("text-[length:var(--ui-toggle-group-font-size)]");

      rerender(
        <ToggleGroup aria-label="Sized" size="xs" defaultValue={["one"]}>
          <ToggleGroupItem value="one" aria-label="One" icon={<svg />} />
        </ToggleGroup>,
      );

      group = getGroup("Sized");
      item = getItems(group)[0];

      expect(group).toHaveClass("[--ui-toggle-group-item-height:24px]");
      expect(item).toHaveAttribute("data-size", "xs");
    });

    it("marks multiple and vertical groups", () => {
      render(
        <ToggleGroup
          aria-label="Formatting"
          multiple
          orientation="vertical"
          defaultValue={["bold"]}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            Bold
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Formatting");

      expect(group).toHaveAttribute("data-multiple");
      expect(group).toHaveAttribute("data-orientation", "vertical");
    });
  });

  describe("interaction", () => {
    it("switches the pressed item in single mode", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <ToggleGroup
          aria-label="Theme"
          defaultValue={["light"]}
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="light" aria-label="Light">
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Dark">
            Dark
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const light = screen.getByRole("button", { name: "Light" });
      const dark = screen.getByRole("button", { name: "Dark" });

      await user.click(dark);

      expect(dark).toHaveAttribute("aria-pressed", "true");
      expect(light).toHaveAttribute("aria-pressed", "false");
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toEqual(["dark"]);
    });

    it("supports multiple pressed items", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <ToggleGroup
          aria-label="Formatting"
          multiple
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            Italic
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const bold = screen.getByRole("button", { name: "Bold" });
      const italic = screen.getByRole("button", { name: "Italic" });

      await user.click(bold);
      await user.click(italic);

      expect(bold).toHaveAttribute("aria-pressed", "true");
      expect(italic).toHaveAttribute("aria-pressed", "true");
      expect(onValueChange.mock.calls.at(-1)?.[0]).toEqual(["bold", "italic"]);
    });

    it("respects a controlled value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <ToggleGroup
          aria-label="Theme"
          value={["light"]}
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="light" aria-label="Light">
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Dark">
            Dark
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const light = screen.getByRole("button", { name: "Light" });
      const dark = screen.getByRole("button", { name: "Dark" });

      await user.click(dark);

      expect(onValueChange).toHaveBeenCalled();
      expect(onValueChange.mock.calls[0]?.[0]).toEqual(["dark"]);
      expect(light).toHaveAttribute("aria-pressed", "true");
      expect(dark).toHaveAttribute("aria-pressed", "false");
    });

    it("normalizes the value when multiple is disabled", async () => {
      const { rerender } = render(
        <ToggleGroup
          aria-label="Formatting"
          multiple
          defaultValue={["bold", "italic"]}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            Italic
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const bold = screen.getByRole("button", { name: "Bold" });
      const italic = screen.getByRole("button", { name: "Italic" });

      expect(bold).toHaveAttribute("aria-pressed", "true");
      expect(italic).toHaveAttribute("aria-pressed", "true");

      rerender(
        <ToggleGroup
          aria-label="Formatting"
          multiple={false}
          defaultValue={["bold", "italic"]}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            Italic
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      await waitFor(() => {
        expect(italic).toHaveAttribute("aria-pressed", "false");
      });

      expect(bold).toHaveAttribute("aria-pressed", "true");
    });

    it("does not change when disabled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <ToggleGroup
          aria-label="Theme"
          disabled
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="light" aria-label="Light">
            Light
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Theme");
      const light = screen.getByRole("button", { name: "Light" });

      expect(group).toHaveAttribute("data-disabled");
      expect(light).toBeDisabled();

      await user.click(light);

      expect(light).toHaveAttribute("aria-pressed", "false");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("moves focus with arrow keys", async () => {
      const user = userEvent.setup();

      render(<ThemeGroup />);

      const [light, dark, dim] = getItems(getGroup("Theme"));

      light?.focus();
      await user.keyboard("{ArrowRight}");

      expect(dark).toHaveFocus();

      await user.keyboard("{ArrowRight}");

      expect(dim).toHaveFocus();
    });
  });

  describe("indicator", () => {
    it("tracks the pressed item geometry", async () => {
      const user = userEvent.setup();

      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const items = getItems(group);
      const indicator = getSlot(group, "indicator");

      mockGeometry(items, [
        { x: 4, y: 4, width: 44, height: 32 },
        { x: 50, y: 4, width: 44, height: 32 },
        { x: 96, y: 4, width: 44, height: 32 },
      ]);

      await user.click(items[1]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-x"),
        ).toBe("50px");
      });

      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-y"),
      ).toBe("4px");
      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-width"),
      ).toBe("44px");
      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-height"),
      ).toBe("32px");
      expect(indicator).toHaveAttribute("data-visible", "true");
      expect(group).toHaveAttribute("data-has-value", "true");

      await user.click(items[2]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-x"),
        ).toBe("96px");
      });

      expect(group.style.getPropertyValue("--ui-toggle-group-origin")).toBe(
        "left center",
      );
      expect(group).toHaveAttribute("data-animating", "true");

      await user.click(items[1]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-x"),
        ).toBe("50px");
      });

      expect(group.style.getPropertyValue("--ui-toggle-group-origin")).toBe(
        "right center",
      );
    });

    it("tracks the pressed item geometry in a vertical group", async () => {
      const user = userEvent.setup();

      render(
        <ToggleGroup
          aria-label="Position"
          defaultValue={["top"]}
          orientation="vertical"
        >
          <ToggleGroupItem value="top" aria-label="Top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="middle" aria-label="Middle">
            Middle
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Bottom">
            Bottom
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Position");
      const items = getItems(group);
      const indicator = getSlot(group, "indicator");

      mockGeometry(items, [
        { x: 4, y: 4, width: 74, height: 32 },
        { x: 4, y: 38, width: 74, height: 32 },
        { x: 4, y: 72, width: 74, height: 32 },
      ]);

      await user.click(items[1]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-y"),
        ).toBe("38px");
      });

      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-x"),
      ).toBe("4px");
      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-width"),
      ).toBe("74px");
      expect(
        indicator.style.getPropertyValue("--ui-toggle-group-indicator-height"),
      ).toBe("32px");

      await user.click(items[2]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-y"),
        ).toBe("72px");
      });

      expect(group.style.getPropertyValue("--ui-toggle-group-origin")).toBe(
        "center top",
      );

      await user.click(items[0]!);

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-y"),
        ).toBe("4px");
      });

      expect(group.style.getPropertyValue("--ui-toggle-group-origin")).toBe(
        "center bottom",
      );
    });

    it("does not animate when layout moves the selected item", async () => {
      MockResizeObserver.instances = [];
      vi.stubGlobal("ResizeObserver", MockResizeObserver);
      const user = userEvent.setup();

      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const items = getItems(group);
      const indicator = getSlot(group, "indicator");

      mockGeometry(items, [
        { x: 4, y: 4, width: 44, height: 32 },
        { x: 50, y: 4, width: 44, height: 32 },
        { x: 96, y: 4, width: 44, height: 32 },
      ]);

      act(() => {
        MockResizeObserver.instances.forEach((observer) => observer.trigger());
      });

      await waitFor(() => {
        expect(indicator).toHaveAttribute("data-visible", "true");
      });

      await user.click(items[1]!);

      await waitFor(() => {
        expect(group).toHaveAttribute("data-animating", "true");
      });

      await waitFor(
        () => {
          expect(group).not.toHaveAttribute("data-animating");
        },
        { timeout: 1000 },
      );

      Object.defineProperty(items[0], "offsetWidth", {
        configurable: true,
        value: 60,
      });
      Object.defineProperty(items[1], "offsetLeft", {
        configurable: true,
        value: 66,
      });

      act(() => {
        MockResizeObserver.instances.forEach((observer) => observer.trigger());
      });

      await waitFor(() => {
        expect(
          indicator.style.getPropertyValue("--ui-toggle-group-indicator-x"),
        ).toBe("66px");
      });

      expect(group).not.toHaveAttribute("data-animating");
    });

    it("hides the indicator when nothing is pressed", async () => {
      const user = userEvent.setup();

      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const items = getItems(group);
      const indicator = getSlot(group, "indicator");

      mockGeometry(items, [
        { x: 4, y: 4, width: 44, height: 32 },
        { x: 50, y: 4, width: 44, height: 32 },
        { x: 96, y: 4, width: 44, height: 32 },
      ]);

      await user.click(items[0]!);

      await waitFor(() => {
        expect(indicator).toHaveAttribute("data-visible", "false");
      });

      expect(group).toHaveAttribute("data-has-value", "false");
    });
  });

  describe("theme recipe", () => {
    it("defines the group, indicator, and item slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "content",
        "glass",
        "icon",
        "indicator",
        "item",
        "label",
        "root",
      ]);
    });

    it("builds the liquid glass group and sliding indicator", () => {
      const styles = theme();

      expect(styles.root()).not.toContain("ui-glass");
      expect(styles.root()).not.toContain("border-double");
      expect(styles.root()).not.toContain("bg-glass-surface");
      expect(styles.root()).not.toContain("shadow-glass");
      expect(styles.root()).not.toContain(
        "[backdrop-filter:blur(8px)_saturate(150%)]",
      );
      expect(styles.root()).not.toContain("--ui-toggle-group-filter");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("overflow-hidden");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.glass()).not.toContain("border-glass-inner-border");
      expect(styles.root()).not.toContain("before:absolute");
      expect(styles.root()).not.toContain("after:absolute");
      expect(styles.root()).toContain(
        "[--ui-toggle-group-indicator-x:0px]",
      );
      expect(styles.root()).toContain("data-[orientation=vertical]:flex-col");
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:items-stretch",
      );
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:rounded-[var(--ui-toggle-group-vertical-radius)]",
      );
      expect(styles.indicator()).toContain(
        "[translate:var(--ui-toggle-group-indicator-x)_var(--ui-toggle-group-indicator-y)]",
      );
      expect(styles.root()).toContain(
        "[--ui-toggle-group-thumb:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      );
      expect(styles.indicator()).toContain(
        "border-[var(--ui-toggle-group-thumb-rim)]",
      );
      expect(styles.indicator()).toContain(
        "bg-[var(--ui-toggle-group-thumb)]",
      );
      expect(styles.indicator()).toContain(
        "shadow-[var(--ui-toggle-group-thumb-shadow)]",
      );
      expect(styles.indicator()).toContain("data-[visible=false]:opacity-0");
      expect(styles.indicator()).toContain(
        "group-data-[multiple]/toggle-group:hidden",
      );
      expect(styles.indicator()).toContain(
        "group-data-[orientation=horizontal]/toggle-group:data-[animating=true]:scale-x-110",
      );
      expect(styles.indicator()).toContain(
        "group-data-[orientation=vertical]/toggle-group:data-[animating=true]:scale-y-110",
      );
      expect(styles.item()).toContain("hover:text-ink-active");
      expect(styles.item()).toContain("data-[pressed]:text-ink");
      expect(styles.item()).toContain(
        "group-data-[multiple]/toggle-group:data-[pressed]:bg-[var(--ui-toggle-group-thumb)]",
      );
      expect(styles.item()).toContain(
        "group-data-[orientation=vertical]/toggle-group:self-stretch",
      );
    });

    it.each([
      ["xs", "24px", "8px", "0.75rem", "16px", "4px", "3px", "2px", "15px"],
      ["sm", "28px", "10px", "0.75rem", "16px", "4px", "3px", "2px", "17px"],
      [
        "md",
        "32px",
        "12px",
        "0.875rem",
        "20px",
        "6px",
        "4px",
        "2px",
        "20px",
      ],
      [
        "lg",
        "36px",
        "14px",
        "0.875rem",
        "20px",
        "6px",
        "4px",
        "3px",
        "22px",
      ],
      ["xl", "40px", "16px", "1rem", "24px", "8px", "4px", "3px", "24px"],
    ] as const)(
      "applies the %s size scale",
      (
        size,
        height,
        paddingX,
        fontSize,
        iconSize,
        itemGap,
        padding,
        groupGap,
        verticalRadius,
      ) => {
        const styles = theme({ size });

        expect(styles.root()).toContain(
          `[--ui-toggle-group-item-height:${height}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-item-px:${paddingX}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-font-size:${fontSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-icon-size:${iconSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-item-gap:${itemGap}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-padding:${padding}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-gap:${groupGap}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toggle-group-vertical-radius:${verticalRadius}]`,
        );
      },
    );

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.glass,
        styles.indicator,
        styles.item,
        styles.content,
        styles.icon,
        styles.label,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
