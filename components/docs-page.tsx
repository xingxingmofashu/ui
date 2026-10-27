import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/glass/page";

import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

export function getDocsMetadata(slug: string[], lang: string): Metadata {
  const page = source.getPage(slug, lang);
  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export function DocsPageView({
  slug,
  lang,
}: {
  slug: string[];
  lang: string;
}) {
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? (
        <DocsDescription>{page.data.description}</DocsDescription>
      ) : null}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
