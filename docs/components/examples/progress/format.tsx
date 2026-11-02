import { Progress } from "@xingxingmofashu/ui";

export default function ProgressFormat() {
  return (
    <div className="w-full max-w-md">
      <Progress
        label="Uploading assets"
        description="Seven of ten files have been uploaded."
        value={7}
        max={10}
        format={{ style: "decimal", maximumFractionDigits: 0 }}
      />
    </div>
  );
}
