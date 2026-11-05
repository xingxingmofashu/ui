import { Field, Form, Input } from "@xingxingmofashu/ui";

export default function FormErrorsDemo() {
  return (
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
  );
}
