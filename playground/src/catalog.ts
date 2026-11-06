type ComponentGroup = "Element" | "Form" | "Overlay" | "Feedback";

type CatalogEntry = {
  title: string;
  group: ComponentGroup;
};

const catalog: Record<string, CatalogEntry> = {
  accordion: { title: "Accordion", group: "Element" },
  "alert-dialog": { title: "Alert Dialog", group: "Overlay" },
  button: { title: "Button", group: "Element" },
  card: { title: "Card", group: "Element" },
  checkbox: { title: "Checkbox", group: "Form" },
  "checkbox-group": { title: "Checkbox Group", group: "Form" },
  dialog: { title: "Dialog", group: "Overlay" },
  drawer: { title: "Drawer", group: "Overlay" },
  field: { title: "Field", group: "Form" },
  fieldset: { title: "Fieldset", group: "Form" },
  form: { title: "Form", group: "Form" },
  input: { title: "Input", group: "Form" },
  menu: { title: "Menu", group: "Overlay" },
  popover: { title: "Popover", group: "Overlay" },
  progress: { title: "Progress", group: "Feedback" },
  "radio-group": { title: "Radio Group", group: "Form" },
  "scroll-area": { title: "Scroll Area", group: "Element" },
  select: { title: "Select", group: "Form" },
  slider: { title: "Slider", group: "Form" },
  switch: { title: "Switch", group: "Form" },
  tabs: { title: "Tabs", group: "Element" },
  toast: { title: "Toast", group: "Overlay" },
  toggle: { title: "Toggle", group: "Element" },
  "toggle-group": { title: "Toggle Group", group: "Element" },
  tooltip: { title: "Tooltip", group: "Overlay" },
};

const groupOrder: ComponentGroup[] = [
  "Element",
  "Form",
  "Overlay",
  "Feedback",
];

function toTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getComponentMeta(id: string): CatalogEntry {
  return catalog[id] ?? { title: toTitle(id), group: "Element" };
}

export { catalog, getComponentMeta, groupOrder, toTitle };
export type { CatalogEntry, ComponentGroup };
