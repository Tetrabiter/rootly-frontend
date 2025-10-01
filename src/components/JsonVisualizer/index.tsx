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
    return (
        <Card
            className={`font-mono text-sm p-4 overflow-auto ${className}`}
        >
            <JsonNode value={data} initiallyExpanded={initiallyExpanded} />
        </Card>
    );
};

export default JsonVisualizer;
