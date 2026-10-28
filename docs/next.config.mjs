import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@xingxingmofashu.me/ui"],
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
