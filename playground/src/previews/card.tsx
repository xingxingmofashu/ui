import { ArrowRight } from "lucide-react";

import { Button, Card } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

function CardPreview() {
  return (
    <DemoGroup label="Composed">
      <div className="flex flex-wrap items-stretch gap-5">
        <Card
          className="w-full max-w-sm"
          title="Liquid glass"
          description="A CSS-only frosted glass panel."
          footer={
            <Button
              size="sm"
              label="View details"
              trailingIcon={<ArrowRight />}
            />
          }
        >
          <p className="text-sm leading-6 text-ui-ink/70">
            Place the card over a detailed background to see the glass surface,
            rim, and specular highlight blend with the content behind it.
          </p>
        </Card>

        <Card className="w-full max-w-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ui-ink/55">
            Monthly spend
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-ui-ink">
            $2,480
          </p>
          <p className="mt-2 text-sm leading-6 text-ui-ink/65">
            Content-only cards inherit the same glass material without a
            header.
          </p>
        </Card>
      </div>
    </DemoGroup>
  );
}

export { CardPreview };
