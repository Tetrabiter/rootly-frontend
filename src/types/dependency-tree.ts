export interface DependencyNode {
  id: string;
  name: string;
  version?: string;
  type: 'root' | 'dependency' | 'devDependency' | 'peerDependency';
  children?: DependencyNode[];
  description?: string;
  license?: string;
  repository?: string;
}

export interface DependencyTreeProps {
  data: DependencyNode;
  onNodeClick?: (node: DependencyNode) => void;
  selectedNodeId?: string;
}