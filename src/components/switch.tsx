"use client";

import { Switch as UISwitch } from "@base-ui/react/switch";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { useAria } from "../composables/use-aria";
import { useFieldset } from "../composables/use-fieldset";
import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/switch";

type Switch = ComponentConfig<typeof theme>;

interface SwitchProps
  extends Omit<UISwitch.Root.Props, "className" | "children">,
    VariantProps<typeof theme> {
  /** Tailwind classes merged into the Base UI switch root. */
  className?: ClassValue;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Switch["slots"];
  /** Visible label. */
  label?: React.ReactNode;
  /** Optional supporting text. */
  description?: React.ReactNode;
}

function Switch({
  className,
  ui,
  label,
  description,
  size,
  disabled,
  readOnly,
  onCheckedChange,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SwitchProps) {
  const styles = theme({ size });
  const fieldset = useFieldset();
  const fieldsetDisabled = fieldset.disabled || disabled;
  const { controlProps, descriptionProps, labelProps } = useAria({
    description,
    label,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });
  const [animating, setAnimating] = React.useState(false);
  const animationTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const stopAnimating = () => {
    clearTimeout(animationTimer.current);
    setAnimating(false);
  };
  React.useEffect(
    () => () => {
      clearTimeout(animationTimer.current);
    },
    [],
  );
  const handleCheckedChange: NonNullable<
    SwitchProps["onCheckedChange"]
  > = (checked, details) => {
    onCheckedChange?.(checked, details);

    if (!details.isCanceled) {
      setAnimating(true);
      clearTimeout(animationTimer.current);
      // Reduced motion disables the transition, so no transitionend fires.
      animationTimer.current = setTimeout(stopAnimating, 300);
    }
  };
  const handleThumbTransitionEnd = (
    event: React.TransitionEvent<HTMLSpanElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (
      event.propertyName === "translate" ||
      event.propertyName === "scale"
    ) {
      stopAnimating();
    }
  };

  return (
    <UISwitch.Root
      {...props}
      {...controlProps}
      disabled={fieldsetDisabled}
      readOnly={readOnly}
      data-slot="root"
      data-animating={animating || undefined}
      onCheckedChange={handleCheckedChange}
      className={cn(styles.root(), ui?.root, className)}
    >
      <span
        data-slot="container"
        className={cn(styles.container(), ui?.container)}
      >
        <span data-slot="base" className={cn(styles.base(), ui?.base)}>
          <UISwitch.Thumb
            data-slot="thumb"
            aria-hidden="true"
            onTransitionEnd={handleThumbTransitionEnd}
            className={cn(styles.thumb(), ui?.thumb)}
          />
        </span>
      </span>

      {label || description ? (
        <span
          data-slot="wrapper"
          className={cn(styles.wrapper(), ui?.wrapper)}
        >
          {label ? (
            <span
              {...labelProps}
              data-slot="label"
              className={cn(styles.label(), ui?.label)}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              {...descriptionProps}
              data-slot="description"
              className={cn(styles.description(), ui?.description)}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </UISwitch.Root>
  );
}

export { Switch };
export type { SwitchProps };
