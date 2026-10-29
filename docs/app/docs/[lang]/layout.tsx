import { i18nProvider } from "fumadocs-ui/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
import { isLocale, locales } from "@/lib/i18n";
import { translations } from "@/lib/layout.shared";
import { githubUrl, ogImage, siteDescription, siteName, siteUrl } from "@/lib/site";

import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "xingxingmofashu", url: githubUrl }],
  creator: "xingxingmofashu",
  publisher: "xingxingmofashu",
  category: "technology",
  keywords: [
    "React",
    "Tailwind CSS",
    "Base UI",
    "Liquid Glass",
    "React component library",
    siteName,
  ],
  openGraph: {
    type: "website",
    siteName,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
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
          {children}
        </DocsRootProvider>
      </body>
    </html>
  );
}
