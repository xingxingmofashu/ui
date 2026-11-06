const groupOrder = ["Element", "Form", "Overlay", "Feedback"] as const;

type ComponentGroup = (typeof groupOrder)[number];

const componentGroups: Partial<Record<string, ComponentGroup>> = {
  accordion: "Element",
  "alert-dialog": "Overlay",
  button: "Element",
  card: "Element",
  checkbox: "Form",
  "checkbox-group": "Form",
  dialog: "Overlay",
  drawer: "Overlay",
  field: "Form",
  fieldset: "Form",
  form: "Form",
  input: "Form",
  menu: "Overlay",
  popover: "Overlay",
  progress: "Feedback",
  "radio-group": "Form",
  "scroll-area": "Element",
  select: "Form",
  slider: "Form",
  switch: "Form",
  tabs: "Element",
  toast: "Overlay",
  toggle: "Element",
  "toggle-group": "Element",
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
