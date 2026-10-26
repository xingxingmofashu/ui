import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../src/components/button";
import button from "../../src/theme/button";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function getSlot(element: HTMLElement, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Button slot "${slot}" was not rendered.`);
  }

  return node;
}

describe("Button", () => {
  describe("accessible names", () => {
    it("uses the visible label as its accessible name", () => {
      render(<Button label="Continue" />);

      expect(
        screen.getByRole("button", { name: "Continue" }),
      ).toBeInTheDocument();
    });

    it("uses children as its accessible name", () => {
      render(<Button>Continue</Button>);

      expect(
        screen.getByRole("button", { name: "Continue" }),
      ).toBeInTheDocument();
    });

    it("prefers the label over children", () => {
      render(<Button label="Save">Delete</Button>);

      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
      expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });

    it("supports aria-label for icon-only buttons", () => {
      render(<Button aria-label="Add item" leadingIcon={<svg />} />);

      const buttonElement = screen.getByRole("button", { name: "Add item" });

      expect(buttonElement).toBeInTheDocument();
      expect(getSlot(buttonElement, "leading-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("supports aria-labelledby for icon-only buttons", () => {
      render(
        <>
          <span id="next-label">Next</span>
          <Button aria-labelledby="next-label" leadingIcon={<svg />} />
        </>,
      );

      expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    });

    it("marks icons as decorative when the button has an accessible name", () => {
      render(
        <Button
          label="Next"
          leadingIcon={<svg data-testid="leading-icon" />}
          trailingIcon={<svg data-testid="trailing-icon" />}
        />,
      );

      const buttonElement = screen.getByRole("button", { name: "Next" });

      expect(getSlot(buttonElement, "leading-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(getSlot(buttonElement, "trailing-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("does not hide icons when no accessible name is provided", () => {
      render(
        // @ts-expect-error Icon-only buttons must have an accessible name.
        <Button leadingIcon={<svg data-testid="fallback-icon" />} />,
      );

      const buttonElement = screen.getByRole("button");

      expect(getSlot(buttonElement, "leading-icon")).not.toHaveAttribute(
        "aria-hidden",
      );
    });
  });

  describe("sizes", () => {
    it("defaults to md", () => {
      render(<Button label="Default" />);

      const buttonElement = screen.getByRole("button");

      expect(buttonElement).toHaveClass("max-w-full");
      expect(buttonElement).not.toHaveClass("w-[8rem]");
      expect(getSlot(buttonElement, "surface")).toHaveClass(
        "h-[var(--ui-button-height)]",
        "box-border",
        "overflow-hidden",
        "px-3",
        "text-sm",
        "gap-1.5",
        "[--ui-button-height:2rem]",
      );
      expect(getSlot(buttonElement, "surface").className).toContain(
        "py-[calc(",
      );
    });

    it("uses content-driven width and the Nuxt UI reference geometry", () => {
      const styles = button({ size: "md" });

      expect(styles.base()).not.toContain("w-[");
      expect(styles.base()).toContain("inline-flex");
      expect(styles.base()).toContain("items-center");
      expect(styles.surface()).toContain("px-3");
      expect(styles.surface()).toContain("h-[var(--ui-button-height)]");
      expect(styles.surface()).toContain("box-border");
      expect(styles.surface()).toContain("overflow-hidden");
      expect(styles.surface()).toContain("py-[calc(");
      expect(styles.surface()).toContain("1lh");
      expect(styles.surface()).toContain("[--ui-button-height:2rem]");
      expect(styles.surface()).toContain("gap-1.5");
      expect(styles.surface()).toContain("text-sm");
      expect(styles.leadingIcon()).toContain("[&_svg]:size-5");
      expect(styles.trailingIcon()).toContain("[&_svg]:size-5");
      expect(styles.leadingIcon()).toBe(styles.trailingIcon());
      expect(styles.trailingIcon()).not.toContain("bg-glass-icon");
      expect(styles.trailingIcon()).not.toContain("shadow-glass-icon");
    });

    it("clips decorative shadows and highlights to the capsule", () => {
      const styles = button();

      expect(styles.surface()).toContain("overflow-hidden");
      expect(styles.surface()).toContain("rounded-full");
      expect(styles.label()).toContain("var(--ui-drop-shadow-label)");
      expect(styles.leadingIcon()).toContain("var(--ui-drop-shadow-icon)");
      expect(styles.trailingIcon()).toContain("var(--ui-drop-shadow-icon)");
    });

    it.each([
      ["xs", "px-2.5", "1.5rem", "gap-1", "text-xs", "[&_svg]:size-4"],
      ["sm", "px-3", "1.75rem", "gap-1.5", "text-xs", "[&_svg]:size-4"],
      ["md", "px-3", "2rem", "gap-1.5", "text-sm", "[&_svg]:size-5"],
      ["lg", "px-3.5", "2.25rem", "gap-2", "text-sm", "[&_svg]:size-5"],
      ["xl", "px-3.5", "2.5rem", "gap-2", "text-base", "[&_svg]:size-6"],
    ] as const)(
      "applies the Nuxt UI %s size",
      (size, paddingX, height, gap, text, iconClass) => {
        const styles = button({ size });

        expect(styles.surface()).toContain(paddingX);
        expect(styles.surface()).toContain("h-[var(--ui-button-height)]");
        expect(styles.surface()).toContain("overflow-hidden");
        expect(styles.surface()).toContain(`[--ui-button-height:${height}]`);
        expect(styles.surface()).toContain("py-[calc(");
        expect(styles.surface()).toContain(gap);
        expect(styles.surface()).toContain(text);
        expect(styles.leadingIcon()).toContain(iconClass);
        expect(styles.trailingIcon()).toContain(iconClass);
        expect(styles.leadingIcon()).toBe(styles.trailingIcon());
      },
    );

    it.each([
      ["xs", "[&_svg]:size-4"],
      ["sm", "[&_svg]:size-4"],
      ["md", "[&_svg]:size-5"],
      ["lg", "[&_svg]:size-5"],
      ["xl", "[&_svg]:size-6"],
    ] as const)("constrains %s icons to the button size", (size, iconClass) => {
      render(
        <Button
          size={size}
          label={size}
          leadingIcon={<svg />}
          trailingIcon={<svg />}
        />,
      );

      const buttonElement = screen.getByRole("button");

      expect(getSlot(buttonElement, "leading-icon")).toHaveClass(iconClass);
      expect(getSlot(buttonElement, "trailing-icon")).toHaveClass(iconClass);
    });

    it("renders both icon slots with the same plain container", () => {
      for (const size of sizes) {
        const styles = button({ size });

        expect(styles.leadingIcon()).toBe(styles.trailingIcon());
        expect(styles.leadingIcon()).toContain("inline-flex");
        expect(styles.leadingIcon()).toContain("items-center");
        expect(styles.leadingIcon()).toContain("justify-center");
        expect(styles.leadingIcon()).toContain("shrink-0");
        expect(styles.trailingIcon()).not.toContain("bg-glass-icon");
        expect(styles.trailingIcon()).not.toContain("shadow-glass-icon");
      }
    });

    it("caps its width to the container instead of the viewport", () => {
      for (const size of sizes) {
        const styles = button({ size });

        expect(`${styles.base()} ${styles.surface()}`).not.toContain("100vw");
        expect(styles.base()).toContain("max-w-full");
        expect(styles.surface()).toContain("w-full");
      }
    });

    it("uses the reference font stack and drop shadows", () => {
      for (const size of sizes) {
        const styles = button({ size });

        expect(styles.label()).toContain(
          "[font-family:system-ui,-apple-system,sans-serif]",
        );
        expect(styles.label()).toContain(
          "[filter:var(--ui-drop-shadow-label)]",
        );
        expect(styles.leadingIcon()).toContain(
          "[&_svg]:[filter:var(--ui-drop-shadow-icon)]",
        );
        expect(styles.trailingIcon()).toContain(
          "[&_svg]:[filter:var(--ui-drop-shadow-icon)]",
        );
      }
    });

    it("transitions the properties used by hover and press states", () => {
      const styles = button({ size: "md" });

      expect(styles.surface()).toContain(
        "transition-[background-color,translate,scale]",
      );
      expect(styles.surface()).toContain("duration-[250ms]");
      expect(styles.surface()).not.toContain("duration-[600ms]");
      expect(styles.surface()).not.toContain("duration-[120ms]");
      expect(styles.surface()).not.toContain(
        "transition-[background-color,transform]",
      );
    });

    it("applies the reference lens filters on separate layers", () => {
      const styles = button({ size: "md" });

      expect(styles.base()).toContain("[filter:contrast(3)]");
      expect(styles.surface()).toContain("[filter:brightness(0.9)]");
      expect(styles.surface()).not.toContain("contrast(3)");
    });
  });

  describe("styling", () => {
    it("applies className to the base and classNames to each slot", () => {
      render(
        <Button
          label="Styled"
          className="custom-base"
          classNames={{
            base: "slot-base",
            surface: "bg-white",
            label: "slot-label",
            leadingIcon: "slot-leading-icon",
            trailingIcon: "slot-trailing-icon",
            overlay: "slot-overlay",
          }}
          leadingIcon={<svg />}
          trailingIcon={<svg />}
        />,
      );

      const buttonElement = screen.getByRole("button", { name: "Styled" });
      const surface = getSlot(buttonElement, "surface");

      expect(buttonElement).toHaveClass("custom-base", "slot-base");
      expect(surface).toHaveClass("bg-white");
      expect(surface).not.toHaveClass("custom-base");
      expect(surface).not.toHaveClass("bg-glass-surface");
      expect(getSlot(buttonElement, "label")).toHaveClass("slot-label");
      expect(getSlot(buttonElement, "leading-icon")).toHaveClass(
        "slot-leading-icon",
      );
      expect(getSlot(buttonElement, "trailing-icon")).toHaveClass(
        "slot-trailing-icon",
      );
      expect(getSlot(buttonElement, "overlay")).toHaveClass("slot-overlay");
    });

    it("allows explicit icon size overrides through slot classes", () => {
      render(
        <Button
          label="Custom"
          leadingIcon={<svg />}
          trailingIcon={<svg />}
          classNames={{
            leadingIcon: "[&_svg]:size-8",
            trailingIcon: "[&_svg]:size-8",
          }}
        />,
      );

      const buttonElement = screen.getByRole("button", { name: "Custom" });

      expect(getSlot(buttonElement, "leading-icon")).toHaveClass(
        "[&_svg]:size-8",
      );
      expect(getSlot(buttonElement, "leading-icon")).not.toHaveClass(
        "[&_svg]:size-5",
      );
      expect(getSlot(buttonElement, "trailing-icon")).toHaveClass(
        "[&_svg]:size-8",
      );
      expect(getSlot(buttonElement, "trailing-icon")).not.toHaveClass(
        "[&_svg]:size-5",
      );
    });

    it("keeps the label and icons on one row", () => {
      render(
        <Button
          label="Both"
          leadingIcon={<svg />}
          trailingIcon={<svg />}
        />,
      );

      const surface = getSlot(
        screen.getByRole("button", { name: "Both" }),
        "surface",
      );

      expect(surface).toHaveClass("flex-row", "flex-nowrap", "items-center");
    });
  });

  describe("interaction", () => {
    it("fires onClick and respects the disabled state", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { rerender } = render(<Button label="Run" onClick={onClick} />);

      await user.click(screen.getByRole("button", { name: "Run" }));

      expect(onClick).toHaveBeenCalledTimes(1);

      rerender(<Button label="Run" onClick={onClick} disabled />);

      const disabledButton = screen.getByRole("button", { name: "Run" });

      expect(disabledButton).toBeDisabled();

      await user.click(disabledButton);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
