import { type ClassValue, tv } from "tailwind-variants";
import { cn } from "cn";
import * as React from "react";

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};

const cardTheme = tv({
  slots: {
    root: [
      "relative grid w-full min-w-0 rounded-[2rem]",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus",
    ],
    glass: [
      "ui-glass ui-glass-inner ui-glass-highlight",
      "pointer-events-none relative col-start-1 row-start-1 h-full w-full overflow-hidden rounded-[inherit]",
    ],
    overlay: "ui-glass-rim",
    layout: [
      "relative z-10 col-start-1 row-start-1 flex min-w-0 flex-col",
      "overflow-hidden rounded-[inherit]",
    ],
    header: "min-w-0 p-4 sm:px-6",
    title:
      "min-w-0 font-semibold text-ui-ink [filter:var(--ui-drop-shadow-label)]",
    description: "mt-1 min-w-0 text-sm text-ui-ink opacity-60",
    body: "min-w-0 p-4 text-ui-ink sm:p-6",
    footer: "min-w-0 p-4 sm:px-6",
  },
});

type Card = ComponentConfig<typeof cardTheme>;

type CardProps = Omit<
  React.ComponentProps<"div">,
  "children" | "className" | "style" | "title"
> & {
  /** Classes merged into the root element. */
  className?: ClassValue;
  /** Inline styles merged into the same element as `className`. */
  style?: React.CSSProperties;
  /** Tailwind classes for internal slots, keyed by `data-slot`. */
  ui?: Card["slots"];
  /** Optional visible title rendered inside the card header. */
  title?: React.ReactNode;
  /** Optional supporting copy rendered under the title. */
  description?: React.ReactNode;
  /** Card body content. */
  children?: React.ReactNode;
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
  const styles = cardTheme();

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
