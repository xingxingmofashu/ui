import { useState } from "react";

import { ArrowRight, Upload } from "lucide-react";

import {
  Button,
  Card,
  Field,
  Input,
  Slider,
  Switch,
  ToggleGroup,
} from "@xingxingmofashu/ui";

const photo = {
  backgroundColor: "#0a0a0a",
  backgroundImage: 'url("w53k9q.jpg")',
  backgroundPosition: "center",
  backgroundSize: "cover",
};

export default function App() {
  const [name, setName] = useState("Liquid Glass");
  const [digest, setDigest] = useState(true);
  const [intensity, setIntensity] = useState(64);
  const [range, setRange] = useState<string[]>(["30d"]);

  return (
    <section
      data-testid="repl-welcome"
      className="@container relative w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl"
    >
      <div
        aria-hidden="true"
        data-testid="repl-welcome-background"
        className="absolute inset-0"
        style={photo}
      />

      <div className="relative flex min-h-[34rem] flex-col gap-6 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-white/80"
            />
            Glass on photography
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
            Welcome · REPL
          </span>
        </div>

        <div className="grid flex-1 items-start gap-6 @2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Card
            className="w-full"
            title="Workspace settings"
            description="The card surface samples the artwork behind it."
            footer={
              <div className="flex flex-wrap items-center gap-3">
                <Button label="Save changes" trailingIcon={<ArrowRight />} />
                <Button
                  label="Reset"
                  onClick={() => {
                    setName("Liquid Glass");
                    setDigest(true);
                    setIntensity(64);
                  }}
                />
              </div>
            }
          >
            <div className="flex flex-col gap-5">
              <Field label="Workspace name">
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ui-ink">
                    Weekly digest
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-ui-ink/60">
                    Send a summary every Monday.
                  </p>
                </div>
                <Switch
                  aria-label="Weekly digest"
                  checked={digest}
                  onCheckedChange={setDigest}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-ui-ink">
                  <span id="welcome-intensity-label">Intensity</span>
                  <span className="font-mono tabular-nums text-ui-ink/60">
                    {intensity}
                  </span>
                </div>
                <Slider
                  aria-labelledby="welcome-intensity-label"
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
                A content-only card inherits the same material without a header
                or footer.
              </p>
              <div className="mt-5">
                <ToggleGroup
                  aria-label="Reporting range"
                  value={range}
                  onValueChange={setRange}
                  items={[
                    { value: "7d", label: "7d" },
                    { value: "30d", label: "30d" },
                    { value: "90d", label: "90d" },
                  ]}
                />
              </div>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button label="Primary action" trailingIcon={<ArrowRight />} />
              <Button label="Upload" leadingIcon={<Upload />} />
            </div>
          </div>
        </div>

        <p className="max-w-2xl rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-xs leading-5 text-white/75 backdrop-blur-md">
          Edit the code on the left and the preview updates as you type. This
          welcome sample shows how the glass material reads over real
          photography.
        </p>
      </div>
    </section>
  );
}
