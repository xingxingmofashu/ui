"use client";

import * as React from "react";

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

type GlassPresetProviderProps = {
  /** Controlled preset. Omit to let the provider manage its own state. */
  preset?: GlassPreset;
  /** Initial preset when the provider is uncontrolled. @default "thin" */
  defaultPreset?: GlassPreset;
  /** Optional `localStorage` key used to persist and restore the preset. */
  storageKey?: string;
  /** Called whenever `setPreset` requests a new preset. */
  onPresetChange?: (preset: GlassPreset) => void;
  children?: React.ReactNode;
};

type GlassPresetContextValue = {
  preset: GlassPreset;
  setPreset: (preset: GlassPreset) => void;
};

const GlassPresetContext =
  React.createContext<GlassPresetContextValue | null>(null);

function readInitialPreset(
  defaultPreset: GlassPreset,
  storageKey: string | undefined,
) {
  if (typeof window !== "undefined" && storageKey) {
    try {
      const stored = window.localStorage.getItem(storageKey);

      if (isGlassPreset(stored)) {
        return stored;
      }
    } catch {
      // Storage can be unavailable in private or sandboxed contexts.
    }
  }

  if (typeof document !== "undefined") {
    const attribute = document.documentElement.dataset.glass;

    if (isGlassPreset(attribute)) {
      return attribute;
    }
  }

  return defaultPreset;
}

type GlassPresetStoreSnapshot = {
  preset: GlassPreset;
  hydrated: boolean;
};

type GlassPresetStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => GlassPresetStoreSnapshot;
  getServerSnapshot: () => GlassPresetStoreSnapshot;
  setPreset: (preset: GlassPreset) => void;
};

/**
 * Keeps the first client render on the server snapshot, then reads persisted
 * state once hydration is complete.
 */
function createGlassPresetStore(
  defaultPreset: GlassPreset,
  storageKey: string | undefined,
): GlassPresetStore {
  const serverSnapshot: GlassPresetStoreSnapshot = {
    preset: defaultPreset,
    hydrated: false,
  };
  let snapshot = serverSnapshot;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      if (!snapshot.hydrated) {
        snapshot = {
          preset: readInitialPreset(defaultPreset, storageKey),
          hydrated: true,
        };
      }

      return snapshot;
    },
    getServerSnapshot() {
      return serverSnapshot;
    },
    setPreset(preset) {
      snapshot = { preset, hydrated: true };

      for (const listener of listeners) {
        listener();
      }
    },
  };
}

function GlassPresetProvider({
  preset,
  defaultPreset = DEFAULT_GLASS_PRESET,
  storageKey,
  onPresetChange,
  children,
}: GlassPresetProviderProps) {
  const controlled = preset !== undefined;
  const [store] = React.useState(() =>
    createGlassPresetStore(defaultPreset, storageKey),
  );
  const persisted = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const activePreset = preset ?? persisted.preset;

  const setPreset = React.useCallback(
    (next: GlassPreset) => {
      if (!controlled) {
        store.setPreset(next);
      }

      onPresetChange?.(next);
    },
    [controlled, onPresetChange, store],
  );

  React.useEffect(() => {
    if (!persisted.hydrated) {
      return;
    }

    document.documentElement.dataset.glass = activePreset;

    if (!storageKey) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, activePreset);
    } catch {
      // Storage can be unavailable in private or sandboxed contexts.
    }
  }, [activePreset, persisted.hydrated, storageKey]);

  const value = React.useMemo(
    () => ({ preset: activePreset, setPreset }),
    [activePreset, setPreset],
  );

  return (
    <GlassPresetContext.Provider value={value}>
      {children}
    </GlassPresetContext.Provider>
  );
}

function useGlassPreset() {
  const context = React.useContext(GlassPresetContext);

  if (context === null) {
    throw new Error("useGlassPreset must be used inside GlassPresetProvider");
  }

  return context;
}

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
  const presets = JSON.stringify(GLASS_PRESETS);
  const fallback = toScriptLiteral(defaultPreset);

  return `(()=>{const presets=${presets},root=document.documentElement;let stored=null;try{const key=${key};stored=key===null?null:localStorage.getItem(key)}catch{}const current=root.dataset.glass,preset=presets.includes(stored)?stored:presets.includes(current)?current:${fallback};root.dataset.glass=preset})()`;
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

export { GlassPresetProvider, useGlassPreset, GlassPresetScope, GlassPresetScript, getGlassPresetScript };

export type { GlassPreset, GlassPresetProviderProps, GlassPresetScopeProps, GlassPresetScriptOptions, GlassPresetScriptProps };
