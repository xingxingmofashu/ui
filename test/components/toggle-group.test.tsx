import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

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
    it("renders the clipped glass layer", () => {
      render(<ThemeGroup />);

      const group = getGroup("Theme");
      const glass = getSlot(group, "glass");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "overflow-hidden",
        "ui-glass",
        "ui-glass-inner",
      );
      expect(
        glass.querySelector('[data-layer="rim"]'),
      ).toHaveClass("ui-glass-rim");
    });

    it("applies className to the group and item roots", () => {
      render(
        <ToggleGroup aria-label="Styled" className="custom-root">
          <ToggleGroupItem
            value="one"
            className="custom-item"
            icon={<svg />}
          >
            One
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Styled");
      const item = screen.getByRole("button", { name: "One" });

      expect(group).toHaveClass("custom-root");
      expect(getSlot(group, "glass")).not.toHaveClass("custom-root");
      expect(group.querySelector('[data-layer="rim"]')).not.toHaveClass(
        "custom-root",
      );
      expect(item).toHaveClass("custom-item");
      expect(getSlot(item, "content")).not.toHaveClass("custom-item");
      expect(getSlot(item, "icon")).not.toHaveClass("custom-item");
      expect(getSlot(item, "label")).not.toHaveClass("custom-item");
    });

    it("merges Tailwind classes with the themed roots", () => {
      render(
        <ToggleGroup aria-label="Merged" className="rounded-none">
          <ToggleGroupItem value="one" aria-label="One" className="rounded-none">
            One
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = getGroup("Merged");
      const item = getItems(group)[0];

      expect(group).toHaveClass("rounded-none");
      expect(group).not.toHaveClass("rounded-full");
      expect(item).toHaveClass("rounded-none");
      expect(item).not.toHaveClass("rounded-full");
    });

    it("does not accept a ui prop", () => {
      const element = (
        <>
          {/* @ts-expect-error ToggleGroup no longer accepts a ui prop. */}
          <ToggleGroup aria-label="Internal" ui={{ root: "rounded-none" }}>
            <ToggleGroupItem value="one" aria-label="One" />
          </ToggleGroup>
          <ToggleGroup aria-label="Internal">
            <ToggleGroupItem
              value="one"
              aria-label="One"
              // @ts-expect-error ToggleGroupItem no longer accepts a ui prop.
              ui={{ root: "rounded-none" }}
            />
          </ToggleGroup>
        </>
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles on the group or item", () => {
      const element = (
        <>
          {/* @ts-expect-error The glass theme owns inline styles. */}
          <ToggleGroup aria-label="Styled" style={{ opacity: 0.5 }}>
            <ToggleGroupItem value="one" aria-label="One" />
          </ToggleGroup>
          <ToggleGroup aria-label="Styled">
            <ToggleGroupItem
              value="one"
              aria-label="One"
              // @ts-expect-error The glass theme owns inline styles.
              style={{ opacity: 0.5 }}
            />
          </ToggleGroup>
        </>
      );

      expect(element).toBeTruthy();
    });

    it("forwards refs to the Base UI group root", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <ToggleGroup ref={ref} aria-label="Ref group">
          <ToggleGroupItem value="one" aria-label="One" />
        </ToggleGroup>,
      );

      expect(ref.current).toBe(getGroup("Ref group"));
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
      expect(item).toHaveClass("h-[var(--ui-toggle-group-item-height)]");
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

  describe("theme recipe", () => {
    it("defines the group and item slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "content",
        "glass",
        "icon",
        "item",
        "label",
        "rim",
        "root",
      ]);
    });

    it("builds the liquid glass group and selected item", () => {
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
      expect(styles.root()).toContain("data-[orientation=vertical]:flex-col");
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:items-stretch",
      );
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:rounded-[var(--ui-toggle-group-vertical-radius)]",
      );
      expect(styles.root()).toContain(
        "[--ui-toggle-group-thumb:color-mix(in_srgb,var(--ui-ink)_12%,transparent)]",
      );
      expect(styles.item()).toContain("hover:text-ui-ink-active");
      expect(styles.item()).toContain("data-[pressed]:text-ui-ink");
      expect(styles.item()).toContain(
        "before:bg-[var(--ui-toggle-group-thumb)]",
      );
      expect(styles.item()).toContain(
        "before:shadow-[var(--ui-toggle-group-thumb-shadow)]",
      );
      expect(styles.item()).toContain(
        "before:ring-1 before:ring-ui-glass-rim before:ring-inset",
      );
      expect(styles.item()).toContain(
        "data-[pressed]:before:[animation:ui-toggle-group-select_240ms_ease-out]",
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
        styles.rim,
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
