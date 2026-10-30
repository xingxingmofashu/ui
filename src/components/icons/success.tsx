import * as React from "react";

function SuccessIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.5 3 3 5.5-6" />
    </svg>
  );
}

export { SuccessIcon };
