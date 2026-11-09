# `@xingxingmofashu/ui` skill

A portable agent skill for building interfaces with
[`@xingxingmofashu/ui`](https://www.npmjs.com/package/@xingxingmofashu/ui).
It covers installation, component selection, forms, overlays, theming, and
troubleshooting, with a reference page for every component.

The npm package ships only `dist`; this skill lives in the repository, not in
`node_modules`. Copy it from the repository or point the agent at this folder.

## Use with OpenCode

Copy this directory into a project or global skills folder:

```text
<project>/.opencode/skills/xingxingmofashu-ui/
~/.config/opencode/skills/xingxingmofashu-ui/
```

Then ask OpenCode to use the skill, or mention `@xingxingmofashu-ui`.

If the repository is vendored and already has a `skills/` folder, point
OpenCode at it in `.opencode/opencode.json` (or the root `opencode.json`)
instead of copying:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "skills": ["./skills"]
}
```

That discovers `skills/xingxingmofashu-ui/SKILL.md` with the ID
`xingxingmofashu-ui`.

## Use with Claude Code

Copy the directory into either location:

```text
<project>/.claude/skills/xingxingmofashu-ui/
~/.claude/skills/xingxingmofashu-ui/
```

Other compatible agents can use `.agents/skills/xingxingmofashu-ui/` or be
pointed directly at `SKILL.md`.

## Contents

```text
xingxingmofashu-ui/
├── SKILL.md
├── README.md
└── references/
    ├── installation.md
    ├── theming.md
    ├── patterns.md
    ├── troubleshooting.md
    └── components/
        └── <component>.md
```

`SKILL.md` is the entry point. It contains the workflow, non-negotiable rules,
an API shape guide, and the component index. The `references/` files are loaded
on demand so the model does not need the whole manual in context.

## Naming

OpenCode derives the skill ID from the directory name. The ID is what
`@mentions` and permissions use. The frontmatter `name` is a display label;
OpenCode does not require it to match the directory or use lowercase kebab-case.
For portability, this repository keeps both aligned
(`skills/xingxingmofashu-ui` with `name: xingxingmofashu-ui`) and uses lowercase
kebab-case.

If that ID would collide with another skill in the consumer project, rename the
directory to change the ID, and update the frontmatter name for clarity, for
example:

```text
.opencode/skills/my-project-ui/
```

```yaml
---
name: my-project-ui
---
```

## Maintenance

The component references mirror the English documentation and include the
canonical URL for each page. When a component API changes:

1. Update the canonical docs and examples first.
2. Update the matching `references/components/<component>.md`.
3. Re-check the `ui` slot names and `data-slot` values.
4. Keep the component index in `SKILL.md` in sync.

The canonical sources are:

- <https://xingxingmofashu.github.io/ui/docs/en>
- <https://xingxingmofashu.github.io/ui/llms-full.txt>
- <https://github.com/xingxingmofashu/ui>

Examples in the component references use `lucide-react` for icons only.
Consumers can replace it with their own icon library or omit the icon props.
