import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const ConditionNode = ({ data }: any) => {
  const [condition, setCondition] = useState("");

  return (
    <div className="p-4 bg-white rounded shadow-md border border-green-400">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold mb-2">Condition Node</div>
      <input
        className="border p-1 w-full text-sm mb-2"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Condición (ej: edad > 18)"
      />
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <div>True →</div>
        <div>False →</div>
      </div>
      <Handle type="source" position={Position.Left} id="true" />
      <Handle type="source" position={Position.Right} id="false" />
    </div>
  );
};

export default ConditionNode;
