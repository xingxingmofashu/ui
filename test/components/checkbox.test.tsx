import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "../../src/components/checkbox";
import theme from "../../src/theme/checkbox";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Checkbox slot "${slot}" was not rendered.`);
  }

  return node;
}

function getCheckbox() {
  return screen.getByRole("checkbox");
}

describe("Checkbox", () => {
  describe("accessible names", () => {
    it("supports aria-label", () => {
      render(<Checkbox aria-label="Accept terms" />);

      expect(
        screen.getByRole("checkbox", { name: "Accept terms" }),
      ).toBeInTheDocument();
    });

    it("supports aria-labelledby for external labels", () => {
      render(
        <>
          <span id="terms-label">Accept terms</span>
          <Checkbox aria-labelledby="terms-label" />
        </>,
      );

      expect(
        screen.getByRole("checkbox", { name: "Accept terms" }),
      ).toBeInTheDocument();
    });

    it("uses the visible label as its name and links the description", () => {
      render(
        <Checkbox
          label="Product updates"
          description="Receive an email when a release ships."
        />,
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "Product updates",
        description: "Receive an email when a release ships.",
      });
      const label = getSlot(checkbox, "label");
      const description = getSlot(checkbox, "description");

      expect(checkbox).toHaveAttribute("aria-labelledby", label.id);
      expect(checkbox).toHaveAttribute("aria-describedby", description.id);
    });

    it("merges external aria-labelledby and aria-describedby", () => {
      render(
        <>
          <span id="terms-label">Terms</span>
          <span id="terms-hint">Read carefully.</span>
          <Checkbox
            label="Accept terms"
            description="You can change this later."
            aria-labelledby="terms-label"
            aria-describedby="terms-hint"
          />
        </>,
      );

      const checkbox = screen.getByRole("checkbox", { name: "Terms" });
      const description = getSlot(checkbox, "description");

      expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        `terms-hint ${description.id}`,
      );
      expect(checkbox).toHaveAccessibleDescription(
        "Read carefully. You can change this later.",
      );
    });

    it("keeps aria-label and still links the description", () => {
      render(
        <Checkbox
          aria-label="Select all"
          description="Applies to every row."
        />,
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "Select all",
        description: "Applies to every row.",
      });

      expect(checkbox).not.toHaveAttribute("aria-labelledby");
      expect(checkbox).toHaveAttribute("aria-describedby");
    });

    it("uses a description-only control as its name", () => {
      render(<Checkbox description="Select all" />);

      const checkbox = screen.getByRole("checkbox", { name: "Select all" });

      expect(checkbox).not.toHaveAttribute("aria-describedby");
    });

    it("toggles when the visible label is clicked", async () => {
      const user = userEvent.setup();

      render(<Checkbox label="Accept terms" />);

      await user.click(screen.getByText("Accept terms"));

      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });

  describe("structure", () => {
    it("renders the box, glass layers, and indicator", () => {
      render(<Checkbox aria-label="Accept terms" />);

      const checkbox = getCheckbox();
      const box = getSlot(checkbox, "box");
      const glass = getSlot(box, "glass");
      const overlay = getSlot(glass, "overlay");
      const fill = getSlot(box, "fill");
      const indicator = getSlot(box, "indicator");
      const icon = getSlot(indicator, "indicator-icon");

      expect(checkbox.tagName).toBe("SPAN");
      expect(checkbox).toHaveAttribute("data-slot", "root");
      expect(box.tagName).toBe("SPAN");
      expect(fill).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(icon.querySelector("svg")).toHaveAttribute("data-icon", "check");
      expect(
        document.querySelector('input[type="checkbox"]'),
      ).not.toBeNull();
    });

    it("renders the label and description", () => {
      render(
        <Checkbox
          label="Product updates"
          description="Receive an email when a release ships."
        />,
      );

      const checkbox = getCheckbox();
      const wrapper = getSlot(checkbox, "wrapper");

      expect(getSlot(wrapper, "label")).toHaveTextContent("Product updates");
      expect(getSlot(wrapper, "description")).toHaveTextContent(
        "Receive an email when a release ships.",
      );
    });

    it("keeps the indicator mounted when unchecked", () => {
      render(<Checkbox aria-label="Accept terms" />);

      const checkbox = getCheckbox();
      const indicator = getSlot(checkbox, "indicator");

      expect(indicator).toHaveAttribute("data-unchecked");
      expect(indicator).toHaveClass("opacity-0", "scale-50");
    });
  });

  describe("states", () => {
    it("toggles when clicked", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Checkbox
          aria-label="Accept terms"
          onCheckedChange={onCheckedChange}
        />,
      );

      const checkbox = getCheckbox();

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);

      expect(onCheckedChange).toHaveBeenCalledTimes(1);
      expect(onCheckedChange.mock.calls[0]?.[0]).toBe(true);
      expect(checkbox).toHaveAttribute("aria-checked", "true");
      expect(checkbox).toHaveAttribute("data-checked");
    });

    it("supports defaultChecked", () => {
      render(<Checkbox aria-label="Accept terms" defaultChecked />);

      const checkbox = getCheckbox();

      expect(checkbox).toHaveAttribute("aria-checked", "true");
      expect(checkbox).toHaveAttribute("data-checked");
    });

    it("supports controlled checked state", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Checkbox
          aria-label="Accept terms"
          checked
          onCheckedChange={onCheckedChange}
        />,
      );

      const checkbox = getCheckbox();

      await user.click(checkbox);

      expect(onCheckedChange).toHaveBeenCalledTimes(1);
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("renders the mixed state", () => {
      render(<Checkbox aria-label="Select all" indeterminate />);

      const checkbox = getCheckbox();
      const indicator = getSlot(checkbox, "indicator");
      const icon = getSlot(indicator, "indicator-icon");

      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
      expect(checkbox).toHaveAttribute("data-indeterminate");
      expect(icon.querySelector("svg")).toHaveAttribute("data-icon", "dash");
    });

    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Checkbox
          aria-label="Accept terms"
          disabled
          onCheckedChange={onCheckedChange}
        />,
      );

      const checkbox = getCheckbox();

      expect(checkbox).toHaveAttribute("data-disabled");

      await user.click(checkbox);

      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("does not toggle when read-only", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Checkbox
          aria-label="Accept terms"
          readOnly
          onCheckedChange={onCheckedChange}
        />,
      );

      const checkbox = getCheckbox();

      expect(checkbox).toHaveAttribute("data-readonly");

      await user.click(checkbox);

      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("merges className into the root only", () => {
      render(<Checkbox aria-label="Accept terms" className="custom-root" />);

      const checkbox = getCheckbox();

      expect(checkbox).toHaveClass("custom-root");
      expect(getSlot(checkbox, "box")).not.toHaveClass("custom-root");
    });

    it("defaults to the md size", () => {
      render(<Checkbox aria-label="Accept terms" />);

      expect(getCheckbox()).toHaveClass("[--ui-checkbox-size:20px]");
    });

    it("applies size variables", () => {
      const sizes = [
        ["xs", "16px"],
        ["sm", "18px"],
        ["md", "20px"],
        ["lg", "24px"],
        ["xl", "28px"],
      ] as const;

      sizes.forEach(([size, value]) => {
        const { unmount } = render(
          <Checkbox aria-label={`${size} checkbox`} size={size} />,
        );

        expect(screen.getByRole("checkbox")).toHaveClass(
          `[--ui-checkbox-size:${value}]`,
        );

        unmount();
      });
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Checkbox does not accept a ui prop.
        <Checkbox aria-label="Accept terms" ui={{ root: "custom-root" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Checkbox aria-label="Accept terms" style={{ opacity: 0.5 }} />
      );

      expect(element).toBeTruthy();
    });
  });

  describe("theme recipe", () => {
    it("defines every slot", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "box",
        "description",
        "fill",
        "glass",
        "indicator",
        "indicatorIcon",
        "label",
        "overlay",
        "root",
        "wrapper",
      ]);
    });

    it("builds the glass surface and checked animation", () => {
      const styles = theme();

      expect(styles.root()).toContain("group relative");
      expect(styles.root()).toContain("cursor-pointer");
      expect(styles.root()).toContain("[--ui-checkbox-size:20px]");
      expect(styles.root()).toContain("[--ui-checkbox-radius:6px]");
      expect(styles.box()).toContain("rounded-[var(--ui-checkbox-radius)]");
      expect(styles.box()).toContain("--ui-shadow-glass:var(--ui-checkbox-shadow)");
      expect(styles.box()).toContain("[--ui-glass-tone:brightness(1)]");
      expect(styles.box()).toContain("[--ui-glass-contrast:1.1]");
      expect(styles.fill()).toContain("bg-ui-ink");
      expect(styles.fill()).toContain("linear-gradient(145deg");
      expect(styles.fill()).toContain("scale-0");
      expect(styles.fill()).toContain("group-data-[checked]:scale-100");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.indicator()).toContain(
        "text-[var(--ui-checkbox-mark)]",
      );
      expect(styles.indicator()).toContain(
        "group-data-[indeterminate]:opacity-100",
      );
      expect(styles.wrapper()).toContain("ms-[var(--ui-checkbox-gap)]");
      expect(styles.description()).toContain("opacity-60");
    });

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.box,
        styles.fill,
        styles.glass,
        styles.overlay,
        styles.indicator,
        styles.indicatorIcon,
        styles.wrapper,
        styles.label,
        styles.description,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
