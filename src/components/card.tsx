import { cn } from "cn";
import * as React from "react";

import { hasContent } from "../lib/has-content";
import theme from "../theme/card";

type CardThemeSlot =
  | "root"
  | "header"
  | "title"
  | "description"
  | "body"
  | "footer";

type CardTitleTag = "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type CardStyle = Partial<Record<CardThemeSlot, string>>;

type CardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Classes merged into the root element. */
  className?: string;
  /** Classes for individual slots. */
  ui?: CardStyle;
  /** Optional visible title rendered inside the card header. */
  title?: React.ReactNode;
  /** Element used for the title. Defaults to `div`; use a heading tag for document structure. */
  titleAs?: CardTitleTag;
  /** Optional supporting copy rendered under the title. */
  description?: React.ReactNode;
  /** Optional footer row rendered below the body. */
  footer?: React.ReactNode;
  /** Keep content clipped to the rounded panel. Defaults to true; disable it when hosting popovers. */
  clipContent?: boolean;
};

function Card({
  className,
  ui: uiOverrides,
  title,
  titleAs = "div",
  description,
  footer,
  children,
  clipContent = true,
  ...props
}: CardProps) {
  const Title = titleAs as React.ElementType;
  const ui = theme();
  const hasHeader = hasContent(title) || hasContent(description);
  const hasBody = hasContent(children);
  const hasFooter = hasContent(footer);

  return (
    <div
      data-slot="root"
      className={cn(ui.root(), className, uiOverrides?.root)}
      {...props}
    >
      <div aria-hidden="true" className={ui.glass()}>
        <span aria-hidden="true" className={ui.overlay()} />
      </div>

      <div
        className={cn(
          ui.layout(),
          !clipContent && "overflow-visible",
        )}
      >
        {hasHeader ? (
          <div
            data-slot="header"
            className={cn(ui.header(), uiOverrides?.header)}
          >
            {hasContent(title) ? (
              <Title
                data-slot="title"
                className={cn(ui.title(), uiOverrides?.title)}
              >
                {title}
              </Title>
            ) : null}
            {hasContent(description) ? (
              <div
                data-slot="description"
                className={cn(ui.description(), uiOverrides?.description)}
              >
                {description}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasBody ? (
          <div data-slot="body" className={cn(ui.body(), uiOverrides?.body)}>
            {children}
          </div>
        ) : null}

        {hasFooter ? (
          <div
            data-slot="footer"
            className={cn(ui.footer(), uiOverrides?.footer)}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
export type { CardStyle, CardProps };
