import { HomePageContent } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import {
  githubUrl,
  npmUrl,
  siteDescriptionZh,
  siteName,
  siteUrl,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescriptionZh,
      inLanguage: ["zh-CN", "en"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      description: siteDescriptionZh,
      url: siteUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      license: "https://opensource.org/licenses/MIT",
      codeRepository: githubUrl,
      sameAs: [githubUrl, npmUrl],
      programmingLanguage: ["TypeScript", "CSS"],
      author: {
        "@type": "Person",
        name: "xingxingmofashu",
        url: githubUrl,
      },
    },
  ],
};

export default function RootPage() {
  return (
    <>
      <HomePageContent lang="zh" />
      <JsonLd data={jsonLd} />
    </>
  );
}
