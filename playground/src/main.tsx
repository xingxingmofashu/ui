import { createRoot } from "react-dom/client";

import { GlassPresetProvider } from "@xingxingmofashu/ui/plugins/glass-preset";

import { Repl } from "./repl/repl";
import { ThemeProvider } from "./theme";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Playground root element was not found");
}

createRoot(container).render(
  <ThemeProvider>
    <GlassPresetProvider defaultPreset="thin" storageKey="ui-playground-glass">
      <Repl />
    </GlassPresetProvider>
  </ThemeProvider>,
);
