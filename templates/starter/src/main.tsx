import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  Toast,
  ToastProvider,
} from "@/components/ui/xingxingmofashu/toast";
import { GlassPresetProvider } from "@/components/ui/xingxingmofashu/glass-preset";

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
