"use client";

import { Accordion as UIAccordion } from "@base-ui/react/accordion";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/accordion";

type AccordionSize = "xs" | "sm" | "md" | "lg" | "xl";

type AccordionHeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type AccordionThemeSlot = "root" | "glass" | "overlay" | "content";

type AccordionStyle = Partial<Record<AccordionThemeSlot, string>>;

type AccordionItemThemeSlot =
  | "root"
  | "header"
  | "trigger"
  | "title"
  | "indicator"
  | "indicatorIcon"
  | "indicatorBar"
  | "panel"
  | "panelContent";

type AccordionItemStyle = Partial<Record<AccordionItemThemeSlot, string>>;

type AccordionContextValue = {
  size: AccordionSize;
  headingAs: AccordionHeading;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

type AccordionClassName<Value extends string> =
  UIAccordion.Root.Props<Value>["className"];

type AccordionStyleProp<Value extends string> =
  UIAccordion.Root.Props<Value>["style"];

interface AccordionProps<Value extends string = string>
  extends Omit<
    UIAccordion.Root.Props<Value>,
    "className" | "style" | "children"
  > {
  /** Classes merged into the root. Accepts a callback that receives Base UI's accordion state. */
  className?: AccordionClassName<Value>;
  /** Classes for individual root layers. */
  ui?: AccordionStyle;
  /** Inline styles merged into the root. Accepts a callback that receives Base UI's accordion state. */
  style?: AccordionStyleProp<Value>;
  /** Control size; defaults to `md`. */
  size?: AccordionSize;
  /** Heading element used for every trigger; defaults to `h3`. */
  headingAs?: AccordionHeading;
  children?: React.ReactNode;
}

type AccordionItemClassName = UIAccordion.Item.Props["className"];

interface AccordionItemProps
  extends Omit<
    UIAccordion.Item.Props,
    "className" | "children" | "value" | "title"
  > {
  /** Value that identifies the item in the accordion value. */
  value: string;
  /** Visible heading inside the trigger. */
  title: React.ReactNode;
  /** Panel content. */
  children?: React.ReactNode;
  /** Classes merged into the item root. Accepts a callback that receives Base UI's item state. */
  className?: AccordionItemClassName;
  /** Classes for individual item slots. */
  ui?: AccordionItemStyle;
  /** Replaces the default plus indicator. */
  indicator?: React.ReactNode;
}

function Accordion<Value extends string = string>({
  className,
  ui: uiOverrides,
  style,
  size,
  headingAs = "h3",
  children,
  ...props
}: AccordionProps<Value>) {
  const ui = theme({ size });
  const rootClassName =
    typeof className === "function"
      ? (state: UIAccordion.Root.State<Value>) =>
          cn(ui.root(), className(state), uiOverrides?.root)
      : cn(ui.root(), className, uiOverrides?.root);

  return (
    <AccordionContext.Provider
      value={{ size: size ?? "md", headingAs }}
    >
      <UIAccordion.Root
        {...props}
        data-slot="root"
        data-size={size ?? "md"}
        className={rootClassName}
        style={style}
      >
        <span
          aria-hidden="true"
          data-slot="glass"
          className={cn(ui.glass(), uiOverrides?.glass)}
        >
          <span
            aria-hidden="true"
            data-slot="overlay"
            className={cn(ui.overlay(), uiOverrides?.overlay)}
          />
        </span>

        <div
          data-slot="content"
          className={cn(ui.content(), uiOverrides?.content)}
        >
          {children}
        </div>
      </UIAccordion.Root>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  value,
  title,
  children,
  className,
  ui: uiOverrides,
  indicator,
  ...props
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  const size = context?.size ?? "md";
  const headingAs = context?.headingAs ?? "h3";
  const ui = theme({ size });
  const itemClassName =
    typeof className === "function"
      ? (state: UIAccordion.Item.State) =>
          cn(ui.item(), className(state), uiOverrides?.root)
      : cn(ui.item(), className, uiOverrides?.root);

  return (
    <UIAccordion.Item
      {...props}
      value={value}
      data-slot="item"
      data-size={size}
      className={itemClassName}
    >
      <UIAccordion.Header
        data-slot="header"
        render={React.createElement(headingAs)}
        className={cn(ui.header(), uiOverrides?.header)}
      >
        <UIAccordion.Trigger
          data-slot="trigger"
          className={cn(ui.trigger(), uiOverrides?.trigger)}
        >
          <span
            data-slot="title"
            className={cn(ui.title(), uiOverrides?.title)}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            data-slot="indicator"
            className={cn(ui.indicator(), uiOverrides?.indicator)}
          >
            {indicator ?? (
              <span
                data-slot="indicator-icon"
                className={cn(ui.indicatorIcon(), uiOverrides?.indicatorIcon)}
              >
                <span
                  data-slot="indicator-bar"
                  className={cn(ui.indicatorBar(), uiOverrides?.indicatorBar)}
                />
                <span
                  data-slot="indicator-bar"
                  data-orientation="vertical"
                  className={cn(ui.indicatorBar(), uiOverrides?.indicatorBar)}
                />
              </span>
            )}
          </span>
        </UIAccordion.Trigger>
      </UIAccordion.Header>

      <UIAccordion.Panel
        data-slot="panel"
        className={cn(ui.panel(), uiOverrides?.panel)}
      >
        <div
          data-slot="panel-content"
          className={cn(ui.panelContent(), uiOverrides?.panelContent)}
        >
          {children}
        </div>
      </UIAccordion.Panel>
    </UIAccordion.Item>
  );
}

export { Accordion, AccordionItem };
export type {
  AccordionHeading,
  AccordionItemProps,
  AccordionItemStyle,
  AccordionProps,
  AccordionSize,
  AccordionStyle,
};
