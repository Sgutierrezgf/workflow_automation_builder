/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";

export function FalseNode({ data }: any) {
  return (
    <div className="p-4 bg-red-100 rounded shadow-md border border-red-400 w-40 text-center">
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold text-red-800 text-sm">
        {data.label || "False Path"}
      </div>
    </div>
  );
}
