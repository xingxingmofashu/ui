import {
  AlertTriangle,
  Archive,
  Bell,
  CheckCircle2,
  Info,
  MapPin,
  Rocket,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import {
  Button,
  Toast,
  ToastProvider,
  ToggleGroup,
  useToast,
  type ToastPosition,
} from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const placementOptions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
] as const;

const alignOptions = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
] as const;

type Placement = (typeof placementOptions)[number]["value"];
type Align = (typeof alignOptions)[number]["value"];

const notifications = [
  {
    type: "info",
    label: "Info",
    icon: <Info />,
    title: "New comment",
    description: "Mia left a comment on your draft.",
  },
  {
    type: "success",
    label: "Success",
    icon: <CheckCircle2 />,
    title: "Changes saved",
    description: "Your workspace settings were updated.",
  },
  {
    type: "warning",
    label: "Warning",
    icon: <AlertTriangle />,
    title: "Storage almost full",
    description: "You have used 90% of the workspace storage.",
  },
  {
    type: "error",
    label: "Error",
    icon: <XCircle />,
    title: "Upload failed",
    description: "The file could not be uploaded. Try again.",
  },
] as const;

type ToastPlaygroundProps = {
  position: ToastPosition;
  placement: Placement;
  align: Align;
  onPlacementChange: (placement: Placement) => void;
  onAlignChange: (align: Align) => void;
};

function ToastPlayground({
  position,
  placement,
  align,
  onPlacementChange,
  onAlignChange,
}: ToastPlaygroundProps) {
  const toast = useToast();
  const [archiveStatus, setArchiveStatus] = useState("Nothing archived yet.");
  const [publishStatus, setPublishStatus] = useState(
    "The toast updates when the promise resolves.",
  );
  const [publishing, setPublishing] = useState(false);

  function archive() {
    const id = toast.add({
      title: "Message archived",
      description: "The conversation moved to your archive.",
      timeout: 8000,
      actionProps: {
        children: "Undo",
        onClick: () => {
          toast.close(id);
          setArchiveStatus("Message restored to your inbox.");
        },
      },
    });

    setArchiveStatus("Message archived. Use Undo in the toast.");
  }

  function publish() {
    setPublishing(true);
    setPublishStatus("Waiting for the promise to settle.");

    toast
      .promise(
        new Promise<void>((resolve) => {
          setTimeout(resolve, 1500);
        }),
        {
          loading: {
            title: "Publishing release",
            description: "Uploading assets and updating the CDN.",
          },
          success: {
            title: "Release published",
            description: "Version 2.4.0 is live for everyone.",
          },
          error: {
            title: "Publish failed",
            description: "Check your connection and try again.",
          },
        },
      )
      .finally(() => {
        setPublishing(false);
        setPublishStatus("Promise settled. The same toast was updated.");
      });
  }

  return (
    <>
      <DemoGroup label="Basic">
        <Button
          label="Show notification"
          leadingIcon={<Bell />}
          onClick={() =>
            toast.add({
              title: "Changes saved",
              description: "Your workspace settings were updated for everyone.",
            })
          }
        />
      </DemoGroup>

      <DemoGroup label="Types">
        <div className="flex flex-wrap gap-2">
          {notifications.map(({ type, label, icon, title, description }) => (
            <Button
              key={type}
              size="sm"
              label={label}
              leadingIcon={icon}
              onClick={() => toast.add({ type, title, description })}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Actions">
        <div className="flex flex-col items-start gap-3">
          <Button
            label="Archive message"
            leadingIcon={<Archive />}
            onClick={archive}
          />
          <Status>{archiveStatus}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Promise">
        <div className="flex flex-col items-start gap-3">
          <Button
            label={publishing ? "Publishing..." : "Publish release"}
            leadingIcon={<Rocket />}
            disabled={publishing}
            onClick={publish}
          />
          <Status>{publishStatus}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Positions">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ToggleGroup
              aria-label="Vertical placement"
              size="sm"
              value={[placement]}
              onValueChange={(value) => {
                const next = value[0];

                if (next === "top" || next === "bottom") {
                  onPlacementChange(next);
                }
              }}
              items={placementOptions}
            />
            <ToggleGroup
              aria-label="Horizontal alignment"
              size="sm"
              value={[align]}
              onValueChange={(value) => {
                const next = value[0];

                if (next === "left" || next === "right") {
                  onAlignChange(next);
                }
              }}
              items={alignOptions}
            />
          </div>
          <Button
            label={`Show at ${position}`}
            leadingIcon={<MapPin />}
            onClick={() =>
              toast.add({
                title: "Positioned toast",
                description: `This toast is anchored to the ${position} position.`,
              })
            }
          />
          <Status>Current position: {position}</Status>
        </div>
      </DemoGroup>
    </>
  );
}

function ToastPreview() {
  const [placement, setPlacement] = useState<Placement>("bottom");
  const [align, setAlign] = useState<Align>("right");
  const position = `${placement}-${align}` as ToastPosition;

  return (
    <ToastProvider>
      <ToastPlayground
        position={position}
        placement={placement}
        align={align}
        onPlacementChange={setPlacement}
        onAlignChange={setAlign}
      />
      <Toast position={position} />
    </ToastProvider>
  );
}

export { ToastPreview };
