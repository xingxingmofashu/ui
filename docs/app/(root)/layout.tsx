import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { MarketingShell } from "@/components/marketing-shell";
import { marketingMetadata } from "@/lib/seo";

import "../globals.css";

export const metadata: Metadata = marketingMetadata();

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>;
}
