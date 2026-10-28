import type { ComponentType } from "react";

type Example = {
  Demo: ComponentType;
  source: string;
};

// Turbopack 16.4 ignores `import: "default"` for eager globs, so read the
// default export from each module namespace instead.
const demos = import.meta.glob<{ default: ComponentType }>("./*/*.tsx", {
  eager: true,
});

const sources = import.meta.glob<{ default: string }>("./*/*.tsx", {
  eager: true,
  query: "?raw",
});

function toName(path: string) {
  return path.replace(/^\.\//, "").replace(/\.tsx$/, "");
}

export const examples: Record<string, Example> = Object.fromEntries(
  Object.entries(demos).map(([path, demo]) => {
    const Demo = demo.default;
    const source = sources[path]?.default;

    if (!Demo) {
      throw new Error(`Example "${path}" must default-export a component`);
    }

    if (source === undefined) {
      throw new Error(`Missing raw source for example "${path}"`);
    }

    return [toName(path), { Demo, source }];
  }),
);

export type ExampleName = string;
