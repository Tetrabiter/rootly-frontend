// hooks/use-dependency-tree.ts
import { useState } from "react";
import type { DependencyNode } from "../types/dependency-tree";

export function useDependencyTree() {
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);

  const handleNodeClick = (node: DependencyNode) => {
    setSelectedNode(node);
  };

  return {
    selectedNode,
    onNodeClick: handleNodeClick,
    selectedNodeId: selectedNode?.id || undefined,
  };
}