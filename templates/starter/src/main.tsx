import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toast, ToastProvider } from "@xingxingmofashu/ui";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <Toast position="bottom-right" />
    </ToastProvider>
  </StrictMode>,
);
