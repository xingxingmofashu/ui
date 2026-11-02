import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MarketingShell } from "@/components/marketing-shell";
import { marketingMetadata } from "@/lib/seo";

import "../globals.css";

export const metadata: Metadata = marketingMetadata("en");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MarketingShell lang="en" detectLocale>
      {children}
    </MarketingShell>
  );
}
