# Patterns

These recipes combine the package's wrappers. They are starting points, not a
second API. Open the matching component reference before adapting one.

In Next.js App Router, files with state or event handlers need
`"use client"` at the top. `Card` can stay in a Server Component.

## App root with toasts

Render one provider near the root and place `<Toast />` after the app content:

```tsx
"use client";

import type { ReactNode } from "react";

import { Toast, ToastProvider } from "@xingxingmofashu/ui";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toast position="bottom-right" />
    </ToastProvider>
  );
}
```

## Form with shared errors

`Form` owns submission and the error map; `Field` labels one control and
connects its error.

```tsx
"use client";

import { useState } from "react";
import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

export function ProfileForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form
      className="w-full max-w-md"
      errors={errors}
      onSubmit={(event) => {
        event.preventDefault();

        const email = String(
          new FormData(event.currentTarget).get("email") ?? "",
        );

        setErrors(
          email.includes("@") ? {} : { email: "Enter a valid email address." },
        );
      }}
    >
      <Field
        label="Email"
        name="email"
        description="We only use this address for account notices."
      >
        <Input type="email" placeholder="you@example.com" />
      </Field>

      <Button type="submit">Save</Button>
    </Form>
  );
}
```

The key in `errors` must match the `name` on the `Field`. A field's
`validationMode` overrides the form default.

## Dialog with custom actions

`Dialog` has no trigger prop. Render your own trigger and close it from the
footer:

```tsx
"use client";

import { useState } from "react";
import { Button, Dialog, Switch } from "@xingxingmofashu/ui";

export function SettingsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Choose how your workspace behaves for everyone."
        footer={
          <>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <Switch
          label="Email notifications"
          description="Send a summary when a teammate publishes changes."
          defaultChecked
        />
      </Dialog>
    </>
  );
}
```

## Destructive confirmation

`AlertDialog` is for irreversible decisions. It renders fixed cancel and confirm
actions, and the backdrop never dismisses it:

```tsx
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@xingxingmofashu/ui";

export function DeleteProject() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete project</Button>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete project"
        onConfirm={() => {
          // Delete the project, then close when the work succeeds.
          setOpen(false);
        }}
      />
    </>
  );
}
```

Escape closes the dialog without calling `onCancel` or `onConfirm`. If Escape
must not cancel a destructive flow, guard it in `onOpenChange`.

## Action menu

`Menu` takes a trigger and an `items` array. Action items need a unique `value`:

```tsx
"use client";

import { Button, Menu } from "@xingxingmofashu/ui";

export function ProjectMenu() {
  return (
    <Menu
      trigger={<Button>Actions</Button>}
      items={[
        { value: "rename", label: "Rename", onSelect: () => {} },
        { value: "duplicate", label: "Duplicate", onSelect: () => {} },
        { type: "separator" },
        {
          value: "delete",
          label: "Delete",
          onSelect: () => {},
        },
      ]}
    />
  );
}
```

Use `type: "group"` for a labelled section and `type: "separator"` for a
divider. Selecting an item closes the menu by default; set
`closeOnClick: false` to keep it open.

## Select

`Select` uses one `items` array for both the trigger value and the popup:

```tsx
import { Select } from "@xingxingmofashu/ui";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team", disabled: true },
] as const;

export function PlanSelect() {
  return (
    <Select
      label="Plan"
      description="Change the plan for this workspace."
      placeholder="Choose a plan"
      defaultValue="pro"
      items={plans}
    />
  );
}
```

For controlled usage, set `value` and `onValueChange`. Use `value={null}` to
clear a single selection; the component has no built-in clear button.

Set `multiple` to make `value` an array. The popup stays open between
selections, and `renderValue` can summarize the selection:

```tsx
<Select
  multiple
  label="Languages"
  items={languages}
  value={selected}
  onValueChange={setSelected}
  renderValue={(value) => `${value.length} selected`}
/>
```

Pass `{ label, items }` entries in `items` for grouped options. `Select` also
accepts non-string values; use `itemToStringValue` for form submission and
`isItemEqualToValue` to match equal object records.

## Toast with a promise

`toast.promise` shows a loading toast, then updates the same toast when the
promise settles:

```tsx
"use client";

import { Button, Toast, ToastProvider, useToast } from "@xingxingmofashu/ui";

type ToastApi = ReturnType<typeof useToast>;

async function saveProject() {
  await new Promise((resolve) => setTimeout(resolve, 800));
}

function SaveButton({ toast }: { toast: ToastApi }) {
  return (
    <Button
      onClick={() =>
        toast.promise(saveProject(), {
          loading: "Saving project…",
          success: "Project saved.",
          error: (error) =>
            error instanceof Error ? error.message : "Could not save.",
        })
      }
    >
      Save project
    </Button>
  );
}

export function SaveProject() {
  return (
    <ToastProvider>
      <SaveButtonWithToast />
      <Toast />
    </ToastProvider>
  );
}

function SaveButtonWithToast() {
  const toast = useToast();
  return <SaveButton toast={toast} />;
}
```

For custom action buttons, call `toast.close(id)` yourself; actions do not close
the toast automatically.

## Tabs

`Tabs` takes an `items` array. Each value links the tab to its panel:

```tsx
import { Tabs } from "@xingxingmofashu/ui";

export function ProjectTabs() {
  return (
    <Tabs
      aria-label="Project sections"
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: <p className="text-sm text-ui-ink/70">Project summary.</p>,
        },
        {
          value: "activity",
          label: "Activity",
          content: <p className="text-sm text-ui-ink/70">Recent changes.</p>,
        },
      ]}
    />
  );
}
```

Name the tab list with `aria-label` or `aria-labelledby`. Item `className`
styles the tab button; use `ui.panel` for the panel.

## Drawer

`Drawer` is an edge panel with swipe dismissal. Like `Dialog`, it uses
controlled state instead of a trigger prop:

```tsx
"use client";

import { useState } from "react";
import { Button, Drawer } from "@xingxingmofashu/ui";

export function FiltersDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Filters</Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction="right"
        title="Filters"
        description="Narrow the results."
        footer={
          <Button onClick={() => setOpen(false)}>Apply</Button>
        }
      >
        <p className="text-sm text-ui-ink/70">Filter controls go here.</p>
      </Drawer>
    </>
  );
}
```

`direction` accepts `down`, `up`, `left`, and `right`. It also sets the swipe
dismissal direction.

## Theme toggle

Set the class on `<html>` and persist the choice. Apply the stored value before
React hydrates to avoid a flash:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@xingxingmofashu/ui";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function change(next: boolean) {
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <Toggle
      pressed={dark}
      onPressedChange={change}
      label="Dark mode"
    />
  );
}
```

For a production app, set the class from an inline script in `<head>` and add
`suppressHydrationWarning` to `<html>` when using Next.js.

## Canonical guides

- [Forms](https://xingxingmofashu.github.io/ui/docs/en/guides/forms)
- [Accessibility](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility)
- [Server rendering](https://xingxingmofashu.github.io/ui/docs/en/guides/ssr)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
