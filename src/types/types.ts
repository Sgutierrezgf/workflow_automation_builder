export type NodeType = "Start" | "Email" | "Wait" | "Condition";

export interface NodeData {
  title?: string;
  content?: string;
  duration?: number;
  condition?: string;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  data: NodeData;
  next?: string;
  trueNode?: string;
  falseNode?: string;
}

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}
export type Handle = {
  id?: string | null;
  nodeId: string;
  x: number;
  y: number;
  position: Position;
  type: "source" | "target";
  width: number;
  height: number;
};
