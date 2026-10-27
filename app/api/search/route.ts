import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/source";

// The search index is generated at build time for static export.
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
