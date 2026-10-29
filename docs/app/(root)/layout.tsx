import { i18nProvider } from "fumadocs-ui/i18n";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
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
        <DocsRootProvider
          lang="zh"
          i18n={i18nProvider(translations, "zh")}
        >
          <HomeLayout {...options} nav={{ ...options.nav, url: "/" }}>
            {children}
          </HomeLayout>
        </DocsRootProvider>
      </body>
    </html>
  );
}
