import { Progress } from "@xingxingmofashu/ui";

export default function ProgressBasic() {
  return (
    <div className="w-full max-w-md">
      <Progress
        label="Exporting data"
        description="You can keep working while the export runs."
        value={64}
      />
    </div>
  );
}
