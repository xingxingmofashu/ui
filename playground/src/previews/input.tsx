import { ArrowRight, Mail, Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function InputPreview() {
  const [email, setEmail] = useState("");

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input
            label="Email"
            description="We only use this address for account notices."
            type="email"
            placeholder="you@example.com"
            value={email}
            onValueChange={setEmail}
          />
          <Status>
            {email ? `Ready to send to ${email}.` : "Enter an email address."}
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {sizes.map((size) => (
            <Input
              key={size}
              size={size}
              label={`Size ${size}`}
              placeholder={`${size} input`}
            />
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
          <Input
            label="Email"
            type="email"
            leadingIcon={<Mail />}
            placeholder="you@example.com"
          />
          <Input
            label="Invite link"
            defaultValue="https://xingxingmofashu.github.io/ui/"
            trailingIcon={<ArrowRight />}
          />
        </div>
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input
            label="Disabled field"
            description="The value cannot be changed."
            defaultValue="Locked value"
            disabled
          />
          <Input
            label="Read-only field"
            description="The value can be selected and copied."
            defaultValue="Read-only value"
            readOnly
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { InputPreview };
