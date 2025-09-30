import { useState, type MouseEventHandler } from "react";
import type { JsonValue } from "../../types/types";

interface JsonNodeProps {
    nodeKey?: string;
    value: JsonValue;
    depth?: number;
    initiallyExpanded?: boolean;
}

// CSS triangle icons component
const TriangleIcon = ({ expanded }: { expanded: boolean }) => {
    return (
        <span
            className={`inline-block w-0 h-0 border-transparent border-t-neutral-600 transition-transform ${
                expanded ? "rotate-0" : "-rotate-90"
            }`}
            style={{
                borderLeftWidth: "4px",
                borderRightWidth: "4px",
                borderTopWidth: "6px",
                borderBottomWidth: "0",
                marginRight: "4px",
                marginLeft: "2px",
            }}
        />
    );
};

// Main JSON node component
export const JsonNode = ({
    nodeKey,
    value,
    depth = 0,
    initiallyExpanded = false,
}: JsonNodeProps) => {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const hasChildren =
        typeof value === "object" &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0);

    const toggleExpanded = () => {
        if (hasChildren) {
            setExpanded(!expanded);
        }
    };
    const handleCopy: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        const ct = e.currentTarget;
        ct.children[0].classList.add("hidden");
        ct.children[1].classList.remove("hidden");
        setTimeout(() => {
            ct.children[0].classList.remove("hidden");
            ct.children[1].classList.add("hidden");
        }, 1000);
        console.log(value);
    };

    // button for copy node
    const copyButton = (
        <button
            onClick={handleCopy}
            className="cursor-pointer pl-2 h-full text-gray-400 opacity-0 hover:opacity-100 hover:text-gray-600 transition-opacity"
        >
            <svg
                className="h-full w-[1em]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
            </svg>
            <span className="hidden">Скопировано</span>
        </button>
    );

    // render primitive values func (useful for render objects and arrays)
    const renderPrimitive = () => {
        let returnComponent = <></>;
        if (value === null) {
            returnComponent = <span className="text-purple-600">null</span>;
        }
        if (typeof value === "boolean") {
            returnComponent = (
                <span className="text-blue-600">{value.toString()}</span>
            );
        }
        if (typeof value === "number") {
            returnComponent = <span className="text-green-600">{value}</span>;
        }
        if (typeof value === "string") {
            returnComponent = <span className="text-red-600">"{value}"</span>;
        }

        return (
            <>
                {returnComponent}
                {copyButton}
            </>
        );
    };

    // objects
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const keys = Object.keys(value);
        const isEmpty = keys.length === 0;

        return (
            <div className="flex flex-col">
                <div
                    className={`flex items-center cursor-pointer hover:bg-gray-50 rounded px-1 ${
                        hasChildren ? "min-h-6" : ""
                    }`}
                    onClick={toggleExpanded}
                >
                    {/* Triangle icon */}
                    {hasChildren && <TriangleIcon expanded={expanded} />}
                    {/* Render spacing if no children */}
                    {!hasChildren && <span className="w-3 h-6"></span>}

                    {/* Key */}
                    {nodeKey && (
                        <span className="text-purple-600 font-medium mr-2">
                            "{nodeKey}":
                        </span>
                    )}

                    {/* Value preview */}
                    <span className="text-gray-800">{"{"}</span>
                    {!expanded && (
                        <span className="text-gray-500 ml-1 mr-1">
                            {isEmpty
                                ? "empty"
                                : `${keys.length} key${
                                      keys.length !== 1 ? "s" : ""
                                  }`}
                        </span>
                    )}
                    <span className="text-gray-800">{expanded ? "" : "}"}</span>
                    {copyButton}
                </div>

                {/* Children */}
                {expanded && (
                    <div className="ml-6 border-l border-gray-200 pl-2">
                        {keys.map((key) => (
                            <JsonNode
                                key={key}
                                nodeKey={key}
                                value={value[key]}
                                depth={depth + 1}
                                initiallyExpanded={false}
                            />
                        ))}
                        {isEmpty && (
                            <div className="text-gray-500 italic">empty</div>
                        )}
                    </div>
                )}
                {expanded && <div className="text-gray-800 pl-[1.35em]">{"}"}</div>}
            </div>
        );
    }

    // arrays
    if (Array.isArray(value)) {
        if (value.length === 0)
            return <span className="text-gray-500">[ empty ]</span>;
        return (
            <div className="flex flex-col">
                <div
                    className={`flex items-center cursor-pointer hover:bg-gray-50 rounded px-1 ${
                        hasChildren ? "min-h-6" : ""
                    }`}
                    onClick={toggleExpanded}
                >
                    {/* Triangle icon */}
                    {hasChildren && <TriangleIcon expanded={expanded} />}
                    {/* Render spacing if no children */}
                    {!hasChildren && <span className="w-3 h-6"></span>}

                    {/* Key */}
                    {nodeKey && (
                        <span className="text-purple-600 font-medium mr-2">
                            "{nodeKey}":{copyButton}
                        </span>
                    )}

                    {/* Value preview */}
                    <span className="text-gray-800">[</span>
                    {!expanded && (
                        <span className="text-gray-500 ml-1 mr-1">
                            {value.length} item{value.length !== 1 ? "s" : ""}
                        </span>
                    )}
                    <span className="text-gray-800">{expanded ? "" : "]"}</span>
                    {copyButton}
                </div>

                {/* Children */}
                {expanded && (
                    <div className="ml-6 border-l border-gray-200 pl-2">
                        {value.map((item, index) => (
                            <JsonNode
                                key={index}
                                value={item}
                                depth={depth + 1}
                                initiallyExpanded={false}
                            />
                        ))}
                    </div>
                )}
                {expanded && <div className="text-gray-800 pl-[1.25em]">]</div>}
            </div>
        );
    }

    // primitive values
    return (
        <div className="flex items-center hover:bg-gray-50 rounded px-1 min-h-6 group relative">
            {/* Empty space where triangle would be */}
            <span className="w-3 h-6"></span>

            {/* Key */}
            {nodeKey && (
                <span className="text-purple-600 font-medium mr-2">
                    "{nodeKey}":
                </span>
            )}

            {/* Value */}
            {renderPrimitive()}
        </div>
    );
};
