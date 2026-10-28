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
      url: `/${locale}`,
      title: (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-lg bg-fd-foreground text-fd-background"
          >
            <span className="size-3 rounded-full border border-fd-background/60 bg-fd-background/20" />
          </span>
          <span className="font-semibold tracking-tight">
            Liquid Glass{" "}
            <span className="text-fd-muted-foreground">UI</span>
          </span>
        </span>
      ),
    },
    i18n: true,
    githubUrl: "https://github.com/xingxingmofashu/ui",
  };
}
