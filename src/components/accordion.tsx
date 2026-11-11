"use client";

import { Accordion as UIAccordion } from "@base-ui/react/accordion";
import { cn, type ClassValue } from "cn";
import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type ComponentConfig } from "../internal/tv";
import theme from "../theme/accordion";
import { mergeUI } from "../utils/ui";

import { PlusIcon } from "./icons/plus";

type Accordion = ComponentConfig<typeof theme>;

/** One panel managed by the accordion. */
type AccordionItemProps = Omit<
  UIAccordion.Item.Props,
  "children" | "className" | "content" | "style" | "title" | "value"
> & {
  /** Value that identifies the item in the accordion value. */
  value: any;
  /** Visible heading inside the trigger. */
  title: React.ReactNode;
  /** Panel content. */
  content?: React.ReactNode;
  /** Replaces the default plus icon. Set to `false` to hide the indicator. */
  indicator?: React.ReactNode | false;
  /** Tailwind classes merged into the item root. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for this item's internal slots, keyed by `data-slot`. */
  ui?: Partial<
    Pick<
      Accordion["slots"],
      | "item"
      | "header"
      | "trigger"
      | "title"
      | "indicator"
      | "indicatorIcon"
      | "panel"
      | "panelContent"
    >
  >;
};

type AccordionProps<Value = any> = Omit<
  UIAccordion.Root.Props<Value>,
  "className" | "children" | "style"
> &
  VariantProps<typeof theme> & {
    /** Panels rendered by the accordion. */
    items: readonly AccordionItemProps[];
    /** Tailwind classes merged into the root. */
    className?: ClassValue;
    /** Inline styles merged into the same element as `className`. */
    style?: React.CSSProperties;
    /** Tailwind classes for internal slots, keyed by `data-slot`. */
    ui?: Accordion["slots"];
  };

function Accordion<Value = any>({
  className,
  style,
  ui,
  size,
  items,
  ...props
}: AccordionProps<Value>) {
  const styles = theme({ size });

  return (
    <UIAccordion.Root
      {...props}
      style={style}
      data-slot="root"
      className={cn(styles.root(), ui?.root, className)}
    >
      <span
        aria-hidden="true"
        data-slot="glass"
        className={cn(styles.glass(), ui?.glass)}
      >
        <span
          aria-hidden="true"
          data-slot="overlay"
          className={cn(styles.overlay(), ui?.overlay)}
        />
      </span>

      <div data-slot="content" className={cn(styles.content(), ui?.content)}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            {...item}
            ui={mergeUI(ui, item.ui)}
          />
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
  style,
  ui,
  indicator,
  ref,
  ...props
}: AccordionItemProps) {
  const styles = theme();

  return (
    <UIAccordion.Item
      {...props}
      ref={ref}
      value={value}
      style={style}
      data-slot="item"
      className={cn(styles.item(), ui?.item, className)}
    >
      <UIAccordion.Header
        data-slot="header"
        className={cn(styles.header(), ui?.header)}
      >
        <UIAccordion.Trigger
          data-slot="trigger"
          className={cn(styles.trigger(), ui?.trigger)}
        >
          <span data-slot="title" className={cn(styles.title(), ui?.title)}>
            {title}
          </span>

          {indicator === false ? null : (
            <span
              aria-hidden="true"
              data-slot="indicator"
              className={cn(styles.indicator(), ui?.indicator)}
            >
              {indicator === undefined ? (
                <PlusIcon
                  data-slot="indicator-icon"
                  className={cn(styles.indicatorIcon(), ui?.indicatorIcon)}
                />
              ) : (
                indicator
              )}
            </span>
          )}
        </UIAccordion.Trigger>
      </UIAccordion.Header>

      <UIAccordion.Panel
        data-slot="panel"
        className={cn(styles.panel(), ui?.panel)}
      >
        <div
          data-slot="panel-content"
          className={cn(styles.panelContent(), ui?.panelContent)}
        >
          {content}
        </div>
      </UIAccordion.Panel>
    </UIAccordion.Item>
  );
}

export { Accordion };
export type { AccordionItemProps, AccordionProps };
