import * as React from "react";
import * as ReactJsxRuntime from "react/jsx-runtime";
import { describe, expect, it } from "vitest";

import {
  ReplExecutionError,
  evaluateCompiledModule,
  formatValue,
  resolveReplOutput,
  toReplError,
  type ReplLogEntry,
} from "../../playground/src/repl/runtime";

const modules = {
  react: Object.assign(Object.create(null), React, { default: React }),
  "react/jsx-runtime": ReactJsxRuntime,
  "@xingxingmofashu/ui": {
    Button: (props: { label?: string }) =>
      React.createElement("button", null, props.label),
  },
};

const jsxModule = `"use strict";
const jsx_runtime_1 = require("react/jsx-runtime");`;

function GlassButton() {
  return React.createElement("button");
}

describe("REPL runtime", () => {
  it("returns the completion value of the last expression", () => {
    const result = evaluateCompiledModule("const value = 1;\nvalue + 1;", {
      modules,
    });

    expect(result.completion).toBe(2);
    expect(result.defaultExport).toBeUndefined();
  });

  it("captures console output", () => {
    const entries: ReplLogEntry[] = [];

    evaluateCompiledModule('console.log("hello", 42);', {
      modules,
      onEntry: (entry) => entries.push(entry),
    });

    expect(entries).toMatchObject([{ level: "log", text: "hello 42" }]);
  });

  it("resolves a default export component", () => {
    const result = evaluateCompiledModule(
      `${jsxModule}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function App() {
  return (0, jsx_runtime_1.jsx)("div", { children: "Hello" });
};`,
      { modules },
    );
    const output = resolveReplOutput(result);

    expect(output.kind).toBe("default");
    expect(React.isValidElement(output.node)).toBe(true);
  });

  it("resolves a top-level JSX expression", () => {
    const result = evaluateCompiledModule(
      `${jsxModule}
const ui_1 = require("@xingxingmofashu/ui");
(0, jsx_runtime_1.jsx)(ui_1.Button, { label: "Run me" });`,
      { modules },
    );
    const output = resolveReplOutput(result);

    expect(output.kind).toBe("completion");
    expect(React.isValidElement(output.node)).toBe(true);
  });

  it("uses render() before a default export", () => {
    const result = evaluateCompiledModule(
      `${jsxModule}
const ui_1 = require("@xingxingmofashu/ui");
exports.default = function Ignored() {
  return (0, jsx_runtime_1.jsx)("div", {});
};
render((0, jsx_runtime_1.jsx)(ui_1.Button, { label: "Rendered" }));`,
      { modules },
    );
    const output = resolveReplOutput(result);

    expect(output.kind).toBe("render");
    expect(React.isValidElement(output.node)).toBe(true);
  });

  it("reports primitive values as console results", () => {
    const output = resolveReplOutput(
      evaluateCompiledModule("40 + 2;", { modules }),
    );

    expect(output.kind).toBe("result");
    expect(output.node).toBeNull();
    expect(output.resultText).toBe("42");
  });

  it("reports unsupported imports as evaluation errors", () => {
    let caught: unknown;

    try {
      evaluateCompiledModule('require("unknown-module");', { modules });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ReplExecutionError);
    expect(toReplError(caught, "evaluate").phase).toBe("evaluate");
    expect(toReplError(caught, "evaluate").message).toContain(
      'Unsupported import "unknown-module"',
    );
  });

  it("formats nested and circular values", () => {
    const circular: Record<string, unknown> = { name: "glass" };
    circular.self = circular;

    expect(formatValue({ a: 1, b: [2, 3] })).toBe("{ a: 1, b: [2, 3] }");
    expect(formatValue(circular)).toBe("{ name: glass, self: [Circular] }");
  });

  it("formats React elements with their component name", () => {
    expect(formatValue(React.createElement(GlassButton))).toBe(
      "<GlassButton />",
    );
  });
});
