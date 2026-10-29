import { zhCN } from "@fumadocs/language/zh-cn";
import { uiTranslations } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { i18n } from "@/lib/i18n";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .preset("zh", zhCN())
  .add({
    zh: {
      displayName: "简体中文",
    },
    en: {
      displayName: "English",
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      url: `/docs/${locale}`,
      title: (
        <span className="inline-flex items-center gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="size-6 shrink-0"
          >
            <rect width="64" height="64" rx="16" fill="#0a0a0a" />
            <rect
              x="9"
              y="9"
              width="46"
              height="46"
              rx="12"
              fill="#f2f2f2"
              stroke="#ffffff"
              strokeOpacity="0.9"
              strokeWidth="1.5"
            />
            <path
              d="M32 17 C33.7 25 38.9 30.3 47 32 C38.9 33.7 33.7 39 32 47 C30.3 39 25.1 33.7 17 32 C25.1 30.3 30.3 25 32 17 Z"
              fill="#0a0a0a"
            />
            <circle cx="32" cy="32" r="1.6" fill="#f2f2f2" />
          </svg>
          <span className="font-semibold tracking-tight">
            @xingxingmofashu/
            <span className="text-fd-muted-foreground">ui</span>
          </span>
        </span>
      ),
    },
    i18n: true,
    githubUrl: "https://github.com/xingxingmofashu/ui",
  };
}
