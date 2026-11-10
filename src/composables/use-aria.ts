"use client";

import * as React from "react";

type AriaProps = Pick<
  React.AriaAttributes,
  "aria-describedby" | "aria-label" | "aria-labelledby"
>;

type IdProps = {
  id: string;
};

type DescriptionAssociation = "named" | "always";

type AriaOptions = {
  /** Visible label content, when the component renders one. */
  label?: React.ReactNode;
  /** Supporting text content, when the component renders one. */
  description?: React.ReactNode;
  /** Explicit accessible name. */
  "aria-label"?: string;
  /** ID references for the accessible name. */
  "aria-labelledby"?: string;
  /** Additional description IDs. */
  "aria-describedby"?: string;
  /**
   * When to link the visible description. `"named"` links it only when the
   * control already has a name; `"always"` links it unconditionally.
   */
  descriptionAssociation?: DescriptionAssociation;
};

type AriaResult = {
  /** Props for the element that owns the control's role. */
  controlProps: AriaProps;
  /** Props for the visible description element. */
  descriptionProps: IdProps;
  /** Props for the visible label element. */
  labelProps: IdProps;
};

/**
 * Wires a control's accessible name and description.
 *
 * The visible label supplies the name unless `aria-label` or
 * `aria-labelledby` is set. Explicit `aria-describedby` IDs are preserved.
 */
function useAria({
  label,
  description,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  descriptionAssociation = "named",
}: AriaOptions = {}): AriaResult {
  const labelId = React.useId();
  const descriptionId = React.useId();
  const labelledBy =
    ariaLabelledBy || (label && !ariaLabel ? labelId : undefined);
  const shouldDescribe =
    Boolean(description) &&
    (descriptionAssociation === "always" ||
      Boolean(label || ariaLabel || ariaLabelledBy));
  const describedBy = shouldDescribe
    ? [ariaDescribedBy, descriptionId].filter(Boolean).join(" ")
    : ariaDescribedBy;

  return {
    controlProps: {
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      ...(labelledBy ? { "aria-labelledby": labelledBy } : {}),
      ...(describedBy ? { "aria-describedby": describedBy } : {}),
    },
    descriptionProps: { id: descriptionId },
    labelProps: { id: labelId },
  };
}

export { useAria };
