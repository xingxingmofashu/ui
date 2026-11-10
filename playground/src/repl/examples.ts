import { getComponentMeta, groupOrder } from "../catalog";

type Example = {
  id: string;
  label: string;
  group: string;
  load: () => Promise<string>;
};

type ExampleGroup = {
  group: string;
  examples: Example[];
};

const loaders = import.meta.glob<string>(
  "../../../docs/components/examples/*/basic.tsx",
  {
    query: "?raw",
    import: "default",
  },
);

const examples: Example[] = [];

for (const [path, load] of Object.entries(loaders)) {
  const match = path.match(/examples\/([^/]+)\/basic\.tsx$/);

  if (!match) continue;

  const [, component] = match;
  const meta = getComponentMeta(component);

  examples.push({
    id: `${component}/basic`,
    label: `${meta.title} · Basic`,
    group: meta.group,
    load,
  });
}

examples.sort((a, b) => a.label.localeCompare(b.label));

const exampleGroups: ExampleGroup[] = groupOrder
  .map((group) => ({
    group,
    examples: examples.filter((example) => example.group === group),
  }))
  .filter((group) => group.examples.length > 0);

const exampleById = new Map(examples.map((example) => [example.id, example]));

async function loadExampleCode(id: string) {
  const example = exampleById.get(id);

  if (!example) {
    throw new Error(`Unknown example "${id}".`);
  }

  return example.load();
}

export { exampleById, exampleGroups, loadExampleCode };
