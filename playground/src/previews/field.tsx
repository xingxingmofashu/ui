import { useState } from "react";

import { CheckboxGroup, Field, Input } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
];

function FieldPreview() {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const invalid = email.length > 0 && !email.includes("@");

  return (
    <>
      <DemoGroup label="Basic">
        <Field
          label="Email"
          description="We only use this address for account notices."
          className="w-full max-w-sm"
        >
          <Input type="email" placeholder="you@example.com" />
        </Field>
      </DemoGroup>

      <DemoGroup label="Validation">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Field
            label="Work email"
            description="Type an address without @ to see the message."
            validationMode="onChange"
            validate={(value) => {
              const text = String(value);

              if (!text) {
                return null;
              }

              return text.includes("@")
                ? null
                : "Enter a valid email address.";
            }}
          >
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onValueChange={setEmail}
            />
          </Field>
          <Status>
            {invalid
              ? "The field is invalid."
              : email
                ? `Ready to send to ${email}.`
                : "Enter an email address."}
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="External error">
        <Field
          label="Account email"
          error={
            selected.length === 0 ? "Select at least one channel." : undefined
          }
          className="w-full max-w-sm"
        >
          <CheckboxGroup
            items={channels}
            value={selected}
            onValueChange={setSelected}
          />
        </Field>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-4">
          {sizes.map((size) => (
            <Field key={size} size={size} label={`Size ${size}`}>
              <Input size={size} placeholder={`${size} field`} />
            </Field>
          ))}
        </div>
      </DemoGroup>
    </>
  );
}

export { FieldPreview };
