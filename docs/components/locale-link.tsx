"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { HomeLocale } from "@/components/home/copy";

export function LocaleLink({
  href,
  locale,
  className,
  children,
}: {
  href: string;
  locale: HomeLocale;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          window.localStorage.setItem("ui-locale", locale);
        } catch {
          // Storage can be unavailable in private or restricted contexts.
        }
      }}
    >
      {children}
    </Link>
  );
}
