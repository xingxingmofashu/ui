import { i18nProvider } from "fumadocs-ui/i18n";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
import type { HomeLocale } from "@/components/home/copy";
import { LocaleDetect } from "@/components/locale-detect";
import { baseOptions, translations } from "@/lib/layout.shared";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function MarketingShell({
  lang,
  children,
  detectLocale = false,
}: {
  lang: HomeLocale;
  children: ReactNode;
  detectLocale?: boolean;
}) {
  const options = baseOptions(lang);

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        {detectLocale ? <LocaleDetect basePath={basePath} /> : null}

        <DocsRootProvider lang={lang} i18n={i18nProvider(translations, lang)}>
          <HomeLayout
            {...options}
            i18n={false}
            nav={{ ...options.nav, url: lang === "zh" ? "/zh" : "/" }}
          >
            {children}
          </HomeLayout>
        </DocsRootProvider>
      </body>
    </html>
  );
}
