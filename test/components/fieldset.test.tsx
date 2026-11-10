import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "../../src/components/button";
import { Checkbox } from "../../src/components/checkbox";
import { CheckboxGroup } from "../../src/components/checkbox-group";
import { Field } from "../../src/components/field";
import { Fieldset } from "../../src/components/fieldset";
import { Input } from "../../src/components/input";
import { RadioGroup } from "../../src/components/radio-group";
import { Select } from "../../src/components/select";
import { Slider } from "../../src/components/slider";
import { Switch } from "../../src/components/switch";
import { Toggle } from "../../src/components/toggle";
import { ToggleGroup } from "../../src/components/toggle-group";
import theme from "../../src/theme/fieldset";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Fieldset slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: Element, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function getRoot(name = "Billing details") {
  return screen.getByRole("group", { name });
}

describe("Fieldset", () => {
  describe("accessible names", () => {
    it("associates the legend with the fieldset", () => {
      render(
        <Fieldset legend="Billing details">
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();
      const legend = getSlot(root, "legend");

      expect(root.tagName).toBe("FIELDSET");
      expect(root).toHaveAttribute("aria-labelledby", legend.id);
      expect(legend.tagName).toBe("DIV");
      expect(legend).toHaveTextContent("Billing details");
    });

    it("associates the legend before hydration", () => {
      const markup = renderToStaticMarkup(
        <Fieldset legend="Billing details">
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );
      const container = document.createElement("div");

      container.innerHTML = markup;

      const root = container.querySelector("fieldset");
      const legend = container.querySelector('[data-slot="legend"]');

      expect(root).not.toBeNull();
      expect(legend).not.toBeNull();

      if (!root || !legend) {
        throw new Error("Fieldset markup was not rendered.");
      }

      expect(root).toHaveAttribute("aria-labelledby", legend.id);
    });

    it("supports aria-label when no legend is rendered", () => {
      render(
        <Fieldset aria-label="Billing details">
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();

      expect(querySlot(root, "legend")).toBeNull();
    });
  });

  describe("structure", () => {
    it("renders the legend and grouped fields", () => {
      render(
        <Fieldset legend="Billing details">
          <Field label="Company">
            <Input />
          </Field>
          <Field label="Tax ID">
            <Input />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();

      expect(getSlot(root, "legend")).toHaveTextContent("Billing details");
      expect(
        screen.getByRole("textbox", { name: "Company" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: "Tax ID" }),
      ).toBeInTheDocument();
    });

    it("merges className into the root only", () => {
      render(
        <Fieldset legend="Billing details" className="custom-root">
          <Field label="Company">
            <Input className="custom-input" />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();
      const input = screen.getByRole("textbox", { name: "Company" });

      expect(root).toHaveClass("custom-root");
      expect(getSlot(root, "legend")).not.toHaveClass("custom-root");

      const inputRoot = input.closest('[data-slot="root"]');

      expect(inputRoot).not.toBe(root);
      expect(inputRoot).toHaveClass("custom-input");
      expect(inputRoot).not.toHaveClass("custom-root");
    });

    it("applies ui classes to internal slots", () => {
      render(
        <Fieldset
          legend="Billing details"
          ui={{
            root: "ui-root",
            legend: "ui-legend",
          }}
        >
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();

      expect(root).toHaveClass("ui-root");
      expect(getSlot(root, "legend")).toHaveClass("ui-legend");
    });

    it("forwards inline styles to the fieldset root", () => {
      render(
        <Fieldset legend="Billing details" style={{ width: 200 }}>
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      expect(getRoot()).toHaveStyle({ width: "200px" });
    });
  });

  describe("state", () => {
    it("disables nested fields through the fieldset", () => {
      render(
        <Fieldset legend="Billing details" disabled>
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      const root = getRoot();
      const input = screen.getByRole("textbox", { name: "Company" });

      expect(root).toBeDisabled();
      expect(root).toHaveAttribute("data-disabled");
      expect(input).toBeDisabled();
      expect(getSlot(root, "legend")).toHaveAttribute("data-disabled");
    });

    it("disables direct package controls through the fieldset", () => {
      render(
        <Fieldset legend="Preferences" disabled>
          <Checkbox label="Weekly digest" />
          <CheckboxGroup
            label="Channels"
            items={[{ value: "comments", label: "Comments" }]}
          />
          <Input aria-label="Search" />
          <RadioGroup
            label="Plan"
            items={[{ value: "free", label: "Free" }]}
          />
          <Select
            label="Region"
            items={[{ value: "eu", label: "Europe" }]}
          />
          <Slider aria-label="Volume" />
          <Switch label="Notifications" />
          <Button>Save</Button>
          <Toggle label="Bold" />
          <ToggleGroup
            aria-label="Density"
            items={[{ value: "compact", label: "Compact" }]}
          />
        </Fieldset>,
      );

      expect(
        screen.getByRole("checkbox", { name: "Weekly digest" }),
      ).toHaveAttribute("data-disabled");

      expect(screen.getByRole("group", { name: "Channels" })).toHaveAttribute(
        "data-disabled",
      );
      expect(
        screen.getByRole("checkbox", { name: "Comments" }),
      ).toHaveAttribute("aria-disabled", "true");

      const search = screen.getByRole("textbox", { name: "Search" });

      expect(search).toBeDisabled();
      expect(search.closest('[data-slot="root"]')).toHaveAttribute(
        "data-disabled",
      );

      expect(
        screen.getByRole("radiogroup", { name: "Plan" }),
      ).toHaveAttribute("data-disabled");

      const trigger = screen.getByRole("combobox", { name: "Region" });

      expect(trigger).toBeDisabled();
      expect(trigger.closest('[data-slot="root"]')).toHaveAttribute(
        "data-disabled",
      );

      const slider = screen.getByRole("slider", { name: "Volume" });

      expect(slider).toBeDisabled();
      expect(slider.closest('[data-slot="root"]')).toHaveAttribute(
        "data-disabled",
      );

      expect(
        screen.getByRole("switch", { name: "Notifications" }),
      ).toHaveAttribute("data-disabled");

      expect(
        screen.getByRole("button", { name: "Save" }),
      ).toHaveAttribute("data-disabled");
      expect(
        screen.getByRole("button", { name: "Bold" }),
      ).toHaveAttribute("data-disabled");
      expect(
        screen.getByRole("button", { name: "Compact" }),
      ).toHaveAttribute("data-disabled");
    });

    it("forwards native fieldset attributes", () => {
      render(
        <Fieldset legend="Billing details" id="billing-fieldset">
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>,
      );

      expect(getRoot()).toHaveAttribute("id", "billing-fieldset");
    });
  });

  describe("theme recipe", () => {
    it("exposes the public slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual(["base", "legend", "root"]);
    });

    it("resets native fieldset styles and fades the disabled legend", () => {
      const styles = theme();

      expect(styles.root()).toContain("border-0");
      expect(styles.root()).toContain("p-0");
      expect(styles.root()).toContain("m-0");
      expect(styles.root()).toContain("min-w-0");
      expect(styles.legend()).toContain("data-[disabled]:opacity-60");
    });
  });
});
