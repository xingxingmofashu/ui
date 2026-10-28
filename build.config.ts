import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    {
      builder: "copy",
      input: "src",
      pattern: "index.css",
      outDir: "dist",
    },
  ],
  declaration: true,
  clean: true,
  externals: ["react", "react-dom", "@base-ui/react", "cn", "tailwind-variants"],
  hooks: {
    "rollup:options"(_ctx, options) {
      const onwarn = options.onwarn;
      options.onwarn = (warning, warn) => {
        if (warning.message.includes("Module level directives")) {
          return;
        }
        onwarn?.(warning, warn);
      };
    },
  },
  rollup: {
    emitCJS: false,
    // Rollup drops per-module directives while bundling. The package is fully
    // client-side, so emit a single banner for the bundle instead.
    output: {
      banner: '"use client";',
    },
  },
});
