import { notFound } from "next/navigation";

import { HomePageContent } from "@/components/home-page";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <HomePageContent lang={lang} />;
}
