import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      input: "src",
      outDir: "dist",
      declaration: true,
      format: "esm",
      ext: "js",
      addRelativeDeclarationExtensions: true,
    },
  ],
  clean: true,
});
