import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { SwitchControlled } from "@/components/examples/switch-controlled";
import {
  ButtonIcons,
  ButtonSizes,
  ButtonStates,
  CardPreview,
  SwitchSizes,
  SwitchStates,
} from "@/components/preview";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ButtonSizes,
    ButtonIcons,
    ButtonStates,
    CardPreview,
    SwitchSizes,
    SwitchStates,
    SwitchControlled,
    ...components,
  };
}
