import { fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ScrollArea } from "../../src/components/scroll-area";
import theme from "../../src/theme/scroll-area";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Scroll area slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: Element, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function mockOverflow({
  clientHeight = 160,
  clientWidth = 320,
  scrollHeight = 640,
  scrollWidth = 640,
}: {
  clientHeight?: number;
  clientWidth?: number;
  scrollHeight?: number;
  scrollWidth?: number;
} = {}) {
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
    clientHeight,
  );
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
    clientWidth,
  );
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(
    scrollHeight,
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(
    scrollWidth,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ScrollArea", () => {
  describe("structure", () => {
    it("renders the Base UI scroll area parts", () => {
      const { container } = render(
        <ScrollArea aria-label="Release notes">
          <div data-testid="content">Release notes</div>
        </ScrollArea>,
      );

      const root = getSlot(container, "root");
      const viewport = getSlot(root, "viewport");
      const content = getSlot(root, "content");

      expect(root.tagName).toBe("DIV");
      expect(root).toHaveAttribute("data-slot", "root");
      expect(root).toHaveAttribute("data-orientation", "vertical");
      expect(viewport).toContainElement(content);
      expect(content).toContainElement(
        container.querySelector('[data-testid="content"]'),
      );
    });

    it("keeps the glass layers private and outside the content", () => {
      const { container } = render(
        <ScrollArea>
          <p>Visible content</p>
        </ScrollArea>,
      );

      const root = getSlot(container, "root");
      const glass = getSlot(root, "glass");
      const overlay = getSlot(root, "overlay");
      const viewport = getSlot(root, "viewport");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass(
        "ui-glass",
        "ui-glass-inner",
        "ui-glass-highlight",
      );
      expect(glass).toContainElement(overlay);
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(viewport.closest('[aria-hidden="true"]')).toBeNull();
    });

    it("renders the native viewport as a presentation container", () => {
      const { container } = render(<ScrollArea>Body</ScrollArea>);

      const root = getSlot(container, "root");
      const viewport = getSlot(root, "viewport");
      const content = getSlot(root, "content");

      expect(root).toHaveAttribute("role", "presentation");
      expect(viewport).toHaveClass("base-ui-disable-scrollbar");
      expect(viewport.style.overflow).toBe("scroll");
      expect(viewport).toHaveAttribute("tabindex", "-1");
      expect(content).toHaveAttribute("role", "presentation");
    });

    it("renders no scrollbars or corner when the viewport cannot scroll", () => {
      const { container } = render(<ScrollArea>Body</ScrollArea>);

      const root = getSlot(container, "root");

      expect(querySlot(root, "scrollbar")).toBeNull();
      expect(querySlot(root, "corner")).toBeNull();
    });

    it("renders the requested scrollbar axes", async () => {
      mockOverflow();

      const { container } = render(<ScrollArea>Body</ScrollArea>);

      const root = getSlot(container, "root");

      await waitFor(() => {
        expect(root.querySelectorAll('[data-slot="scrollbar"]')).toHaveLength(
          1,
        );
      });

      expect(
        root.querySelector('[data-slot="scrollbar"]'),
      ).toHaveAttribute("data-orientation", "vertical");
      expect(getSlot(root, "thumb")).toBeInTheDocument();
      expect(querySlot(root, "corner")).toBeNull();
      expect(getSlot(root, "viewport")).toHaveAttribute("tabindex", "0");
    });

    it("renders both scrollbars and the corner", async () => {
      mockOverflow();

      const { container } = render(
        <ScrollArea orientation="both">Body</ScrollArea>,
      );

      const root = getSlot(container, "root");

      await waitFor(() => {
        expect(root.querySelectorAll('[data-slot="scrollbar"]')).toHaveLength(
          2,
        );
      });

      const orientations = Array.from(
        root.querySelectorAll('[data-slot="scrollbar"]'),
      ).map((scrollbar) => scrollbar.getAttribute("data-orientation"));

      expect(orientations.sort()).toEqual(["horizontal", "vertical"]);
      expect(root.querySelectorAll('[data-slot="thumb"]')).toHaveLength(2);
      expect(getSlot(root, "corner")).toBeInTheDocument();
    });

    it("can render only the horizontal scrollbar", async () => {
      mockOverflow();

      const { container } = render(
        <ScrollArea orientation="horizontal">Body</ScrollArea>,
      );

      const root = getSlot(container, "root");

      await waitFor(() => {
        expect(root.querySelectorAll('[data-slot="scrollbar"]')).toHaveLength(
          1,
        );
      });

      expect(
        root.querySelector('[data-slot="scrollbar"]'),
      ).toHaveAttribute("data-orientation", "horizontal");
      expect(querySlot(root, "corner")).toBeNull();
    });

    it("marks the scrollbar and thumb as scrolling", async () => {
      mockOverflow();

      const { container } = render(<ScrollArea>Body</ScrollArea>);

      const root = getSlot(container, "root");

      await waitFor(() => {
        expect(querySlot(root, "scrollbar")).not.toBeNull();
      });

      const viewport = getSlot(root, "viewport");
      const scrollbar = getSlot(root, "scrollbar");

      fireEvent.pointerMove(viewport);
      viewport.scrollTop = 120;
      fireEvent.scroll(viewport);

      expect(root).toHaveAttribute("data-scrolling");
      expect(scrollbar).toHaveAttribute("data-scrolling");
      expect(getSlot(scrollbar, "thumb")).toHaveAttribute("data-scrolling");
    });
  });

  describe("accessibility", () => {
    it("labels the scrollable viewport instead of the presentation root", () => {
      const { container } = render(
        <>
          <span id="notes-label">Release notes</span>
          <ScrollArea
            aria-label="Release notes"
            aria-describedby="notes-hint"
            aria-labelledby="notes-label"
          >
            Body
          </ScrollArea>
        </>,
      );

      const root = getSlot(container, "root");
      const viewport = getSlot(root, "viewport");

      expect(root).not.toHaveAttribute("aria-label");
      expect(root).not.toHaveAttribute("aria-labelledby");
      expect(root).not.toHaveAttribute("aria-describedby");
      expect(viewport).toHaveAttribute("aria-label", "Release notes");
      expect(viewport).toHaveAttribute("aria-labelledby", "notes-label");
      expect(viewport).toHaveAttribute("aria-describedby", "notes-hint");
    });
  });

  describe("styling", () => {
    it("applies className to the root only", () => {
      const { container } = render(
        <ScrollArea className="h-64 custom-root">
          <p>Body</p>
        </ScrollArea>,
      );

      const root = getSlot(container, "root");

      expect(root).toHaveClass("h-64", "custom-root");
      expect(getSlot(root, "glass")).not.toHaveClass("custom-root");
      expect(getSlot(root, "overlay")).not.toHaveClass("custom-root");
      expect(getSlot(root, "viewport")).not.toHaveClass("custom-root");
      expect(getSlot(root, "content")).not.toHaveClass("custom-root");
    });

    it("merges Tailwind classes with the themed root classes", () => {
      const { container } = render(
        <ScrollArea className="rounded-none">Body</ScrollArea>,
      );

      const root = getSlot(container, "root");

      expect(root).toHaveClass("rounded-none");
      expect(root).not.toHaveClass("rounded-[1.5rem]");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error ScrollArea does not expose internal slot recipes.
        <ScrollArea ui={{ root: "rounded-none" }}>Body</ScrollArea>
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <ScrollArea style={{ opacity: 0.5 }}>Body</ScrollArea>
      );

      expect(element).toBeTruthy();
    });

    it("forwards render and ref to the Base UI root", () => {
      const ref = createRef<HTMLDivElement>();

      const { container } = render(
        <ScrollArea ref={ref} render={<section />}>
          Body
        </ScrollArea>,
      );

      const root = getSlot(container, "root");

      expect(root.tagName).toBe("SECTION");
      expect(ref.current).toBe(root);
    });
  });

  describe("theme recipe", () => {
    it("defines the scroll area slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "content",
        "corner",
        "glass",
        "overlay",
        "root",
        "scrollbar",
        "thumb",
        "viewport",
      ]);
    });

    it("builds the liquid glass panel and rim", () => {
      const styles = theme();

      expect(styles.root()).toContain("overflow-hidden");
      expect(styles.root()).toContain("rounded-[1.5rem]");
      expect(styles.root()).toContain(
        "[--ui-scroll-area-thumb:color-mix(in_srgb,var(--ui-ink)_26%,transparent)]",
      );
      expect(styles.root()).not.toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass");
      expect(styles.glass()).toContain("ui-glass-inner");
      expect(styles.glass()).toContain("ui-glass-highlight");
      expect(styles.glass()).toContain("pointer-events-none");
      expect(styles.overlay()).toContain("ui-glass-rim");
      expect(styles.viewport()).toContain("focus-visible:outline-ui-glass-focus");
      expect(styles.viewport()).toContain("overscroll-contain");
    });

    it("builds the glass scrollbars and thumb", () => {
      const styles = theme();

      expect(styles.scrollbar()).toContain("group/scrollbar");
      expect(styles.scrollbar()).toContain("opacity-30");
      expect(styles.scrollbar()).toContain(
        "data-[hovering]:opacity-100",
      );
      expect(styles.scrollbar()).toContain(
        "data-[scrolling]:duration-0",
      );
      expect(styles.scrollbar()).toContain(
        "data-[orientation=vertical]:justify-center",
      );
      expect(styles.scrollbar()).toContain(
        "data-[orientation=horizontal]:items-center",
      );
      expect(styles.thumb()).toContain(
        "bg-[var(--ui-scroll-area-thumb)]",
      );
      expect(styles.thumb()).toContain(
        "group-hover/scrollbar:bg-[var(--ui-scroll-area-thumb-hover)]",
      );
      expect(styles.thumb()).toContain(
        "data-[orientation=vertical]:w-[var(--ui-scroll-area-bar-size)]",
      );
      expect(styles.thumb()).toContain(
        "data-[orientation=horizontal]:h-[var(--ui-scroll-area-bar-size)]",
      );
      expect(styles.corner()).toContain("bg-transparent");
    });

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.glass,
        styles.overlay,
        styles.viewport,
        styles.content,
        styles.scrollbar,
        styles.thumb,
        styles.corner,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
