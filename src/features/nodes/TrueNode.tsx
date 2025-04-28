/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";

export function TrueNode({ data }: any) {
  return (
    <div className="p-4 bg-green-100 rounded shadow-md border border-green-400 w-40 text-center">
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold text-green-800 text-sm">
        {data.label || "True Path"}
      </div>
    </div>
  );
}

export default TrueNode;
