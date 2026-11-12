# Troubleshooting

Start with the installed versions and the CSS entry. Most issues come from the
stylesheet not being imported in the right place, a React/Tailwind version
mismatch, or a controlled overlay that is never opened.

## Quick table

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Components render unstyled | Package CSS missing, imported before Tailwind, or imported twice | Import `@xingxingmofashu/ui` after `@import "tailwindcss";`, once |
| Some utilities are missing | A manual `@source` replaced the package scan, or the CSS entry is not the one used by the app | Remove the manual `@source` and use the package stylesheet |
| `Cannot find module` or ESM error | CJS-only bundler or a tool that cannot resolve ESM exports | Use an ESM-capable bundler |
| React hook or render error | React 18 project | Upgrade `react` and `react-dom` to 19 |
| Tailwind classes do nothing | Tailwind 3 or a different Tailwind entry | Upgrade to Tailwind 4 and import the package in that entry |
| Dark mode does not switch | Selector is not `.dark` / `data-theme="dark"`, or theme is read during render | Apply the class/attribute before first paint |
| Theme flashes on load | Stored theme applied after hydration | Use an inline head script or a theme library |
| Overlay is too transparent | Only `--ui-surface` was changed | Set `--ui-glass-overlay-surface` too |
| Toast never appears | Missing `ToastProvider` or missing `<Toast />` | Render both near the app root |
| `useToast` throws | Called outside `ToastProvider` | Move the call inside the provider |
| Dialog does not open | It is controlled and `open` is never set | Set `open` and update it from `onOpenChange` |
| Menu items are missing | Children were passed instead of `items` | Pass an `items` array with unique `value`s |
| Select has no options | `items` is missing or empty | Pass `items={[...]}` |
| Form error does not show | Error key does not match `Field name` | Use the same field name as the key |
| `className` does not style an inner part | `className` targets the primary element | Use `ui` with the matching `data-slot` key |
| Type error on a prop | Prop belongs to Base UI, not the wrapper, or the version differs | Check the installed `.d.ts` and the canonical API |
| Hydration mismatch | `window`, `document`, or `localStorage` read during render | Read it in an effect or before hydration |
| Icons are missing | An icon was passed as a component type instead of an element | Pass a React node such as `<Plus />` |

## Styles are missing

The package stylesheet must be imported from the same CSS entry that imports
Tailwind:

```css
@import "tailwindcss";
@import "@xingxingmofashu/ui";
```

The package root resolves to `dist/index.css` through its `style` export. The
stylesheet scans the package's own component files, so no manual `@source`
directive is required. Import it once; duplicate imports can produce unexpected
order and duplicated utilities.

If the app has multiple CSS entries, check which one is actually loaded by the
page that renders the component.

## React and Tailwind versions

The package requires React 19, React DOM 19, Tailwind CSS 4, Node.js 22+, and an
ESM-capable bundler. React 18 and Tailwind 3 are not supported. Upgrade the
project instead of trying to adapt the package to older versions.

## Dark mode and hydration

Theme tokens switch with `.light` / `.dark` or
`data-theme="light"` / `data-theme="dark"`. Light is the default. Do not read
`localStorage` during render; set the class or attribute before the first paint:

```html
<script>
  try {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch {}
</script>
```

In Next.js, add `suppressHydrationWarning` to `<html>` when the class can differ
between the server and the client. The same rule applies to any server-first
framework.

If the app uses Tailwind `dark:` utilities, register the class-based variant:

```css
@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));
```

## Overlay contrast

In-page glass uses `--ui-glass-surface`. Text-bearing overlays use
`--ui-glass-overlay-surface`. If Dialog, Drawer, Popover, Menu, Select, Toast,
or Tooltip is too transparent, set the overlay token, not only
`--ui-surface`:

```css
:root {
  --ui-glass-overlay-surface: rgb(255 255 255 / 0.86);
}

.dark,
[data-theme="dark"] {
  --ui-glass-overlay-surface: rgb(20 20 20 / 0.9);
}
```

Test the result over the busiest and darkest background in the app, not only
over a plain page.

## Toasts

Render one `ToastProvider` near the app root and place `<Toast />` after the app
content:

```tsx
<ToastProvider>
  <App />
  <Toast />
</ToastProvider>
```

`useToast()` only works inside the provider. `add` returns an ID; use
`update(id, options)` and `close(id)` for that toast. A timeout of `0` keeps a
toast open. If the toast is rendered but not visible, check its `position` and
whether an ancestor creates a new stacking context or clips overflow.

## Controlled overlays

`Dialog`, `AlertDialog`, and `Drawer` do not have a `trigger` prop. Render a
Button and control the open state:

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>;
<Dialog open={open} onOpenChange={setOpen} title="Title" />;
```

`Dialog` footer buttons do not close automatically; call `setOpen(false)` in the
action handler. `AlertDialog` is different: both actions are `Close` and dismiss
immediately. If the dialog must stay open for async work, keep `open` controlled
and do not set it to `false` until the work finishes.

## Forms

`Form` errors are keyed by the `name` of a `Field`:

```tsx
<Form errors={{ email: "Enter an email address." }}>
  <Field label="Email" name="email">
    <Input type="email" />
  </Field>
</Form>
```

If the error does not appear, confirm the names match and that the field is
inside the `Form`. A `Field` validation mode overrides the form-level
`validationMode`. `onSubmit` still receives the native event; call
`event.preventDefault()` when handling it yourself. `onFormSubmit` is an
alternative that receives registered form values and prevents native
submission.

## Styling internal parts

`className` targets the primary element. For internal slots, use `ui`:

```tsx
<Card
  title="Deployment"
  ui={{ header: "pb-0", title: "tracking-tight" }}
>
  <p>Build 128 is live.</p>
</Card>
```

The `data-slot` attribute in the DOM and the `ui` row in the component API table
list the available keys. For collection components, root `ui` is applied first,
then item `ui`, then item `className`.

## Props and versions

The wrappers expose a single-structure API. Props that belong to Base UI parts
may not be forwarded. If a prop is not listed in the component reference, check
the installed package's type definitions:

```text
node_modules/@xingxingmofashu/ui/dist/components/<component>.d.ts
```

Then compare with the canonical documentation. Do not guess a prop or add
`@base-ui/react` imports to work around a wrapper.

## Canonical guides

- [Installation](https://xingxingmofashu.github.io/ui/docs/en/get-started/installation)
- [Accessibility](https://xingxingmofashu.github.io/ui/docs/en/guides/accessibility)
- [Server rendering](https://xingxingmofashu.github.io/ui/docs/en/guides/ssr)
- [Theming](https://xingxingmofashu.github.io/ui/docs/en/guides/theming)
- [Full documentation](https://xingxingmofashu.github.io/ui/llms-full.txt)
