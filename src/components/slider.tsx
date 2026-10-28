"use client";

import { Slider as UISlider } from "@base-ui/react/slider";
import { cn } from "cn";

import theme from "../theme/slider";

type SliderProps<Value extends number | readonly number[] = number> = Omit<
  UISlider.Root.Props<Value>,
  "children" | "style" | "className"
> & {
  /** Tailwind classes merged into the root. */
  className?: any;
};

/**
 * Sliders need an accessible name. Pass `aria-labelledby`; Base UI forwards it
 * from the root to every thumb.
 */

function Slider<Value extends number | readonly number[] = number>({
  className,
  value,
  defaultValue,
  ...props
}: SliderProps<Value>) {
  const ui = theme();

  // Base UI renders one thumb per <Slider.Thumb>, so mirror value arrays to
  // support range sliders without exposing the component anatomy.
  const values = value ?? defaultValue;
  const thumbCount = Array.isArray(values) ? Math.max(1, values.length) : 1;

  return (
    <UISlider.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      data-slot="root"
      className={cn(ui.root(), className)}
    >
      <UISlider.Control data-slot="control" className={ui.control()}>
        <UISlider.Track data-slot="track" className={ui.track()}>
          <UISlider.Indicator
            data-slot="indicator"
            className={ui.indicator()}
          />
        </UISlider.Track>

        {Array.from({ length: thumbCount }, (_, index) => (
          <UISlider.Thumb
            key={index}
            index={index}
            data-slot="thumb"
            className={ui.thumb()}
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
