import { Moon, Sun } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

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
    >
      <ToggleGroupItem value="light" aria-label="Light theme" icon={<Sun />}>
        Light
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark theme" icon={<Moon />}>
        Dark
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export { ThemeToggle };
