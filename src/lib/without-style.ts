/**
 * Removes the inline `style` prop before Base UI props are forwarded.
 *
 * The glass theme owns the surface and every Base UI part, so inline styles
 * must not leak past the public component API and override the recipe.
 */
function withoutStyle<Props extends object>(
  props: Props,
): Omit<Props, "style"> {
  const { style: _style, ...rest } = props as Props & { style?: unknown };
  return rest;
}

export { withoutStyle };
