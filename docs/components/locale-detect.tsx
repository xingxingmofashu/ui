"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleDetect({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/index.html") return;
    if (window.location.search.indexOf("noredirect") !== -1) return;
    if (navigator.webdriver) return;

    const ua = navigator.userAgent.toLowerCase();
    if (
      ua.indexOf("bot") !== -1 ||
      ua.indexOf("crawler") !== -1 ||
      ua.indexOf("spider") !== -1
    ) {
      return;
    }

    let stored: string | null = null;

    try {
      stored = window.localStorage.getItem("ui-locale");
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    }

    if (stored === "en") return;

    if (stored === "zh") {
      window.location.replace(`${basePath}/zh`);
      return;
    }

    const languages =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language ?? ""];
    const primary = String(languages[0] ?? "").toLowerCase();

    if (primary.startsWith("zh")) {
      window.location.replace(`${basePath}/zh`);
    }
  }, [basePath, pathname]);

  return null;
}
