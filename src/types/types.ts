export type JsonObject = { [key: string]: JsonValue };
export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonValue[];

export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
