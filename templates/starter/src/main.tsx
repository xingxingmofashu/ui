import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toast, ToastProvider } from "@xingxingmofashu/ui";
import { GlassPresetProvider } from "@xingxingmofashu/ui/plugins/glass-preset";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <GlassPresetProvider storageKey="lumen-glass">
        <App />
        <Toast position="bottom-right" />
      </GlassPresetProvider>
    </ToastProvider>
  </StrictMode>,
);
