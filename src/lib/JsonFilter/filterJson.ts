import type { JsonObject } from "@/types/types";
import { parseFiltersString } from "./parsers";

export const filterJsonObject = (data: JsonObject, filtersStr: string) => {
    const result: Partial<typeof data> = {};
    const filtersArr = parseFiltersString(filtersStr);
    for (const filter of filtersArr) {
        if (!(filter.key in data)) return;
        if (filter.operator && !filter.operator(data[filter.key], filter.value))
            return;
        result[filter.key] = data[filter.key];
    }
    return result;
};

export const filterJsonObjectsArray = (
    data: JsonObject[],
    filtersStr: string
) => {
    const filtersArr = parseFiltersString(filtersStr);
    return data.filter((obj) => {
        for (const filter of filtersArr) {
            if (!(filter.key in obj)) return false;
            if (
                filter.operator &&
                !filter.operator(obj[filter.key], filter.value)
            )
                return false;
        }
        return true;
    });
};
