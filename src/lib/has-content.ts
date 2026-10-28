import * as React from "react";

/** Treat empty strings, booleans, and empty arrays as absent while keeping 0. */
export function hasContent(value: React.ReactNode) {
  return React.Children.toArray(value).some((child) => child !== "");
}
