import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Popover } from "../../src/components/popover";
import theme from "../../src/theme/popover";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Popover slot "${slot}" was not rendered.`);
  }

  return node;
}

function renderPopover({
  title = "Workspace settings",
  description = "Changes apply to everyone on the team.",
  trigger = <button type="button">Open settings</button>,
  ...props
}: Partial<ComponentProps<typeof Popover>> = {}) {
  return render(
    <Popover
      defaultOpen
      title={title}
      description={description}
      trigger={trigger}
      {...props}
    />,
  );
}

function findPopover() {
  return screen.findByRole("dialog");
}

describe("Popover", () => {
  describe("structure", () => {
    it("renders the glass popup and its parts", async () => {
      renderPopover();

      const popover = await findPopover();
      const trigger = screen.getByRole("button", { name: "Open settings" });
      const positioner = getSlot(document.body, "positioner");
      const title = getSlot(popover, "title");
      const description = getSlot(popover, "description");
      const glass = getSlot(popover, "glass");
      const overlay = getSlot(popover, "overlay");
      const arrow = getSlot(popover, "arrow");
      const content = getSlot(popover, "content");

      expect(popover).toHaveAttribute("data-slot", "popup");
      expect(popover).toHaveAttribute("role", "dialog");
      expect(popover).toHaveAttribute("aria-labelledby", title.id);
      expect(popover).toHaveAttribute("aria-describedby", description.id);
      expect(title).toHaveTextContent("Workspace settings");
      expect(description).toHaveTextContent(
        "Changes apply to everyone on the team.",
      );
      expect(positioner).toContainElement(popover);
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(arrow).toHaveAttribute("aria-hidden", "true");
      expect(arrow).toHaveClass(
        "rotate-45",
        "bg-ui-dialog-surface",
        "border-ui-glass-border",
        "data-[side=bottom]:border-t",
        "data-[side=bottom]:border-l",
      );
      expect(content).toContainElement(title);
      expect(content).toContainElement(description);
    });

    it("renders extra content in the body", async () => {
      renderPopover({
        children: <p>Your profile is visible to everyone.</p>,
      });

      const popover = await findPopover();
      const body = getSlot(popover, "body");

      expect(body).toHaveTextContent("Your profile is visible to everyone.");
    });

    it("renders any number of custom footer buttons", async () => {
      renderPopover({
        footer: (
          <>
            <button type="button">Back</button>
            <button type="button">Save draft</button>
            <button type="button">Publish</button>
          </>
        ),
      });

      const popover = await findPopover();
      const footer = getSlot(popover, "footer");

      expect(footer).toContainElement(
        within(popover).getByRole("button", { name: "Back" }),
      );
      expect(footer).toContainElement(
        within(popover).getByRole("button", { name: "Save draft" }),
      );
      expect(footer).toContainElement(
        within(popover).getByRole("button", { name: "Publish" }),
      );
    });

    it("does not render optional parts when none are provided", async () => {
      render(
        <Popover
          defaultOpen
          trigger={<button type="button">Open settings</button>}
          title="Workspace settings"
        />,
      );

      const popover = await findPopover();

      expect(popover.querySelector('[data-slot="description"]')).toBeNull();
      expect(popover.querySelector('[data-slot="body"]')).toBeNull();
      expect(popover.querySelector('[data-slot="footer"]')).toBeNull();
    });

    it("hides the arrow when arrow is false", async () => {
      renderPopover({ arrow: false });

      const popover = await findPopover();

      expect(popover.querySelector('[data-slot="arrow"]')).toBeNull();
    });

    it("renders the provided trigger element", async () => {
      renderPopover({
        trigger: (
          <button type="button" data-testid="trigger">
            More actions
          </button>
        ),
      });

      await findPopover();

      const trigger = screen.getByTestId("trigger");

      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveTextContent("More actions");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  describe("interaction", () => {
    it("opens and closes from its trigger", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          title="Release notes"
        />,
      );

      expect(screen.queryByRole("dialog")).toBeNull();

      const trigger = screen.getByRole("button", { name: "Open" });

      await user.click(trigger);

      const popover = await findPopover();

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(popover).toHaveTextContent("Release notes");

      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();

      renderPopover();

      await findPopover();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      renderPopover({
        open: true,
        onOpenChange,
        footer: (
          <button type="button" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
        ),
      });

      const popover = await findPopover();

      await user.click(within(popover).getByRole("button", { name: "Cancel" }));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
      expect(screen.getByRole("dialog")).toBe(popover);
    });

    it("passes placement props to the positioner", async () => {
      renderPopover({ side: "bottom", align: "end" });

      await findPopover();

      const positioner = getSlot(document.body, "positioner");

      expect(positioner).toHaveAttribute("data-side", "bottom");
      expect(positioner).toHaveAttribute("data-align", "end");
    });
  });

  describe("styling", () => {
    it("merges className into the popup only", async () => {
      renderPopover({ className: "custom-popup" });

      const popover = await findPopover();

      expect(popover).toHaveClass("custom-popup");
      expect(getSlot(popover, "content")).not.toHaveClass("custom-popup");
      expect(getSlot(popover, "glass")).not.toHaveClass("custom-popup");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Popover does not accept a ui prop.
        <Popover title="One" trigger={<button type="button">Open</button>} ui={{ popup: "custom-popup" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Popover title="One" trigger={<button type="button">Open</button>} style={{ opacity: 0.5 }} />
      );

      expect(element).toBeTruthy();
    });
  });

  describe("theme recipe", () => {
    it("defines every slot", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "arrow",
        "base",
        "body",
        "content",
        "description",
        "footer",
        "glass",
        "overlay",
        "popup",
        "positioner",
        "title",
      ]);
    });

    it("builds the glass surface and enter animation", () => {
      const styles = theme();

      expect(styles.positioner()).toContain("z-50");
      expect(styles.popup()).toContain("w-80");
      expect(styles.popup()).toContain("bg-ui-dialog-surface");
      expect(styles.popup()).toContain("rounded-[1.5rem]");
      expect(styles.popup()).toContain("data-[starting-style]:scale-95");
      expect(styles.popup()).toContain("data-[starting-style]:opacity-0");
      expect(styles.popup()).toContain("data-[ending-style]:opacity-0");
      expect(styles.popup()).toContain(
        "data-[side=bottom]:data-[starting-style]:-translate-y-1",
      );
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.arrow()).toContain("size-3");
      expect(styles.arrow()).toContain("rotate-45");
      expect(styles.arrow()).toContain("bg-ui-dialog-surface");
      expect(styles.arrow()).toContain("data-[side=bottom]:-top-[6px]");
      expect(styles.arrow()).toContain("data-[side=top]:-bottom-[6px]");
      expect(styles.arrow()).toContain("data-[side=left]:border-r");
      expect(styles.arrow()).toContain("data-[side=right]:border-b");
      expect(styles.title()).toContain("font-semibold");
      expect(styles.description()).toContain("opacity-60");
      expect(styles.body()).toContain("opacity-75");
      expect(styles.footer()).toContain("justify-end");
    });

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.positioner,
        styles.popup,
        styles.glass,
        styles.overlay,
        styles.arrow,
        styles.content,
        styles.title,
        styles.description,
        styles.body,
        styles.footer,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
