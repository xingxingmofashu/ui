import * as React from "react";

function DashIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-icon="dash"
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
      <path d="M5 12h14" />
    </svg>
  );
}

export { DashIcon };
