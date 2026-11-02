import { Progress } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ProgressSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {sizes.map((size, index) => (
        <Progress
          key={size}
          size={size}
          label={`Size ${size}`}
          value={25 + index * 15}
        />
      ))}
    </div>
  );
}
