/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export function ConditionNode({ data }: any) {
  return (
    <div className="bg-blue-200 p-4 rounded shadow w-40">
      <div className="font-bold">Condition</div>
      <input
        type="text"
        placeholder="Condition"
        className="w-full mt-2 p-1 border"
        value={data.condition}
        onChange={(e) => data.onChange({ ...data, condition: e.target.value })}
      />
      <Handle type="source" position={Position.Right} id="true" />
      <Handle type="source" position={Position.Left} id="false" />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
