import type { Metadata } from "next";

import { locales, type Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  githubUrl,
  npmUrl,
  ogImage,
  siteDescription,
  siteDescriptionZh,
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

export function marketingMetadata(lang: Locale): Metadata {
  const isZh = lang === "zh";
  const canonical = absoluteUrl(isZh ? "/zh" : "/");
  const description = isZh ? siteDescriptionZh : siteDescription;
  const marketingTitle = `${siteName} — ${
    isZh ? "Liquid Glass React 组件库" : "Liquid Glass React components"
  }`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: marketingTitle,
      template: `%s · ${siteName}`,
    },
    description,
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
      isZh ? "React 组件库" : "React component library",
      siteName,
    ],
    alternates: {
      canonical,
      languages: {
        "zh-CN": absoluteUrl("/zh"),
        en: absoluteUrl("/"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: marketingTitle,
      description,
      siteName,
      locale: isZh ? "zh_CN" : "en_US",
      alternateLocale: [isZh ? "en_US" : "zh_CN"],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: marketingTitle,
      description,
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

export function homeJsonLd(lang: Locale) {
  const description = lang === "zh" ? siteDescriptionZh : siteDescription;
  const canonical = absoluteUrl(lang === "zh" ? "/zh" : "/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description,
        inLanguage: ["zh-CN", "en"],
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
