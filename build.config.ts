import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      input: "src",
      outDir: "dist",
      declaration: true,
    },
  ],
  clean: true,
  hooks: {
    "mkdist:entry:options"(_ctx, _entry, options) {
      options.addRelativeDeclarationExtensions = false;
    },
  },
});
