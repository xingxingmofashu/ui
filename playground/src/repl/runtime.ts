import * as React from "react";

type ReplLogLevel =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "debug"
  | "result"
  | "clear";

type ReplLogEntry = {
  id: number;
  level: ReplLogLevel;
  text: string;
};

type ReplConsoleEntry = ReplLogEntry & {
  level: Exclude<ReplLogLevel, "clear">;
};

type ReplErrorPhase = "compile" | "evaluate" | "render";

type ReplError = {
  phase: ReplErrorPhase;
  name: string;
  message: string;
  stack?: string;
};

type ReplModuleMap = Record<string, unknown>;

type ReplRunOptions = {
  modules: ReplModuleMap;
  onEntry?: (entry: ReplLogEntry) => void;
};

type ReplRunResult = {
  completion: unknown;
  defaultExport: unknown;
  didRender: boolean;
  rendered: unknown;
};

type ReplOutputKind = "render" | "default" | "completion" | "result" | "none";

type ReplOutput = {
  kind: ReplOutputKind;
  node: React.ReactNode | null;
  resultText?: string;
};

class ReplExecutionError extends Error {
  readonly phase: ReplErrorPhase;
  readonly cause: unknown;

  constructor(phase: ReplErrorPhase, cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause));
    this.name = "ReplExecutionError";
    this.phase = phase;
    this.cause = cause;
  }
}

let nextEntryId = 0;

function createLogEntry(level: ReplLogLevel, text: string): ReplLogEntry {
  nextEntryId += 1;

  return { id: nextEntryId, level, text };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") return false;

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function quoteKey(key: string) {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
}

function formatValue(
  value: unknown,
  depth = 0,
  seen: WeakSet<object> = new WeakSet(),
): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  switch (typeof value) {
    case "string":
      return value;
    case "number":
      return Object.is(value, -0) ? "-0" : String(value);
    case "boolean":
    case "bigint":
      return String(value);
    case "symbol":
      return String(value);
    case "function": {
      const name = value.name || "(anonymous)";

      return /^class\b/.test(Function.prototype.toString.call(value))
        ? `[class ${name}]`
        : `[Function ${name}]`;
    }
    default:
      break;
  }

  if (React.isValidElement(value)) {
    const type = value.type;
    const name =
      typeof type === "string"
        ? type
        : (type as { displayName?: string; name?: string }).displayName ||
          (type as { name?: string }).name ||
          "Component";

    return `<${name} />`;
  }

  if (typeof Node !== "undefined" && value instanceof Node) {
    return `<${value.nodeName.toLowerCase()}>`;
  }

  if (value instanceof Error) {
    return value.stack ? `${value.name}: ${value.message}\n${value.stack}` : `${value.name}: ${value.message}`;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? "Invalid Date"
      : value.toISOString();
  }

  if (value instanceof RegExp) return String(value);

  if (typeof value !== "object") return String(value);

  if (seen.has(value)) return "[Circular]";
  if (depth >= 3) return Array.isArray(value) ? "[Array]" : "[Object]";

  seen.add(value);

  let text: string;

  if (Array.isArray(value)) {
    const items = value
      .slice(0, 20)
      .map((item) => formatValue(item, depth + 1, seen));

    if (value.length > 20) items.push(`… ${value.length - 20} more`);

    text = `[${items.join(", ")}]`;
  } else if (value instanceof Map) {
    const items = [...value.entries()]
      .slice(0, 10)
      .map(
        ([key, item]) =>
          `${formatValue(key, depth + 1, seen)} => ${formatValue(item, depth + 1, seen)}`,
      );

    text = `Map(${value.size}) { ${items.join(", ")} }`;
  } else if (value instanceof Set) {
    const items = [...value.values()]
      .slice(0, 10)
      .map((item) => formatValue(item, depth + 1, seen));

    text = `Set(${value.size}) { ${items.join(", ")} }`;
  } else if (isPlainObject(value)) {
    const keys = Object.keys(value);
    const items = keys
      .slice(0, 12)
      .map(
        (key) =>
          `${quoteKey(key)}: ${formatValue(value[key], depth + 1, seen)}`,
      );

    if (keys.length > 12) items.push(`… ${keys.length - 12} more`);

    text = `{ ${items.join(", ")} }`;
  } else {
    text = String(value);
  }

  seen.delete(value);

  return text;
}

function flattenDiagnosticMessage(message: unknown): string {
  if (typeof message === "string") return message;

  if (
    message !== null &&
    typeof message === "object" &&
    "messageText" in message
  ) {
    return flattenDiagnosticMessage(
      (message as { messageText: unknown }).messageText,
    );
  }

  return String(message);
}

