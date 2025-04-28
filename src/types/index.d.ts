export type NodeType = "start" | "email" | "wait" | "condition";

export interface BaseNodeData {
  id: string;
  type: NodeType;
  label: string;
}

export interface EmailNodeData extends BaseNodeData {
  title: string;
  content: string;
}

export interface WaitNodeData extends BaseNodeData {
  duration: number;
}

export interface ConditionNodeData extends BaseNodeData {
  condition: string;
  trueNodeId?: string;
  falseNodeId?: string;
}
