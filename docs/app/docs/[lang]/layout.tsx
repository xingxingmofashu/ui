import { i18nProvider } from "fumadocs-ui/i18n";
import { DocsLayout } from "fumadocs-ui/layouts/glass";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
import { i18n, isLocale, locales } from "@/lib/i18n";
import { baseOptions, translations } from "@/lib/layout.shared";
import { source } from "@/lib/source";

import "../../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Liquid Glass UI",
    template: "%s · Liquid Glass UI",
  },
  description:
    "Liquid glass components for React, documented with real components.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function DocsLocaleLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <DocsRootProvider lang={lang} i18n={i18nProvider(translations, lang)}>
          <DocsLayout {...baseOptions(lang)} tree={source.getPageTree(lang)}>
            {children}
          </DocsLayout>
        </DocsRootProvider>
      </body>
    </html>
  );
}
