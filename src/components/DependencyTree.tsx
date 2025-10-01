// components/dependency-tree.tsx
"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Package, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DependencyNode, DependencyTreeProps } from "../types/dependency-tree";

interface TreeNodeProps {
  node: DependencyNode;
  level: number;
  onNodeClick: (node: DependencyNode) => void;
  selectedNodeId?: string;
}

const TreeNode = ({ node, level, onNodeClick, selectedNodeId }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onNodeClick(node);
  };

  const getTypeVariant = (type: DependencyNode['type']) => {
    switch (type) {
      case 'root':
        return 'default';
      case 'dependency':
        return 'secondary';
      case 'devDependency':
        return 'outline';
      case 'peerDependency':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getTypeIcon = (type: DependencyNode['type']) => {
    switch (type) {
      case 'root':
        return <FileText className="h-3 w-3 text-blue-500" />;
      default:
        return <Package className="h-3 w-3 text-green-500" />;
    }
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded-md hover:bg-accent cursor-pointer transition-colors",
          selectedNodeId === node.id && "bg-accent border-l-2 border-l-primary"
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        ) : (
          <div className="w-4" />
        )}
        
        {getTypeIcon(node.type)}
        
        <span className="font-medium text-sm flex-1 truncate">{node.name}</span>
        
        {node.version && (
          <Badge variant="secondary" className="text-xs font-mono">
            {node.version}
          </Badge>
        )}
        
        <Badge variant={getTypeVariant(node.type)} className="text-xs capitalize">
          {node.type.replace('Dependency', '')}
        </Badge>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-4 border-l border-border">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function DependencyTree({ data, onNodeClick, selectedNodeId }: DependencyTreeProps) {
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);

  const handleNodeClick = (node: DependencyNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  return (
    <div className="flex h-auto gap-4">
      {/* Дерево зависимостей */}
      <Card className="flex-1">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Dependency Tree</h3>
            <Badge variant="outline" className="text-xs">
              {countNodes(data)} packages
            </Badge>
          </div>
          
          <ScrollArea className="h-[500px]">
            <TreeNode
              node={data}
              level={0}
              onNodeClick={handleNodeClick}
              selectedNodeId={selectedNodeId}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Детали выбранного узла */}
      {selectedNode && (
        <Card className="w-80">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Package Details</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Name</h4>
                <p className="text-sm font-mono">{selectedNode.name}</p>
              </div>

              {selectedNode.version && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Version</h4>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {selectedNode.version}
                  </Badge>
                </div>
              )}

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Type</h4>
                <Badge variant={
                  selectedNode.type === 'root' ? 'default' :
                  selectedNode.type === 'dependency' ? 'secondary' :
                  selectedNode.type === 'devDependency' ? 'outline' : 'destructive'
                } className="text-xs capitalize">
                  {selectedNode.type.replace('Dependency', '')}
                </Badge>
              </div>

              {selectedNode.description && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
                  <p className="text-sm">{selectedNode.description}</p>
                </div>
              )}

              {selectedNode.license && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">License</h4>
                  <p className="text-sm font-mono">{selectedNode.license}</p>
                </div>
              )}

              {selectedNode.repository && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Repository</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(selectedNode.repository, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Open Repository
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Вспомогательная функция для подсчета узлов
function countNodes(node: DependencyNode): number {
  let count = 1;
  if (node.children) {
    node.children.forEach(child => {
      count += countNodes(child);
    });
  }
  return count;
}