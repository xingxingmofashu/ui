const WELCOME_ID = "__welcome__";
const BLANK_ID = "__blank__";

const welcomeCode = `import { useState } from "react";

import { Button, Card, Field, Input } from "@xingxingmofashu/ui";

export default function App() {
  const [name, setName] = useState("Liquid Glass");

  return (
    <Card
      className="w-full max-w-md"
      title="Hello, REPL"
      description="Edit this file and the preview updates."
    >
      <div className="flex flex-col gap-4">
        <Field label="Workspace name">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>

        <p className="text-sm text-ui-ink/65">Hello, {name}.</p>

        <div>
          <Button label="Reset" onClick={() => setName("Liquid Glass")} />
        </div>
      </div>
    </Card>
  );
}
`;

const blankCode = `import { Button } from "@xingxingmofashu/ui";

export default function App() {
  return <Button label="Click me" />;
}
`;

function getTemplate(id: string) {
  if (id === WELCOME_ID) return welcomeCode;
  if (id === BLANK_ID) return blankCode;

  return null;
}

export { BLANK_ID, WELCOME_ID, blankCode, getTemplate, welcomeCode };