function createScopedConsole(options: ReplRunOptions) {
  const timers = new Map<string, number>();
  const counts = new Map<string, number>();
  let indent = 0;

  function push(level: ReplLogLevel, args: unknown[]) {
    const text = `${"  ".repeat(indent)}${args.map((arg) => formatValue(arg)).join(" ")}`;

    options.onEntry?.(createLogEntry(level, text));
  }

  const scoped = {
    log: (...args: unknown[]) => push("log", args),
    info: (...args: unknown[]) => push("info", args),
    warn: (...args: unknown[]) => push("warn", args),
    error: (...args: unknown[]) => push("error", args),
    debug: (...args: unknown[]) => push("debug", args),
    trace: (...args: unknown[]) => push("debug", args),
    dir: (...args: unknown[]) => push("log", args),
    table: (...args: unknown[]) => push("log", args),
    clear: () => push("clear", []),
    group: (...args: unknown[]) => {
      if (args.length > 0) push("log", args);
      indent += 1;
    },
    groupCollapsed: (...args: unknown[]) => {
      if (args.length > 0) push("log", args);
      indent += 1;
    },
    groupEnd: () => {
      indent = Math.max(0, indent - 1);
    },
    assert: (condition: unknown, ...args: unknown[]) => {
      if (!condition) push("error", ["Assertion failed:", ...args]);
    },
    time: (label = "default") => {
      timers.set(label, performance.now());
    },
    timeLog: (label = "default", ...args: unknown[]) => {
      const start = timers.get(label);
      if (start === undefined) return;

      push("log", [`${label}: ${(performance.now() - start).toFixed(2)}ms`, ...args]);
    },
    timeEnd: (label = "default") => {
      const start = timers.get(label);
      if (start === undefined) return;

      timers.delete(label);
      push("log", [`${label}: ${(performance.now() - start).toFixed(2)}ms`]);
    },
    count: (label = "default") => {
      const next = (counts.get(label) ?? 0) + 1;
      counts.set(label, next);
      push("log", [`${label}: ${next}`]);
    },
    countReset: (label = "default") => {
      counts.delete(label);
    },
  };

  return scoped;
}

function evaluateCompiledModule(
  compiled: string,
  options: ReplRunOptions,
): ReplRunResult {
  const module = { exports: {} as Record<string, unknown> };
  const scopedConsole = createScopedConsole(options);
  let rendered: unknown;
  let didRender = false;

  const require = (id: string) => {
    if (Object.prototype.hasOwnProperty.call(options.modules, id)) {
      return options.modules[id];
    }

    throw new Error(
      `Unsupported import "${id}". Available modules: ${Object.keys(options.modules).join(", ")}.`,
    );
  };

  const render = (value: unknown) => {
    rendered = value;
    didRender = true;
  };

  let completion: unknown;

  try {
    const evaluate = new Function(
      "require",
      "module",
      "exports",
      "console",
      "render",
      "React",
      `return eval(${JSON.stringify(compiled)});`,
    );

    completion = evaluate(
      require,
      module,
      module.exports,
      scopedConsole,
      render,
      React,
    );
  } catch (error) {
    throw new ReplExecutionError("evaluate", error);
  }

  return {
    completion,
    defaultExport: module.exports.default,
    didRender,
    rendered,
  };
}

function createRenderableNode(value: unknown, allowText: boolean) {
  if (React.isValidElement(value)) return value;

  if (typeof value === "function") {
    return React.createElement(value as React.ElementType);
  }

  if (
    value !== null &&
    typeof value === "object" &&
    "$$typeof" in value
  ) {
    return React.createElement(value as React.ElementType);
  }

  if (allowText && (typeof value === "string" || typeof value === "number")) {
    return value;
  }

  return null;
}

function resolveReplOutput(result: ReplRunResult): ReplOutput {
  if (result.didRender) {
    const node = createRenderableNode(result.rendered, true);

    if (node !== null) {
      return { kind: "render", node };
    }

    return {
      kind: "result",
      node: null,
      resultText: formatValue(result.rendered),
    };
  }

  if (result.defaultExport !== undefined) {
    const node = createRenderableNode(result.defaultExport, true);

    if (node !== null) {
      return { kind: "default", node };
    }

    if (result.defaultExport === null) {
      return { kind: "none", node: null };
    }

    return {
      kind: "result",
      node: null,
      resultText: formatValue(result.defaultExport),
    };
  }

  if (result.completion === undefined) {
    return { kind: "none", node: null };
  }

  const node = createRenderableNode(result.completion, false);

  if (node !== null) {
    return { kind: "completion", node };
  }

  return {
    kind: "result",
    node: null,
    resultText: formatValue(result.completion),
  };
}

function toReplError(error: unknown, phase: ReplErrorPhase): ReplError {
  if (error instanceof ReplExecutionError) {
    return toReplError(error.cause, error.phase);
  }

  if (error instanceof Error) {
    return {
      phase,
      name: error.name || "Error",
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    phase,
    name: "Error",
    message: String(error),
  };
}

export {
  ReplExecutionError,
  createLogEntry,
  evaluateCompiledModule,
  flattenDiagnosticMessage,
  formatValue,
  resolveReplOutput,
  toReplError,
};
export type {
  ReplConsoleEntry,
  ReplError,
  ReplErrorPhase,
  ReplLogEntry,
  ReplLogLevel,
  ReplModuleMap,
  ReplOutput,
  ReplOutputKind,
  ReplRunOptions,
  ReplRunResult,
};
