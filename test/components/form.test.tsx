import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act, createRef, type FormEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../src/components/button";
import { Field } from "../../src/components/field";
import { Form } from "../../src/components/form";
import { Input } from "../../src/components/input";
import theme from "../../src/theme/form";

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Form slot "${slot}" was not rendered.`);
  }

  return node;
}

function getRoot(name = "Account") {
  return screen.getByRole("form", { name });
}

describe("Form", () => {
  describe("structure", () => {
    it("renders a native form and forwards props", () => {
      render(
        <Form aria-label="Account" id="account-form" action="/save">
          <input name="email" />
        </Form>,
      );

      const root = getRoot();

      expect(root.tagName).toBe("FORM");
      expect(root).toHaveAttribute("data-slot", "root");
      expect(root).toHaveAttribute("id", "account-form");
      expect(root).toHaveAttribute("action", "/save");
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
    });

    it("forwards a ref to the form element", () => {
      const ref = createRef<HTMLFormElement>();

      render(<Form aria-label="Account" ref={ref} />);

      expect(ref.current).toBe(getRoot());
    });

    it("merges className into the root only", () => {
      render(
        <Form
          aria-label="Account"
          className="custom-root"
          ui={{ root: "ui-root" }}
        >
          <Field label="Email" name="email">
            <Input className="custom-input" />
          </Field>
        </Form>,
      );

      const root = getRoot();
      const inputRoot = screen
        .getByRole("textbox", { name: "Email" })
        .closest<HTMLElement>('[data-slot="root"]');

      expect(root).toHaveClass("custom-root", "ui-root");
      expect(inputRoot).not.toBe(root);
      expect(inputRoot).toHaveClass("custom-input");
      expect(inputRoot).not.toHaveClass("custom-root");
    });

    it("forwards inline styles to the form element", () => {
      render(<Form aria-label="Account" style={{ width: 200 }} />);

      expect(getRoot()).toHaveStyle({ width: "200px" });
    });
  });

  describe("errors", () => {
    it("shows an external error by field name", () => {
      render(
        <Form aria-label="Account" errors={{ email: "That address is taken." }}>
          <Field label="Email" name="email">
            <Input type="email" />
          </Field>
        </Form>,
      );

      const input = screen.getByRole("textbox", { name: "Email" });
      const root = getRoot();

      expect(screen.getByText("That address is taken.")).toBeVisible();
      expect(getSlot(root, "error")).toHaveTextContent(
        "That address is taken.",
      );
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAccessibleDescription("That address is taken.");
    });

    it("renders multiple errors as a list", () => {
      render(
        <Form
          aria-label="Account"
          errors={{
            email: ["Use a work address.", "Personal domains are not allowed."],
          }}
        >
          <Field label="Email" name="email">
            <Input type="email" />
          </Field>
        </Form>,
      );

      const error = getSlot(getRoot(), "error");

      expect(error.querySelector("ul")).not.toBeNull();
      expect(screen.getByText("Use a work address.")).toBeVisible();
      expect(
        screen.getByText("Personal domains are not allowed."),
      ).toBeVisible();
    });

    it("keeps field-level errors ahead of form errors", () => {
      render(
        <Form aria-label="Account" errors={{ email: "Server error." }}>
          <Field label="Email" name="email" error="Field error.">
            <Input type="email" />
          </Field>
        </Form>,
      );

      expect(screen.getByText("Field error.")).toBeVisible();
      expect(screen.queryByText("Server error.")).not.toBeInTheDocument();
    });
  });

  describe("submission", () => {
    it("calls onFormSubmit with registered field values", () => {
      const onFormSubmit = vi.fn();

      render(
        <Form aria-label="Account" onFormSubmit={onFormSubmit}>
          <Field label="Name" name="name">
            <Input defaultValue="Ada Lovelace" />
          </Field>
          <Field label="Email" name="email">
            <Input type="email" defaultValue="ada@example.com" />
          </Field>
          <Button type="submit">Submit</Button>
        </Form>,
      );

      fireEvent.submit(getRoot());

      expect(onFormSubmit).toHaveBeenCalledTimes(1);
      expect(onFormSubmit).toHaveBeenCalledWith(
        { name: "Ada Lovelace", email: "ada@example.com" },
        expect.objectContaining({ reason: "none" }),
      );
    });

    it("forwards the native submit handler", () => {
      const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      });

      render(
        <Form aria-label="Account" onSubmit={onSubmit}>
          <Field label="Email" name="email">
            <Input type="email" />
          </Field>
        </Form>,
      );

      fireEvent.submit(getRoot());

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("validates fields with the form validation mode", async () => {
      const user = userEvent.setup();

      render(
        <Form aria-label="Account" validationMode="onChange">
          <Field
            label="Email"
            name="email"
            validate={(value) =>
              String(value).includes("@")
                ? null
                : "Enter a valid email address."
            }
          >
            <Input type="email" />
          </Field>
        </Form>,
      );

      await user.type(screen.getByRole("textbox", { name: "Email" }), "hello");

      expect(
        await screen.findByText("Enter a valid email address."),
      ).toBeInTheDocument();
    });

    it("validates through actionsRef", async () => {
      const actionsRef = createRef<{
        validate: (fieldName?: string) => void;
      }>();

      render(
        <Form aria-label="Account" actionsRef={actionsRef}>
          <Field
            label="Email"
            name="email"
            validate={(value) =>
              value ? null : "Enter a valid email address."
            }
          >
            <Input type="email" />
          </Field>
        </Form>,
      );

      act(() => {
        actionsRef.current?.validate("email");
      });

      expect(
        await screen.findByText("Enter a valid email address."),
      ).toBeInTheDocument();
    });
  });

  describe("theme recipe", () => {
    it("exposes the public slots", () => {
      const styles = theme();

      expect(Object.keys(styles).sort()).toEqual(["base", "root"]);
    });

    it("stacks form children with the shared gap", () => {
      const styles = theme();

      expect(styles.root()).toContain("flex");
      expect(styles.root()).toContain("flex-col");
      expect(styles.root()).toContain("gap-4");
      expect(styles.root()).toContain("w-full");
    });
  });
});
