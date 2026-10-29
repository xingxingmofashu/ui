import { Moon, Sun } from "lucide-react";

import { ToggleGroup } from "@xingxingmofashu/ui";

import { useTheme } from "../theme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      aria-label="Color theme"
      size="sm"
      value={[theme]}
      onValueChange={(value) => {
        const next = value[0];

        if (next === "light" || next === "dark") {
          setTheme(next);
        }
      }}
      items={[
        { value: "light", label: "Light", icon: <Sun /> },
        { value: "dark", label: "Dark", icon: <Moon /> },
      ]}
    />
  );
}

export { ThemeToggle };
