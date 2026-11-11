"use client";

import * as React from "react";

import { FieldsetContext } from "./use-fieldset";

type FieldsetProviderProps = {
  disabled: boolean;
  children: React.ReactNode;
};

/** Shares a fieldset's state with every control inside it. */
function FieldsetProvider({ disabled, children }: FieldsetProviderProps) {
  const value = React.useMemo(() => ({ disabled }), [disabled]);

  return React.createElement(FieldsetContext.Provider, { value }, children);
}

export { FieldsetProvider };
export type { FieldsetProviderProps };
