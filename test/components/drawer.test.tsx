import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Drawer } from "../../src/components/drawer";
import theme from "../../src/theme/drawer";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Drawer slot "${slot}" was not rendered.`);
  }

  return node;
}

function renderDrawer({
  title = "Workspace settings",
  description = "Changes apply to everyone on the team.",
  ...props
}: Partial<ComponentProps<typeof Drawer>> = {}) {
  return render(
    <Drawer
      defaultOpen
      title={title}
      description={description}
      {...props}
    />,
  );
}

function findDrawer() {
  return screen.findByRole("dialog");
}

describe("Drawer", () => {
  describe("structure", () => {
    it("renders the glass popup and its parts", async () => {
      renderDrawer();

      const drawer = await findDrawer();
      const backdrop = getSlot(document.body, "backdrop");
      const viewport = getSlot(document.body, "viewport");
      const title = getSlot(drawer, "title");
      const description = getSlot(drawer, "description");
      const glass = getSlot(drawer, "glass");
      const overlay = getSlot(drawer, "overlay");
      const content = getSlot(drawer, "content");

      expect(drawer).toHaveAttribute("data-slot", "popup");
      expect(drawer).toHaveAttribute("data-swipe-direction", "down");
      expect(drawer).toHaveAttribute("role", "dialog");
      expect(drawer).toHaveAttribute("aria-labelledby", title.id);
      expect(drawer).toHaveAttribute("aria-describedby", description.id);
      expect(title).toHaveTextContent("Workspace settings");
      expect(description).toHaveTextContent(
        "Changes apply to everyone on the team.",
      );
      expect(viewport).toContainElement(drawer);
      expect(backdrop).toHaveAttribute("data-slot", "backdrop");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
        "overflow-hidden",
        "rounded-[inherit]",
      );
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(content).toContainElement(title);
      expect(content).toContainElement(description);
    });

    it("renders extra content in the body", async () => {
      renderDrawer({
        children: <p>Your profile is visible to everyone.</p>,
      });

      const drawer = await findDrawer();
      const body = getSlot(drawer, "body");

      expect(body).toHaveTextContent("Your profile is visible to everyone.");
    });

    it("renders any number of custom footer buttons", async () => {
      renderDrawer({
        footer: (
          <>
            <button type="button">Back</button>
            <button type="button">Save draft</button>
            <button type="button">Publish</button>
          </>
        ),
      });

      const drawer = await findDrawer();
      const footer = getSlot(drawer, "footer");

      expect(footer).toContainElement(
        within(drawer).getByRole("button", { name: "Back" }),
      );
      expect(footer).toContainElement(
        within(drawer).getByRole("button", { name: "Save draft" }),
      );
      expect(footer).toContainElement(
        within(drawer).getByRole("button", { name: "Publish" }),
      );
    });

    it("does not render optional parts when none are provided", async () => {
      render(
        <Drawer
          defaultOpen
          title="Notifications"
          description={undefined}
        />,
      );

      const drawer = await findDrawer();

      expect(drawer.querySelector('[data-slot="description"]')).toBeNull();
      expect(drawer.querySelector('[data-slot="body"]')).toBeNull();
      expect(drawer.querySelector('[data-slot="footer"]')).toBeNull();
    });

    it.each(["down", "up", "left", "right"] as const)(
      "uses the %s direction",
      async (direction) => {
        renderDrawer({ direction });

        const drawer = await findDrawer();

        expect(drawer).toHaveAttribute("data-swipe-direction", direction);
      },
    );

  });

  describe("interaction", () => {
    it("closes when the backdrop is pressed", async () => {
      const user = userEvent.setup();

      renderDrawer();

      await findDrawer();
      const backdrop = getSlot(document.body, "backdrop");

      await user.click(backdrop);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();

      renderDrawer();

      await findDrawer();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Drawer
          open
          onOpenChange={onOpenChange}
          title="Publish changes?"
          footer={
            <button type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </button>
          }
        />,
      );

      const drawer = await findDrawer();

      await user.click(within(drawer).getByRole("button", { name: "Cancel" }));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
      expect(screen.getByRole("dialog")).toBe(drawer);
    });
  });

  describe("styling", () => {
    it("merges className into the popup only", async () => {
      renderDrawer({ className: "custom-popup" });

      const drawer = await findDrawer();

      expect(drawer).toHaveClass("custom-popup");
      expect(getSlot(drawer, "content")).not.toHaveClass("custom-popup");
      expect(getSlot(drawer, "glass")).not.toHaveClass("custom-popup");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Drawer does not accept a ui prop.
        <Drawer title="One" ui={{ popup: "custom-popup" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Drawer title="One" style={{ opacity: 0.5 }} />
      );

      expect(element).toBeTruthy();
    });

    it("uses direction instead of swipeDirection", () => {
      const element = (
        // @ts-expect-error Drawer exposes the Base UI direction as direction.
        <Drawer title="One" swipeDirection="left" />
      );

      expect(element).toBeTruthy();
    });
  });

  describe("theme recipe", () => {
    it("defines every slot", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "backdrop",
        "base",
        "body",
        "content",
        "description",
        "footer",
        "glass",
        "overlay",
        "popup",
        "title",
        "viewport",
      ]);
    });

    it("builds the down direction by default", () => {
      const styles = theme();

      expect(styles.backdrop()).toContain("bg-black/25");
      expect(styles.backdrop()).toContain(
        "[opacity:calc(1-var(--drawer-swipe-progress))]",
      );
      expect(styles.backdrop()).toContain(
        "data-[starting-style]:opacity-0",
      );
      expect(styles.backdrop()).toContain("data-[ending-style]:opacity-0");
      expect(styles.viewport()).toContain("items-end");
      expect(styles.popup()).toContain("max-h-[85dvh]");
      expect(styles.popup()).toContain("rounded-t-[1.75rem]");
      expect(styles.popup()).toContain("bg-ui-dialog-surface");
      expect(styles.popup()).toContain(
        "translateY(calc(var(--drawer-snap-point-offset)_+_var(--drawer-swipe-movement-y)))",
      );
      expect(styles.popup()).toContain(
        "data-[starting-style]:[transform:translateY(calc(100%_+_2px))]",
      );
      expect(styles.content()).toContain("overflow-y-auto");
      expect(styles.content()).toContain("pt-4");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("rounded-[inherit]");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.title()).toContain("font-semibold");
      expect(styles.description()).toContain("opacity-60");
      expect(styles.body()).toContain("opacity-75");
      expect(styles.footer()).toContain("justify-end");
    });

    it.each([
      ["up", "items-start", "rounded-b-[1.75rem]", "translateY(calc(-100%_-_2px))"],
      ["left", "justify-start", "rounded-r-[1.75rem]", "translateX(calc(-100%_-_2px))"],
      ["right", "justify-end", "rounded-l-[1.75rem]", "translateX(calc(100%_+_2px))"],
    ] as const)(
      "builds the %s drawer edge",
      (direction, viewportClass, radiusClass, transform) => {
        const styles = theme({ direction });

        expect(styles.viewport()).toContain(viewportClass);
        expect(styles.popup()).toContain(radiusClass);
        expect(styles.popup()).toContain(transform);
      },
    );

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.backdrop,
        styles.viewport,
        styles.popup,
        styles.glass,
        styles.overlay,
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
