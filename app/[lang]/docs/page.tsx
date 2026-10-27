import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsPageView, getDocsMetadata } from "@/components/docs-page";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return getDocsMetadata([], lang);
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <DocsPageView slug={[]} lang={lang} />;
}
