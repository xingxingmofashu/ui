import { render, screen } from "@testing-library/react";
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
      expect(getSlot(switchElement, "thumb").tagName).toBe("SPAN");
      expect(getSlot(switchElement, "thumb")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(getSlot(root, "base")).toContainElement(
        getSlot(root, "thumb"),
      );
    });

    it("does not render the legacy liquid glass layers", () => {
      render(<Switch aria-label="Notifications" />);

      const switchElement = screen.getByRole("switch", {
        name: "Notifications",
      });

      expect(switchElement.querySelector("svg")).toBeNull();
      expect(switchElement.querySelector("filter")).toBeNull();
      expect(switchElement.querySelector("[data-layer]")).toBeNull();
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

    it("applies ui classes to internal slots", () => {
      render(
        <Switch
          label="Wi-Fi"
          description="Wireless"
          className="custom-root"
          ui={{
            root: "ui-root",
            container: "ui-container",
            base: "ui-base",
            thumb: "ui-thumb",
            wrapper: "ui-wrapper",
            label: "ui-label",
            description: "ui-description",
          }}
        />,
      );

      const switchElement = screen.getByRole("switch", { name: "Wi-Fi" });
      const root = getRoot(switchElement);

      expect(root).toHaveClass("ui-root", "custom-root");
      expect(getSlot(root, "container")).toHaveClass("ui-container");
      expect(getSlot(root, "base")).toHaveClass("ui-base");
      expect(getSlot(root, "thumb")).toHaveClass("ui-thumb");
      expect(getSlot(root, "wrapper")).toHaveClass("ui-wrapper");
      expect(getSlot(root, "label")).toHaveClass("ui-label");
      expect(getSlot(root, "description")).toHaveClass("ui-description");
    });

    it("forwards inline styles to the root and rejects theme internals", () => {
      render(<Switch aria-label="Styled" style={{ width: 120 }} />);

      expect(
        getRoot(screen.getByRole("switch", { name: "Styled" })),
      ).toHaveStyle({ width: "120px" });

      const invalidElement = (
        <>
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

    it("keeps reduced motion on the track and thumb", () => {
      const styles = theme();

      expect(styles.base()).toContain("motion-reduce:transition-none");
      expect(styles.thumb()).toContain("motion-reduce:transition-none");
    });

    it("applies the default md size and supports every size", () => {
      const { rerender } = render(<Switch aria-label="Sized" />);

      const switchElement = screen.getByRole("switch", { name: "Sized" });

      expect(getRoot(switchElement)).toHaveClass("[--ui-switch-width:64px]");
      expect(getRoot(switchElement)).toHaveClass("[--ui-switch-height:32px]");
      expect(getRoot(switchElement)).toHaveClass("[--ui-switch-inset:3px]");

      rerender(<Switch aria-label="Sized" size="xs" />);

      const resizedSwitch = screen.getByRole("switch", { name: "Sized" });

      expect(getRoot(resizedSwitch)).toHaveClass("[--ui-switch-width:48px]");
      expect(getRoot(resizedSwitch)).toHaveClass("[--ui-switch-height:24px]");
      expect(getRoot(resizedSwitch)).toHaveClass("[--ui-switch-inset:2px]");
    });
  });

  describe("theme recipe", () => {
    it("uses only the public slots and plain CSS layers", () => {
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
      expect(styles.root()).toContain("--ui-switch-thumb-size");
      expect(styles.root()).toContain("--ui-switch-travel");
      expect(styles.base()).toContain("h-[var(--ui-switch-height)]");
      expect(styles.base()).toContain("w-[var(--ui-switch-width)]");
      expect(styles.base()).toContain("bg-[var(--ui-switch-off)]");
      expect(styles.base()).toContain(
        "group-data-[checked]:bg-[var(--ui-switch-on)]",
      );
      expect(styles.base()).toContain(
        "transition-[background-color,box-shadow]",
      );
      expect(styles.label()).toContain(
        "leading-[var(--ui-switch-height)]",
      );
      expect(styles.thumb()).toContain(
        "h-[var(--ui-switch-thumb-size)]",
      );
      expect(styles.thumb()).toContain(
        "w-[var(--ui-switch-thumb-size)]",
      );
      expect(styles.thumb()).toContain(
        "group-data-[checked]:[translate:var(--ui-switch-travel)_-50%]",
      );
      expect(styles.thumb()).toContain("group-active:scale-95");
      expect(styles.root()).toContain("data-[disabled]:opacity-75");

      for (const slot of [styles.base(), styles.thumb()]) {
        expect(slot).not.toContain("data-layer");
        expect(slot).not.toContain("filter:");
        expect(slot).not.toContain("mask");
        expect(slot).not.toContain("goo");
      }
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
        ([size, [width, height, inset, text]]) => {
          const styles = theme({
            size: size as keyof typeof sizes,
          });

          expect(styles.root()).toContain(`[--ui-switch-width:${width}]`);
          expect(styles.root()).toContain(`[--ui-switch-height:${height}]`);
          expect(styles.root()).toContain(`[--ui-switch-inset:${inset}]`);
          expect(styles.wrapper()).toContain(text);
        },
      );

      expect(theme().root()).toContain("[--ui-switch-width:64px]");
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

    it("does not change when the change is canceled", async () => {
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
      expect(switchElement).toHaveAttribute("aria-checked", "false");
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
