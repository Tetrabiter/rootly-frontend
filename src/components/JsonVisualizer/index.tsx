import { filterJsonObjectsArray } from "@/lib/JsonFilter/filterJson";
import type { JsonObject } from "@/types/types";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { SearchInput } from "../SearchInput";
import { JsonNode } from "./JsonNode";

// Main JSON visualizer component
interface JsonVisualizerProps {
    data: JsonObject[];
    initiallyExpanded?: boolean;
    className?: string;
}

const JsonVisualizer: React.FC<JsonVisualizerProps> = ({
    data,
    initiallyExpanded = true,
    className = "",
}) => {
    const [filter, setFilter] = useState("");
    const debouncedFilter = useDebounce(filter, 200);

    if (data === null) return "null";

    const filteredData = debouncedFilter
        ? filterJsonObjectsArray(data, debouncedFilter)
        : data;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <SearchInput
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
            />
            <JsonNode
                value={filteredData}
                initiallyExpanded={initiallyExpanded}
            />
        </div>
    );
};

export default JsonVisualizer;
