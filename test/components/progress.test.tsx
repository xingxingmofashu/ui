import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "../../src/components/progress";
import theme from "../../src/theme/progress";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Progress slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: Element, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

describe("Progress", () => {
  describe("accessible values", () => {
    it("renders a labelled progressbar with the current value", () => {
      render(<Progress label="Exporting data" value={64} />);

      const progress = screen.getByRole("progressbar", {
        name: "Exporting data",
      });

      expect(progress).toHaveAttribute("aria-valuenow", "64");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
      expect(progress).toHaveAttribute("aria-valuemax", "100");
      expect(progress).toHaveAttribute("aria-valuetext", "64%");
    });

    it("supports aria-label when no visible label is rendered", () => {
      render(<Progress aria-label="Uploading files" value={32} />);

      expect(
        screen.getByRole("progressbar", { name: "Uploading files" }),
      ).toHaveAttribute("aria-valuenow", "32");
    });

    it("supports custom min and max values", () => {
      render(<Progress label="Steps" value={7} min={0} max={10} />);

      const progress = screen.getByRole("progressbar", { name: "Steps" });

      expect(progress).toHaveAttribute("aria-valuenow", "7");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
      expect(progress).toHaveAttribute("aria-valuemax", "10");
      expect(progress).toHaveAttribute("aria-valuetext", "70%");
    });

    it("links the visible description with aria-describedby", () => {
      render(
        <Progress
          label="Exporting data"
          description="You can keep working while the export runs."
          value={64}
        />,
      );

      const progress = screen.getByRole("progressbar", {
        name: "Exporting data",
      });
      const description = getSlot(progress, "description");

      expect(description).toHaveAttribute("id");
      expect(progress).toHaveAttribute("aria-describedby", description.id);
      expect(progress).toHaveAccessibleDescription(
        "You can keep working while the export runs.",
      );
    });

    it("merges aria-describedby with the visible description", () => {
      render(
        <>
          <span id="progress-hint">Large files may take longer.</span>
          <Progress
            label="Exporting data"
            description="You can keep working while the export runs."
            aria-describedby="progress-hint"
            value={64}
          />
        </>,
      );

      const progress = screen.getByRole("progressbar", {
        name: "Exporting data",
      });
      const description = getSlot(progress, "description");

      expect(progress).toHaveAttribute(
        "aria-describedby",
        `progress-hint ${description.id}`,
      );
      expect(progress).toHaveAccessibleDescription(
        "Large files may take longer. You can keep working while the export runs.",
      );
    });
  });

  describe("structure", () => {
    it("renders the label, value, track, and indicator slots", () => {
      render(<Progress label="Exporting data" value={64} />);

      const progress = screen.getByRole("progressbar", {
        name: "Exporting data",
      });
      const header = getSlot(progress, "header");
      const label = getSlot(progress, "label");
      const value = getSlot(progress, "value");
      const track = getSlot(progress, "track");
      const indicator = getSlot(progress, "indicator");

      expect(header).toContainElement(label);
      expect(header).toContainElement(value);
      expect(track).toContainElement(indicator);
      expect(indicator).toHaveStyle({ width: "64%" });
      expect(value).toHaveTextContent("64%");
      expect(querySlot(progress, "description")).toBeNull();
    });

    it("renders only the value when no label is provided", () => {
      render(<Progress aria-label="Uploading files" value={32} />);

      const progress = screen.getByRole("progressbar", {
        name: "Uploading files",
      });

      expect(querySlot(progress, "label")).toBeNull();
      expect(getSlot(progress, "value")).toHaveTextContent("32%");
    });

    it("merges className into the root only", () => {
      render(
        <Progress
          label="Exporting data"
          value={64}
          className="custom-root"
        />,
      );

      const progress = screen.getByRole("progressbar", {
        name: "Exporting data",
      });

      expect(progress).toHaveClass("custom-root");
      expect(getSlot(progress, "header")).not.toHaveClass("custom-root");
      expect(getSlot(progress, "track")).not.toHaveClass("custom-root");
      expect(getSlot(progress, "indicator")).not.toHaveClass("custom-root");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Progress does not accept a ui prop.
        <Progress aria-label="Uploading files" ui={{ track: "h-4" }} />
      );

      expect(element).toBeTruthy();
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Progress aria-label="Uploading files" style={{ width: 200 }} />
      );

      expect(element).toBeTruthy();
    });
  });

  describe("indeterminate state", () => {
    it("omits the current value and marks every part", () => {
      render(<Progress label="Preparing workspace" value={null} />);

      const progress = screen.getByRole("progressbar", {
        name: "Preparing workspace",
      });

      expect(progress).not.toHaveAttribute("aria-valuenow");
      expect(progress).toHaveAttribute(
        "aria-valuetext",
        "indeterminate progress",
      );
      expect(progress).toHaveAttribute("data-indeterminate");
      expect(getSlot(progress, "track")).toHaveAttribute("data-indeterminate");
      expect(getSlot(progress, "indicator")).toHaveAttribute(
        "data-indeterminate",
      );
      expect(getSlot(progress, "value")).toBeEmptyDOMElement();
    });

    it("defaults to indeterminate when no value is provided", () => {
      render(<Progress label="Preparing workspace" />);

      expect(
        screen.getByRole("progressbar", { name: "Preparing workspace" }),
      ).toHaveAttribute("data-indeterminate");
    });
  });

  describe("sizes", () => {
    it("defaults to md", () => {
      const styles = theme();

      expect(styles.root()).toContain("[--ui-progress-height:6px]");
      expect(styles.root()).toContain("[--ui-progress-gap:8px]");
      expect(styles.root()).toContain("[--ui-progress-font-size:0.875rem]");
    });

    it.each([
      ["xs", "[--ui-progress-height:4px]", "[--ui-progress-gap:6px]"],
      ["sm", "[--ui-progress-height:5px]", "[--ui-progress-gap:6px]"],
      ["md", "[--ui-progress-height:6px]", "[--ui-progress-gap:8px]"],
      ["lg", "[--ui-progress-height:8px]", "[--ui-progress-gap:8px]"],
      ["xl", "[--ui-progress-height:10px]", "[--ui-progress-gap:10px]"],
    ] as const)(
      "applies the %s size",
      (size, heightClass, gapClass) => {
        const styles = theme({ size });

        expect(styles.root()).toContain(heightClass);
        expect(styles.root()).toContain(gapClass);
      },
    );
  });

  describe("theme recipe", () => {
    it("exposes the public slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "description",
        "header",
        "indicator",
        "label",
        "root",
        "track",
        "value",
      ]);
    });

    it("draws a neutral glass track and an ink fill", () => {
      const styles = theme();

      expect(styles.root()).toContain("flex-col");
      expect(styles.track()).toContain("border-ui-glass-border");
      expect(styles.track()).toContain("bg-[var(--ui-progress-track)]");
      expect(styles.track()).toContain("rounded-full");
      expect(styles.indicator()).toContain(
        "bg-[linear-gradient(117deg,var(--ui-progress-fill-from)_0%,var(--ui-progress-fill-to)_100%)]",
      );
      expect(styles.indicator()).toContain(
        "transition-[width]",
      );
      expect(styles.indicator()).toContain("data-[indeterminate]:w-[38%]");
      expect(styles.indicator()).toContain(
        "data-[indeterminate]:[animation:ui-progress-indeterminate_1.4s_ease-in-out_infinite]",
      );
      expect(styles.indicator()).toContain(
        "motion-reduce:data-[indeterminate]:[animation:none]",
      );
      expect(styles.label()).toContain(
        "text-[length:var(--ui-progress-font-size)]",
      );
    });
  });
});
