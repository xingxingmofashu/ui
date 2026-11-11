"use client";

import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarOrientationDemo() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex items-center gap-6">
      <Toolbar
        aria-label="Zoom controls"
        orientation="vertical"
        items={[
          {
            "aria-label": "Zoom in",
            icon: <ZoomIn />,
            onClick: () => setZoom((value) => Math.min(value + 10, 200)),
          },
          {
            "aria-label": "Zoom out",
            icon: <ZoomOut />,
            onClick: () => setZoom((value) => Math.max(value - 10, 50)),
          },
          { kind: "separator" },
          {
            "aria-label": "Reset zoom",
            icon: <RotateCcw />,
            onClick: () => setZoom(100),
          },
        ]}
      />

      <p
        aria-live="polite"
        className="min-w-20 text-center font-mono text-2xl text-ui-ink"
      >
        {zoom}%
      </p>
    </div>
  );
}
