import React from "react";
import type { JsonValue } from "../../types/types";
import { JsonNode } from "./JsonNode";
import { Card } from "../ui/card";

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
    const filteredData = data;
    return (
        <div className={className}>
            <JsonNode
                value={filteredData}
                initiallyExpanded={initiallyExpanded}
            />
        </div>
    );
};

export default JsonVisualizer;
