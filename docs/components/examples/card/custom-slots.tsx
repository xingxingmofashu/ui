"use client";

import { Card } from "@xingxingmofashu/ui";

export default function CardCustomSlotsDemo() {
  return (
    <Card
      className="w-full max-w-md"
      ui={{
        header: "border-b border-ui-glass-border",
        body: "bg-ui-glass-surface/50",
        title: "tracking-tight",
      }}
      title="Custom styles"
      description="Adjust internal structure with ui."
    >
      <div className="text-sm text-ui-ink/70">The default slot goes here.</div>
    </Card>
  );
}
