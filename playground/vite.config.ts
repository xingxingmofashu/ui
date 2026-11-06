import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: [fileURLToPath(new URL("..", import.meta.url))],
    },
  },
  worker: {
    format: "es",
  },
  build: {
    // Monaco and its TypeScript worker are intentionally large and lazy-loaded.
    chunkSizeWarningLimit: 8000,
  },
  resolve: {
    alias: [
      {
        find: /^@xingxingmofashu\/ui\/plugins\/glass-preset\/index\.css$/,
        replacement: fileURLToPath(
          new URL("../src/plugins/glass-preset/index.css", import.meta.url),
        ),
      },
      {
        find: /^@xingxingmofashu\/ui\/plugins\/glass-preset$/,
        replacement: fileURLToPath(
          new URL("../src/plugins/glass-preset/index.tsx", import.meta.url),
        ),
      },
      {
        find: /^@xingxingmofashu\/ui$/,
        replacement: fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      },
    ],
    dedupe: ["react", "react-dom"],
  },
});
