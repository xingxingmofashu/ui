"use client";

import { cn } from "cn";
import * as React from "react";

import theme from "../theme/card";

type CardSlot =
  | "root"
  | "header"
  | "title"
  | "description"
  | "body"
  | "footer";

type CardClassNames = Partial<Record<CardSlot, string>>;

type CardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Classes merged into the root element. */
  className?: string;
  /** Classes for individual slots. */
  classNames?: CardClassNames;
  /** Optional visible heading rendered inside the card header. */
  title?: React.ReactNode;
  /** Optional supporting copy rendered under the title. */
  description?: React.ReactNode;
  /** Optional footer row rendered below the body. */
  footer?: React.ReactNode;
};

function Card({
  className,
  classNames,
  title,
  description,
  footer,
  children,
  ...props
}: CardProps) {
  const ui = theme();
  const hasHeader = title != null || description != null;
  const hasBody =
    children !== undefined &&
    children !== null &&
    children !== "" &&
    children !== false;
  const hasFooter = footer != null;

  return (
    <div
      data-slot="root"
      className={cn(ui.root(), className, classNames?.root)}
      {...props}
    >
      <div aria-hidden="true" className={ui.glass()}>
        <div className={ui.surface()}>
          <span aria-hidden="true" className={ui.overlay()} />
        </div>
      </div>

      <div className={ui.layout()}>
        {hasHeader ? (
          <div
            data-slot="header"
            className={cn(ui.header(), classNames?.header)}
          >
            {title != null ? (
              <div
                data-slot="title"
                className={cn(ui.title(), classNames?.title)}
              >
                {title}
              </div>
            ) : null}
            {description != null ? (
              <div
                data-slot="description"
                className={cn(ui.description(), classNames?.description)}
              >
                {description}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasBody ? (
          <div data-slot="body" className={cn(ui.body(), classNames?.body)}>
            {children}
          </div>
        ) : null}

        {hasFooter ? (
          <div
            data-slot="footer"
            className={cn(ui.footer(), classNames?.footer)}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
export type { CardClassNames, CardProps };
