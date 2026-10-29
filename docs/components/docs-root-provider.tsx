"use client";

import type { I18nProviderProps } from "fumadocs-ui/contexts/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { StaticSearchDialog } from "@/components/search";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const docsPrefix = "/docs";

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
          const path =
            basePath && pathname.startsWith(basePath)
              ? pathname.slice(basePath.length) || "/"
              : pathname;
          const docsLocalePrefix = `${docsPrefix}/${lang}`;
          const rest =
            path === docsLocalePrefix ||
            path.startsWith(`${docsLocalePrefix}/`)
              ? path.slice(docsLocalePrefix.length)
              : "";
          const nextPath = `${docsPrefix}/${nextLocale}${rest}`;

          // Reload the document instead of remounting the localized layout.
          // next-themes renders its theme script again when the [lang] root
          // layout is re-rendered on a client-side locale change, which React
          // 19 reports as "Encountered a script tag while rendering React
          // component". A full navigation keeps the script in the SSR HTML.
          window.location.assign(`${basePath}${nextPath}`);
        },
      }}
      search={{ SearchDialog: StaticSearchDialog }}
    >
      {children}
    </RootProvider>
  );
}
