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
      render(<Button aria-label="Add item" icon={<svg />} />);

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
          <Button aria-labelledby="next-label" icon={<svg />} />
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
        <Button icon={<svg data-testid="fallback-icon" />} />,
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

      expect(buttonElement).toHaveClass("w-[16.25rem]", "max-w-full");
      expect(getSlot(buttonElement, "surface")).toHaveClass(
        "h-[clamp(3.65rem,12vw,4.6875rem)]",
      );
    });

    it.each([
      ["xs", "w-[9rem]", "h-11"],
      ["sm", "w-[11rem]", "h-[3.25rem]"],
      ["md", "w-[16.25rem]", "h-[clamp(3.65rem,12vw,4.6875rem)]"],
      ["lg", "w-[19rem]", "h-[5.25rem]"],
      ["xl", "w-[22rem]", "h-[5.75rem]"],
    ] as const)("applies the %s size", (size, width, height) => {
      render(<Button size={size} label={size} />);

      const buttonElement = screen.getByRole("button");

      expect(buttonElement).toHaveClass(width);
      expect(getSlot(buttonElement, "surface")).toHaveClass(height);
    });

    it("caps its width to the container instead of the viewport", () => {
      for (const size of sizes) {
        const styles = button({ size });

        expect(`${styles.base()} ${styles.surface()}`).not.toContain("100vw");
        expect(styles.base()).toContain("max-w-full");
        expect(styles.surface()).toContain("w-full");
      }
    });

    it("does not use a fixed label drop shadow", () => {
      for (const size of sizes) {
        expect(button({ size }).label()).not.toContain("drop-shadow");
      }
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
      expect(surface).not.toHaveClass("bg-[rgba(0,0,0,0.02)]");
      expect(getSlot(buttonElement, "label")).toHaveClass("slot-label");
      expect(getSlot(buttonElement, "leading-icon")).toHaveClass(
        "slot-leading-icon",
      );
      expect(getSlot(buttonElement, "trailing-icon")).toHaveClass(
        "slot-trailing-icon",
      );
      expect(getSlot(buttonElement, "overlay")).toHaveClass("slot-overlay");
    });

    it("accepts icon as an alias for leadingIcon", () => {
      render(<Button label="Alias" icon={<svg data-testid="alias-icon" />} />);

      const buttonElement = screen.getByRole("button", { name: "Alias" });

      expect(getSlot(buttonElement, "leading-icon")).toContainElement(
        screen.getByTestId("alias-icon"),
      );
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
