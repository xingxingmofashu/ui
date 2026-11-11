import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Toolbar } from "../../src/components/toolbar";
import theme from "../../src/theme/toolbar";

function getToolbar(name: string) {
  const toolbar = screen.getByRole("toolbar", { name });

  if (!(toolbar instanceof HTMLElement)) {
    throw new Error(`Toolbar "${name}" was not rendered.`);
  }

  return toolbar;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Toolbar slot "${slot}" was not rendered.`);
  }

  return node;
}

function ActionToolbar() {
  return (
    <Toolbar
      aria-label="Document actions"
      items={[
        { label: "Undo", icon: <svg data-testid="undo-icon" /> },
        { label: "Redo", icon: <svg data-testid="redo-icon" /> },
        { kind: "separator" },
        { kind: "link", href: "/docs", label: "Docs" },
      ]}
    />
  );
}

describe("Toolbar", () => {
  describe("accessible names", () => {
    it("renders a labelled toolbar with a horizontal orientation", () => {
      render(<ActionToolbar />);

      const toolbar = getToolbar("Document actions");

      expect(toolbar).toHaveAttribute("data-slot", "root");
      expect(toolbar).toHaveAttribute("role", "toolbar");
      expect(toolbar).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("uses the item label as the accessible name", () => {
      render(<ActionToolbar />);

      expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Redo" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    });

    it("supports aria-label on icon-only items", () => {
      render(
        <Toolbar
          aria-label="History"
          items={[
            {
              "aria-label": "Undo",
              icon: <svg />,
            },
          ]}
        />,
      );

      expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    });

    it("hides icons from assistive technology", () => {
      render(<ActionToolbar />);

      const undo = screen.getByRole("button", { name: "Undo" });

      expect(getSlot(undo, "icon")).toHaveAttribute("aria-hidden", "true");
    });

    it("names a group with aria-label", () => {
      render(
        <Toolbar
          aria-label="Editor"
          items={[
            {
              kind: "group",
              "aria-label": "History",
              items: [{ label: "Undo" }, { label: "Redo" }],
            },
          ]}
        />,
      );

      const group = screen.getByRole("group", { name: "History" });

      expect(within(group).getAllByRole("button")).toHaveLength(2);
    });
  });

  describe("structure", () => {
    it("renders the clipped glass layer", () => {
      render(<ActionToolbar />);

      const toolbar = getToolbar("Document actions");
      const glass = getSlot(toolbar, "glass");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass("overflow-hidden", "ui-glass", "ui-glass-inner");
      expect(glass.querySelector('[data-slot="overlay"]')).toHaveClass(
        "ui-glass-rim",
      );
    });

    it("renders separators with the opposite orientation", () => {
      render(<ActionToolbar />);

      const separator = screen.getByRole("separator");

      expect(separator).toHaveAttribute("data-slot", "separator");
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });

    it("renders a vertical toolbar with horizontal separators", () => {
      render(
        <Toolbar
          aria-label="Zoom"
          orientation="vertical"
          items={[
            { label: "Zoom in" },
            { kind: "separator" },
            { label: "Zoom out" },
          ]}
        />,
      );

      const toolbar = getToolbar("Zoom");
      const separator = screen.getByRole("separator");

      expect(toolbar).toHaveAttribute("aria-orientation", "vertical");
      expect(toolbar).toHaveAttribute("data-orientation", "vertical");
      expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("applies className and style to the toolbar root", () => {
      render(
        <Toolbar
          aria-label="Styled"
          className="custom-root"
          style={{ opacity: 0.5 }}
          items={[{ label: "One", className: "custom-item" }]}
        />,
      );

      const toolbar = getToolbar("Styled");

      expect(toolbar).toHaveClass("custom-root");
      expect(toolbar).toHaveStyle({ opacity: "0.5" });
      expect(screen.getByRole("button", { name: "One" })).toHaveClass(
        "custom-item",
      );
    });

    it("merges Tailwind classes with themed roots", () => {
      render(
        <Toolbar
          aria-label="Merged"
          className="rounded-none"
          items={[{ label: "One", className: "rounded-none" }]}
        />,
      );

      const toolbar = getToolbar("Merged");
      const item = screen.getByRole("button", { name: "One" });

      expect(toolbar).not.toHaveClass("rounded-full");
      expect(item).not.toHaveClass("rounded-full");
    });

    it("applies ui classes to internal slots", () => {
      render(
        <Toolbar
          aria-label="Styled"
          ui={{
            root: "ui-root",
            glass: "ui-glass",
            overlay: "ui-overlay",
            group: "ui-group",
            item: "ui-item",
            content: "ui-content",
            icon: "ui-icon",
            label: "ui-label",
            separator: "ui-separator",
          }}
          items={[
            { label: "One", icon: <svg />, ui: { item: "item-item" } },
            { kind: "separator" },
            {
              kind: "group",
              "aria-label": "Group",
              items: [{ label: "Two", ui: { item: "group-item" } }],
            },
          ]}
        />,
      );

      const toolbar = getToolbar("Styled");
      const one = screen.getByRole("button", { name: "One" });
      const two = screen.getByRole("button", { name: "Two" });
      const group = screen.getByRole("group", { name: "Group" });

      expect(toolbar).toHaveClass("ui-root");
      expect(getSlot(toolbar, "glass")).toHaveClass("ui-glass");
      expect(getSlot(toolbar, "overlay")).toHaveClass("ui-overlay");
      expect(group).toHaveClass("ui-group");
      expect(one).toHaveClass("ui-item", "item-item");
      expect(getSlot(one, "content")).toHaveClass("ui-content");
      expect(getSlot(one, "icon")).toHaveClass("ui-icon");
      expect(getSlot(one, "label")).toHaveClass("ui-label");
      expect(two).toHaveClass("ui-item", "group-item");
      expect(screen.getByRole("separator")).toHaveClass("ui-separator");
    });

    it("forwards refs to the root and item elements", () => {
      const rootRef = createRef<HTMLDivElement>();
      const buttonRef = createRef<HTMLButtonElement>();
      const linkRef = createRef<HTMLAnchorElement>();
      const groupRef = createRef<HTMLDivElement>();

      render(
        <Toolbar
          ref={rootRef}
          aria-label="Refs"
          items={[
            { label: "Action", ref: buttonRef },
            { kind: "link", href: "/docs", label: "Docs", ref: linkRef },
            {
              kind: "group",
              "aria-label": "Group",
              ref: groupRef,
              items: [{ label: "Grouped" }],
            },
          ]}
        />,
      );

      expect(rootRef.current).toBe(getToolbar("Refs"));
      expect(buttonRef.current).toBe(
        screen.getByRole("button", { name: "Action" }),
      );
      expect(linkRef.current).toBe(screen.getByRole("link", { name: "Docs" }));
      expect(groupRef.current).toBe(
        screen.getByRole("group", { name: "Group" }),
      );
    });

    it("applies the default md size and supports every size", () => {
      const { rerender } = render(
        <Toolbar aria-label="Sized" items={[{ label: "One" }]} />,
      );

      expect(getToolbar("Sized")).toHaveClass(
        "[--ui-toolbar-item-height:32px]",
      );
      expect(screen.getByRole("button", { name: "One" })).toHaveClass(
        "h-[var(--ui-toolbar-item-height)]",
      );

      rerender(
        <Toolbar aria-label="Sized" size="xs" items={[{ label: "One" }]} />,
      );

      expect(getToolbar("Sized")).toHaveClass(
        "[--ui-toolbar-item-height:24px]",
      );
    });

    it("squares icon-only items", () => {
      render(
        <Toolbar
          aria-label="Icons"
          items={[{ "aria-label": "Add", icon: <svg /> }]}
        />,
      );

      expect(screen.getByRole("button", { name: "Add" })).toHaveClass(
        "aspect-square",
      );
    });
  });

  describe("interaction", () => {
    it("fires item click handlers", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Toolbar
          aria-label="Actions"
          items={[{ label: "Save", onClick }]}
        />,
      );

      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("toggles a toggle item", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();

      render(
        <Toolbar
          aria-label="Formatting"
          items={[
            {
              kind: "toggle",
              label: "Bold",
              defaultPressed: true,
              onPressedChange,
            },
          ]}
        />,
      );

      const bold = screen.getByRole("button", { name: "Bold" });

      expect(bold).toHaveAttribute("aria-pressed", "true");

      await user.click(bold);

      expect(bold).toHaveAttribute("aria-pressed", "false");
      expect(onPressedChange).toHaveBeenCalledTimes(1);
      expect(onPressedChange.mock.calls[0]?.[0]).toBe(false);
    });

    it("respects a controlled pressed value", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();

      render(
        <Toolbar
          aria-label="Formatting"
          items={[
            {
              kind: "toggle",
              label: "Italic",
              pressed: false,
              onPressedChange,
            },
          ]}
        />,
      );

      const italic = screen.getByRole("button", { name: "Italic" });

      await user.click(italic);

      expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
      expect(italic).toHaveAttribute("aria-pressed", "false");
    });

    it("disables every item from the root", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Toolbar
          aria-label="Disabled"
          disabled
          items={[{ label: "Save", onClick }]}
        />,
      );

      const toolbar = getToolbar("Disabled");
      const save = screen.getByRole("button", { name: "Save" });

      expect(toolbar).toHaveAttribute("data-disabled");
      expect(save).toHaveAttribute("aria-disabled", "true");

      await user.click(save);

      expect(onClick).not.toHaveBeenCalled();
    });

    it("disables a single item", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Toolbar
          aria-label="Actions"
          items={[
            { label: "Save", onClick },
            { label: "Publish", disabled: true, onClick },
          ]}
        />,
      );

      await user.click(screen.getByRole("button", { name: "Publish" }));

      expect(onClick).not.toHaveBeenCalled();
    });

    it("disables every item in a group", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Toolbar
          aria-label="Actions"
          items={[
            {
              kind: "group",
              "aria-label": "History",
              disabled: true,
              items: [{ label: "Undo", onClick }],
            },
            { label: "Save" },
          ]}
        />,
      );

      const undo = screen.getByRole("button", { name: "Undo" });
      const group = screen.getByRole("group", { name: "History" });

      expect(group).toHaveAttribute("data-disabled");
      expect(undo).toHaveAttribute("aria-disabled", "true");

      await user.click(undo);

      expect(onClick).not.toHaveBeenCalled();
    });

    it("moves focus with arrow keys and loops at the ends", async () => {
      const user = userEvent.setup();

      render(
        <Toolbar
          aria-label="Actions"
          items={[
            { label: "One" },
            { label: "Two" },
            { label: "Three" },
          ]}
        />,
      );

      const [one, two, three] = screen.getAllByRole("button");

      one?.focus();
      await user.keyboard("{ArrowRight}");

      expect(two).toHaveFocus();

      await user.keyboard("{ArrowRight}");

      expect(three).toHaveFocus();

      await user.keyboard("{ArrowRight}");

      expect(one).toHaveFocus();

      await user.keyboard("{ArrowLeft}");

      expect(three).toHaveFocus();
    });

    it("moves focus vertically with arrow keys", async () => {
      const user = userEvent.setup();

      render(
        <Toolbar
          aria-label="Actions"
          orientation="vertical"
          items={[{ label: "One" }, { label: "Two" }]}
        />,
      );

      const [one, two] = screen.getAllByRole("button");

      one?.focus();
      await user.keyboard("{ArrowDown}");

      expect(two).toHaveFocus();
    });

    it("stops at the ends when loopFocus is false", async () => {
      const user = userEvent.setup();

      render(
        <Toolbar
          aria-label="Actions"
          loopFocus={false}
          items={[{ label: "One" }, { label: "Two" }]}
        />,
      );

      const [one, two] = screen.getAllByRole("button");

      two?.focus();
      await user.keyboard("{ArrowRight}");

      expect(two).toHaveFocus();

      one?.focus();
      await user.keyboard("{ArrowLeft}");

      expect(one).toHaveFocus();
    });
  });

  describe("theme recipe", () => {
    it("defines every slot", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "content",
        "glass",
        "group",
        "icon",
        "item",
        "label",
        "overlay",
        "root",
        "separator",
      ]);
    });

    it("builds the liquid glass bar", () => {
      const styles = theme();

      expect(styles.root()).not.toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("overflow-hidden");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.overlay()).toBe("ui-glass-rim");
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:flex-col",
      );
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:rounded-[var(--ui-toolbar-vertical-radius)]",
      );
      expect(styles.root()).toContain(
        "[--ui-toolbar-hover:color-mix(in_srgb,var(--ui-ink)_5%,transparent)]",
      );
      expect(styles.root()).toContain(
        "[--ui-toolbar-divider:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      );
      expect(styles.item()).toContain("hover:bg-[var(--ui-toolbar-hover)]");
      expect(styles.item()).toContain(
        "data-[pressed]:before:opacity-100",
      );
      expect(styles.item()).toContain(
        "before:bg-[var(--ui-toolbar-thumb)]",
      );
      expect(styles.item()).toContain(
        "before:shadow-[var(--ui-toolbar-thumb-shadow)]",
      );
      expect(styles.item()).toContain(
        "data-[orientation=vertical]:w-full",
      );
      expect(styles.separator()).toContain(
        "data-[orientation=vertical]:h-[var(--ui-toolbar-separator-length)]",
      );
      expect(styles.separator()).toContain(
        "data-[orientation=horizontal]:w-full",
      );
    });

    it.each([
      ["xs", "24px", "8px", "0.75rem", "16px", "4px", "3px", "2px", "15px", "16px"],
      ["sm", "28px", "10px", "0.75rem", "16px", "4px", "3px", "2px", "17px", "18px"],
      ["md", "32px", "12px", "0.875rem", "20px", "6px", "4px", "2px", "20px", "20px"],
      ["lg", "36px", "14px", "0.875rem", "20px", "6px", "4px", "3px", "22px", "22px"],
      ["xl", "40px", "16px", "1rem", "24px", "8px", "4px", "3px", "24px", "24px"],
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
        gap,
        verticalRadius,
        separatorLength,
      ) => {
        const styles = theme({ size });

        expect(styles.root()).toContain(
          `[--ui-toolbar-item-height:${height}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toolbar-item-px:${paddingX}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toolbar-font-size:${fontSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toolbar-icon-size:${iconSize}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toolbar-item-gap:${itemGap}]`,
        );
        expect(styles.root()).toContain(`[--ui-toolbar-padding:${padding}]`);
        expect(styles.root()).toContain(`[--ui-toolbar-gap:${gap}]`);
        expect(styles.root()).toContain(
          `[--ui-toolbar-vertical-radius:${verticalRadius}]`,
        );
        expect(styles.root()).toContain(
          `[--ui-toolbar-separator-length:${separatorLength}]`,
        );
      },
    );

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.glass,
        styles.overlay,
        styles.group,
        styles.item,
        styles.content,
        styles.icon,
        styles.label,
        styles.separator,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
