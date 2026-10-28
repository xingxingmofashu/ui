"use client";

import type { I18nProviderProps } from "fumadocs-ui/contexts/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { StaticSearchDialog } from "@/components/search";

export function DocsRootProvider({
  lang,
  i18n,
  children,
}: {
  lang: string;
  i18n: I18nProviderProps;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <RootProvider
      i18n={{
        ...i18n,
        onLocaleChange(nextLocale) {
          const rest = pathname.startsWith(`/${lang}`)
            ? pathname.slice(lang.length + 1)
            : pathname;

          // Reload the document instead of remounting the localized layout.
          // next-themes renders its theme script again when the [lang] root
          // layout is re-rendered on a client-side locale change, which React
          // 19 reports as "Encountered a script tag while rendering React
          // component". A full navigation keeps the script in the SSR HTML.
          window.location.assign(
            `/${nextLocale}${rest === "/" ? "" : rest}`,
          );
        },
      }}
      search={{ SearchDialog: StaticSearchDialog }}
    >
      {children}
    </RootProvider>
  );
}
