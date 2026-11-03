import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

import { DocsRootProvider } from "@/components/docs-root-provider";
import { SiteAnalytics } from "@/components/site-analytics";
import { baseOptions } from "@/lib/layout.shared";

const analyticsDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const analyticsSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;

export function MarketingShell({ children }: { children: ReactNode }) {
  const options = baseOptions("en");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteAnalytics domain={analyticsDomain} scriptSrc={analyticsSrc} />

        <DocsRootProvider lang="en">
          <HomeLayout
            {...options}
            i18n={false}
            nav={{ ...options.nav, url: "/" }}
          >
            {children}
          </HomeLayout>
        </DocsRootProvider>
      </body>
    </html>
  );
}
