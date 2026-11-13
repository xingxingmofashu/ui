import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type ThemePreference = "system" | Theme;

const themeKey = "lumen-theme";
const darkQuery = "(prefers-color-scheme: dark)";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function readPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const stored = window.localStorage.getItem(themeKey);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Fall back to the system preference when storage is blocked.
  }

  return "system";
}

function applyTheme(preference: ThemePreference, theme: Theme) {
  const root = document.documentElement;
  const dark = theme === "dark";

  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
  root.style.colorScheme = theme;

  const scheme = document.querySelector('meta[name="color-scheme"]');

  if (scheme instanceof HTMLMetaElement) {
    // "light dark" keeps following the system preference; a stored value pins
    // the scheme for the no-CSS and no-JS paths.
    scheme.content = preference === "system" ? "light dark" : preference;
  }

  const color = document.querySelector('meta[name="theme-color"]');

  if (color instanceof HTMLMetaElement) {
    color.content = dark ? "#07080b" : "#eceef2";
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    applyTheme(preference, theme);
  }, [preference, theme]);

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const onChange = () => setSystemTheme(getSystemTheme());

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== themeKey) {
        return;
      }

      setPreference(
        event.newValue === "light" || event.newValue === "dark"
          ? event.newValue
          : "system",
      );
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    const system = getSystemTheme();
    const next: Theme = theme === "dark" ? "light" : "dark";
    // Choosing the value the system already uses returns to the system
    // preference. Do not pin the override to that transient value.
    const returnToSystem = next === system;

    try {
      if (returnToSystem) {
        window.localStorage.removeItem(themeKey);
      } else {
        window.localStorage.setItem(themeKey, next);
      }
    } catch {
      // The theme still applies for this session.
    }

    setPreference(returnToSystem ? "system" : next);
  }, [theme]);

  return { preference, theme, toggleTheme };
}
