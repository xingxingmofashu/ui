import { getComponentMeta, groupOrder, toTitle } from "../catalog";

type Example = {
  id: string;
  component: string;
  demo: string;
  label: string;
  group: string;
  load: () => Promise<string>;
};

type ExampleGroup = {
  group: string;
  examples: Example[];
};

const loaders = import.meta.glob<string>(
  "../../../docs/components/examples/*/*.tsx",
  {
    query: "?raw",
    import: "default",
  },
);

const examples: Example[] = [];
const exampleCache = new Map<string, string>();

for (const [path, load] of Object.entries(loaders)) {
  const match = path.match(/examples\/([^/]+)\/([^/]+)\.tsx$/);

  if (!match) continue;

  const [, component, demo] = match;
  const isGuide = component === "guides";
  const meta = isGuide
    ? { title: "Guides", group: "Guides" }
    : getComponentMeta(component);
  const demoTitle = demo === "basic" ? "Basic" : toTitle(demo);

  examples.push({
    id: `${component}/${demo}`,
    component,
    demo,
    label: isGuide ? demoTitle : `${meta.title} · ${demoTitle}`,
    group: meta.group,
    load,
  });
}

examples.sort((a, b) => {
  if (a.group !== b.group) {
    return a.group.localeCompare(b.group);
  }

  if (a.demo === "basic" && b.demo !== "basic") return -1;
  if (b.demo === "basic" && a.demo !== "basic") return 1;

  return a.label.localeCompare(b.label);
});

const groupNames = [...groupOrder, "Guides"];
const exampleGroups: ExampleGroup[] = groupNames
  .map((group) => ({
    group,
    examples: examples.filter((example) => example.group === group),
  }))
  .filter((group) => group.examples.length > 0);

const exampleById = new Map(examples.map((example) => [example.id, example]));

async function loadExampleCode(id: string) {
  const cached = exampleCache.get(id);

  if (cached !== undefined) return cached;

  const example = exampleById.get(id);

  if (!example) {
    throw new Error(`Unknown example "${id}".`);
  }

  const source = await example.load();

  exampleCache.set(id, source);

  return source;
}

export { exampleById, exampleGroups, examples, loadExampleCode };
export type { Example, ExampleGroup };
