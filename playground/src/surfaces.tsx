import { ArrowRight, Image as ImageIcon, Upload } from "lucide-react";
import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  Button,
  Card,
  Input,
  Slider,
  Switch,
  ToggleGroup,
} from "@xingxingmofashu/ui";
import { useGlassPreset } from "@xingxingmofashu/ui/plugins/glass-preset";

import { Caption, cx } from "./demo";
import { useTheme } from "./theme";

type SurfacePreset = {
  id: string;
  label: string;
  style: CSSProperties;
};

const baseUrl = import.meta.env.BASE_URL;
const publicAsset = (file: string) => `${baseUrl}${file.replace(/^\//, "")}`;

const presets: SurfacePreset[] = [
  {
    id: "image",
    label: "Image",
    style: {
      backgroundColor: "#0a0a0a",
      backgroundImage: `url("${publicAsset("w53k9q.jpg")}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    style: {
      backgroundColor: "#0d0620",
      backgroundImage: [
        "radial-gradient(55% 70% at 12% 18%, rgb(255 45 85 / 0.95) 0%, transparent 62%)",
        "radial-gradient(48% 68% at 84% 14%, rgb(255 159 10 / 0.9) 0%, transparent 60%)",
        "radial-gradient(58% 72% at 74% 88%, rgb(48 209 88 / 0.85) 0%, transparent 62%)",
        "radial-gradient(52% 70% at 16% 90%, rgb(10 132 255 / 0.9) 0%, transparent 64%)",
        "radial-gradient(42% 52% at 50% 48%, rgb(191 90 242 / 0.85) 0%, transparent 70%)",
        "linear-gradient(135deg, #101033, #2c0a45)",
      ].join(", "),
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    style: {
      backgroundColor: "#3a1c71",
      backgroundImage: [
        "radial-gradient(58% 76% at 18% 20%, #ff512f 0%, transparent 62%)",
        "radial-gradient(50% 70% at 86% 16%, #f09819 0%, transparent 62%)",
        "radial-gradient(62% 80% at 74% 88%, #ff6a88 0%, transparent 66%)",
        "linear-gradient(160deg, #3a1c71, #d76d77 52%, #ffaf7b)",
      ].join(", "),
    },
  },
  {
    id: "ocean",
    label: "Ocean",
    style: {
      backgroundColor: "#021b3a",
      backgroundImage: [
        "radial-gradient(54% 74% at 10% 12%, #00c6ff 0%, transparent 62%)",
        "radial-gradient(48% 68% at 88% 18%, #0072ff 0%, transparent 62%)",
        "radial-gradient(62% 82% at 68% 90%, #00f5a0 0%, transparent 64%)",
        "linear-gradient(150deg, #021b3a, #063d5e 60%, #041f2e)",
      ].join(", "),
    },
  },
  {
    id: "daylight",
    label: "Daylight",
    style: {
      backgroundColor: "#f4efe8",
      backgroundImage: [
        "radial-gradient(60% 80% at 20% 20%, #fff1c1 0%, transparent 65%)",
        "radial-gradient(50% 70% at 85% 15%, #bde0fe 0%, transparent 65%)",
        "radial-gradient(60% 80% at 70% 90%, #ffc8dd 0%, transparent 65%)",
        "linear-gradient(160deg, #fdfbf7, #e8e3da)",
      ].join(", "),
    },
  },
  {
    id: "spectrum",
    label: "Spectrum",
    style: {
      backgroundColor: "#111111",
      backgroundImage: [
        "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 18px)",
        "repeating-linear-gradient(90deg, #ff3b30 0 16.666%, #ff9500 16.666% 33.333%, #ffcc00 33.333% 50%, #34c759 50% 66.666%, #0a84ff 66.666% 83.333%, #af52de 83.333% 100%)",
      ].join(", "),
    },
  },
  {
    id: "artwork",
    label: "Artwork",
    style: {
      backgroundColor: "#12052e",
      backgroundImage: `url("${publicAsset("glass-background.svg")}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
];

const presetButton =
  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus";

const controlButton =
  "rounded-lg border border-pg-line px-3 py-2 text-xs font-medium text-pg-ink transition-colors hover:border-pg-ink/30 hover:bg-pg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus";

function resolveImageUrl(value: string) {
  try {
    const url = new URL(value, window.location.href);

    return ["http:", "https:", "blob:", "data:"].includes(url.protocol)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function SurfaceLab() {
  const { theme } = useTheme();
  const { preset: glassPreset } = useGlassPreset();
  const [presetId, setPresetId] = useState("image");
  const [customImage, setCustomImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [applyError, setApplyError] = useState("");
  const [intensity, setIntensity] = useState(64);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlId = useId();
  const hintId = useId();

  const selectedPreset =
    presets.find((preset) => preset.id === presetId) ?? presets[0];
  const backgroundStyle: CSSProperties = customImage
    ? {
        backgroundColor: "#0a0a0a",
        backgroundImage: `url(${JSON.stringify(customImage)})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    : selectedPreset.style;
  const backgroundLabel = customImage ? "Custom image" : selectedPreset.label;

  useEffect(() => {
    if (!customImage.startsWith("blob:")) return;

    return () => URL.revokeObjectURL(customImage);
  }, [customImage]);

  function selectPreset(id: string) {
    setPresetId(id);
    setCustomImage("");
    setApplyError("");
  }

  function resetBackground() {
    setImageUrl("");
    selectPreset("image");
  }

  function applyImageUrl(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = imageUrl.trim();
    if (!value) {
      setApplyError("Paste an image URL first.");
      return;
    }

    const resolved = resolveImageUrl(value);
    if (!resolved) {
      setApplyError("Use an http(s), data, or blob image URL.");
      return;
    }

    setCustomImage(resolved);
    setPresetId("custom");
    setApplyError("");
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !file.type.startsWith("image/")) {
      setApplyError("Choose an image file.");
      return;
    }

    setCustomImage(URL.createObjectURL(file));
    setPresetId("custom");
    setApplyError("");
  }

  return (
    <section id="surfaces" className="mt-14 scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pg-muted">
            00 — Surface lab
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-pg-ink sm:text-3xl">
            Glass on color
          </h2>
          <p className="mt-2 text-sm leading-6 text-pg-muted">
            The same components over saturated gradients, dense patterns,
            artwork, and photography. Switch presets or load your own image to
            test the material against a real scene.
          </p>
        </div>
        <span className="hidden rounded-full border border-pg-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-pg-muted sm:inline-block">
          {theme === "light" ? "Light" : "Dark"} · {glassPreset}
        </span>
      </div>

      <div
        data-testid="surface-lab-controls"
        className="mb-4 rounded-2xl border border-pg-line bg-pg-panel/70 p-3 backdrop-blur-sm sm:p-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Caption className="me-1">Background</Caption>
          {presets.map((preset) => {
            const active = !customImage && preset.id === presetId;

            return (
              <button
                key={preset.id}
                type="button"
                data-preset={preset.id}
                aria-pressed={active}
                onClick={() => selectPreset(preset.id)}
                className={cx(
                  presetButton,
                  active
                    ? "border-pg-ink bg-pg-ink text-pg-canvas"
                    : "border-pg-line text-pg-muted hover:border-pg-ink/30 hover:text-pg-ink",
                )}
              >
                {preset.label}
              </button>
            );
          })}
          {customImage ? (
            <span className="rounded-full border border-pg-ink bg-pg-ink px-3 py-1.5 text-xs font-medium text-pg-canvas">
              Custom
            </span>
          ) : null}
        </div>

        <form
          onSubmit={applyImageUrl}
          className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <label htmlFor={urlId} className="sr-only">
            Background image URL
          </label>
          <input
            id={urlId}
            type="text"
            inputMode="url"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
              if (applyError) setApplyError("");
            }}
            placeholder="Paste an image URL, or upload a file"
            autoComplete="off"
            spellCheck={false}
            aria-describedby={hintId}
            className="min-w-0 flex-1 rounded-lg border border-pg-line bg-pg-canvas/60 px-3 py-2 text-sm text-pg-ink placeholder:text-pg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
          />
          <div className="flex flex-wrap gap-2">
            <button type="submit" className={controlButton}>
              Apply
            </button>
            <button
              type="button"
              className={controlButton}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload aria-hidden="true" className="me-1.5 inline size-3.5" />
              Upload
            </button>
            <button
              type="button"
              className={controlButton}
              onClick={resetBackground}
            >
              Reset
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </form>

        <p
          id={hintId}
          role={applyError ? "alert" : undefined}
          className="mt-2 text-xs leading-5 text-pg-muted"
        >
          {applyError ||
            "Cross-origin images work in the browser; the glass reads whatever is painted behind it."}
        </p>
      </div>

      <div
        data-testid="surface-lab-panel"
        className="relative overflow-hidden rounded-[2rem] border border-pg-line shadow-[var(--pg-shadow)]"
      >
        <div
          aria-hidden="true"
          data-testid="surface-lab-background"
          className="absolute inset-0"
          style={backgroundStyle}
        />

        <div className="relative flex min-h-[34rem] flex-col gap-8 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-white/80" />
              Glass on {backgroundLabel}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              {theme} · {glassPreset}
            </span>
          </div>

          <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Card
              className="w-full"
              title="Workspace settings"
              description="The card surface samples the artwork behind it."
              footer={
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    label="Save changes"
                    trailingIcon={<ArrowRight />}
                  />
                  <Button label="Reset" />
                </div>
              }
            >
              <div className="flex flex-col gap-5">
                <Input label="Workspace name" defaultValue="Liquid Glass" />

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ui-ink">
                      Weekly digest
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-ui-ink/60">
                      Send a summary every Monday.
                    </p>
                  </div>
                  <Switch aria-label="Weekly digest" defaultChecked />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm text-ui-ink">
                    <span id="surface-intensity-label">Intensity</span>
                    <span className="font-mono tabular-nums text-ui-ink/60">
                      {intensity}
                    </span>
                  </div>
                  <Slider
                    aria-labelledby="surface-intensity-label"
                    value={intensity}
                    onValueChange={setIntensity}
                  />
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="w-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ui-ink/55">
                  Monthly reach
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-ui-ink">
                  48.2k
                </p>
                <p className="mt-2 text-sm leading-6 text-ui-ink/65">
                  A content-only card inherits the same material without a
                  header or footer.
                </p>
                <div className="mt-5">
                  <ToggleGroup
                    aria-label="Reporting range"
                    defaultValue={["30d"]}
                    items={[
                      { value: "7d", label: "7d" },
                      { value: "30d", label: "30d" },
                      { value: "90d", label: "90d" },
                    ]}
                  />
                </div>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button
                  label="Primary action"
                  trailingIcon={<ArrowRight />}
                />
                <Button label="Upload" leadingIcon={<ImageIcon />} />
              </div>
            </div>
          </div>

          <p className="max-w-2xl rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-xs leading-5 text-white/75 backdrop-blur-md">
            Compare how the current material reads over saturated gradients,
            dense patterns, and artwork. Use the presets or load your own image,
            and toggle the theme in the header to compare the same scene.
          </p>
        </div>
      </div>
    </section>
  );
}

export { SurfaceLab };
