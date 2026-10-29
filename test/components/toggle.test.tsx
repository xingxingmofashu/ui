import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "../../src/components/toggle";
import theme from "../../src/theme/toggle";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Toggle slot "${slot}" was not rendered.`);
  }

  return node;
}

describe("Toggle", () => {
  describe("structure", () => {
    it("renders the glass shell, thumb, and label", () => {
      render(<Toggle label="Mute" />);

      const toggle = screen.getByRole("button", { name: "Mute" });
      const glass = getSlot(toggle, "glass");
      const overlay = getSlot(toggle, "overlay");
      const thumb = getSlot(toggle, "thumb");
      const content = getSlot(toggle, "content");
      const label = getSlot(toggle, "label");

      expect(toggle).toHaveAttribute("data-slot", "root");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(thumb).toHaveAttribute("aria-hidden", "true");
      expect(content).toContainElement(label);
      expect(label).toHaveTextContent("Mute");
      expect(toggle).not.toHaveClass("aspect-square");
    });

    it("renders an icon-only toggle", () => {
      render(
        <Toggle
          aria-label="Bold"
          icon={
            <svg data-testid="icon">
              <path d="M0 0h1v1H0z" />
            </svg>
          }
        />,
      );

      const toggle = screen.getByRole("button", { name: "Bold" });
      const icon = getSlot(toggle, "icon");

      expect(toggle).toHaveClass("aspect-square", "px-0");
      expect(toggle.querySelector('[data-slot="label"]')).toBeNull();
      expect(icon).toContainElement(screen.getByTestId("icon"));
    });

    it("forwards a ref to the rendered button", () => {
      const ref = createRef<HTMLButtonElement>();

      render(<Toggle ref={ref} label="Mute" />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("state", () => {
    it("toggles uncontrolled state", async () => {
      const user = userEvent.setup();

      render(<Toggle label="Mute" />);

      const toggle = screen.getByRole("button", { name: "Mute" });

      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.click(toggle);

      expect(toggle).toHaveAttribute("aria-pressed", "true");
      expect(toggle).toHaveAttribute("data-pressed");

      await user.click(toggle);

      expect(toggle).toHaveAttribute("aria-pressed", "false");
      expect(toggle).not.toHaveAttribute("data-pressed");
    });

    it("keeps controlled state controlled", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();

      render(
        <Toggle
          label="Mute"
          pressed={false}
          onPressedChange={onPressedChange}
        />,
      );

      const toggle = screen.getByRole("button", { name: "Mute" });

      await user.click(toggle);

      expect(onPressedChange).toHaveBeenCalledTimes(1);
      expect(onPressedChange.mock.calls[0]?.[0]).toBe(true);
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("ignores clicks when disabled", async () => {
      const user = userEvent.setup();

      render(<Toggle label="Mute" disabled />);

      const toggle = screen.getByRole("button", { name: "Mute" });

      expect(toggle).toBeDisabled();
      expect(toggle).toHaveAttribute("data-disabled");

      await user.click(toggle);

      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("theme", () => {
    it("builds every size from shared variables", () => {
      for (const size of ["xs", "sm", "md", "lg", "xl"] as const) {
        const styles = theme({ size });

        expect(styles.root()).toContain("--ui-toggle-height:");
        expect(styles.root()).toContain("--ui-toggle-px:");
        expect(styles.root()).toContain("--ui-toggle-font-size:");
        expect(styles.root()).toContain("--ui-toggle-icon-size:");
      }
    });

    it("uses the pressed thumb state", () => {
      const styles = theme();

      expect(styles.root()).toContain("group/toggle");
      expect(styles.thumb()).toContain(
        "group-data-[pressed]/toggle:opacity-100",
      );
      expect(styles.thumb()).toContain(
        "group-data-[pressed]/toggle:scale-100",
      );
      expect(styles.thumb()).toContain("ring-[var(--ui-toggle-thumb-rim)]");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.rim()).toContain("ui-glass-rim");
    });

    it("removes horizontal padding for icon-only toggles", () => {
      const styles = theme({ iconOnly: true });

      expect(styles.root()).toContain("aspect-square");
      expect(styles.root()).toContain("px-0");
    });
  });
});
