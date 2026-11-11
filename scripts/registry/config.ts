/**
 * Registry metadata and npm dependencies installed with every item.
 *
 * Keep the dependency ranges aligned with the catalog in
 * `pnpm-workspace.yaml`.
 */
export const REGISTRY = {
  name: "xingxingmofashu",
  homepage: "https://xingxingmofashu.github.io/ui",
  installFolder: "xingxingmofashu",
  dependencies: {
    "@base-ui/react": "^1.9.0",
    cn: "^0.5.1",
    "tailwind-variants": "^4.0.0",
  },
} as const;

/** React is provided by every consumer project. */
export const PEER_DEPENDENCIES = new Set(["react", "react-dom"]);
