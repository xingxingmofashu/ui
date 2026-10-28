import { copyFile, mkdir } from "node:fs/promises";

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  dts: true,
  clean: true,
  banner: { js: '"use client";' },
  external: ["react", "react-dom", "@base-ui/react", "cn", "tailwind-variants"],
  async onSuccess() {
    await mkdir("dist", { recursive: true });
    await copyFile("src/index.css", "dist/index.css");
  },
});
