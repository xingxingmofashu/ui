import type { Metadata } from "next";

import { locales, type Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  githubUrl,
  ogImage,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site";

type DocsPageMetadataOptions = {
  lang: Locale;
  title: string;
  description?: string;
  slug: string[];
  canonicalSlug?: string[];
};

const languageCode = (lang: Locale) => (lang === "zh" ? "zh-CN" : "en");
const openGraphLocale = (lang: Locale) => (lang === "zh" ? "zh_CN" : "en_US");

function docsPath(lang: Locale, slug: string[]) {
  return `/docs/${lang}/${slug.join("/")}`;
}

function languageAlternates(slug: string[]) {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[languageCode(locale)] = absoluteUrl(docsPath(locale, slug));
  }

  languages["x-default"] = absoluteUrl(docsPath("en", slug));

  return languages;
}

export function docsPageMetadata({
  lang,
  title,
  description,
  slug,
  canonicalSlug = slug,
}: DocsPageMetadataOptions): Metadata {
  const summary = description ?? siteDescription;
  const canonical = absoluteUrl(docsPath(lang, canonicalSlug));
  const fullTitle = `${title} · ${siteName}`;

  return {
    title,
    description: summary,
    keywords: [
      "React",
      "Tailwind CSS",
      "Base UI",
      "Liquid Glass",
      "React component library",
      title,
    ],
    alternates: {
      canonical,
      languages: languageAlternates(slug),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: fullTitle,
      description: summary,
      siteName,
      locale: openGraphLocale(lang),
      alternateLocale: [openGraphLocale(lang === "zh" ? "en" : "zh")],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [ogImage.url],
    },
  };
}

export function docsArticleJsonLd({
  lang,
  title,
  description,
  slug,
  canonicalSlug = slug,
}: DocsPageMetadataOptions) {
  const canonical = absoluteUrl(docsPath(lang, canonicalSlug));

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description ?? siteDescription,
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: languageCode(lang),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "SoftwareApplication",
      name: siteName,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
    },
    author: {
      "@type": "Person",
      name: "xingxingmofashu",
      url: githubUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "xingxingmofashu",
      url: githubUrl,
    },
  };
}
