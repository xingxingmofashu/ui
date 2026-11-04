import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckboxGroup } from "../../src/components/checkbox-group";
import { Field } from "../../src/components/field";
import { Input } from "../../src/components/input";
import { RadioGroup } from "../../src/components/radio-group";
import theme from "../../src/theme/field";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Field slot "${slot}" was not rendered.`);
  }

  return node;
}

function querySlot(element: Element, slot: string) {
  return element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function getRoot(label = "Email") {
  const root = screen
    .getByText(label)
    .closest<HTMLElement>('[data-slot="root"]');

  if (!root) {
    throw new Error("Field root was not rendered.");
  }

  return root;
}

function WrappedRadioGroup() {
  return (
    <RadioGroup
      items={[
        { value: "free", label: "Free" },
        { value: "pro", label: "Pro" },
      ]}
    />
  );
}

describe("Field", () => {
  describe("accessible names and descriptions", () => {
    it("associates the visible label with the control", () => {
      render(
        <Field label="Email">
          <Input placeholder="you@example.com" />
        </Field>,
      );

      expect(
        screen.getByRole("textbox", { name: "Email" }),
      ).toBeInTheDocument();
    });

    it("links the description with aria-describedby", () => {
      render(
        <Field label="Email" description="We only use this for account notices.">
          <Input />
        </Field>,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      expect(input).toHaveAccessibleDescription(
        "We only use this for account notices.",
      );
    });

    it("links an external error message with aria-describedby", () => {
      render(
        <Field label="Email" error="Enter a valid email address.">
          <Input />
        </Field>,
      );

      const input = screen.getByRole("textbox", { name: "Email" });

      expect(input).toHaveAccessibleDescription("Enter a valid email address.");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("names grouped controls through the field label", () => {
      render(
        <Field label="Notifications">
          <CheckboxGroup
            items={[
              { value: "comments", label: "Comments" },
              { value: "releases", label: "Releases" },
            ]}
          />
        </Field>,
      );

      expect(
        screen.getByRole("group", { name: "Notifications" }),
      ).toBeInTheDocument();
    });

    it("labels grouped controls without targeting one option", () => {
      render(
        <Field label="Plan">
          <RadioGroup
            items={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
            ]}
          />
        </Field>,
      );

      const label = getSlot(getRoot("Plan"), "label");

      expect(label.tagName).toBe("LABEL");
      expect(label).not.toHaveAttribute("for");
      expect(
        screen.getByRole("radiogroup", { name: "Plan" }),
      ).toBeInTheDocument();
    });

    it("does not select the first radio when the field label is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Field label="Plan">
          <RadioGroup
            items={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
            ]}
          />
        </Field>,
      );

      const [first] = screen.getAllByRole("radio");

      expect(first).toHaveAttribute("aria-checked", "false");

      await user.click(getSlot(getRoot("Plan"), "label"));

      expect(first).toHaveAttribute("aria-checked", "false");
    });

    it("does not select the first radio through a wrapped group", async () => {
      const user = userEvent.setup();

      render(
        <Field label="Plan">
          <WrappedRadioGroup />
        </Field>,
      );

      const [first] = screen.getAllByRole("radio");

      expect(
        screen.getByRole("radiogroup", { name: "Plan" }),
      ).toBeInTheDocument();
      expect(first).toHaveAttribute("aria-checked", "false");

      await user.click(getSlot(getRoot("Plan"), "label"));

      expect(first).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("validation", () => {
    it("renders the custom validate message", async () => {
      const user = userEvent.setup();

      render(
        <Field
          label="Email"
          validationMode="onChange"
          validate={(value) =>
            String(value).includes("@") ? null : "Enter a valid email address."
          }
        >
          <Input />
        </Field>,
      );

      await user.type(screen.getByRole("textbox", { name: "Email" }), "hello");

      expect(
        await screen.findByText("Enter a valid email address."),
      ).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("shows an external error and marks the field invalid", () => {
      render(
        <Field
          label="Email"
          error="That address is already in use."
          description="Use a different address."
        >
          <Input />
        </Field>,
      );

      const input = screen.getByRole("textbox", { name: "Email" });
      const root = getRoot();

      expect(screen.getByText("That address is already in use.")).toBeVisible();
      expect(getSlot(root, "error-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(getSlot(root, "error-text")).toHaveTextContent(
        "That address is already in use.",
      );
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(root).toHaveAttribute("data-invalid");
    });

    it("renders multiple validation messages as a list", async () => {
      const user = userEvent.setup();

      render(
        <Field
          label="Password"
          validationMode="onChange"
          validate={(value) => {
            const text = String(value);

            return text.length >= 8
              ? null
              : ["Use at least 8 characters.", "Use a number or symbol."];
          }}
        >
          <Input type="password" />
        </Field>,
      );

      await user.type(screen.getByLabelText("Password"), "short");

      const errorText = getSlot(getRoot("Password"), "error-text");

      expect(await screen.findByText("Use at least 8 characters.")).toBeVisible();
      expect(errorText.querySelector("ul")).not.toBeNull();
    });

    it("does not render an error when the field is valid", () => {
      render(
        <Field label="Email">
          <Input />
        </Field>,
      );

      expect(querySlot(getRoot(), "error")).toBeNull();
      expect(getRoot()).not.toHaveAttribute("data-invalid");
    });
  });

  describe("structure", () => {
    it("renders the label, control, error, and description slots", () => {
      render(
        <Field
          label="Email"
          description="We only use this for account notices."
          error="Enter a valid email address."
        >
          <Input />
        </Field>,
      );

      const root = getRoot();

      expect(getSlot(root, "label").tagName).toBe("LABEL");
      expect(getSlot(root, "error").tagName).toBe("DIV");
      expect(getSlot(root, "error")).toHaveTextContent(
        "Enter a valid email address.",
      );
      expect(getSlot(root, "description").tagName).toBe("P");
    });

    it("does not render empty optional slots", () => {
      render(
        <Field label="Email">
          <Input />
        </Field>,
      );

      const root = getRoot();

      expect(querySlot(root, "description")).toBeNull();
      expect(querySlot(root, "error")).toBeNull();
    });

    it("renders a custom error node and keeps the message linked", () => {
      render(
        <Field
          label="Email"
          error={
            <span data-testid="custom-error">
              <svg data-testid="custom-error-icon" />
              Enter a valid email address.
            </span>
          }
        >
          <Input />
        </Field>,
      );

      const root = getRoot();
      const input = screen.getByRole("textbox", { name: "Email" });

      expect(screen.getByTestId("custom-error")).toHaveTextContent(
        "Enter a valid email address.",
      );
      expect(screen.getByTestId("custom-error-icon")).toBeInTheDocument();
      expect(querySlot(root, "error-icon")).toBeNull();
      expect(querySlot(root, "error-text")).toBeNull();
      expect(input).toHaveAccessibleDescription("Enter a valid email address.");
    });

    it("merges className into the root only", () => {
      render(
        <Field
          label="Email"
          description="Help"
          error="Required"
          className="custom-root"
        >
          <Input className="custom-input" />
        </Field>,
      );

      const root = getRoot();
      const input = screen.getByRole("textbox", { name: "Email" });

      expect(root).toHaveClass("custom-root");
      expect(getSlot(root, "label")).not.toHaveClass("custom-root");
      expect(getSlot(root, "error")).not.toHaveClass("custom-root");
      expect(getSlot(root, "description")).not.toHaveClass("custom-root");

      const inputRoot = input.closest('[data-slot="root"]');

      expect(inputRoot).not.toBe(root);
      expect(inputRoot).toHaveClass("custom-input");
      expect(inputRoot).not.toHaveClass("custom-root");
    });

    it("applies ui classes to internal slots", () => {
      render(
        <Field
          label="Email"
          description="Help"
          error="Required"
          ui={{
            root: "ui-root",
            label: "ui-label",
            error: "ui-error",
            errorIcon: "ui-error-icon",
            errorText: "ui-error-text",
            description: "ui-description",
          }}
        >
          <Input />
        </Field>,
      );

      const root = getRoot();

      expect(root).toHaveClass("ui-root");
      expect(getSlot(root, "label")).toHaveClass("ui-label");
      expect(getSlot(root, "error")).toHaveClass("ui-error");
      expect(getSlot(root, "error-icon")).toHaveClass("ui-error-icon");
      expect(getSlot(root, "error-text")).toHaveClass("ui-error-text");
      expect(getSlot(root, "description")).toHaveClass("ui-description");
    });

    it("does not accept inline styles", () => {
      const element = (
        // @ts-expect-error The field theme owns inline styles.
        <Field label="Email" style={{ width: 200 }}>
          <Input />
        </Field>
      );

      expect(element).toBeTruthy();
    });
  });

  describe("state", () => {
    it("disables the control through the field", () => {
      render(
        <Field label="Email" description="Locked" disabled>
          <Input />
        </Field>,
      );

      const root = getRoot();
      const input = screen.getByRole("textbox", { name: "Email" });

      expect(root).toHaveAttribute("data-disabled");
      expect(input).toBeDisabled();
      expect(getSlot(root, "label")).toHaveAttribute("data-disabled");
      expect(getSlot(root, "description")).toHaveAttribute("data-disabled");
    });

    it("forwards the name to the control", () => {
      render(
        <Field label="Email" name="email">
          <Input />
        </Field>,
      );

      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
        "name",
        "email",
      );
    });
  });

  describe("sizes", () => {
    it("defaults to md", () => {
      const styles = theme();

      expect(styles.root()).toContain("[--ui-field-gap:6px]");
      expect(styles.root()).toContain("[--ui-field-label-size:0.875rem]");
      expect(styles.root()).toContain("[--ui-field-message-size:0.875rem]");
    });

    it.each([
      ["xs", "[--ui-field-gap:4px]", "[--ui-field-label-size:0.75rem]"],
      ["sm", "[--ui-field-gap:4px]", "[--ui-field-label-size:0.75rem]"],
      ["md", "[--ui-field-gap:6px]", "[--ui-field-label-size:0.875rem]"],
      ["lg", "[--ui-field-gap:6px]", "[--ui-field-label-size:0.875rem]"],
      ["xl", "[--ui-field-gap:8px]", "[--ui-field-label-size:1rem]"],
    ] as const)("applies the %s size", (size, gapClass, labelClass) => {
      const styles = theme({ size });

      expect(styles.root()).toContain(gapClass);
      expect(styles.root()).toContain(labelClass);
    });
  });

  describe("theme recipe", () => {
    it("exposes the public slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual([
        "base",
        "description",
        "error",
        "errorIcon",
        "errorText",
        "label",
        "root",
      ]);
    });

    it("fades the label, error, and description when the field is disabled", () => {
      const styles = theme();

      expect(styles.label()).toContain(
        "group-data-[disabled]/field:opacity-60",
      );
      expect(styles.error()).toContain(
        "group-data-[disabled]/field:opacity-60",
      );
      expect(styles.description()).toContain(
        "group-data-[disabled]/field:opacity-50",
      );
    });
  });
});
