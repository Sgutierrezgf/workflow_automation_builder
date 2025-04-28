/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { Handle, Position } from "@xyflow/react";

export function StartNode({ data }: any) {
  return (
    <div className="bg-red-200 p-4 rounded-full shadow w-24 h-24 flex items-center justify-center text-center">
      Start
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
