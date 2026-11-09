/** Join space-separated ID references, dropping empty values. */
function mergeIds(...ids: Array<string | null | undefined>): string | undefined {
  const merged = ids
    .filter((id): id is string => Boolean(id))
    .join(" ")
    .trim();

  return merged || undefined;
}

export { mergeIds };
