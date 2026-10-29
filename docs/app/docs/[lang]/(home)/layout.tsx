import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { baseOptions } from "@/lib/layout.shared";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    description:
      lang === "zh"
        ? "基于 React 19、Tailwind CSS 4 与 Base UI 的液态玻璃组件库。"
        : "Liquid glass components for React, built with React 19, Tailwind CSS 4, and Base UI.",
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return <HomeLayout {...baseOptions(lang)}>{children}</HomeLayout>;
}
