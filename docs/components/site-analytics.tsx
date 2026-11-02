"use client";

import { useEffect } from "react";

const scriptId = "ui-site-analytics";

export function SiteAnalytics({
  domain,
  scriptSrc,
}: {
  domain?: string;
  scriptSrc?: string;
}) {
  useEffect(() => {
    if (!domain) return;

    const existing = document.getElementById(scriptId);
    if (existing) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    script.src = scriptSrc || "https://plausible.io/js/script.js";
    script.setAttribute("data-domain", domain);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [domain, scriptSrc]);

  return null;
}
