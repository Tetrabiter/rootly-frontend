import type { JsonValue } from "@/types/types";
import { parseFilter } from "./parsers";

export const filterJsonObject = (
    data: { [key: string]: JsonValue },
    filters: string[]
) => {
    const result: Partial<typeof data> = {};
    for (const filter of filters) {
        const parsedFilter = parseFilter(filter);
        if (parsedFilter.key in data) {
            if (
                !(
                    parsedFilter.operator &&
                    parsedFilter.operator(
                        data[parsedFilter.key],
                        parsedFilter.value
                    )
                )
            )
                continue;
            result[parsedFilter.key] = data[parsedFilter.key];
        }
    }
    return result;
};
