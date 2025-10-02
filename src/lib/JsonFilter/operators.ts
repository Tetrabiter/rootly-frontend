export const equals = (a: unknown, b: unknown) => a === b;
export const notEquals = (a: unknown, b: unknown) => a !== b;
export const startsWith = (a: unknown, b: unknown) =>
    String(a).startsWith(String(b));
