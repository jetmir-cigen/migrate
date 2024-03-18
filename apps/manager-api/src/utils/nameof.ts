export function nameof<T extends object>(
  property: keyof T,
  prefix?: string,
): string;
export function nameof<T extends object>(
  property: Array<keyof T>,
  prefix?: string,
): string[];

export function nameof<T extends object>(property: unknown, prefix?: string) {
  if (Array.isArray(property)) {
    return property.map((prop) => `${prefix}${prop}`);
  }

  return `${prefix}${property}`;
}
