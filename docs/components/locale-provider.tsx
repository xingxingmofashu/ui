"use client";

import { createContext, useContext, type ReactNode } from "react";

export type DocsLocale = "zh" | "en";

const DocsLocaleContext = createContext<DocsLocale>("zh");

export function DocsLocaleProvider({
  locale,
  children,
}: {
  locale: DocsLocale;
  children: ReactNode;
}) {
  return (
    <DocsLocaleContext.Provider value={locale}>
      {children}
    </DocsLocaleContext.Provider>
  );
}

export function useDocsLocale() {
  return useContext(DocsLocaleContext);
}
