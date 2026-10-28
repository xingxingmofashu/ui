"use client";

import { Accordion as UIAccordion } from "@base-ui/react/accordion";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/accordion";

type AccordionProps<Value extends string = string> = Omit<
  UIAccordion.Root.Props<Value>,
  "className" | "style" | "children"
> &
  VariantProps<typeof theme> & {
    /** Tailwind classes merged into the root. */
    className?: any;
    children?: React.ReactNode;
  };

type AccordionItemProps = Omit<
  UIAccordion.Item.Props,
  "className" | "children" | "style" | "value" | "title"
> & {
  /** Value that identifies the item in the accordion value. */
  value: string;
  /** Visible heading inside the trigger. */
  title: React.ReactNode;
  /** Panel content. */
  children?: React.ReactNode;
  /** Tailwind classes merged into the item root. */
  className?: any;
  /** Replaces the default plus indicator. */
  indicator?: React.ReactNode;
};

function Accordion<Value extends string = string>({
  className,
  size,
  children,
  ...props
}: AccordionProps<Value>) {
  const ui = theme({ size });

  return (
    <UIAccordion.Root
      {...props}
      data-slot="root"
      className={cn(ui.root(), className)}
    >
      <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
        <span
          aria-hidden="true"
          data-slot="overlay"
          className={ui.overlay()}
        />
      </span>

      <div data-slot="content" className={ui.content()}>
        {children}
      </div>
    </UIAccordion.Root>
  );
}

function AccordionItem({
  value,
  title,
  children,
  className,
  indicator,
  ...props
}: AccordionItemProps) {
  const ui = theme();

  return (
    <UIAccordion.Item
      {...props}
      value={value}
      data-slot="item"
      className={cn(ui.item(), className)}
    >
      <UIAccordion.Header data-slot="header" className={ui.header()}>
        <UIAccordion.Trigger data-slot="trigger" className={ui.trigger()}>
          <span data-slot="title" className={ui.title()}>
            {title}
          </span>

          <span
            aria-hidden="true"
            data-slot="indicator"
            className={ui.indicator()}
          >
            {indicator ?? (
              <span data-slot="indicator-icon" className={ui.indicatorIcon()}>
                <span data-slot="indicator-bar" className={ui.indicatorBar()} />
                <span
                  data-slot="indicator-bar"
                  data-orientation="vertical"
                  className={ui.indicatorBar()}
                />
              </span>
            )}
          </span>
        </UIAccordion.Trigger>
      </UIAccordion.Header>

      <UIAccordion.Panel data-slot="panel" className={ui.panel()}>
        <div data-slot="panel-content" className={ui.panelContent()}>
          {children}
        </div>
      </UIAccordion.Panel>
    </UIAccordion.Item>
  );
}

export { Accordion, AccordionItem };
export type { AccordionItemProps, AccordionProps };
