import * as React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import { ThemeProvider } from "./theme";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Playground root element was not found");
}

createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
