/** Shared glass material presets exposed by `data-glass`. */
const GLASS_PRESETS = ["thin", "soft", "regular", "thick"] as const;

type GlassPreset = (typeof GLASS_PRESETS)[number];

const DEFAULT_GLASS_PRESET: GlassPreset = "thin";

function isGlassPreset(value: unknown): value is GlassPreset {
  return (
    typeof value === "string" &&
    (GLASS_PRESETS as readonly string[]).includes(value)
  );
}

export { DEFAULT_GLASS_PRESET, GLASS_PRESETS, isGlassPreset };
export type { GlassPreset };
