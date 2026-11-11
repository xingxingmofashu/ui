import { describe, expect, it } from "vitest";

import { mergeUI } from "../../src/utils/ui";

describe("mergeUI", () => {
  it("returns an empty map without sources", () => {
    expect(mergeUI()).toEqual({});
  });

  it("ignores undefined sources", () => {
    expect(mergeUI(undefined, { item: "px-2" }, undefined)).toEqual({
      item: "px-2",
    });
  });

  it("merges unique slots from every source", () => {
    expect(
      mergeUI(
        { item: "px-2", icon: "size-4" },
        { item: "px-4" },
        { icon: "size-5" },
      ),
    ).toEqual({ item: "px-4", icon: "size-5" });
  });

  it("resolves Tailwind conflicts in source order", () => {
    expect(
      mergeUI(
        { item: "rounded-full px-2" },
        { item: "rounded-none px-4" },
      ),
    ).toEqual({ item: "rounded-none px-4" });
  });

  it("supports three merge levels", () => {
    expect(
      mergeUI(
        { item: "px-2 text-sm" },
        { item: "px-3" },
        { item: "px-4 text-base" },
      ),
    ).toEqual({ item: "px-4 text-base" });
  });

  it("does not mutate the input maps", () => {
    const root = { item: "px-2", icon: "size-4" };
    const item = { item: "px-4" };

    mergeUI(root, item);

    expect(root).toEqual({ item: "px-2", icon: "size-4" });
    expect(item).toEqual({ item: "px-4" });
  });
});
