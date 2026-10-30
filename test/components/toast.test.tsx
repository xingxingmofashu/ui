import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Toast, ToastProvider } from "../../src/components/toast";
import { createToastManager } from "../../src/composables/create-toast-manager";
import { useToast } from "../../src/composables/use-toast";
import theme from "../../src/theme/toast";

type AddOptions = Parameters<ReturnType<typeof useToast>["add"]>[0];
type ToastComponentProps = ComponentProps<typeof Toast>;

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Toast slot "${slot}" was not rendered.`);
  }

  return node;
}

function Trigger({
  options,
  label = "Notify",
}: {
  options: AddOptions;
  label?: string;
}) {
  const toast = useToast();

  return (
    <button type="button" onClick={() => toast.add(options)}>
      {label}
    </button>
  );
}

function renderToast(
  options: AddOptions,
  toastProps: ToastComponentProps = {},
) {
  return render(
    <ToastProvider>
      <Trigger options={options} />
      <Toast {...toastProps} />
    </ToastProvider>,
  );
}

function findToast() {
  return screen.findByRole("dialog");
}

describe("Toast", () => {
  describe("structure", () => {
    it("renders the glass toast inside the portal viewport", async () => {
      const user = userEvent.setup();

      renderToast({
        title: "Changes saved",
        description: "Your workspace settings were updated.",
      });

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();
      const viewport = getSlot(document.body, "viewport");
      const title = getSlot(toast, "title");
      const description = getSlot(toast, "description");
      const glass = getSlot(toast, "glass");
      const overlay = getSlot(toast, "overlay");
      const content = getSlot(toast, "content");

      expect(toast).toHaveAttribute("data-slot", "toast");
      expect(toast).toHaveAttribute("role", "dialog");
      expect(toast).toHaveAttribute("aria-labelledby", title.id);
      expect(toast).toHaveAttribute("aria-describedby", description.id);
      expect(title).toHaveTextContent("Changes saved");
      expect(description).toHaveTextContent(
        "Your workspace settings were updated.",
      );
      expect(viewport).toContainElement(toast);
      expect(viewport).toHaveAttribute("data-position", "bottom-right");
      expect(viewport).toHaveAttribute("aria-label", "Notifications");
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
      expect(toast.querySelector('[data-slot="icon"]')).toBeNull();
    });

    it("renders a title-only toast without a description", async () => {
      const user = userEvent.setup();

      renderToast({ title: "Copied" });

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();

      expect(screen.queryByText("Copied")).toBeInTheDocument();
      expect(toast.querySelector('[data-slot="description"]')).toBeNull();
    });

    it("applies the requested viewport position", async () => {
      const user = userEvent.setup();

      renderToast({ title: "Positioned" }, { position: "top-left" });

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();
      const viewport = getSlot(document.body, "viewport");

      expect(viewport).toHaveAttribute("data-position", "top-left");
      expect(viewport).toHaveClass(
        "top-[max(1rem,env(safe-area-inset-top))]",
        "left-[max(1rem,env(safe-area-inset-left))]",
      );
      expect(toast).toHaveClass("top-0", "origin-top");
      expect(toast).not.toHaveClass("bottom-0");
    });
  });

  describe("destructive actions", () => {
    it("closes the toast from the close button", async () => {
      const user = userEvent.setup();

      renderToast({ title: "Changes saved" });

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();
      const viewport = getSlot(document.body, "viewport");
      const close = getSlot(toast, "close");

      await user.hover(viewport);

      expect(close.tagName).toBe("BUTTON");
      expect(close.querySelector("svg")).not.toBeNull();

      await user.click(close);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("renders a custom close slot", async () => {
      const user = userEvent.setup();

      renderToast(
        { title: "Changes saved" },
        {
          close: (
            <button type="button" aria-label="Fermer">
              <span aria-hidden="true">×</span>
            </button>
          ),
        },
      );

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();

      expect(toast.querySelector('[data-slot="close"]')).toBeNull();
      expect(
        within(toast).getByRole("button", { name: "Fermer" }),
      ).toBeInTheDocument();
    });
  });

  describe("status icons", () => {
    it("renders the built-in icon for each known type", async () => {
      const user = userEvent.setup();
      const types = [
        ["info", "New comment"],
        ["success", "Changes saved"],
        ["warning", "Storage almost full"],
        ["error", "Upload failed"],
        ["loading", "Publishing release"],
      ] as const;

      render(
        <ToastProvider limit={10}>
          {types.map(([type, title]) => (
            <Trigger
              key={type}
              label={type}
              options={{ type, title }}
            />
          ))}
          <Trigger
            label="unknown"
            options={{ type: "custom", title: "Custom" }}
          />
          <Toast />
        </ToastProvider>,
      );

      for (const [type] of types) {
        await user.click(screen.getByRole("button", { name: type }));
      }

      for (const [type, title] of types) {
        const toast = await screen.findByRole("dialog", { name: title });
        const icon = getSlot(toast, "icon");

        expect(icon).toHaveAttribute("data-icon", type);
        expect(icon.querySelector("svg")).not.toBeNull();
      }

      await user.click(screen.getByRole("button", { name: "unknown" }));

      const custom = await screen.findByRole("dialog", { name: "Custom" });

      expect(custom.querySelector('[data-slot="icon"]')).toBeNull();
    });
  });

  describe("actions", () => {
    it("renders actionProps as an action button", async () => {
      const user = userEvent.setup();
      const onUndo = vi.fn();

      renderToast({
        title: "Message archived",
        actionProps: {
          children: "Undo",
          onClick: onUndo,
        },
      });

      await user.click(screen.getByRole("button", { name: "Notify" }));

      const toast = await findToast();
      const action = getSlot(toast, "action");

      expect(action).toHaveTextContent("Undo");

      await user.click(action);

      expect(onUndo).toHaveBeenCalledTimes(1);
    });
  });

  describe("global manager", () => {
    it("renders toasts added through a toast manager", async () => {
      const toastManager = createToastManager();

      render(
        <ToastProvider toastManager={toastManager}>
          <div>App</div>
          <Toast />
        </ToastProvider>,
      );

      act(() => {
        toastManager.add({ title: "External toast" });
      });

      expect(
        await screen.findByRole("dialog", { name: "External toast" }),
      ).toBeInTheDocument();

      act(() => {
        toastManager.close();
      });

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });
});

describe("Toast theme", () => {
  it("uses the shared glass material", () => {
    const styles = theme();

    expect(styles.root()).toContain("bg-ui-dialog-surface");
    expect(styles.root()).toContain(
      "data-[expanded]:h-[var(--toast-height)]",
    );
    expect(styles.glass()).toContain("ui-glass");
    expect(styles.glass()).toContain("ui-glass-inner");
    expect(styles.glass()).toContain("ui-glass-highlight");
    expect(styles.overlay()).toContain("ui-glass-rim");
  });

  it("stacks away from the anchored edge", () => {
    const top = theme({ position: "top-left" });
    const bottom = theme({ position: "bottom-right" });

    expect(top.viewport()).toContain(
      "top-[max(1rem,env(safe-area-inset-top))]",
    );
    expect(top.root()).toContain("top-0");
    expect(top.root()).toContain("origin-top");
    expect(top.root()).toContain("after:bottom-full");
    expect(top.root()).toContain(
      "data-[ending-style]:data-[swipe-direction=up]",
    );

    expect(bottom.viewport()).toContain(
      "bottom-[max(1rem,env(safe-area-inset-bottom))]",
    );
    expect(bottom.root()).toContain("bottom-0");
    expect(bottom.root()).toContain("origin-bottom");
    expect(bottom.root()).toContain("after:top-full");
    expect(bottom.root()).toContain(
      "data-[ending-style]:data-[swipe-direction=down]",
    );
  });

  it("anchors the viewport to each corner", () => {
    expect(theme({ position: "bottom-left" }).viewport()).toContain(
      "left-[max(1rem,env(safe-area-inset-left))]",
    );
    expect(theme({ position: "bottom-right" }).viewport()).toContain(
      "right-[max(1rem,env(safe-area-inset-right))]",
    );
    expect(theme({ position: "top-left" }).viewport()).toContain(
      "top-[max(1rem,env(safe-area-inset-top))]",
    );
    expect(theme({ position: "top-right" }).viewport()).toContain(
      "top-[max(1rem,env(safe-area-inset-top))]",
    );
  });
});
