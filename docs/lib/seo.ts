import type { Metadata } from "next";

import { locales, type Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  githubUrl,
  npmUrl,
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

export function marketingMetadata(): Metadata {
  const canonical = absoluteUrl("/");
  const marketingTitle = `${siteName} — Liquid Glass React components`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: marketingTitle,
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
      "Liquid Glass",
      "React component library",
      siteName,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: marketingTitle,
      description: siteDescription,
      siteName,
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: marketingTitle,
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
}

export function homeJsonLd() {
  const description = siteDescription;
  const canonical = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: siteName,
        description,
        url: canonical,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        license: "https://opensource.org/licenses/MIT",
        codeRepository: githubUrl,
        sameAs: [githubUrl, npmUrl],
        programmingLanguage: ["TypeScript", "CSS"],
        author: {
          "@type": "Person",
          name: "xingxingmofashu",
          url: githubUrl,
        },
      },
    ],
  };
}
