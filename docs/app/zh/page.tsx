import { HomePageContent } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd } from "@/lib/seo";

export default function ChinesePage() {
  return (
    <>
      <HomePageContent lang="zh" />
      <JsonLd data={homeJsonLd("zh")} />
    </>
  );
}
