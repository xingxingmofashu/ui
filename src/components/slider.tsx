"use client";

import { Slider as UISlider } from "@base-ui/react/slider";
import { cn } from "cn";
import * as React from "react";

import { useFieldsetDisabled } from "../internal/fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/slider";

type Slider = ComponentConfig<typeof theme>;

type SliderProps<Value extends number | readonly number[] = number> = Omit<
  UISlider.Root.Props<Value>,
  "children" | "className"
> &
  Pick<UISlider.Thumb.Props, "getAriaLabel" | "getAriaValueText"> & {
    /** Tailwind classes merged into the root. */
    className?: string;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Slider["slots"];
  };

function setAriaAttribute(
  input: HTMLInputElement,
  name: "aria-errormessage" | "aria-invalid",
  value: React.AriaAttributes[typeof name],
) {
  if (value === undefined || value === null) {
    input.removeAttribute(name);
    return;
  }

  input.setAttribute(name, String(value));
}

/**
 * Sliders need an accessible name. Pass `aria-label` or `aria-labelledby`;
 * both are forwarded from the root to every thumb. `aria-describedby` is also
 * forwarded so supporting copy is announced with each thumb.
 */

function Slider<Value extends number | readonly number[] = number>({
  className,
  ui,
  value,
  defaultValue,
  disabled,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  getAriaLabel,
  getAriaValueText,
  ...props
}: SliderProps<Value>) {
  const styles = theme();
  const fieldsetDisabled = useFieldsetDisabled(disabled);
  const syncThumbAria = React.useCallback(
    (input: HTMLInputElement | null) => {
      if (!input) {
        return;
      }

      setAriaAttribute(input, "aria-invalid", ariaInvalid);
      setAriaAttribute(input, "aria-errormessage", ariaErrorMessage);
    },
    [ariaErrorMessage, ariaInvalid],
  );

  // Base UI renders one thumb per <Slider.Thumb>, so mirror value arrays to
  // support range sliders without exposing the component anatomy.
  const values = value ?? defaultValue;
  const thumbCount = Array.isArray(values) ? Math.max(1, values.length) : 1;

  return (
    <UISlider.Root
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      value={value}
      defaultValue={defaultValue}
      disabled={fieldsetDisabled}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <UISlider.Control
        data-slot="control"
        className={cn(styles.control(), ui?.control)}
      >
        <UISlider.Track
          data-slot="track"
          className={cn(styles.track(), ui?.track)}
        >
          <UISlider.Indicator
            data-slot="indicator"
            className={cn(styles.indicator(), ui?.indicator)}
          />
        </UISlider.Track>

        {Array.from({ length: thumbCount }, (_, index) => (
          <UISlider.Thumb
            key={index}
            index={index}
            aria-describedby={ariaDescribedBy}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            getAriaLabel={getAriaLabel}
            getAriaValueText={getAriaValueText}
            inputRef={syncThumbAria}
            data-slot="thumb"
            className={cn(styles.thumb(), ui?.thumb)}
          >
            <span aria-hidden="true" data-layer="thumb-glass">
              <span data-layer="thumb-lens" />
              <span data-layer="thumb-specular" />
              <span data-layer="thumb-glare" />
            </span>
          </UISlider.Thumb>
        ))}
      </UISlider.Control>
    </UISlider.Root>
  );
}

export { Slider };
export type { SliderProps };
