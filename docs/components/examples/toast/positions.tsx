"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import {
  Button,
  ToastProvider,
  ToggleGroup,
  useToast,
  type ToastPosition,
} from "@xingxingmofashu/ui";

const placementOptions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
] as const;

const alignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

type Placement = (typeof placementOptions)[number]["value"];
type Align = (typeof alignOptions)[number]["value"];

function PositionControls({
  position,
  placement,
  align,
  onPlacementChange,
  onAlignChange,
}: {
  position: ToastPosition;
  placement: Placement;
  align: Align;
  onPlacementChange: (placement: Placement) => void;
  onAlignChange: (align: Align) => void;
}) {
  const toast = useToast();

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-start justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-ui-ink/60">Edge</span>
          <ToggleGroup
            aria-label="Vertical placement"
            size="sm"
            value={[placement]}
            onValueChange={(value) => {
              const next = value[0];

              if (next === "top" || next === "bottom") {
                onPlacementChange(next);
              }
            }}
            items={placementOptions}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-ui-ink/60">Alignment</span>
          <ToggleGroup
            aria-label="Horizontal alignment"
            size="sm"
            value={[align]}
            onValueChange={(value) => {
              const next = value[0];

              if (next === "left" || next === "center" || next === "right") {
                onAlignChange(next);
              }
            }}
            items={alignOptions}
          />
        </div>
      </div>

      <Button
        label={`Show at ${position}`}
        leadingIcon={<MapPin />}
        onClick={() =>
          toast.add({
            title: "Positioned toast",
            description: `This toast is anchored to the ${position} position.`,
          })
        }
      />

      <p className="text-sm text-ui-ink/60">Current position: {position}</p>
    </div>
  );
}

export default function ToastPositionsDemo() {
  const [placement, setPlacement] = useState<Placement>("bottom");
  const [align, setAlign] = useState<Align>("right");
  const position = `${placement}-${align}` as ToastPosition;

  return (
    <ToastProvider position={position}>
      <PositionControls
        position={position}
        placement={placement}
        align={align}
        onPlacementChange={setPlacement}
        onAlignChange={setAlign}
      />
    </ToastProvider>
  );
}
