import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "../../src/components/slider";
import theme from "../../src/theme/slider";

function getSlider(name: string, index = 0) {
  const slider = screen.getAllByRole("slider", { name })[index];

  if (!(slider instanceof HTMLInputElement)) {
    throw new Error(`Slider "${name}" was not rendered as a range input.`);
  }

  return slider;
}

function getRoot(element: Element) {
  const root = element.closest<HTMLElement>('[data-slot="root"]');

  if (!root) {
    throw new Error("Slider root was not rendered.");
  }

  return root;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Slider slot "${slot}" was not rendered.`);
  }

  return node;
}

function getLayer(element: Element, layer: string) {
  const node = element.querySelector<HTMLElement>(`[data-layer="${layer}"]`);

  if (!node) {
    throw new Error(`Slider layer "${layer}" was not rendered.`);
  }

  return node;
}

describe("Slider", () => {
  describe("accessible names", () => {
    it("supports aria-label", () => {
      render(<Slider aria-label="Volume" />);

      const slider = getSlider("Volume");

      expect(slider).toHaveAttribute("type", "range");
      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });

    it("supports aria-labelledby for external labels", () => {
      render(
        <>
          <span id="volume-label">Volume</span>
          <Slider aria-labelledby="volume-label" />
        </>,
      );

      expect(getSlider("Volume")).toBeInTheDocument();
    });

    it("supports a visible label", () => {
      render(<Slider label="Volume" />);

      const slider = getSlider("Volume");
      const root = getRoot(slider);
      const label = getSlot(root, "label");

      expect(label).toHaveTextContent("Volume");
      expect(slider).toHaveAttribute("aria-labelledby", label.id);
    });

    it("treats an empty label as absent", () => {
      render(<Slider label="" aria-label="Volume" />);

      const slider = getSlider("Volume");

      expect(
        getRoot(slider).querySelector('[data-slot="label"]'),
      ).toBeNull();
    });

    it("requires an accessible name at the type level", () => {
      render(
        // @ts-expect-error Sliders must have an accessible name.
        <Slider />,
      );

      expect(screen.getByRole("slider")).toBeInTheDocument();
    });
  });

  describe("structure", () => {
    it("renders Base UI slider parts", () => {
      render(<Slider aria-label="Volume" defaultValue={40} />);

      const slider = getSlider("Volume");
      const root = getRoot(slider);
      const control = getSlot(root, "control");
      const track = getSlot(control, "track");
      const indicator = getSlot(track, "indicator");
      const thumb = getSlot(control, "thumb");

      expect(root.tagName).toBe("DIV");
      expect(root).toHaveAttribute("data-slot", "root");
      expect(control).toContainElement(track);
      expect(track).toContainElement(indicator);
      expect(control).toContainElement(thumb);
      expect(thumb).toContainElement(slider);
    });

    it("renders the liquid glass layers inside the thumb", () => {
      render(<Slider aria-label="Volume" />);

      const thumb = getSlot(getRoot(getSlider("Volume")), "thumb");
      const glass = getLayer(thumb, "thumb-glass");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toContainElement(getLayer(thumb, "thumb-lens"));
      expect(glass).toContainElement(getLayer(thumb, "thumb-specular"));
      expect(glass).toContainElement(getLayer(thumb, "thumb-glare"));
      expect(glass).not.toHaveAttribute("data-slot");
    });

    it("renders label, value, and description slots", () => {
      render(
        <Slider
          label="Volume"
          description="Adjust the output level"
          showValue
          defaultValue={40}
        />,
      );

      const slider = getSlider("Volume");
      const root = getRoot(slider);
      const header = getSlot(root, "header");
      const label = getSlot(header, "label");
      const value = getSlot(header, "value");
      const description = getSlot(root, "description");

      expect(label).toHaveTextContent("Volume");
      expect(value.tagName).toBe("OUTPUT");
      expect(value).toHaveTextContent("40");
      expect(description.tagName).toBe("P");
      expect(description).toHaveTextContent("Adjust the output level");
      expect(slider).toHaveAttribute("aria-describedby", description.id);
      expect(slider).toHaveAccessibleDescription("Adjust the output level");
    });

    it("does not render a header without a label or value", () => {
      render(<Slider aria-label="Volume" />);

      const root = getRoot(getSlider("Volume"));

      expect(root.querySelector('[data-slot="header"]')).toBeNull();
      expect(root.querySelector('[data-slot="description"]')).toBeNull();
    });

    it("merges className and ui into their slots", () => {
      render(
        <Slider
          aria-label="Styled"
          className="custom-root"
          label="Styled"
          description="Description slot"
          showValue
          ui={{
            root: "slot-root",
            header: "slot-header",
            label: "slot-label",
            value: "slot-value",
            description: "slot-description",
            control: "slot-control",
            track: "slot-track",
            indicator: "slot-indicator",
            thumb: "slot-thumb",
          }}
        />,
      );

      const slider = getSlider("Styled");
      const root = getRoot(slider);
      const control = getSlot(root, "control");
      const track = getSlot(control, "track");

      expect(root).toHaveClass("custom-root", "slot-root");
      expect(getSlot(root, "header")).toHaveClass("slot-header");
      expect(getSlot(root, "label")).toHaveClass("slot-label");
      expect(getSlot(root, "value")).toHaveClass("slot-value");
      expect(getSlot(root, "description")).toHaveClass("slot-description");
      expect(control).toHaveClass("slot-control");
      expect(track).toHaveClass("slot-track");
      expect(getSlot(track, "indicator")).toHaveClass("slot-indicator");
      expect(getSlot(control, "thumb")).toHaveClass("slot-thumb");
    });

    it("resolves className callbacks with Base UI state", () => {
      const { rerender } = render(
        <Slider
          aria-label="Stateful"
          disabled
          className={(state) =>
            state.disabled ? "slider-disabled" : "slider-enabled"
          }
        />,
      );

      let root = getRoot(getSlider("Stateful"));

      expect(root).toHaveClass("slider-disabled");

      rerender(
        <Slider
          aria-label="Stateful"
          className={(state) =>
            state.disabled ? "slider-disabled" : "slider-enabled"
          }
        />,
      );

      root = getRoot(getSlider("Stateful"));

      expect(root).toHaveClass("slider-enabled");
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The glass theme owns inline styles.
        <Slider aria-label="Styled" style={{ opacity: 0.5 }} />
      );

      expect(element).toBeTruthy();
    });

    it("forwards render and ref to the Base UI root", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Slider
          ref={ref}
          aria-label="Custom root"
          render={<section />}
          defaultValue={40}
        />,
      );

      const root = getRoot(getSlider("Custom root"));

      expect(root.tagName).toBe("SECTION");
      expect(ref.current).toBe(root);
    });

    it("uses the fixed xs thumb and sm track scale", () => {
      render(<Slider aria-label="Sized" />);

      const root = getRoot(getSlider("Sized"));

      expect(root).toHaveClass("[--ui-slider-track-height:6px]");
      expect(root).toHaveClass("[--ui-slider-thumb-width:40px]");
      expect(root).toHaveClass("[--ui-slider-thumb-height:24px]");
      expect(root).not.toHaveAttribute("data-size");
    });

    it("marks vertical orientation on the root and parts", () => {
      render(
        <Slider aria-label="Level" orientation="vertical" defaultValue={60} />,
      );

      const slider = getSlider("Level");
      const root = getRoot(slider);
      const control = getSlot(root, "control");
      const track = getSlot(control, "track");
      const thumb = getSlot(control, "thumb");

      expect(root).toHaveAttribute("data-orientation", "vertical");
      expect(control).toHaveAttribute("data-orientation", "vertical");
      expect(track).toHaveAttribute("data-orientation", "vertical");
      expect(thumb).toHaveAttribute("data-orientation", "vertical");
    });
  });

  describe("range values", () => {
    it("renders one thumb for a scalar value", () => {
      render(<Slider aria-label="Volume" defaultValue={40} />);

      expect(screen.getAllByRole("slider")).toHaveLength(1);
      expect(getSlider("Volume")).toHaveAttribute("aria-valuenow", "40");
    });

    it("renders one thumb when no value is given", () => {
      render(<Slider aria-label="Volume" />);

      expect(screen.getAllByRole("slider", { name: "Volume" })).toHaveLength(1);
    });

    it("renders two thumbs for a range value", () => {
      render(<Slider aria-label="Price" defaultValue={[20, 80]} />);

      const sliders = screen.getAllByRole("slider", { name: "Price" });

      expect(sliders).toHaveLength(2);
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "20");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "80");
    });

    it("renders multiple thumbs from a controlled range", () => {
      render(<Slider aria-label="Price" value={[10, 60, 90]} />);

      expect(screen.getAllByRole("slider", { name: "Price" })).toHaveLength(3);
    });

    it("supports distinct accessible names for range thumbs", () => {
      render(
        <Slider
          aria-label="Price"
          defaultValue={[20, 80]}
          getThumbAriaLabel={(index) =>
            index === 0 ? "Minimum price" : "Maximum price"
          }
        />,
      );

      expect(
        screen.getByRole("slider", { name: "Minimum price" }),
      ).toHaveAttribute("aria-valuenow", "20");
      expect(
        screen.getByRole("slider", { name: "Maximum price" }),
      ).toHaveAttribute("aria-valuenow", "80");
    });

    it("renders a formatted range in the value slot", () => {
      render(
        <Slider
          aria-label="Price"
          defaultValue={[0.2, 0.8]}
          showValue
          format={{ style: "percent" }}
        />,
      );

      const value = getSlot(getRoot(getSlider("Price")), "value");

      expect(value).toHaveTextContent("20% – 80%");
    });
  });

  describe("interaction", () => {
    it("changes value with the keyboard", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Slider
          aria-label="Volume"
          defaultValue={40}
          onValueChange={onValueChange}
        />,
      );

      const slider = getSlider("Volume");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "41");
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toBe(41);
    });

    it("respects a controlled value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Slider
          aria-label="Volume"
          value={30}
          onValueChange={onValueChange}
        />,
      );

      const slider = getSlider("Volume");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(onValueChange).toHaveBeenCalled();
      expect(onValueChange.mock.calls[0]?.[0]).toBe(31);
      expect(slider).toHaveAttribute("aria-valuenow", "30");
    });

    it("moves in page and shift steps", async () => {
      const user = userEvent.setup();

      render(
        <Slider
          aria-label="Volume"
          defaultValue={40}
          step={5}
          largeStep={20}
        />,
      );

      const slider = getSlider("Volume");

      slider.focus();
      await user.keyboard("{ArrowRight}");
      expect(slider).toHaveAttribute("aria-valuenow", "45");

      await user.keyboard("{PageUp}");
      expect(slider).toHaveAttribute("aria-valuenow", "65");
    });

    it("clamps values to min and max", async () => {
      const user = userEvent.setup();

      render(
        <Slider aria-label="Volume" defaultValue={0} min={0} max={10} />,
      );

      const slider = getSlider("Volume");

      slider.focus();
      await user.keyboard("{ArrowLeft}");

      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });

    it("does not change when disabled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Slider
          aria-label="Volume"
          defaultValue={40}
          disabled
          onValueChange={onValueChange}
        />,
      );

      const slider = getSlider("Volume");
      const root = getRoot(slider);

      expect(slider).toBeDisabled();
      expect(root).toHaveAttribute("data-disabled");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "40");
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("submits its value through a range input", () => {
      const { container } = render(
        <Slider aria-label="Volume" name="volume" defaultValue={40} />,
      );

      const input = container.querySelector<HTMLInputElement>(
        'input[type="range"]',
      );

      expect(input).not.toBeNull();
      expect(input).toHaveAttribute("name", "volume");
      expect(input).toHaveValue("40");
    });

    it("moves vertically with arrow keys", async () => {
      const user = userEvent.setup();

      render(
        <Slider
          aria-label="Level"
          orientation="vertical"
          defaultValue={50}
        />,
      );

      const slider = getSlider("Level");

      slider.focus();
      await user.keyboard("{ArrowUp}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("marks the thumb as dragging while pressed", async () => {
      const user = userEvent.setup();

      render(<Slider aria-label="Volume" defaultValue={40} />);

      const thumb = getSlot(getRoot(getSlider("Volume")), "thumb");

      await user.pointer({ target: thumb, keys: "[MouseLeft>]" });

      expect(thumb).toHaveAttribute("data-dragging");

      await user.pointer({ keys: "[/MouseLeft]" });

      await waitFor(() => {
        expect(thumb).not.toHaveAttribute("data-dragging");
      });
    });
  });

  describe("theme recipe", () => {
    it("defines the slider slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "control",
        "description",
        "header",
        "indicator",
        "label",
        "root",
        "thumb",
        "track",
        "value",
      ]);
    });

    it("builds the liquid glass track, fill, and thumb", () => {
      const styles = theme();

      expect(styles.root()).toContain(
        "[--ui-slider-track:color-mix(in_srgb,var(--ui-ink)_14%,transparent)]",
      );
      expect(styles.root()).toContain(
        "[--ui-slider-fill-from:var(--ui-ink)]",
      );
      expect(styles.root()).toContain(
        "[--ui-slider-fill-to:var(--ui-ink-active)]",
      );
      expect(styles.root()).toContain(
        "[--ui-slider-fill-glow:color-mix(in_srgb,var(--ui-ink)_30%,transparent)]",
      );
      expect(styles.root()).toContain(
        "data-[orientation=vertical]:w-fit",
      );
      expect(styles.track()).toContain("bg-[var(--ui-slider-track)]");
      expect(styles.track()).toContain(
        "shadow-[inset_0_1px_2px_rgb(0_0_0/0.14),inset_0_-1px_0_rgb(255_255_255/0.35)]",
      );
      expect(styles.indicator()).toContain(
        "bg-[linear-gradient(117deg,var(--ui-slider-fill-from)_0%,var(--ui-slider-fill-to)_100%)]",
      );
      expect(styles.indicator()).toContain(
        "shadow-[0_0_10px_var(--ui-slider-fill-glow),inset_0_1px_0_rgb(255_255_255/0.35)]",
      );
      expect(styles.thumb()).toContain(
        "[&_[data-layer=thumb-glass]]:[backdrop-filter:blur(var(--ui-glass-lens-blur))_saturate(var(--ui-glass-lens-saturate))]",
      );
      expect(styles.thumb()).not.toContain("--ui-slider-filter");
      expect(styles.thumb()).toContain(
        "[&_[data-layer=thumb-glass]]:[background-image:var(--ui-glass-lens-surface)]",
      );
      expect(styles.thumb()).toContain(
        "[&_[data-layer=thumb-specular]]:[box-shadow:var(--ui-glass-lens-specular)]",
      );
      expect(styles.thumb()).toContain(
        "data-[dragging]:[&_[data-layer=thumb-glass]]:bg-[var(--ui-glass-lens-surface-active)]",
      );
      expect(styles.thumb()).toContain(
        "data-[dragging]:[&_[data-layer=thumb-specular]]:opacity-100",
      );
      expect(styles.thumb()).toContain(
        "data-[orientation=vertical]:h-[var(--ui-slider-thumb-width)]",
      );
      expect(styles.control()).toContain(
        "data-[orientation=vertical]:min-h-40",
      );
    });

    it("uses the xs thumb and sm track scale", () => {
      const styles = theme();

      expect(styles.root()).toContain("[--ui-slider-track-height:6px]");
      expect(styles.root()).toContain("[--ui-slider-thumb-width:40px]");
      expect(styles.root()).toContain("[--ui-slider-thumb-height:24px]");
    });

    it("uses no dark-mode branches", () => {
      const styles = theme();
      const slots = [
        styles.root,
        styles.header,
        styles.label,
        styles.value,
        styles.description,
        styles.control,
        styles.track,
        styles.indicator,
        styles.thumb,
      ];

      slots.forEach((slot) => {
        expect(slot()).not.toContain("dark:");
      });
    });
  });
});
