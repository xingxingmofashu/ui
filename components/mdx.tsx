import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import {
  ButtonBasic,
  ButtonFullWidth,
  ButtonIcons,
  ButtonLink,
  ButtonSizes,
  ButtonStates,
} from "@/components/examples/button";
import {
  CardBasic,
  CardContentOnly,
  CardCustomSlots,
} from "@/components/examples/card";
import {
  SliderBasic,
  SliderDisabled,
  SliderForm,
  SliderRange,
  SliderVertical,
} from "@/components/examples/slider";
import {
  SwitchBasic,
  SwitchControlled,
  SwitchForm,
  SwitchMonochrome,
  SwitchSizes,
  SwitchStates,
  SwitchUncontrolled,
} from "@/components/examples/switch";
import {
  ToggleGroupBasic,
  ToggleGroupControlled,
  ToggleGroupOrientation,
  ToggleGroupSelection,
  ToggleGroupSizes,
} from "@/components/examples/toggle-group";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ButtonBasic,
    ButtonFullWidth,
    ButtonIcons,
    ButtonLink,
    ButtonSizes,
    ButtonStates,
    CardBasic,
    CardContentOnly,
    CardCustomSlots,
    SliderBasic,
    SliderDisabled,
    SliderForm,
    SliderRange,
    SliderVertical,
    SwitchBasic,
    SwitchControlled,
    SwitchForm,
    SwitchMonochrome,
    SwitchSizes,
    SwitchStates,
    SwitchUncontrolled,
    ToggleGroupBasic,
    ToggleGroupControlled,
    ToggleGroupOrientation,
    ToggleGroupSelection,
    ToggleGroupSizes,
    ...components,
  };
}
