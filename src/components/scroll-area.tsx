"use client";

import { ScrollArea as UIScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/scroll-area";

/** Scrollbar axes rendered by the scroll area. */
type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

type ScrollAreaProps = Omit<
  UIScrollArea.Root.Props,
  "children" | "className" | "style"
> & {
  /** Scrollable content. */
  children?: React.ReactNode;
  /** Scrollbar axes to render. Defaults to `"vertical"`. */
  orientation?: ScrollAreaOrientation;
  /** Tailwind classes merged into the root. */
  className?: any;
};

/**
 * A native scroll container with custom liquid glass scrollbars.
 *
 * The root owns the visible glass surface. Give it a height (for example
 * `className="h-64"`) to create a scrollable viewport.
 */
function ScrollArea({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaProps) {
  const ui = theme();

  return (
    <UIScrollArea.Root
      {...props}
      data-slot="root"
      data-orientation={orientation}
      className={cn(ui.root(), className)}
    >
      <span aria-hidden="true" data-slot="glass" className={ui.glass()}>
        <span
          aria-hidden="true"
          data-slot="overlay"
          className={ui.overlay()}
        />
      </span>

      <UIScrollArea.Viewport
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-slot="viewport"
        className={ui.viewport()}
      >
        <UIScrollArea.Content data-slot="content" className={ui.content()}>
          {children}
        </UIScrollArea.Content>
      </UIScrollArea.Viewport>

      {orientation !== "horizontal" ? (
        <UIScrollArea.Scrollbar
          data-slot="scrollbar"
          orientation="vertical"
          className={ui.scrollbar()}
        >
          <UIScrollArea.Thumb data-slot="thumb" className={ui.thumb()} />
        </UIScrollArea.Scrollbar>
      ) : null}

      {orientation !== "vertical" ? (
        <UIScrollArea.Scrollbar
          data-slot="scrollbar"
          orientation="horizontal"
          className={ui.scrollbar()}
        >
          <UIScrollArea.Thumb data-slot="thumb" className={ui.thumb()} />
        </UIScrollArea.Scrollbar>
      ) : null}

      {orientation === "both" ? (
        <UIScrollArea.Corner data-slot="corner" className={ui.corner()} />
      ) : null}
    </UIScrollArea.Root>
  );
}

export { ScrollArea };
export type { ScrollAreaOrientation, ScrollAreaProps };
