import { cn, type ClassValue } from "cn";
import * as React from "react";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/card";

type Card = ComponentConfig<typeof theme>;

type CardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Classes merged into the root element. */
  className?: ClassValue;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Card["slots"];
  /** Optional visible title rendered inside the card header. */
  title?: React.ReactNode;
  /** Optional supporting copy rendered under the title. */
  description?: React.ReactNode;
  /** Optional footer row rendered below the body. */
  footer?: React.ReactNode;
};

function Card({
  className,
  ui,
  title,
  description,
  footer,
  children,
  ...props
}: CardProps) {
  const styles = theme();

  return (
    <div
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
      {...props}
    >
      <div
        aria-hidden="true"
        data-slot="glass"
        className={cn(styles.glass(), ui?.glass)}
      >
        <span
          aria-hidden="true"
          data-slot="overlay"
          className={cn(styles.overlay(), ui?.overlay)}
        />
      </div>

      <div data-slot="layout" className={cn(styles.layout(), ui?.layout)}>
        {title || description ? (
          <div data-slot="header" className={cn(styles.header(), ui?.header)}>
            {title ? (
              <div data-slot="title" className={cn(styles.title(), ui?.title)}>
                {title}
              </div>
            ) : null}
            {description ? (
              <div
                data-slot="description"
                className={cn(styles.description(), ui?.description)}
              >
                {description}
              </div>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div data-slot="body" className={cn(styles.body(), ui?.body)}>
            {children}
          </div>
        ) : null}

        {footer ? (
          <div data-slot="footer" className={cn(styles.footer(), ui?.footer)}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
export type { CardProps };
