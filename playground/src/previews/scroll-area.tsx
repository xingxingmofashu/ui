import { ScrollArea } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

const activity = [
  ["09:12", "Design review", "Maya added the component audit to Thursday's agenda."],
  ["08:47", "Release notes", "The 2.4.0 notes now cover every shipped component."],
  ["08:20", "Playground deployed", "Light and dark previews are live on staging."],
  ["Yesterday", "Glass tokens", "Rim contrast now follows the active theme."],
  ["Yesterday", "Accessibility pass", "Scrollable viewports received a focus ring."],
  ["Monday", "New contributors", "Two engineers joined the interface team."],
  ["Friday", "Bundle report", "The package grew by less than one kilobyte."],
  ["Thursday", "Docs refresh", "Every component page has a live example."],
] as const;

const releases = [
  ["2.4.0", "Oct 24", "Scroll area, refined glass rims, and focus states."],
  ["2.3.2", "Oct 12", "Stability fixes for drawer gestures and nested dialogs."],
  ["2.3.0", "Sep 28", "Accordion sizes, slider ranges, and form integration."],
  ["2.2.1", "Sep 09", "Improved dark theme contrast across all controls."],
  ["2.2.0", "Aug 30", "Popover, tooltip, and toast primitives."],
] as const;

const tasks = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  owner: ["Maya", "Theo", "Rin"][index % 3],
}));

function ScrollAreaPreview() {
  return (
    <>
      <DemoGroup label="Vertical">
        <ScrollArea
          aria-label="Recent activity"
          className="h-72 w-full max-w-md"
        >
          <div className="flex flex-col gap-3 p-4">
            {activity.map(([time, title, detail]) => (
              <article
                key={`${time}-${title}`}
                className="rounded-2xl border border-ui-glass-border bg-ui-glass-surface p-3"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ui-ink/50">
                  {time}
                </p>
                <h3 className="mt-1 text-sm font-medium text-ui-ink">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-ui-ink/65">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </ScrollArea>
      </DemoGroup>

      <DemoGroup label="Horizontal">
        <ScrollArea
          aria-label="Recent releases"
          orientation="horizontal"
          className="h-44 w-full max-w-xl"
        >
          <div className="flex w-max gap-3 p-4">
            {releases.map(([version, date, summary]) => (
              <article
                key={version}
                className="w-56 shrink-0 rounded-2xl border border-ui-glass-border bg-ui-glass-surface p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-mono text-xs text-ui-ink">v{version}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ui-ink/50">
                    {date}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-ui-ink/70">
                  {summary}
                </p>
              </article>
            ))}
          </div>
        </ScrollArea>
      </DemoGroup>

      <DemoGroup label="Both axes">
        <ScrollArea
          aria-label="Task board"
          orientation="both"
          className="h-64 w-full max-w-md"
        >
          <div className="grid w-max grid-cols-6 gap-2 p-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex size-20 flex-col justify-between rounded-xl border border-ui-glass-border bg-ui-glass-surface p-2"
              >
                <span className="font-mono text-[10px] text-ui-ink/45">
                  #{String(task.id).padStart(2, "0")}
                </span>
                <span className="text-xs font-medium text-ui-ink">
                  Task {task.id}
                </span>
                <span className="text-[10px] text-ui-ink/50">
                  {task.owner}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoGroup>
    </>
  );
}

export { ScrollAreaPreview };
