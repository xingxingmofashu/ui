"use client";

import Link from "next/link";
import { useEffect } from "react";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export default function ChineseHomeRedirect() {
  useEffect(() => {
    window.location.replace(`${basePath}/`);
  }, []);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm leading-7 text-fd-muted-foreground">
        The homepage is now English-only.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex h-10 items-center rounded-full bg-fd-foreground px-5 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
      >
        Continue to the homepage
      </Link>
    </main>
  );
}
