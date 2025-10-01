export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
