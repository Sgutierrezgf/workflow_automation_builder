import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const WaitNode = ({ data }: any) => {
  const [duration, setDuration] = useState("");

  return (
    <div className="p-4 bg-white rounded shadow-md border border-yellow-400">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold mb-2">Wait Node</div>
      <input
        className="border p-1 w-full text-sm"
        type="number"
        min={0}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Horas de espera"
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default WaitNode;
