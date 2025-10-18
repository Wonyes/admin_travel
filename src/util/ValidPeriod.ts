export function Valid(data: string | number): string | number {
  if (data === undefined || data === null) return "-";

  const formatted = typeof data === "number" ? data.toLocaleString() : data;
  return formatted.length > 13 ? formatted.slice(0, 13) + ".." : formatted;
}
