import { useRef, useState } from "react";

import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

type FormErrors = Record<string, string | string[]>;

type SubmittedValues = {
  name: string;
  email: string;
};

function BasicFormPreview() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("No invitation sent.");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Form
        className="w-full max-w-sm"
        errors={errors}
        onSubmit={async (event) => {
          event.preventDefault();

          const value = String(
            new FormData(event.currentTarget).get("email") ?? "",
          );

          setLoading(true);
          setStatus("Sending…");
          await new Promise((resolve) => setTimeout(resolve, 500));
          setLoading(false);

          if (value.endsWith("@example.com")) {
            setErrors({ email: "The example domain is not allowed." });
            setStatus("The server rejected the address.");
            return;
          }

          setErrors({});
          setStatus(`Invitation sent to ${value}.`);
        }}
      >
        <Field
          label="Email"
          name="email"
          description="We only use this address for account notices."
        >
          <Input
            type="email"
            defaultValue="you@example.com"
            placeholder="you@example.com"
          />
        </Field>

        <Button
          type="submit"
          label="Send invite"
          disabled={loading}
          focusableWhenDisabled
        />
      </Form>

      <Status>{status}</Status>
    </div>
  );
}

function SubmitValuesPreview() {
  const [submitted, setSubmitted] = useState<SubmittedValues | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Form<SubmittedValues>
        className="w-full max-w-sm"
        onFormSubmit={(values) => setSubmitted(values)}
      >
        <Field label="Name" name="name">
          <Input defaultValue="Ada Lovelace" />
        </Field>

        <Field label="Email" name="email">
          <Input type="email" defaultValue="ada@example.com" />
        </Field>

        <Button type="submit" label="Submit" />
      </Form>

      <Status>
        {submitted
          ? `Received ${submitted.name} at ${submitted.email}.`
          : "Submit to receive the values as an object."}
      </Status>
    </div>
  );
}

function ImperativeValidationPreview() {
  const actionsRef = useRef<{
    validate: (fieldName?: string) => void;
  } | null>(null);
  const [status, setStatus] = useState("Nothing validated yet.");

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Form
        actionsRef={actionsRef}
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          label="Email"
          name="email"
          validate={(value) =>
            String(value).includes("@")
              ? null
              : "Enter a valid email address."
          }
        >
          <Input type="email" placeholder="you@example.com" />
        </Field>
      </Form>

      <div className="flex flex-wrap gap-2">
        <Button
          label="Validate all"
          onClick={() => {
            actionsRef.current?.validate();
            setStatus("Validated every field.");
          }}
        />
        <Button
          label="Validate email"
          onClick={() => {
            actionsRef.current?.validate("email");
            setStatus("Validated the email field.");
          }}
        />
      </div>

      <Status>{status}</Status>
    </div>
  );
}

function FormPreview() {
  return (
    <>
      <DemoGroup label="Basic">
        <BasicFormPreview />
      </DemoGroup>

      <DemoGroup label="Form errors">
        <Form
          className="w-full max-w-sm"
          errors={{
            email: ["Use a work address.", "Personal domains are not allowed."],
            name: "Enter your full name.",
          }}
        >
          <Field label="Email" name="email">
            <Input type="email" defaultValue="ada@example.com" />
          </Field>

          <Field
            label="Name"
            name="name"
            description="As it should appear on the invoice."
          >
            <Input />
          </Field>
        </Form>
      </DemoGroup>

      <DemoGroup label="Validation">
        <Form
          className="w-full max-w-sm"
          validationMode="onChange"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            label="Username"
            name="username"
            description="Use at least four characters."
            validate={(value) =>
              String(value).length >= 4
                ? null
                : "Use at least four characters."
            }
          >
            <Input placeholder="ada" />
          </Field>

          <Button type="submit" label="Create account" />
        </Form>
      </DemoGroup>

      <DemoGroup label="Submit values">
        <SubmitValuesPreview />
      </DemoGroup>

      <DemoGroup label="Imperative validation">
        <ImperativeValidationPreview />
      </DemoGroup>
    </>
  );
}

export { FormPreview };
