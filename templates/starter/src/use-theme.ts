import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const themeKey = "lumen-theme";

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const stored = window.localStorage.getItem(themeKey);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Fall back to the system preference when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    const dark = theme === "dark";

    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(themeKey, theme);
    } catch {
      // The theme still applies for this session.
    }
  }, [theme]);

  return { theme, setTheme };
}
