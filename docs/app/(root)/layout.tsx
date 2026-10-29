import { i18nProvider } from "fumadocs-ui/i18n";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
import { baseOptions, translations } from "@/lib/layout.shared";
import {
  absoluteUrl,
  githubUrl,
  ogImage,
  siteDescriptionZh,
  siteName,
  siteUrl,
} from "@/lib/site";

import "../globals.css";

const title = `${siteName} — Liquid Glass React components`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${siteName}`,
  },
  description: siteDescriptionZh,
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
    "React 组件库",
    "@xingxingmofashu/ui",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "zh-CN": absoluteUrl("/"),
      en: absoluteUrl("/docs/en"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title,
    description: siteDescriptionZh,
    siteName,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescriptionZh,
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
