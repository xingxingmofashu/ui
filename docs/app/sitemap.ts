import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { source } from "@/lib/source";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = locales.flatMap((lang) =>
    source.getPages(lang).map((page) => {
      const languages: Record<string, string> = {};

      for (const locale of locales) {
        languages[locale === "zh" ? "zh-CN" : "en"] = absoluteUrl(
          `/docs/${locale}/${page.slugs.join("/")}`,
        );
      }

      languages["x-default"] = absoluteUrl(
        `/docs/en/${page.slugs.join("/")}`,
      );

      const isIntroduction =
        page.slugs.join("/") === "get-started/introduction";

      return {
        url: absoluteUrl(page.url),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: isIntroduction ? 0.9 : 0.7,
        alternates: { languages },
      };
    }),
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          "zh-CN": absoluteUrl("/"),
          en: absoluteUrl("/docs/en"),
          "x-default": absoluteUrl("/"),
        },
      },
    },
    ...pages,
  ];
}
