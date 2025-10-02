import React, { useState } from "react";
import type { JsonValue } from "../../types/types";
import { JsonNode } from "./JsonNode";
import { Card } from "../ui/card";
import { SearchInput } from "../SearchInput";

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
    const filteredData = data;
    return (
        <div className={className}>
            <SearchInput
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
            />
            <span>{filter}</span>
            <JsonNode
                value={filteredData}
                initiallyExpanded={initiallyExpanded}
            />
        </div>
    );
};

export default JsonVisualizer;
