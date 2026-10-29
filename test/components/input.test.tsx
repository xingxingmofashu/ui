import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "../../src/components/input";
import theme from "../../src/theme/input";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Input slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: Element, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function getRoot(inputElement: HTMLElement) {
  const root = inputElement.closest<HTMLElement>('[data-slot="root"]');

  if (!root) {
    throw new Error("Input root was not rendered.");
  }

  return root;
}

describe("Input", () => {
  describe("accessible names", () => {
    it("associates a visible label with the input", () => {
      render(<Input label="Email" />);

      expect(
        screen.getByRole("textbox", { name: "Email" }),
      ).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Input aria-label="Search" />);

      expect(
        screen.getByRole("textbox", { name: "Search" }),
      ).toBeInTheDocument();
    });

    it("supports aria-labelledby for external labels", () => {
      render(
        <>
          <span id="email-label">Email</span>
          <Input aria-labelledby="email-label" />
        </>,
      );

      expect(
        screen.getByRole("textbox", { name: "Email" }),
      ).toBeInTheDocument();
    });

    it("does not wire the visible description automatically", () => {
      render(
        <Input
          label="Email"
          description="We only use this for account notices."
        />,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      expect(input).not.toHaveAttribute("aria-describedby");
      expect(getSlot(getRoot(input), "description")).not.toHaveAttribute("id");
    });

    it("forwards aria-describedby unchanged", () => {
      render(
        <>
          <span id="hint">Enter your work email.</span>
          <Input
            label="Email"
            description="We only use this for account notices."
            aria-describedby="hint"
          />
        </>,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      expect(input).toHaveAttribute("aria-describedby", "hint");
      expect(input).toHaveAccessibleDescription("Enter your work email.");
    });
  });

  describe("structure", () => {
    it("renders the input, label, icons, and description slots", () => {
      render(
        <Input
          label="Search"
          description="Search the documentation."
          leadingIcon={<svg data-testid="leading-icon" />}
          trailingIcon={<svg data-testid="trailing-icon" />}
        />,
      );

      const input = screen.getByRole("textbox", { name: "Search" });
      const root = getRoot(input);

      expect(input.tagName).toBe("INPUT");
      expect(input).toHaveAttribute("data-slot", "input");
      expect(getSlot(root, "label").tagName).toBe("LABEL");
      expect(getSlot(root, "control").tagName).toBe("SPAN");
      expect(getSlot(root, "glass")).toHaveAttribute("aria-hidden", "true");
      expect(getSlot(root, "overlay")).toHaveAttribute("aria-hidden", "true");
      expect(getSlot(root, "leading-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(getSlot(root, "trailing-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(getSlot(root, "description").tagName).toBe("SPAN");
    });

    it("does not render empty optional slots", () => {
      render(<Input aria-label="Search" />);

      const input = screen.getByRole("textbox", { name: "Search" });
      const root = getRoot(input);

      expect(querySlot(root, "label")).toBeNull();
      expect(querySlot(root, "description")).toBeNull();
      expect(querySlot(root, "leading-icon")).toBeNull();
      expect(querySlot(root, "trailing-icon")).toBeNull();
      expect(input).not.toHaveAttribute("aria-describedby");
    });

    it("merges className into the root only", () => {
      render(<Input label="Search" className="custom-root" />);

      const input = screen.getByRole("textbox", { name: "Search" });
      const root = getRoot(input);

      expect(root).toHaveClass("custom-root");
      expect(getSlot(root, "control")).not.toHaveClass("custom-root");
      expect(input).not.toHaveClass("custom-root");
      expect(getSlot(root, "label")).not.toHaveClass("custom-root");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Input does not accept a ui prop.
        <Input aria-label="Search" ui={{ input: "h-10" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Input aria-label="Search" style={{ width: 200 }} />
      );

      expect(element).toBeTruthy();
    });

  });

  describe("native behavior", () => {
    it("forwards native input props and the ref", () => {
      const ref = createRef<HTMLElement>();

      render(
        <Input
          ref={ref}
          aria-label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("placeholder", "you@example.com");
      expect(input).toBeRequired();
      expect(ref.current).toBe(input);
    });

    it("supports disabled and read-only states", () => {
      const { rerender } = render(
        <Input label="Email" disabled defaultValue="you@example.com" />,
      );

      const disabledInput = screen.getByRole("textbox", { name: "Email" });

      expect(disabledInput).toBeDisabled();
      expect(getRoot(disabledInput)).toHaveAttribute("data-disabled");

      rerender(<Input label="Email" readOnly defaultValue="you@example.com" />);

      const readOnlyInput = screen.getByRole("textbox", { name: "Email" });

      expect(readOnlyInput).not.toBeDisabled();
      expect(readOnlyInput).toHaveAttribute("readonly");
      expect(getRoot(readOnlyInput)).not.toHaveAttribute("data-disabled");
    });

    it("calls onValueChange when the value changes", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Input
          label="Email"
          defaultValue=""
          onValueChange={onValueChange}
        />,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      await user.type(input, "hi");

      expect(onValueChange).toHaveBeenCalled();
      expect(onValueChange.mock.calls.at(-1)?.[0]).toBe("hi");
    });

    it("supports controlled values", () => {
      const onChange = vi.fn();

      render(
        <Input
          label="Email"
          value="hello"
          onValueChange={onChange}
        />,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      fireEvent.change(input, { target: { value: "hello!" } });

      expect(onChange).toHaveBeenCalledWith(
        "hello!",
        expect.objectContaining({ reason: "none" }),
      );
      expect(input).toHaveValue("hello");
    });
  });

  describe("sizes", () => {
    it("defaults to md", () => {
      const styles = theme();

      expect(styles.root()).toContain("text-sm");
      expect(styles.control()).toContain("[--ui-input-height:36px]");
      expect(styles.leadingIcon()).toContain("[&_svg]:size-5");
      expect(styles.trailingIcon()).toContain("[&_svg]:size-5");
    });

    it.each([
      ["xs", "text-xs", "[--ui-input-height:28px]", "[&_svg]:size-4"],
      ["sm", "text-xs", "[--ui-input-height:32px]", "[&_svg]:size-4"],
      ["md", "text-sm", "[--ui-input-height:36px]", "[&_svg]:size-5"],
      ["lg", "text-sm", "[--ui-input-height:40px]", "[&_svg]:size-5"],
      ["xl", "text-base", "[--ui-input-height:44px]", "[&_svg]:size-6"],
    ] as const)(
      "applies the %s size",
      (size, textClass, heightClass, iconClass) => {
        const styles = theme({ size });

        expect(styles.root()).toContain(textClass);
        expect(styles.control()).toContain(heightClass);
        expect(styles.leadingIcon()).toContain(iconClass);
        expect(styles.trailingIcon()).toContain(iconClass);
      },
    );
  });

  describe("theme recipe", () => {
    it("exposes the public slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "control",
        "description",
        "glass",
        "input",
        "label",
        "leadingIcon",
        "overlay",
        "root",
        "trailingIcon",
      ]);
    });

    it("draws the glass surface behind the input", () => {
      const styles = theme();

      expect(styles.root()).toContain("group");
      expect(styles.control()).toContain("relative");
      expect(styles.control()).toContain("group-focus-within:outline-2");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("absolute inset-0");
      expect(styles.input()).toContain("bg-transparent");
      expect(styles.input()).toContain("relative z-[1]");
      expect(styles.leadingIcon()).toEqual(styles.trailingIcon());
    });
  });
});
