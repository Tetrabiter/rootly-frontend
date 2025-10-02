import { filterJsonObject } from "@/lib/JsonFilter/filterJson";
import { parseFilterString } from "@/lib/JsonFilter/parsers";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useState } from "react";
import type { JsonValue } from "../../types/types";
import { SearchInput } from "../SearchInput";
import { JsonNode } from "./JsonNode";

// Main JSON visualizer component
interface JsonVisualizerProps {
    data: JsonValue;
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
    const filteredData = debouncedFilter
        ? filterJsonObject(data, parseFilterString(debouncedFilter))
        : data;
    return (
        <div className={className}>
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
