import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "../../src/components/dialog";
import theme from "../../src/theme/dialog";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Dialog slot "${slot}" was not rendered.`);
  }

  return node;
}

function renderDialog({
  title = "Edit profile",
  description = "Update your public profile details.",
  ...props
}: Partial<ComponentProps<typeof Dialog>> = {}) {
  return render(
    <Dialog
      defaultOpen
      title={title}
      description={description}
      {...props}
    />,
  );
}

function findDialog() {
  return screen.findByRole("dialog");
}

describe("Dialog", () => {
  describe("structure", () => {
    it("renders the glass popup and its parts", async () => {
      renderDialog();

      const dialog = await findDialog();
      const backdrop = getSlot(document.body, "backdrop");
      const viewport = getSlot(document.body, "viewport");
      const title = getSlot(dialog, "title");
      const description = getSlot(dialog, "description");
      const glass = getSlot(dialog, "glass");
      const overlay = getSlot(dialog, "overlay");
      const content = getSlot(dialog, "content");

      expect(dialog).toHaveAttribute("data-slot", "popup");
      expect(dialog).toHaveAttribute("role", "dialog");
      expect(dialog).toHaveAttribute("aria-labelledby", title.id);
      expect(dialog).toHaveAttribute("aria-describedby", description.id);
      expect(title).toHaveTextContent("Edit profile");
      expect(description).toHaveTextContent("Update your public profile details.");
      expect(viewport).toContainElement(dialog);
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
      renderDialog({
        children: <p>Your profile is visible to everyone.</p>,
      });

      const dialog = await findDialog();
      const body = getSlot(dialog, "body");

      expect(body).toHaveTextContent("Your profile is visible to everyone.");
    });

    it("renders any number of custom footer buttons", async () => {
      renderDialog({
        footer: (
          <>
            <button type="button">Back</button>
            <button type="button">Save draft</button>
            <button type="button">Publish</button>
          </>
        ),
      });

      const dialog = await findDialog();
      const footer = getSlot(dialog, "footer");

      expect(footer).toContainElement(
        within(dialog).getByRole("button", { name: "Back" }),
      );
      expect(footer).toContainElement(
        within(dialog).getByRole("button", { name: "Save draft" }),
      );
      expect(footer).toContainElement(
        within(dialog).getByRole("button", { name: "Publish" }),
      );
    });

    it("does not render a footer when none is provided", async () => {
      renderDialog();

      const dialog = await findDialog();

      expect(dialog.querySelector('[data-slot="footer"]')).toBeNull();
    });
  });

  describe("interaction", () => {
    it("closes when the backdrop is pressed", async () => {
      const user = userEvent.setup();

      renderDialog();

      await findDialog();
      const backdrop = getSlot(document.body, "backdrop");

      await user.click(backdrop);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();

      renderDialog();

      await findDialog();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
      });
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Dialog
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

      const dialog = await findDialog();

      await user.click(within(dialog).getByRole("button", { name: "Cancel" }));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
      expect(screen.getByRole("dialog")).toBe(dialog);
    });
  });

  describe("styling", () => {
    it("merges className into the popup only", async () => {
      renderDialog({ className: "custom-popup" });

      const dialog = await findDialog();

      expect(dialog).toHaveClass("custom-popup");
      expect(getSlot(dialog, "content")).not.toHaveClass("custom-popup");
      expect(getSlot(dialog, "glass")).not.toHaveClass("custom-popup");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Dialog does not accept a ui prop.
        <Dialog title="One" ui={{ popup: "custom-popup" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Dialog title="One" style={{ opacity: 0.5 }} />
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

    it("builds the glass surface and enter animation", () => {
      const styles = theme();

      expect(styles.backdrop()).toContain("bg-black/25");
      expect(styles.backdrop()).toContain(
        "data-[starting-style]:opacity-0",
      );
      expect(styles.backdrop()).toContain("data-[ending-style]:opacity-0");
      expect(styles.viewport()).toContain("fixed inset-0");
      expect(styles.popup()).toContain("max-w-md");
      expect(styles.popup()).toContain("bg-ui-dialog-surface");
      expect(styles.popup()).toContain(
        "data-[starting-style]:scale-95",
      );
      expect(styles.popup()).toContain("data-[ending-style]:opacity-0");
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
