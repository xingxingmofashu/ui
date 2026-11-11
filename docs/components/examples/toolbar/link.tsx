"use client";

import { ExternalLink } from "lucide-react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarLinkDemo() {
  return (
    <Toolbar
      aria-label="Release actions"
      items={[
        { label: "Publish" },
        { kind: "separator" },
        {
          kind: "link",
          href: "https://github.com/xingxingmofashu/ui/releases",
          label: "Release notes",
          icon: <ExternalLink />,
          target: "_blank",
          rel: "noreferrer",
        },
      ]}
    />
  );
}
