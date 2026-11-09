import welcomeCode from "./welcome.tsx?raw";

const WELCOME_ID = "__welcome__";
const BLANK_ID = "__blank__";

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

export { BLANK_ID, WELCOME_ID, getTemplate, welcomeCode };
