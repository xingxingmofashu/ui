import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { AlertDialog } from "../../src/components/alert-dialog";
import theme from "../../src/theme/alert-dialog";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`AlertDialog slot "${slot}" was not rendered.`);
  }

  return node;
}

function renderDialog({
  title = "Delete project?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  ...props
}: Partial<ComponentProps<typeof AlertDialog>> = {}) {
  return render(
    <AlertDialog
      defaultOpen
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      {...props}
    />,
  );
}

function findDialog() {
  return screen.findByRole("alertdialog");
}

describe("AlertDialog", () => {
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
      const footer = getSlot(dialog, "footer");

      expect(dialog).toHaveAttribute("data-slot", "popup");
      expect(dialog).toHaveAttribute("role", "alertdialog");
      expect(dialog).toHaveAttribute("aria-labelledby", title.id);
      expect(dialog).toHaveAttribute("aria-describedby", description.id);
      expect(title).toHaveTextContent("Delete project?");
      expect(description).toHaveTextContent("This action cannot be undone.");
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
      expect(content).toContainElement(footer);
      expect(footer).toContainElement(
        within(dialog).getByRole("button", { name: "Cancel" }),
      );
      expect(footer).toContainElement(
        within(dialog).getByRole("button", { name: "Delete" }),
      );
    });

    it("renders the default action labels", async () => {
      render(
        <AlertDialog defaultOpen title="Delete project?" />,
      );

      const dialog = await findDialog();

      expect(
        within(dialog).getByRole("button", { name: "Cancel" }),
      ).toBeInTheDocument();
      expect(
        within(dialog).getByRole("button", { name: "Confirm" }),
      ).toBeInTheDocument();
    });

    it("renders extra content in the body", async () => {
      renderDialog({
        children: <p>Members will lose access immediately.</p>,
      });

      const dialog = await findDialog();
      const body = getSlot(dialog, "body");

      expect(body).toHaveTextContent("Members will lose access immediately.");
    });
  });

  describe("interaction", () => {
    it("calls onConfirm and closes", async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();

      renderDialog({ onConfirm });

      const dialog = await findDialog();

      await user.click(within(dialog).getByRole("button", { name: "Delete" }));

      expect(onConfirm).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(screen.queryByRole("alertdialog")).toBeNull();
      });
    });

    it("calls onCancel and closes", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();

      renderDialog({ onCancel });

      const dialog = await findDialog();

      await user.click(within(dialog).getByRole("button", { name: "Cancel" }));

      expect(onCancel).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(screen.queryByRole("alertdialog")).toBeNull();
      });
    });

    it("stays open when the backdrop is pressed", async () => {
      const user = userEvent.setup();

      renderDialog();

      const dialog = await findDialog();
      const backdrop = getSlot(document.body, "backdrop");

      await user.click(backdrop);

      expect(screen.getByRole("alertdialog")).toBe(dialog);
    });

    it("supports controlled open state", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <AlertDialog
          open
          onOpenChange={onOpenChange}
          title="Publish changes?"
        />,
      );

      const dialog = await findDialog();

      await user.click(within(dialog).getByRole("button", { name: "Cancel" }));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
      expect(screen.getByRole("alertdialog")).toBe(dialog);
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
        // @ts-expect-error AlertDialog does not accept a ui prop.
        <AlertDialog title="One" ui={{ popup: "custom-popup" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <AlertDialog title="One" style={{ opacity: 0.5 }} />
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
