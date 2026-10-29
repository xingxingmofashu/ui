"use client";

import { Pin } from "lucide-react";
import { useState } from "react";

import { Button, Toggle } from "@xingxingmofashu/ui";

export default function ToggleControlledDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Toggle
        label="Pin to favorites"
        icon={<Pin />}
        pressed={pressed}
        onPressedChange={setPressed}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {pressed ? "Pinned to favorites." : "Not pinned."}
      </p>

      <Button
        size="sm"
        label={pressed ? "Unpin externally" : "Pin externally"}
        onClick={() => setPressed((current) => !current)}
      />
    </div>
  );
}
