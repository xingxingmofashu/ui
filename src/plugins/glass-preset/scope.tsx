import * as React from "react";

import type { GlassPreset } from "./provider";

type GlassPresetScopeProps = Omit<
  React.ComponentProps<"div">,
  "data-glass"
> & {
  /** Preset applied to this container and inherited by its descendants. */
  preset: GlassPreset;
};

/**
 * Applies a glass preset to a container without changing the global preset.
 */
function GlassPresetScope({
  preset,
  children,
  ...props
}: GlassPresetScopeProps) {
  return (
    <div {...props} data-glass={preset}>
      {children}
    </div>
  );
}

export { GlassPresetScope };
export type { GlassPresetScopeProps };
