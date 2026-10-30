import * as React from "react";

function LoadingIcon({
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
      <circle cx="12" cy="12" r="8" opacity="0.25" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}

export { LoadingIcon };
