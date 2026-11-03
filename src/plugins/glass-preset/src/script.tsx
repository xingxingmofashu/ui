import * as React from "react";

import type { GlassPreset } from "./provider";

type GlassPresetScriptOptions = {
  /** `localStorage` key read before React hydrates. */
  storageKey?: string;
  /** Preset used when storage and the existing attribute are both empty. */
  defaultPreset?: GlassPreset;
};

type GlassPresetScriptProps = GlassPresetScriptOptions & {
  /** CSP nonce for the inline script. */
  nonce?: string;
};

/** A JSON literal that cannot terminate the surrounding script element. */
function toScriptLiteral(value: unknown) {
  return JSON.stringify(value ?? null)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Returns the inline script that applies the persisted preset before React
 * hydrates. Render it in `<head>` to avoid a flash of the default material.
 */
function getGlassPresetScript({
  storageKey,
  defaultPreset = "thin",
}: GlassPresetScriptOptions = {}) {
  const key = storageKey === undefined ? "null" : toScriptLiteral(storageKey);
  const fallback = toScriptLiteral(defaultPreset);

  return `(()=>{const presets=["thin","regular","thick"],root=document.documentElement;let stored=null;try{const key=${key};stored=key===null?null:localStorage.getItem(key)}catch{}const current=root.dataset.glass,preset=presets.includes(stored)?stored:presets.includes(current)?current:${fallback};root.dataset.glass=preset})()`;
}

function GlassPresetScript({
  storageKey,
  defaultPreset,
  nonce,
}: GlassPresetScriptProps) {
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: getGlassPresetScript({ storageKey, defaultPreset }),
      }}
    />
  );
}

export { GlassPresetScript, getGlassPresetScript };
export type { GlassPresetScriptOptions, GlassPresetScriptProps };
