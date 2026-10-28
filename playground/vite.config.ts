import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@xingxingmofashu\/ui$/,
        replacement: fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      },
      {
        find: /^@xingxingmofashu\/ui\/index\.css$/,
        replacement: fileURLToPath(new URL("../src/index.css", import.meta.url)),
      },
    ],
    dedupe: ["react", "react-dom"],
  },
});
