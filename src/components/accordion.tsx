"use client";

import { Accordion as UIAccordion } from "@base-ui/react/accordion";
import { cn } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import theme from "../theme/accordion";

import { PlusIcon } from "./icons/plus";

/** One panel managed by the accordion. */
type AccordionItemProps = {
  /** Value that identifies the item in the accordion value. */
  value: string;
  /** Visible heading inside the trigger. */
  title: React.ReactNode;
  /** Panel content. */
  content?: React.ReactNode;
  /** Disables this item. */
  disabled?: boolean;
  /** Called when this panel opens or closes. */
  onOpenChange?: UIAccordion.Item.Props["onOpenChange"];
  /** Tailwind classes merged into the item root. */
  className?: any;
};

type AccordionProps<Value extends string = string> = Omit<
  UIAccordion.Root.Props<Value>,
  "className" | "style" | "children"
> &
  VariantProps<typeof theme> & {
    /** Panels rendered by the accordion. */
    items: readonly AccordionItemProps[];
    /** Tailwind classes merged into the root. */
    className?: any;
  };

function Accordion<Value extends string = string>({
  className,
  size,
  items,
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
        {items.map((item) => (
          <AccordionItem key={item.value} {...item} />
        ))}
      </div>
    </UIAccordion.Root>
  );
}

function AccordionItem({
  value,
  title,
  content,
  className,
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
            <PlusIcon
              data-slot="indicator-icon"
              className={ui.indicatorIcon()}
            />
          </span>
        </UIAccordion.Trigger>
      </UIAccordion.Header>

      <UIAccordion.Panel data-slot="panel" className={ui.panel()}>
        <div data-slot="panel-content" className={ui.panelContent()}>
          {content}
        </div>
      </UIAccordion.Panel>
    </UIAccordion.Item>
  );
}

export { Accordion };
export type { AccordionItemProps, AccordionProps };
