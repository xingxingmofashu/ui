import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@xingxingmofashu/ui"],
  turbopack: {
    rules: {
      "*.tsx": {
        condition: { query: "?raw" },
        type: "text",
      },
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withMDX(config);
