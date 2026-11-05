"use client";

import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

export default function FormValidationDemo() {
  return (
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
          String(value).length >= 4 ? null : "Use at least four characters."
        }
      >
        <Input placeholder="ada" />
      </Field>

      <Button type="submit" label="Create account" />
    </Form>
  );
}
