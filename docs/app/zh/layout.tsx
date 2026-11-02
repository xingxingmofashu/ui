import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MarketingShell } from "@/components/marketing-shell";
import { marketingMetadata } from "@/lib/seo";

import "../globals.css";

export const metadata: Metadata = marketingMetadata("zh");

export default function ChineseLayout({ children }: { children: ReactNode }) {
  return <MarketingShell lang="zh">{children}</MarketingShell>;
}
