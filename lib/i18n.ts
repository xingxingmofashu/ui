import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "zh",
  languages: ["zh", "en"],
  // Locale folders: content/docs/zh and content/docs/en.
  parser: "dir",
  // The site is statically exported, so every locale keeps its URL prefix.
  hideLocale: "never",
});

export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
