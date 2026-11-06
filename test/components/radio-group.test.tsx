import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, type RadioGroupItemProps } from "../../src/components/radio-group";

const plans = [
  {
    value: "free",
    label: "Free",
    description: "For personal projects.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "For growing teams.",
  },
  {
    value: "team",
    label: "Team",
    description: "For larger organizations.",
  },
] as const satisfies readonly RadioGroupItemProps[];

function ControlledGroup() {
  const [value, setValue] = useState("free");

  return (
    <RadioGroup
      aria-label="Plan"
      items={plans}
      value={value}
      onValueChange={setValue}
    />
  );
}

function getGroup(name = "Plan") {
  const group = screen.getByRole("radiogroup", { name });

  if (!(group instanceof HTMLElement)) {
    throw new Error(`Radio group "${name}" was not rendered.`);
  }

  return group;
}

function getSlot(element: Element, slot: string) {
  const node = element.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

  if (!node) {
    throw new Error(`Radio group slot "${slot}" was not rendered.`);
  }

  return node;
}

function getRadios(group: HTMLElement) {
  return within(group).getAllByRole("radio");
}

describe("RadioGroup", () => {
  describe("accessible names", () => {
    it("renders a labelled group with named options", () => {
      render(
        <RadioGroup
          label="Plan"
          description="Choose the plan that fits your team."
          items={plans}
          defaultValue="pro"
        />,
      );

      const group = getGroup();

      expect(group).toHaveAttribute("data-slot", "root");
      expect(group).toHaveAccessibleDescription(
        "Choose the plan that fits your team.",
      );
      expect(getRadios(group).map((radio) => radio.getAttribute("aria-label"))).toEqual([
        null,
        null,
        null,
      ]);
      expect(
        screen.getByRole("radio", { name: "Free" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Pro" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Team" }),
      ).toBeInTheDocument();
    });

    it("supports aria-label without a visible group label", () => {
      render(
        <RadioGroup aria-label="Plan" items={plans} defaultValue="free" />,
      );

      const group = getGroup();
      const radios = getRadios(group);

      expect(group).not.toHaveAttribute("aria-labelledby");
      expect(radios[0]).toHaveAttribute("aria-checked", "true");
    });

    it("supports item aria-label when no visible label is rendered", () => {
      render(
        <RadioGroup
          aria-label="Plan"
          items={[
            { value: "free", "aria-label": "Free plan" },
            { value: "pro", "aria-label": "Pro plan" },
          ]}
        />,
      );

      expect(
        screen.getByRole("radio", { name: "Free plan" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", { name: "Pro plan" }),
      ).toBeInTheDocument();
    });

    it("uses the visible item label and links its description", () => {
      render(<RadioGroup aria-label="Plan" items={plans} />);

      const radio = screen.getByRole("radio", { name: "Free" });
      const label = getSlot(radio, "item-label");
      const description = getSlot(radio, "item-description");

      expect(radio).toHaveAttribute("aria-labelledby", label.id);
      expect(radio).toHaveAttribute("aria-describedby", description.id);
      expect(radio).toHaveAccessibleDescription("For personal projects.");
    });

    it("selects an option when its visible label is clicked", async () => {
      const user = userEvent.setup();

      render(<RadioGroup aria-label="Plan" items={plans} />);

      await user.click(screen.getByText("Pro"));

      expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });
  });

  describe("structure", () => {
    it("renders the glass control, indicator, and item copy", () => {
      render(<RadioGroup aria-label="Plan" items={plans} defaultValue="pro" />);

      const group = getGroup();
      const items = getSlot(group, "items");
      const radio = screen.getByRole("radio", { name: "Pro" });
      const box = getSlot(radio, "box");
      const glass = getSlot(box, "glass");
      const overlay = getSlot(glass, "overlay");
      const indicator = getSlot(box, "indicator");
      const dot = getSlot(indicator, "dot");
      const wrapper = getSlot(radio, "wrapper");

      expect(items).toContainElement(radio);
      expect(radio.tagName).toBe("SPAN");
      expect(radio).toHaveAttribute("data-slot", "item");
      expect(box).toHaveAttribute("data-slot", "box");
      expect(glass).toHaveAttribute("aria-hidden", "true");
      expect(glass).toHaveClass("ui-glass", "rounded-[inherit]");
      expect(overlay).toHaveClass("ui-glass-rim");
      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(dot).toHaveAttribute("data-slot", "dot");
      expect(wrapper).toContainElement(getSlot(radio, "item-label"));
      expect(wrapper).toContainElement(getSlot(radio, "item-description"));
      expect(document.querySelectorAll('input[type="radio"]')).toHaveLength(3);
    });

    it("keeps the indicator mounted when unchecked", () => {
      render(<RadioGroup aria-label="Plan" items={plans} />);

      const radio = screen.getByRole("radio", { name: "Free" });
      const indicator = getSlot(radio, "indicator");

      expect(indicator).toHaveAttribute("data-unchecked");
      expect(indicator).toHaveClass("opacity-0", "scale-50");
    });
  });

  describe("states", () => {
    it("selects an option and reports the change", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <RadioGroup
          aria-label="Plan"
          items={plans}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("radio", { name: "Team" }));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toBe("team");
      expect(screen.getByRole("radio", { name: "Team" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("supports controlled values", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <RadioGroup
          aria-label="Plan"
          items={plans}
          value="free"
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("radio", { name: "Pro" }));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange.mock.calls[0]?.[0]).toBe("pro");
      expect(screen.getByRole("radio", { name: "Free" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("moves the selection with arrow keys", async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup aria-label="Plan" items={plans} defaultValue="free" />,
      );

      const free = screen.getByRole("radio", { name: "Free" });
      const pro = screen.getByRole("radio", { name: "Pro" });
      const team = screen.getByRole("radio", { name: "Team" });

      await user.click(free);
      await user.keyboard("{ArrowDown}");

      expect(pro).toHaveAttribute("aria-checked", "true");
      expect(free).toHaveAttribute("aria-checked", "false");

      await user.keyboard("{ArrowDown}");

      expect(team).toHaveAttribute("aria-checked", "true");
      expect(pro).toHaveAttribute("aria-checked", "false");
    });

    it("disables every option when the group is disabled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <RadioGroup
          aria-label="Plan"
          items={plans}
          disabled
          onValueChange={onValueChange}
        />,
      );

      const radio = screen.getByRole("radio", { name: "Pro" });

      expect(radio).toHaveAttribute("aria-disabled", "true");
      await user.click(radio);

      expect(onValueChange).not.toHaveBeenCalled();
      expect(radio).toHaveAttribute("aria-checked", "false");
    });

    it("disables a single option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <RadioGroup
          aria-label="Plan"
          items={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro", disabled: true },
            { value: "team", label: "Team" },
          ]}
          onValueChange={onValueChange}
        />,
      );

      const pro = screen.getByRole("radio", { name: "Pro" });

      expect(pro).toHaveAttribute("aria-disabled", "true");
      await user.click(pro);

      expect(onValueChange).not.toHaveBeenCalled();
      expect(pro).toHaveAttribute("aria-checked", "false");
    });

    it("prevents changes in read-only mode", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <RadioGroup
          aria-label="Plan"
          items={plans}
          readOnly
          defaultValue="free"
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByRole("radio", { name: "Pro" }));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByRole("radio", { name: "Free" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("submits the selected value through a named form field", () => {
      render(
        <form>
          <RadioGroup
            aria-label="Plan"
            name="plan"
            items={plans}
            defaultValue="pro"
          />
        </form>,
      );

      const input = document.querySelector<HTMLInputElement>(
        'input[type="radio"][value="pro"]',
      );

      expect(input).not.toBeNull();
      expect(input).toBeChecked();
      expect(input).toHaveAttribute("name", "plan");
    });

    it("supports a controlled wrapper without losing selection", async () => {
      const user = userEvent.setup();

      render(<ControlledGroup />);

      await user.click(screen.getByRole("radio", { name: "Pro" }));

      expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });
  });

  describe("styling", () => {
    it("applies className to the group and item roots", () => {
      render(
        <RadioGroup
          aria-label="Plan"
          className="custom-group"
          items={[
            {
              value: "free",
              label: "Free",
              className: "custom-item",
            },
          ]}
        />,
      );

      const group = getGroup();
      const radio = screen.getByRole("radio", { name: "Free" });

      expect(group).toHaveClass("custom-group");
      expect(radio).toHaveClass("custom-item");
      expect(getSlot(radio, "box")).not.toHaveClass("custom-item");
    });

    it("forwards inline styles to the group and item roots", () => {
      render(
        <RadioGroup
          aria-label="Plan"
          style={{ opacity: 0.5 }}
          items={[
            {
              value: "free",
              label: "Free",
              style: { opacity: 0.25 },
            },
          ]}
        />,
      );

      const group = getGroup();
      const radio = screen.getByRole("radio", { name: "Free" });

      expect(group).toHaveStyle({ opacity: "0.5" });
      expect(radio).toHaveStyle({ opacity: "0.25" });
    });

    it("applies ui classes to group and item slots", () => {
      render(
        <RadioGroup
          aria-label="Plan"
          ui={{
            root: "ui-root",
            header: "ui-header",
            label: "ui-label",
            description: "ui-description",
            items: "ui-items",
            item: "ui-item",
            box: "ui-box",
            glass: "ui-glass-slot",
            overlay: "ui-overlay",
            indicator: "ui-indicator",
            dot: "ui-dot",
            wrapper: "ui-wrapper",
            itemLabel: "ui-item-label",
            itemDescription: "ui-item-description",
          }}
          label="Plan"
          description="Choose a plan."
          items={[
            {
              value: "free",
              label: "Free",
              description: "For personal projects.",
              ui: {
                item: "item-item",
                box: "item-box",
                dot: "item-dot",
                itemLabel: "item-label",
                itemDescription: "item-description",
              },
            },
          ]}
        />,
      );

      const group = getGroup();
      const radio = screen.getByRole("radio", { name: "Free" });

      expect(group).toHaveClass("ui-root");
      expect(getSlot(group, "header")).toHaveClass("ui-header");
      expect(getSlot(group, "label")).toHaveClass("ui-label");
      expect(getSlot(group, "description")).toHaveClass("ui-description");
      expect(getSlot(group, "items")).toHaveClass("ui-items");
      expect(radio).toHaveClass("ui-item", "item-item");
      expect(getSlot(radio, "box")).toHaveClass("ui-box", "item-box");
      expect(getSlot(radio, "glass")).toHaveClass("ui-glass-slot");
      expect(getSlot(radio, "overlay")).toHaveClass("ui-overlay");
      expect(getSlot(radio, "indicator")).toHaveClass("ui-indicator");
      expect(getSlot(radio, "dot")).toHaveClass("ui-dot", "item-dot");
      expect(getSlot(radio, "wrapper")).toHaveClass("ui-wrapper");
      expect(getSlot(radio, "item-label")).toHaveClass(
        "ui-item-label",
        "item-label",
      );
      expect(getSlot(radio, "item-description")).toHaveClass(
        "ui-item-description",
        "item-description",
      );
    });

    it("scales item text with the group size", () => {
      render(
        <>
          <RadioGroup
            aria-label="Small"
            size="xs"
            items={[{ value: "one", label: "One" }]}
          />
          <RadioGroup
            aria-label="Large"
            size="xl"
            items={[{ value: "one", label: "One" }]}
          />
        </>,
      );

      const small = within(getGroup("Small")).getByRole("radio", {
        name: "One",
      });
      const large = within(getGroup("Large")).getByRole("radio", {
        name: "One",
      });

      expect(getSlot(small, "wrapper")).toHaveClass("text-xs");
      expect(getSlot(small, "wrapper")).not.toHaveClass("text-sm");
      expect(getSlot(large, "wrapper")).toHaveClass("text-base");
      expect(getSlot(large, "wrapper")).not.toHaveClass("text-sm");
    });

    it("renders every size variant", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      render(
        <div>
          {sizes.map((size) => (
            <RadioGroup
              key={size}
              aria-label={`Size ${size}`}
              size={size}
              items={[{ value: "one", label: "One" }]}
            />
          ))}
        </div>,
      );

      for (const size of sizes) {
        expect(getGroup(`Size ${size}`)).toBeInTheDocument();
      }
    });
  });
});
