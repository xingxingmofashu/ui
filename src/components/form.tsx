"use client";

import { Form as UIForm } from "@base-ui/react/form";
import { cn } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/form";

type Form = ComponentConfig<typeof theme>;

type FormProps<
  FormValues extends Record<string, any> = Record<string, any>,
> = Omit<UIForm.Props<FormValues>, "className"> & {
  /** Tailwind classes merged into the form element. */
  className?: string;
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
