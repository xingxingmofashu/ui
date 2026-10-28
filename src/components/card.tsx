import { cn } from "cn";
import * as React from "react";

import theme from "../theme/card";

type CardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Classes merged into the root element. */
  className?: string;
  /** Optional visible title rendered inside the card header. */
  title?: React.ReactNode;
  /** Optional supporting copy rendered under the title. */
  description?: React.ReactNode;
  /** Optional footer row rendered below the body. */
  footer?: React.ReactNode;
};

function Card({
  className,
  title,
  description,
  footer,
  children,
  ...props
}: CardProps) {
  const ui = theme();

  return (
    <div
      data-slot="root"
      className={cn(ui.root(), className)}
      {...props}
    >
      <div aria-hidden="true" className={ui.glass()}>
        <span aria-hidden="true" className={ui.overlay()} />
      </div>

      <div className={ui.layout()}>
        {title || description ? (
          <div data-slot="header" className={ui.header()}>
            {title ? (
              <div data-slot="title" className={ui.title()}>
                {title}
              </div>
            ) : null}
            {description ? (
              <div data-slot="description" className={ui.description()}>
                {description}
              </div>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div data-slot="body" className={ui.body()}>
            {children}
          </div>
        ) : null}

        {footer ? (
          <div data-slot="footer" className={ui.footer()}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
export type { CardProps };
