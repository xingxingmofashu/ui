import * as React from "react";

function ErrorIcon({
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
      <path d="M12 8v5" />
      <path d="M12 16.5h.01" />
    </svg>
  );
}

export { ErrorIcon };
