import { cn } from "cn";
import type { ClassValue } from "tailwind-variants";

/** A component's `ui` slot map, derived from its theme slots. */
type UISlots<Slots> = {
  [Key in keyof Slots]?: ClassValue;
};

/**
 * Merges `ui` slot maps in order. Later sources win conflicts through `cn`.
 *
 * Call it with the root `ui` first, then each narrower item or group map:
 *
 * ```ts
 * mergeUI(ui, group.ui, item.ui)
 * ```
 */
function mergeUI<Slots = Record<string, ClassValue>>(
  ui?: UISlots<Slots> | undefined,
  ...rest: Array<UISlots<NoInfer<Slots>> | undefined>
): UISlots<Slots> {
  const merged: UISlots<Slots> = {};

  for (const source of [ui, ...rest]) {
    if (!source) {
      continue;
    }

    for (const key of Object.keys(source) as Array<keyof Slots>) {
      merged[key] = cn(merged[key], source[key]);
    }
  }

  return merged;
}

export { mergeUI };
export type { UISlots };
