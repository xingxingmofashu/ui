import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "group/field flex w-full min-w-0 flex-col text-ui-ink",
      "gap-[var(--ui-field-gap)]",
    ],
    label: [
      "w-fit font-medium text-ui-ink",
      "text-[length:var(--ui-field-label-size)]",
      "[filter:var(--ui-drop-shadow-label)]",
      "group-data-[disabled]/field:opacity-60",
    ],
    error: [
      "min-w-0 font-medium leading-relaxed",
      "text-red-700 ui-dark:text-red-400",
      "text-[length:var(--ui-field-message-size)]",
      "transition-opacity duration-150 ease-out",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "motion-reduce:transition-none",
      "group-data-[disabled]/field:opacity-60",
    ],
    description: [
      "text-ui-ink opacity-60 leading-relaxed",
      "text-[length:var(--ui-field-message-size)]",
      "group-data-[disabled]/field:opacity-50",
    ],
  },
  variants: {
    size: {
      xs: {
        root: [
          "[--ui-field-gap:4px] [--ui-field-label-size:0.75rem]",
          "[--ui-field-message-size:0.75rem]",
        ],
      },
      sm: {
        root: [
          "[--ui-field-gap:4px] [--ui-field-label-size:0.75rem]",
          "[--ui-field-message-size:0.75rem]",
        ],
      },
      md: {
        root: [
          "[--ui-field-gap:6px] [--ui-field-label-size:0.875rem]",
          "[--ui-field-message-size:0.875rem]",
        ],
      },
      lg: {
        root: [
          "[--ui-field-gap:6px] [--ui-field-label-size:0.875rem]",
          "[--ui-field-message-size:0.875rem]",
        ],
      },
      xl: {
        root: [
          "[--ui-field-gap:8px] [--ui-field-label-size:1rem]",
          "[--ui-field-message-size:1rem]",
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
