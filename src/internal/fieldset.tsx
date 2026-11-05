"use client";

import * as React from "react";

const FieldsetDisabledContext = React.createContext(false);

type FieldsetDisabledProviderProps = {
  disabled: boolean;
  children: React.ReactNode;
};

function FieldsetDisabledProvider({
  disabled,
  children,
}: FieldsetDisabledProviderProps) {
  return (
    <FieldsetDisabledContext.Provider value={disabled}>
      {children}
    </FieldsetDisabledContext.Provider>
  );
}

function useFieldsetDisabled(disabled = false) {
  return React.useContext(FieldsetDisabledContext) || disabled;
}

export { FieldsetDisabledProvider, useFieldsetDisabled };
