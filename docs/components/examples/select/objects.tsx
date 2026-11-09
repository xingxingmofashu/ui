"use client";

import { useState } from "react";

import { Select } from "@xingxingmofashu/ui";

type ShippingMethod = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

const methods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard",
    duration: "4-6 business days",
    price: "$4.99",
  },
  {
    id: "express",
    name: "Express",
    duration: "2-3 business days",
    price: "$9.99",
  },
  {
    id: "overnight",
    name: "Overnight",
    duration: "Next business day",
    price: "$19.99",
  },
];

export default function SelectObjectValuesDemo() {
  const [method, setMethod] = useState<ShippingMethod | null>(methods[1]);

  return (
    <div className="w-full max-w-sm">
      <Select
        label="Shipping method"
        description="Object values keep the full record in state."
        items={methods.map((option) => ({
          value: option,
          label: option.name,
          textValue: option.name,
        }))}
        value={method}
        onValueChange={setMethod}
        itemToStringValue={(value) => value.id}
        isItemEqualToValue={(item, value) => item.id === value.id}
        renderValue={(value) =>
          value ? (
            <span className="flex min-w-0 flex-col items-start">
              <span>{value.name}</span>
              <span className="text-xs text-ui-ink/55">
                {value.duration} · {value.price}
              </span>
            </span>
          ) : (
            "Select a shipping method"
          )
        }
      />
    </div>
  );
}
