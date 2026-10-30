import * as React from "react";

function PlusIcon({
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
      strokeLinecap="square"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2.5 12h19M12 21.5v-19" />
    </svg>
  );
}

export { PlusIcon };
