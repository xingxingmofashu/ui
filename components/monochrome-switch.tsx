"use client";

import { Switch } from "@xingxingmofashu.me/ui";
import type { ComponentProps, CSSProperties } from "react";

const monochromeSwitch = {
  "--ui-switch-on": "var(--docs-switch-on)",
  "--ui-switch-off": "var(--docs-switch-off)",
} as CSSProperties;

/**
 * The UI package ships a green switch by default. The docs use the same
 * component with a black-and-white track, never a replica or a screenshot.
 */
export function MonochromeSwitch({
  style,
  ...props
}: ComponentProps<typeof Switch>) {
  return <Switch {...props} style={{ ...monochromeSwitch, ...style }} />;
}
