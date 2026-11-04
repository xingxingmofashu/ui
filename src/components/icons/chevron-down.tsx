import * as React from "react";

function ChevronDownIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-icon="chevron-down"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className={className}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export { ChevronDownIcon };
