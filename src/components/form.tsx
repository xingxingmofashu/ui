"use client";

import { Form as UIForm } from "@base-ui/react/form";
import { cn, type ClassValue } from "cn";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/form";

type Form = ComponentConfig<typeof theme>;

type FormProps<
  FormValues extends Record<string, any> = Record<string, any>,
> = Omit<UIForm.Props<FormValues>, "children" | "className" | "style"> & {
  /** Fields and actions rendered inside the form. */
  children?: React.ReactNode;
  /** Tailwind classes merged into the form element. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Form["slots"];
};

function Form<FormValues extends Record<string, any> = Record<string, any>>({
  className,
  ui,
  ...props
}: FormProps<FormValues>) {
  const styles = theme();

  return (
    <UIForm
      {...props}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    />
  );
}

export { Form };
export type { FormProps };
