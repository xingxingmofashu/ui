import { cn } from "cn";

type ThemeClassName<State> =
  | string
  | ((state: State) => string | undefined)
  | undefined;

/**
 * Merges the theme class, a user className (string or Base UI state callback),
 * and the final slot override into one className value.
 */
function resolveThemeClassName<State>(
  themeClassName: string,
  className: ThemeClassName<State>,
  overrideClassName?: string,
) {
  return typeof className === "function"
    ? (state: State) =>
        cn(themeClassName, className(state), overrideClassName)
    : cn(themeClassName, className, overrideClassName);
}

export { resolveThemeClassName };
