"use client";

import { Toggle as UIToggle } from "@base-ui/react/toggle";
import { ToggleGroup as UIToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "cn";
import * as React from "react";

import theme from "../theme/toggle-group";

type ToggleGroupSize = "xs" | "sm" | "md" | "lg" | "xl";

type ToggleGroupSlot = "root" | "glass" | "indicator";

type ToggleGroupStyle = Partial<Record<ToggleGroupSlot, string>>;

type ToggleGroupItemSlot = "root" | "content" | "icon" | "label";

type ToggleGroupItemStyle = Partial<
  Record<ToggleGroupItemSlot, string>
>;

type ToggleGroupContextValue = {
  size: ToggleGroupSize;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
);

type ToggleGroupProps<Value extends string = string> = Omit<
  UIToggleGroup.Props<Value>,
  "className" | "style" | "children"
> & {
  /** Classes merged into the group root. */
  className?: string;
  /** Classes for individual group layers. */
  ui?: ToggleGroupStyle;
  /** Inline styles merged into the group root. */
  style?: React.CSSProperties;
  /** Control size; defaults to `md`. */
  size?: ToggleGroupSize;
  /** Ref to the group root. */
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
};

type ToggleGroupItemAccessibleName =
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | {
      children: React.ReactNode;
      "aria-label"?: string;
      "aria-labelledby"?: string;
    };

type ToggleGroupItemProps<Value extends string = string> = Omit<
  UIToggle.Props<Value>,
  "className" | "children"
> & {
  /** Classes merged into the item root. */
  className?: string;
  /** Classes for individual item slots. */
  ui?: ToggleGroupItemStyle;
  /** Icon rendered inside the item. */
  icon?: React.ReactNode;
  /** Text or custom content rendered inside the item. */
  children?: React.ReactNode;
} & ToggleGroupItemAccessibleName;

function hasContent(value: React.ReactNode) {
  return React.Children.toArray(value).some((child) => child !== "");
}

type IndicatorState = {
  x: number;
  y: number;
  value: string | null;
  element: HTMLElement;
};

function ToggleGroup<Value extends string = string>({
  className,
  ui: uiOverrides,
  style,
  size,
  ref,
  children,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  ...props
}: ToggleGroupProps<Value>) {
  const ui = theme({ size });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const previousState = React.useRef<IndicatorState | null>(null);
  const animationTimeout = React.useRef<number | null>(null);
  const [animating, setAnimating] = React.useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<Value[]>(() => [
    ...(defaultValue ?? []),
  ]);
  const currentValue = isControlled ? value : internalValue;
  const normalizedValue = React.useMemo<readonly Value[]>(
    () => (multiple ? currentValue : currentValue.slice(0, 1)),
    [currentValue, multiple],
  );

  React.useEffect(() => {
    if (!isControlled && !multiple && internalValue.length > 1) {
      setInternalValue(internalValue.slice(0, 1));
    }
  }, [internalValue, isControlled, multiple]);

  const handleValueChange: NonNullable<
    UIToggleGroup.Props<Value>["onValueChange"]
  > = (nextValue, details) => {
    const next = multiple ? nextValue : nextValue.slice(0, 1);

    onValueChange?.(next, details);

    if (details.isCanceled) {
      return;
    }

    if (!isControlled) {
      setInternalValue(next);
    }
  };

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const updateIndicator = React.useCallback(() => {
    const root = rootRef.current;
    const indicator = indicatorRef.current;

    if (!root || !indicator) {
      return;
    }

    const pressed = root.querySelector<HTMLElement>(
      '[data-slot="item"][data-pressed]',
    );

    if (!pressed) {
      indicator.dataset.visible = "false";
      root.dataset.hasValue = "false";
      previousState.current = null;
      return;
    }

    const y = pressed.offsetTop;
    const x = pressed.offsetLeft;
    const width = pressed.offsetWidth;
    const height = pressed.offsetHeight;

    if (width === 0 || height === 0) {
      indicator.dataset.visible = "false";
      root.dataset.hasValue = "false";
      previousState.current = null;
      return;
    }

    const previous = previousState.current;
    const pressedValue = pressed.dataset.value ?? null;
    const vertical = root.dataset.orientation === "vertical";
    const selectionChanged =
      previous !== null &&
      (pressedValue !== null && previous.value !== null
        ? pressedValue !== previous.value
        : pressed !== previous.element);

    if (
      selectionChanged &&
      (previous.x !== x || previous.y !== y)
    ) {
      const delta = vertical ? y - previous.y : x - previous.x;

      if (delta !== 0) {
        root.style.setProperty(
          "--ui-toggle-group-origin",
          vertical
            ? delta > 0
              ? "center top"
              : "center bottom"
            : delta > 0
              ? "left center"
              : "right center",
        );

        setAnimating(true);

        if (animationTimeout.current !== null) {
          window.clearTimeout(animationTimeout.current);
        }

        animationTimeout.current = window.setTimeout(() => {
          animationTimeout.current = null;
          setAnimating(false);
        }, 220);
      }
    }

    indicator.style.setProperty("--ui-toggle-group-indicator-x", `${x}px`);
    indicator.style.setProperty("--ui-toggle-group-indicator-y", `${y}px`);
    indicator.style.setProperty(
      "--ui-toggle-group-indicator-width",
      `${width}px`,
    );
    indicator.style.setProperty(
      "--ui-toggle-group-indicator-height",
      `${height}px`,
    );
    indicator.dataset.visible = "true";
    root.dataset.hasValue = "true";
    previousState.current = {
      x,
      y,
      value: pressedValue,
      element: pressed,
    };
  }, []);

  React.useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    updateIndicator();

    let resizeObserver: ResizeObserver | null = null;
    const observed = new Set<Element>();
    const observeItems = () => {
      if (!resizeObserver) {
        return;
      }

      root.querySelectorAll<HTMLElement>('[data-slot="item"]').forEach((item) => {
        if (!observed.has(item)) {
          resizeObserver?.observe(item);
          observed.add(item);
        }
      });
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(root);
      observeItems();
    }

    const mutationObserver = new MutationObserver(() => {
      observeItems();
      updateIndicator();
    });

    mutationObserver.observe(root, {
      attributes: true,
      attributeFilter: [
        "aria-pressed",
        "data-pressed",
        "data-orientation",
        "disabled",
        "hidden",
      ],
      childList: true,
      subtree: true,
    });

    const frame =
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame(updateIndicator)
        : null;

    document.fonts?.ready.then(updateIndicator).catch(() => {});

    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [updateIndicator]);

  React.useEffect(
    () => () => {
      if (animationTimeout.current !== null) {
        window.clearTimeout(animationTimeout.current);
      }
    },
    [],
  );

  return (
    <ToggleGroupContext.Provider value={{ size: size ?? "md" }}>
      <UIToggleGroup
        {...props}
        ref={setRootRef}
        value={normalizedValue}
        multiple={multiple}
        onValueChange={handleValueChange}
        data-slot="root"
        data-size={size ?? "md"}
        data-animating={animating || undefined}
        className={cn(ui.root(), className, uiOverrides?.root)}
        style={style}
      >
        <span
          aria-hidden="true"
          data-slot="glass"
          className={cn(ui.glass(), uiOverrides?.glass)}
        >
          <span aria-hidden="true" data-layer="rim" className="ui-glass-rim" />
        </span>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          data-slot="indicator"
          data-visible="false"
          data-animating={animating || undefined}
          className={cn(ui.indicator(), uiOverrides?.indicator)}
        />

        {children}
      </UIToggleGroup>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem<Value extends string = string>({
  className,
  ui: uiOverrides,
  icon,
  children,
  ...props
}: ToggleGroupItemProps<Value>) {
  const context = React.useContext(ToggleGroupContext);
  const size = context?.size ?? "md";
  const ui = theme({ size });
  const hasLabel = hasContent(children);
  const hasAccessibleName =
    hasLabel ||
    Boolean(props["aria-label"]) ||
    Boolean(props["aria-labelledby"]);

  return (
    <UIToggle
      {...props}
      data-slot="item"
      data-size={size}
      data-value={props.value}
      className={cn(ui.item(), className, uiOverrides?.root)}
    >
      <span
        data-slot="content"
        className={cn(ui.content(), uiOverrides?.content)}
      >
        {icon != null ? (
          <span
            data-slot="icon"
            aria-hidden={hasAccessibleName || undefined}
            className={cn(ui.icon(), uiOverrides?.icon)}
          >
            {icon}
          </span>
        ) : null}

        {hasLabel ? (
          <span
            data-slot="label"
            className={cn(ui.label(), uiOverrides?.label)}
          >
            {children}
          </span>
        ) : null}
      </span>
    </UIToggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
export type {
  ToggleGroupStyle,
  ToggleGroupItemStyle,
  ToggleGroupItemProps,
  ToggleGroupProps,
  ToggleGroupSize,
};
