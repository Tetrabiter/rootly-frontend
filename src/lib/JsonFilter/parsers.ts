import { equals, notEquals, startsWith } from "./operators";

export const parseValue = (value: string) => {
    if (value[0] === '"' || value[0] === "'")
        return value.substring(1, value.length - 1);
    if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
        return Boolean(value);
    if (value === "null") return null;
    return Number(value);
};

export const parseFilter = (filter: string) => {
    const result: {
        key: string;
        operator: (a: unknown, b: unknown) => boolean;
        value: ReturnType<typeof parseValue>;
    } = {
        key: "",
        operator: () => true,
        value: "",
    };

    // TODO: оптимизировать этот блок
    let splitSubstr = null;
    if (filter.includes("==")) {
        splitSubstr = "==";
        result.operator = equals;
    } else if (filter.includes("!=")) {
        splitSubstr = "!=";
        result.operator = notEquals;
    } else if (filter.includes("^=")) {
        splitSubstr = "^=";
        result.operator = startsWith;
    }

    if (splitSubstr) {
        const [field, value] = filter.split(splitSubstr);
        const parsedValue = parseValue(value);
        result.key = field;
        result.value = parsedValue;
    } else {
        result.key = filter;
    }

    return result;
};

export const parseFilterString = (filterStr: string) => {
    const withoutRepeatedSpaces = filterStr.replace(/\s+/g, " ");
    return withoutRepeatedSpaces.split(" ");
};

export const parseFiltersString = (filtersStr: string) =>
    parseFilterString(filtersStr).map((filter) => parseFilter(filter));
