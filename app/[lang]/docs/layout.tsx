import { DocsLayout } from "fumadocs-ui/layouts/glass";
import type { ReactNode } from "react";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      // The docs sidebar already contains the page tree. Reusing the header
      // links here duplicates "Docs" and "Components" next to the page entries.
      links={[]}
      tree={source.getPageTree(lang)}
    >
      {children}
    </DocsLayout>
  );
}
