import { i18nProvider } from "fumadocs-ui/i18n";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsLocaleProvider } from "@/components/locale-provider";
import { StaticSearchDialog } from "@/components/search";
import { baseOptions, translations } from "@/lib/layout.shared";

import "../globals.css";

export const metadata: Metadata = {
  title: "Liquid Glass UI",
  description: "基于 React、Tailwind CSS 4 与 Base UI 的液态玻璃组件库。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const options = baseOptions("zh");

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          i18n={i18nProvider(translations, "zh")}
          search={{ SearchDialog: StaticSearchDialog }}
        >
          <DocsLocaleProvider locale="zh">
            <HomeLayout {...options} nav={{ ...options.nav, url: "/" }}>
              {children}
            </HomeLayout>
          </DocsLocaleProvider>
        </RootProvider>
      </body>
    </html>
  );
}
