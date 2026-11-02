import type { ClassValue } from "tailwind-variants";

type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T["slots"]]?: ClassValue;
}>;

/**
 * Minimal tailwind-variants component config used to derive prop types from a
 * theme recipe. Mirrors Nuxt UI's `ComponentConfig` slot mapping.
 */
export type ComponentConfig<T extends Record<string, any>> = {
  slots: ComponentSlots<T>;
};
