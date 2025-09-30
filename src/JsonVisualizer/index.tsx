import React from "react";
import type { JsonValue } from "./types";
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
    return (
        <div
            className={`font-mono text-sm bg-white border border-gray-200 rounded-lg p-4 overflow-auto ${className}`}
        >
            <JsonNode value={data} initiallyExpanded={initiallyExpanded} />
        </div>
    );
};

export default JsonVisualizer;
