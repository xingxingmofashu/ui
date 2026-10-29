const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://xingxingmofashu.github.io";

const pathPrefix =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

export const siteUrl = `${siteOrigin}${pathPrefix}`;
export const siteName = "@xingxingmofashu/ui";
export const siteDescription =
  "Accessible React components with a Liquid Glass visual style, built on Base UI, Tailwind CSS 4, and Tailwind Variants.";
export const siteDescriptionZh =
  "@xingxingmofashu/ui 是一套具有 Liquid Glass 视觉风格的可访问 React 组件库，基于 Base UI、Tailwind CSS 4 与 Tailwind Variants 构建。";
export const githubUrl = "https://github.com/xingxingmofashu/ui";
export const npmUrl = "https://www.npmjs.com/package/@xingxingmofashu/ui";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImage = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${siteName} — Between black and white, glass finds its light.`,
};
