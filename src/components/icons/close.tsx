import * as React from "react";

function CloseIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export { CloseIcon };
