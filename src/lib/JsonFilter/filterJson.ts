import { parseFilter } from "./parsers";

const data = {
    "@level": "info",
    "@message": "Terraform version: 1.13.1",
    "@timestamp": "2025-09-09T15:31:32.757289+03:00",
};

const filterJsonObject = (data: Record<string, unknown>, filters: string[]) => {
    const result: Partial<typeof data> = {};
    for (const filter of filters) {
        console.log("FILTER", filter);
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

console.log(filterJsonObject(data, ['@level!="i1nfo"', "@message"]));
