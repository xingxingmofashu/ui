import { DemoStage } from "@/components/demo-stage";
import { examples, type ExampleName } from "@/components/examples/registry";

export function Preview({ name }: { name: ExampleName }) {
  const { Demo } = examples[name];

  return (
    <DemoStage>
      <Demo />
    </DemoStage>
  );
}
