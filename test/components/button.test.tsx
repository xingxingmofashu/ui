import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
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

    it("falls back to children when label is empty", () => {
      render(<Button label="">Fallback</Button>);

      expect(
        screen.getByRole("button", { name: "Fallback" }),
      ).toBeInTheDocument();
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
      expect(getSlot(buttonElement, "base")).toHaveClass(
        "h-8",
        "box-border",
        "px-3",
        "text-sm",
        "gap-1.5",
      );
      expect(getSlot(buttonElement, "glass")).toHaveClass("overflow-hidden");
    });

    it("uses content-driven width and the Nuxt UI reference geometry", () => {
      const styles = button({ size: "md" });

      expect(styles.root()).not.toContain("w-[");
      expect(styles.root()).toContain("inline-flex");
      expect(styles.root()).toContain("items-center");
      expect(styles.base()).toContain("px-3");
      expect(styles.base()).toContain("h-8");
      expect(styles.base()).toContain("box-border");
      expect(styles.glass()).toContain("overflow-hidden");
      expect(styles.base()).toContain("gap-1.5");
      expect(styles.base()).toContain("text-sm");
      expect(styles.leadingIcon()).toContain("[&_svg]:size-5");
      expect(styles.trailingIcon()).toContain("[&_svg]:size-5");
      expect(styles.leadingIcon()).toBe(styles.trailingIcon());
      expect(styles.trailingIcon()).not.toContain("bg-glass-icon");
      expect(styles.trailingIcon()).not.toContain("shadow-glass-icon");
    });

    it("clips the glass highlights to the capsule", () => {
      const styles = button();

      expect(styles.base()).not.toContain("overflow-hidden");
      expect(styles.base()).toContain("rounded-full");
      expect(styles.glass()).toContain("overflow-hidden");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.label()).not.toContain("var(--ui-drop-shadow-label)");
      expect(styles.leadingIcon()).not.toContain("var(--ui-drop-shadow-icon)");
      expect(styles.trailingIcon()).not.toContain("var(--ui-drop-shadow-icon)");
    });

    it.each([
      ["xs", "px-2.5", "h-6", "gap-1", "text-xs", "[&_svg]:size-4"],
      ["sm", "px-3", "h-7", "gap-1.5", "text-xs", "[&_svg]:size-4"],
      ["md", "px-3", "h-8", "gap-1.5", "text-sm", "[&_svg]:size-5"],
      ["lg", "px-3.5", "h-9", "gap-2", "text-sm", "[&_svg]:size-5"],
      ["xl", "px-3.5", "h-10", "gap-2", "text-base", "[&_svg]:size-6"],
    ] as const)(
      "applies the Nuxt UI %s size",
      (size, paddingX, heightClass, gap, text, iconClass) => {
        const styles = button({ size });

        expect(styles.base()).toContain(paddingX);
        expect(styles.base()).toContain(heightClass);
        expect(styles.glass()).toContain("overflow-hidden");
        expect(styles.base()).toContain(gap);
        expect(styles.base()).toContain(text);
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

        expect(`${styles.root()} ${styles.base()}`).not.toContain("100vw");
        expect(styles.root()).toContain("max-w-full");
        expect(styles.base()).toContain("w-full");
      }
    });

    it("inherits typography from the host", () => {
      for (const size of sizes) {
        const styles = button({ size });

        expect(styles.label()).not.toContain("font-family");
        expect(styles.label()).not.toContain("drop-shadow");
        expect(styles.leadingIcon()).not.toContain("drop-shadow");
        expect(styles.trailingIcon()).not.toContain("drop-shadow");
      }
    });

    it("does not hardcode a high z-index", () => {
      expect(button().root()).not.toContain("z-[500]");
    });

    it("transitions the properties used by hover and press states", () => {
      const styles = button({ size: "md" });

      expect(styles.base()).toContain(
        "transition-[background-color,translate,scale]",
      );
      expect(styles.base()).toContain("duration-[250ms]");
      expect(styles.base()).not.toContain("duration-[600ms]");
      expect(styles.base()).not.toContain("duration-[120ms]");
      expect(styles.base()).not.toContain(
        "transition-[background-color,transform]",
      );
    });

    it("uses the standard glass material", () => {
      const styles = button({ size: "md" });

      expect(styles.base()).not.toContain("ui-glass");
      expect(styles.base()).toContain("isolate");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("absolute");
      expect(styles.glass()).toContain("inset-0");
      expect(styles.glass()).toContain("z-0");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.glass()).not.toContain("border-double");
      expect(styles.glass()).not.toContain("shadow-glass");
      expect(styles.glass()).not.toContain("backdrop-blur-[2px]");
      expect(styles.glass()).not.toContain("[filter:brightness(0.9)]");
      expect(styles.root()).not.toContain("contrast(3)");
      expect(styles.overlay()).toContain("ui-glass-rim");
    });
  });

  describe("styling", () => {
    it("applies className to the base and ui to each slot", () => {
      render(
        <Button
          label="Styled"
          className="custom-base"
          ui={{
            root: "slot-root",
            base: "bg-white",
            glass: "slot-glass",
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
      const base = getSlot(buttonElement, "base");

      expect(buttonElement).toHaveClass("custom-base", "slot-root");
      expect(base).toHaveClass("bg-white");
      expect(base).not.toHaveClass("custom-base");
      expect(base).not.toHaveClass("bg-glass-surface");
      expect(getSlot(buttonElement, "glass")).toHaveClass("slot-glass");
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
          ui={{
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

      const base = getSlot(
        screen.getByRole("button", { name: "Both" }),
        "base",
      );

      expect(base).toHaveClass("flex-row", "flex-nowrap", "items-center");
    });

    it("keeps content outside the filtered glass layer", () => {
      render(
        <Button
          label="Layered"
          leadingIcon={<svg />}
          trailingIcon={<svg />}
        />,
      );

      const buttonElement = screen.getByRole("button", { name: "Layered" });
      const glass = getSlot(buttonElement, "glass");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toContainElement(getSlot(buttonElement, "overlay"));
      expect(glass).not.toContainElement(getSlot(buttonElement, "label"));
      expect(glass).not.toContainElement(
        getSlot(buttonElement, "leading-icon"),
      );
      expect(
        getSlot(buttonElement, "label").closest('[aria-hidden="true"]'),
      ).toBeNull();
    });
  });

  describe("base-ui props", () => {
    it("resolves a className function with the button state", () => {
      const { rerender } = render(
        <Button
          label="Stateful"
          className={(state) =>
            state.disabled ? "state-disabled" : "state-enabled"
          }
        />,
      );

      expect(
        screen.getByRole("button", { name: "Stateful" }),
      ).toHaveClass("state-enabled");

      rerender(
        <Button
          label="Stateful"
          disabled
          className={(state) =>
            state.disabled ? "state-disabled" : "state-enabled"
          }
        />,
      );

      const buttonElement = screen.getByRole("button", { name: "Stateful" });

      expect(buttonElement).toHaveClass("state-disabled");
      expect(buttonElement).not.toHaveClass("state-enabled");
    });

    it("merges ui.root into a className function", () => {
      render(
        <Button
          label="Merged"
          className={() => "from-callback"}
          ui={{ root: "slot-root" }}
        />,
      );

      expect(screen.getByRole("button", { name: "Merged" })).toHaveClass(
        "from-callback",
        "slot-root",
      );
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Button label="Styled" style={{ opacity: 0.5 }} />
      );

      expect(element).toBeTruthy();
    });

    it("renders a custom element through render and nativeButton", () => {
      render(
        <Button
          nativeButton={false}
          render={<a href="/docs" />}
          label="Docs"
        />,
      );

      const link = screen.getByRole("button", { name: "Docs" });

      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/docs");
      expect(getSlot(link, "glass")).toHaveAttribute("aria-hidden", "true");
    });

    it("forwards refs to the rendered root", () => {
      const ref = createRef<HTMLElement>();

      render(<Button ref={ref} label="Ref" />);

      expect(ref.current).toBe(screen.getByRole("button", { name: "Ref" }));
    });

    it("keeps disabled buttons focusable with focusableWhenDisabled", () => {
      render(<Button label="Focusable" disabled focusableWhenDisabled />);

      const buttonElement = screen.getByRole("button", { name: "Focusable" });

      expect(buttonElement).toHaveAttribute("aria-disabled", "true");
      expect(buttonElement).not.toBeDisabled();
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
