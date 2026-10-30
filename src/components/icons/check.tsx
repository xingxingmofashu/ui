import * as React from "react";

function CheckIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      data-icon="check"
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
      <path d="m4 12 6 6 10-12" />
    </svg>
  );
}

export { CheckIcon };
