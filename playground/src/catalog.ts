const groupOrder = [
  "Element",
  "Form",
  "Data",
  "Navigation",
  "Overlay",
] as const;

type ComponentGroup = (typeof groupOrder)[number];

const componentGroups: Partial<Record<string, ComponentGroup>> = {
  accordion: "Data",
  "alert-dialog": "Overlay",
  button: "Element",
  card: "Element",
  checkbox: "Form",
  "checkbox-group": "Form",
  collapsible: "Element",
  dialog: "Overlay",
  drawer: "Overlay",
  field: "Form",
  fieldset: "Form",
  form: "Form",
  input: "Form",
  menu: "Overlay",
  popover: "Overlay",
  progress: "Element",
  "radio-group": "Form",
  "scroll-area": "Data",
  select: "Form",
  slider: "Form",
  switch: "Form",
  tabs: "Navigation",
  toast: "Overlay",
  toggle: "Element",
  "toggle-group": "Element",
  toolbar: "Element",
  tooltip: "Overlay",
};

function toTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getComponentMeta(id: string) {
  return { title: toTitle(id), group: componentGroups[id] ?? "Element" };
}

export { getComponentMeta, groupOrder, toTitle };
