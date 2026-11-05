import { ArrowRight, Mail, Search } from "lucide-react";
import { useState } from "react";

import { Field, Input } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function InputPreview() {
  const [email, setEmail] = useState("");

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Field
            label="Email"
            description="We only use this address for account notices."
          >
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onValueChange={setEmail}
            />
          </Field>
          <Status>
            {email ? `Ready to send to ${email}.` : "Enter an email address."}
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {sizes.map((size) => (
            <Field key={size} size={size} label={`Size ${size}`}>
              <Input size={size} placeholder={`${size} input`} />
            </Field>
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Icons">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input
            aria-label="Search components"
            leadingIcon={<Search />}
            placeholder="Search components"
          />

          <Field label="Email">
            <Input
              type="email"
              leadingIcon={<Mail />}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Invite link">
            <Input
              defaultValue="https://xingxingmofashu.github.io/ui/"
              trailingIcon={<ArrowRight />}
            />
          </Field>
        </div>
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Field
            label="Disabled field"
            description="The value cannot be changed."
            disabled
          >
            <Input defaultValue="Locked value" />
          </Field>

          <Field
            label="Read-only field"
            description="The value can be selected and copied."
          >
            <Input defaultValue="Read-only value" readOnly />
          </Field>
        </div>
      </DemoGroup>
    </>
  );
}

export { InputPreview };
