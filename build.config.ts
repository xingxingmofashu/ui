import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      input: "src",
      outDir: "dist",
      declaration: true,
      format: "esm",
      ext: "mjs",
      addRelativeDeclarationExtensions: false,
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
    },
  ],
  clean: true,
});
