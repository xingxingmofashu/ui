import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/glass/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { getMDXComponents } from "@/components/mdx";
import { isLocale } from "@/lib/i18n";
import { docsArticleJsonLd, docsPageMetadata } from "@/lib/seo";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{ lang: string; slug: string[] }>;
};

export function generateStaticParams() {
  return source.generateParams().filter(({ slug }) => slug.length > 0);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const page = source.getPage(slug, lang);
  if (!page) return {};

  return docsPageMetadata({
    lang,
    title: page.data.title,
    description: page.data.description,
    slug,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const articleJsonLd = docsArticleJsonLd({
    lang,
    title: page.data.title,
    description: page.data.description,
    slug,
  });

  return (
    <>
      <DocsPage toc={page.data.toc}>
        <DocsTitle>{page.data.title}</DocsTitle>
        {page.data.description ? (
          <DocsDescription>{page.data.description}</DocsDescription>
        ) : null}
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
      <JsonLd data={articleJsonLd} />
    </>
  );
}
