import { Progress } from "@xingxingmofashu/ui";

export default function ProgressIndeterminate() {
  return (
    <div className="w-full max-w-md">
      <Progress
        label="Preparing workspace"
        description="This can take a few moments."
        value={null}
      />
    </div>
  );
}
