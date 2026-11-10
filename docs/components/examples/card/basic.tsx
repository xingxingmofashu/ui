"use client";

import { ArrowRight } from "lucide-react";

import { Button, Card } from "@xingxingmofashu/ui";

export default function CardBasicDemo() {
  return (
    <Card
      className="w-full max-w-md"
      title="Liquid glass"
      description="A CSS-only frosted glass panel."
      footer={
        <Button size="sm" trailingIcon={<ArrowRight />}>View</Button>
      }
    >
      <div className="text-sm text-ui-ink/70">
        Place the card over a detailed background to see the glass effect.
      </div>
    </Card>
  );
}
