import { monaco } from "./monaco";
import {
  ReplExecutionError,
  evaluateCompiledModule,
  flattenDiagnosticMessage,
  type ReplRunOptions,
  type ReplRunResult,
} from "./runtime";

const COMPILE_URI = monaco.Uri.parse("file:///repl-compile.tsx");

let compileModel: monaco.editor.ITextModel | null = null;

function getCompileModel(source: string) {
  if (!compileModel || compileModel.isDisposed()) {
    const existing = monaco.editor.getModel(COMPILE_URI);
    compileModel =
      existing ?? monaco.editor.createModel(source, "typescript", COMPILE_URI);
  }

  if (compileModel.getValue() !== source) {
    compileModel.setValue(source);
  }

  return compileModel;
}

async function getTypeScriptWorker() {
  let lastError: unknown;

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      return await monaco.typescript.getTypeScriptWorker();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }
  }

  throw new Error(
    `The TypeScript language service did not start: ${String(lastError)}`,
  );
}

async function compileTsx(source: string) {
  const model = getCompileModel(source);
  const getWorker = await getTypeScriptWorker();
  const worker = await getWorker(model.uri);
  const fileName = model.uri.toString();

  const diagnostics = await worker.getSyntacticDiagnostics(fileName);

  if (diagnostics.length > 0) {
    const diagnostic = diagnostics[0];
    const position = model.getPositionAt(diagnostic.start ?? 0);

    throw new Error(
      `Syntax error at ${position.lineNumber}:${position.column}: ${flattenDiagnosticMessage(diagnostic.messageText)}`,
    );
  }

  const emit = await worker.getEmitOutput(fileName);
  const output = emit.outputFiles.find((file) => file.name.endsWith(".js"));

  if (!output) {
    const diagnostic = emit.diagnostics?.[0];

    throw new Error(
      diagnostic
        ? flattenDiagnosticMessage(diagnostic.messageText)
        : "The TypeScript compiler did not emit JavaScript.",
    );
  }

  return output.text;
}

type ReplCompileResult = ReplRunResult & {
  durationMs: number;
};

async function runRepl(
  source: string,
  options: ReplRunOptions,
): Promise<ReplCompileResult> {
  const startedAt = performance.now();
  let compiled: string;

  try {
    compiled = await compileTsx(source);
  } catch (error) {
    throw new ReplExecutionError("compile", error);
  }

  const result = evaluateCompiledModule(compiled, options);

  return {
    ...result,
    durationMs: performance.now() - startedAt,
  };
}

export { runRepl };
