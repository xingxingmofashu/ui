"use client";

import * as React from "react";

type FieldsetContext = {
  disabled: boolean;
};

const FieldsetContext = React.createContext<FieldsetContext>({
  disabled: false,
});

type FieldsetProviderProps = {
  disabled: boolean;
  children: React.ReactNode;
};

/** Shares a fieldset's state with every control inside it. */
function FieldsetProvider({ disabled, children }: FieldsetProviderProps) {
  const value = React.useMemo(() => ({ disabled }), [disabled]);

  return React.createElement(FieldsetContext.Provider, { value }, children);
}

/** Returns the state of the nearest fieldset. */
function useFieldset() {
  return React.useContext(FieldsetContext);
}

export { FieldsetProvider, useFieldset };
export type { FieldsetContext, FieldsetProviderProps };
