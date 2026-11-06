import * as React from "react";
import * as ReactJsxRuntime from "react/jsx-runtime";

import * as UI from "@xingxingmofashu/ui";
import * as GlassPreset from "@xingxingmofashu/ui/plugins/glass-preset";

import { createIconModule } from "./icons";

const reactModule = Object.assign(Object.create(null), React, {
  default: React,
});
const reactJsxRuntimeModule = Object.assign(
  Object.create(null),
  ReactJsxRuntime,
  { default: ReactJsxRuntime },
);
const uiModule = Object.assign(Object.create(null), UI, { default: UI });
const glassPresetModule = Object.assign(Object.create(null), GlassPreset, {
  default: GlassPreset,
});

const replModules = {
  react: reactModule,
  "react/jsx-runtime": reactJsxRuntimeModule,
  "@xingxingmofashu/ui": uiModule,
  "@xingxingmofashu/ui/plugins/glass-preset": glassPresetModule,
  "lucide-react": createIconModule(),
};

export { replModules };
