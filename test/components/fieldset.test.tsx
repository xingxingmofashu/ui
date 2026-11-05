import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field } from "../../src/components/field";
import { Fieldset } from "../../src/components/fieldset";
import { Input } from "../../src/components/input";
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

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The fieldset theme owns inline styles.
        <Fieldset legend="Billing details" style={{ width: 200 }}>
          <Field label="Company">
            <Input />
          </Field>
        </Fieldset>
      );

      expect(element).toBeTruthy();
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
