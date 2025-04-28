import React from "react";
import { Handle, Position } from "@xyflow/react";

const StartNode = ({ data }: any) => {
  return (
    <div className="p-4 bg-white rounded-full shadow-md border border-purple-400 flex items-center justify-center">
      <Handle type="source" position={Position.Bottom} />
      <div className="font-bold">Start</div>
    </div>
  );
};

export default StartNode;
