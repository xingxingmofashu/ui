import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsPageView, getDocsMetadata } from "@/components/docs-page";
import { isLocale } from "@/lib/i18n";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{ lang: string; slug: string[] }>;
};

export function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => params.slug.length > 0);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  return getDocsMetadata(slug, lang);
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  return <DocsPageView slug={slug} lang={lang} />;
}
