import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { hydrateRoot } from "react-dom/client";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  GlassPresetProvider,
  GlassPresetScope,
  GlassPresetScript,
  getGlassPresetScript,
  useGlassPreset,
} from "../../src/plugins/glass-preset";

function GlassPresetProbe() {
  const { preset, setPreset } = useGlassPreset();

  return (
    <div>
      <span data-testid="active-preset">{preset}</span>
      <button type="button" onClick={() => setPreset("thick")}>
        Thick
      </button>
    </div>
  );
}

afterEach(() => {
  document.documentElement.removeAttribute("data-glass");
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("glass preset plugin", () => {
  it("applies and persists an uncontrolled preset", async () => {
    const user = userEvent.setup();

    render(
      <GlassPresetProvider defaultPreset="thin" storageKey="app-glass">
        <GlassPresetProbe />
      </GlassPresetProvider>,
    );

    expect(screen.getByTestId("active-preset")).toHaveTextContent("thin");
    expect(document.documentElement.dataset.glass).toBe("thin");
    expect(window.localStorage.getItem("app-glass")).toBe("thin");

    await user.click(screen.getByRole("button", { name: "Thick" }));

    expect(screen.getByTestId("active-preset")).toHaveTextContent("thick");
    expect(document.documentElement.dataset.glass).toBe("thick");
    expect(window.localStorage.getItem("app-glass")).toBe("thick");
  });

  it("restores a stored preset before the existing attribute", () => {
    window.localStorage.setItem("app-glass", "thick");
    document.documentElement.dataset.glass = "thin";

    render(
      <GlassPresetProvider defaultPreset="regular" storageKey="app-glass">
        <GlassPresetProbe />
      </GlassPresetProvider>,
    );

    expect(screen.getByTestId("active-preset")).toHaveTextContent("thick");
    expect(document.documentElement.dataset.glass).toBe("thick");
  });

  it("supports controlled presets", async () => {
    const user = userEvent.setup();
    const onPresetChange = vi.fn();
    const { rerender } = render(
      <GlassPresetProvider preset="thin" onPresetChange={onPresetChange}>
        <GlassPresetProbe />
      </GlassPresetProvider>,
    );

    expect(document.documentElement.dataset.glass).toBe("thin");

    await user.click(screen.getByRole("button", { name: "Thick" }));

    expect(onPresetChange).toHaveBeenCalledWith("thick");
    expect(screen.getByTestId("active-preset")).toHaveTextContent("thin");
    expect(document.documentElement.dataset.glass).toBe("thin");

    rerender(
      <GlassPresetProvider preset="thick" onPresetChange={onPresetChange}>
        <GlassPresetProbe />
      </GlassPresetProvider>,
    );

    expect(screen.getByTestId("active-preset")).toHaveTextContent("thick");
    expect(document.documentElement.dataset.glass).toBe("thick");
  });

  it("avoids hydration mismatches when storage has a preset", async () => {
    window.localStorage.setItem("app-glass", "thick");
    const container = document.createElement("div");

    document.body.append(container);
    container.innerHTML = renderToString(
      <GlassPresetProvider defaultPreset="regular" storageKey="app-glass">
        <GlassPresetProbe />
      </GlassPresetProvider>,
    );

    expect(container).toHaveTextContent("regular");

    const recoverableErrors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;

    await act(async () => {
      root = hydrateRoot(
        container,
        <GlassPresetProvider defaultPreset="regular" storageKey="app-glass">
          <GlassPresetProbe />
        </GlassPresetProvider>,
        {
          onRecoverableError: (error) => {
            recoverableErrors.push(error);
          },
        },
      );
    });

    expect(recoverableErrors).toEqual([]);
    expect(screen.getByTestId("active-preset")).toHaveTextContent("thick");
    expect(window.localStorage.getItem("app-glass")).toBe("thick");

    await act(async () => {
      root?.unmount();
    });
    container.remove();
  });

  it("scopes a preset to a container", () => {
    render(
      <GlassPresetScope
        aria-label="glass scope"
        className="surface"
        preset="thick"
      >
        <span>Scoped content</span>
      </GlassPresetScope>,
    );

    const scope = screen.getByLabelText("glass scope");

    expect(scope).toHaveAttribute("data-glass", "thick");
    expect(scope).toHaveClass("surface");
    expect(screen.getByText("Scoped content")).toBeInTheDocument();
  });

  it("restores the persisted preset in the no-flash script", () => {
    window.localStorage.setItem("app-glass", "thin");
    document.documentElement.dataset.glass = "thick";

    new Function(getGlassPresetScript({ storageKey: "app-glass" }))();

    expect(document.documentElement.dataset.glass).toBe("thin");
  });

  it("keeps an existing preset when storage is empty", () => {
    document.documentElement.dataset.glass = "thick";

    new Function(getGlassPresetScript({ defaultPreset: "regular" }))();

    expect(document.documentElement.dataset.glass).toBe("thick");
  });

  it("falls back to the default preset for invalid storage", () => {
    window.localStorage.setItem("app-glass", "heavy");

    new Function(getGlassPresetScript({ storageKey: "app-glass" }))();

    expect(document.documentElement.dataset.glass).toBe("regular");
  });

  it("escapes script terminators in the storage key", () => {
    const storageKey = "app</script><script>alert('x')</script>";
    const script = getGlassPresetScript({ storageKey });

    expect(script).not.toContain("</script>");
    expect(script).toContain("\\u003c/script");
  });

  it("renders the no-flash script with a CSP nonce", () => {
    const markup = renderToStaticMarkup(
      <GlassPresetScript
        defaultPreset="thin"
        nonce="test-nonce"
        storageKey="app-glass"
      />,
    );

    expect(markup).toContain("<script");
    expect(markup).toContain('nonce="test-nonce"');
    expect(markup).toContain("app-glass");
    expect(markup).toContain('"thin"');
  });
});
