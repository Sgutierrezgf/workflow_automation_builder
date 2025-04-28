export type NodeType = "Start" | "Email" | "Wait" | "Condition";

export interface BaseNodeData {
  id: string;
  type: NodeType;
}

export interface EmailNodeData extends BaseNodeData {
  type: "Email";
  title: string;
  content: string;
}

export interface WaitNodeData extends BaseNodeData {
  type: "Wait";
  duration: number; // horas
}

export interface ConditionNodeData extends BaseNodeData {
  type: "Condition";
  condition: string;
}

export type NodeData = EmailNodeData | WaitNodeData | ConditionNodeData;
