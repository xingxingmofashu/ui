"use client";

import { Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@xingxingmofashu/ui";

export default function ButtonBasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          label="Add one"
          leadingIcon={<Plus />}
          onClick={() => setCount((value) => value + 1)}
        />
        <Button
          size="sm"
          label="Reset"
          leadingIcon={<RotateCcw />}
          onClick={() => setCount(0)}
          disabled={count === 0}
        />
      </div>
      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Clicked {count} {count === 1 ? "time" : "times"}
      </p>
    </div>
  );
}
