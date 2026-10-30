import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { Slider, type SliderProps } from "../../src/components/slider";
import theme from "../../src/theme/slider";

function getSlider(index = 0) {
  const slider = screen.getAllByRole("slider")[index];

  if (!(slider instanceof HTMLInputElement)) {
    throw new Error("Slider was not rendered as a range input.");
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
    it("forwards aria-label and aria-describedby to the thumb", () => {
      render(
        <>
          <span id="volume-hint">Adjusts the output level.</span>
          <Slider aria-label="Volume" aria-describedby="volume-hint" />
        </>,
      );

      const slider = getSlider();
      const root = getRoot(slider);

      expect(root).toHaveAttribute("aria-label", "Volume");
      expect(slider).toHaveAttribute("aria-label", "Volume");
      expect(slider).toHaveAttribute("aria-describedby", "volume-hint");
      expect(slider).toHaveAccessibleDescription("Adjusts the output level.");
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

      expect(
        screen.getAllByRole("slider", { name: "Volume" }),
      ).toHaveLength(1);
    });

    it("labels every thumb in a range slider", () => {
      render(<Slider aria-label="Price range" defaultValue={[20, 80]} />);

      expect(
        screen.getAllByRole("slider", { name: "Price range" }),
      ).toHaveLength(2);
    });

    it("supports per-thumb labels for range sliders", () => {
      render(
        <Slider
          defaultValue={[20, 80]}
          getAriaLabel={(index) =>
            index === 0 ? "Minimum price" : "Maximum price"
          }
        />,
      );

      expect(
        screen.getByRole("slider", { name: "Minimum price" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("slider", { name: "Maximum price" }),
      ).toBeInTheDocument();
    });

    it("supports custom value text", () => {
      render(
        <Slider
          aria-label="Volume"
          defaultValue={40}
          getAriaValueText={(formattedValue) => `${formattedValue} percent`}
        />,
      );

      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-valuetext",
        "40 percent",
      );
    });
  });

  describe("validation", () => {
    it("forwards aria-invalid and aria-errormessage to the thumb input", () => {
      render(
        <>
          <span id="volume-error">Volume must be between 0 and 100.</span>
          <Slider
            aria-label="Volume"
            aria-invalid
            aria-errormessage="volume-error"
          />
        </>,
      );

      const slider = getSlider();

      expect(slider).toHaveAttribute("aria-invalid", "true");
      expect(slider).toHaveAttribute("aria-errormessage", "volume-error");
    });

    it("removes validation attributes when they are cleared", () => {
      const { rerender } = render(
        <Slider
          aria-label="Volume"
          aria-invalid
          aria-errormessage="volume-error"
        />,
      );

      const slider = getSlider();

      expect(slider).toHaveAttribute("aria-invalid", "true");

      rerender(<Slider aria-label="Volume" />);

      expect(slider).not.toHaveAttribute("aria-invalid");
      expect(slider).not.toHaveAttribute("aria-errormessage");
    });

    it("applies validation attributes to every range thumb", () => {
      render(
        <Slider
          aria-label="Price range"
          aria-invalid
          aria-errormessage="price-error"
          defaultValue={[20, 80]}
        />,
      );

      const sliders = screen.getAllByRole("slider");

      expect(sliders).toHaveLength(2);

      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-invalid", "true");
        expect(slider).toHaveAttribute("aria-errormessage", "price-error");
      });
    });
  });

  describe("structure", () => {
    it("renders Base UI slider parts", () => {
      render(<Slider aria-label="Volume" defaultValue={40} />);

      const slider = getSlider();
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

      const thumb = getSlot(getRoot(getSlider()), "thumb");
      const glass = getLayer(thumb, "thumb-glass");

      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toContainElement(getLayer(thumb, "thumb-lens"));
      expect(glass).toContainElement(getLayer(thumb, "thumb-specular"));
      expect(glass).toContainElement(getLayer(thumb, "thumb-glare"));
      expect(glass).not.toHaveAttribute("data-slot");
    });

    it("does not render removed content slots", () => {
      render(<Slider aria-label="Volume" defaultValue={40} />);

      const root = getRoot(getSlider());

      for (const slot of ["header", "label", "value", "description"]) {
        expect(root.querySelector(`[data-slot="${slot}"]`)).toBeNull();
      }
    });

    it("applies className to the root only", () => {
      render(<Slider aria-label="Styled" className="custom-root" />);

      const slider = getSlider();
      const root = getRoot(slider);
      const control = getSlot(root, "control");
      const track = getSlot(control, "track");

      expect(root).toHaveClass("custom-root");
      expect(control).not.toHaveClass("custom-root");
      expect(track).not.toHaveClass("custom-root");
      expect(getSlot(track, "indicator")).not.toHaveClass("custom-root");
      expect(getSlot(control, "thumb")).not.toHaveClass("custom-root");
    });

    it("does not accept a ui prop", () => {
      const element = (
        // @ts-expect-error Slider no longer accepts a ui prop.
        <Slider aria-label="Internal" ui={{ track: "h-10" }} />
      );

      expect(element).toBeTruthy();
    });

    it("only exposes Base UI Slider.Root props", () => {
      type RemovedProps =
        | "label"
        | "description"
        | "showValue"
        | "getThumbAriaLabel";

      expectTypeOf<
        Extract<keyof SliderProps, RemovedProps>
      >().toEqualTypeOf<never>();
    });

    it("merges Tailwind classes with the themed root classes", () => {
      render(<Slider aria-label="Merged" className="w-32" />);

      const root = getRoot(getSlider());

      expect(root).toHaveClass("w-32");
      expect(root).not.toHaveClass("w-full");
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

      const root = getRoot(getSlider());

      expect(root.tagName).toBe("SECTION");
      expect(ref.current).toBe(root);
    });

    it("uses the fixed xs thumb and sm track scale", () => {
      render(<Slider aria-label="Sized" />);

      const root = getRoot(getSlider());

      expect(root).toHaveClass("[--ui-slider-track-height:6px]");
      expect(root).toHaveClass("[--ui-slider-thumb-width:40px]");
      expect(root).toHaveClass("[--ui-slider-thumb-height:24px]");
      expect(root).not.toHaveAttribute("data-size");
    });

    it("marks vertical orientation on the root and parts", () => {
      render(
        <Slider aria-label="Level" orientation="vertical" defaultValue={60} />,
      );

      const slider = getSlider();
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
      expect(getSlider()).toHaveAttribute("aria-valuenow", "40");
    });

    it("renders one thumb when no value is given", () => {
      render(<Slider aria-label="Volume" />);

      expect(screen.getAllByRole("slider")).toHaveLength(1);
    });

    it("renders two thumbs for a range value", () => {
      render(<Slider aria-label="Price" defaultValue={[20, 80]} />);

      const sliders = screen.getAllByRole("slider");

      expect(sliders).toHaveLength(2);
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "20");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "80");
    });

    it("renders multiple thumbs from a controlled range", () => {
      render(<Slider aria-label="Price" value={[10, 60, 90]} />);

      expect(screen.getAllByRole("slider")).toHaveLength(3);
    });

    it("passes format to Base UI thumb value text", () => {
      render(
        <Slider
          aria-label="Price"
          defaultValue={[0.2, 0.8]}
          format={{ style: "percent" }}
        />,
      );

      const sliders = screen.getAllByRole("slider");

      expect(sliders[0]).toHaveAttribute(
        "aria-valuetext",
        "20% start range",
      );
      expect(sliders[1]).toHaveAttribute(
        "aria-valuetext",
        "80% end range",
      );
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

      const slider = getSlider();

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

      const slider = getSlider();

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

      const slider = getSlider();

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

      const slider = getSlider();

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

      const slider = getSlider();
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

      const slider = getSlider();

      slider.focus();
      await user.keyboard("{ArrowUp}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("marks the thumb as dragging while pressed", async () => {
      const user = userEvent.setup();

      render(<Slider aria-label="Volume" defaultValue={40} />);

      const thumb = getSlot(getRoot(getSlider()), "thumb");

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
        "indicator",
        "root",
        "thumb",
        "track",
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
        "data-[orientation=vertical]:min-h-48",
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
