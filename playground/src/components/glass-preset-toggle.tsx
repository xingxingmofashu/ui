import { ToggleGroup } from "@xingxingmofashu/ui";
import { useGlassPreset } from "@xingxingmofashu/ui/plugins/glass-preset";

function GlassPresetToggle() {
  const { preset, setPreset } = useGlassPreset();

  return (
    <ToggleGroup
      aria-label="Glass material"
      size="sm"
      value={[preset]}
      onValueChange={(value) => {
        const next = value[0];

        if (next === "thin" || next === "regular" || next === "thick") {
          setPreset(next);
        }
      }}
      items={[
        { value: "thin", label: "Thin" },
        { value: "regular", label: "Regular" },
        { value: "thick", label: "Thick" },
      ]}
    />
  );
}

export { GlassPresetToggle };
