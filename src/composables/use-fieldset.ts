"use client";

import * as React from "react";

type FieldsetContext = {
  disabled: boolean;
};

/**
 * Registry items install as single files, so each control carries its own copy
 * of this module. A global key keeps the context shared between a Fieldset and
 * controls installed from separate items.
 */
const FIELD_SET_CONTEXT_KEY = "__xingxingmofashuFieldsetContext__";

type FieldsetGlobal = typeof globalThis & {
  [FIELD_SET_CONTEXT_KEY]?: React.Context<FieldsetContext>;
};

const fieldsetGlobal = globalThis as FieldsetGlobal;
const FieldsetContext =
  fieldsetGlobal[FIELD_SET_CONTEXT_KEY] ??
  (fieldsetGlobal[FIELD_SET_CONTEXT_KEY] = React.createContext<FieldsetContext>({
    disabled: false,
  }));

/** Returns the state of the nearest fieldset. */
function useFieldset() {
  return React.useContext(FieldsetContext);
}

export { FieldsetContext, useFieldset };
