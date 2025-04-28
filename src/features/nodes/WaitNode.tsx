/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";

export function WaitNode({ data }: any) {
  return (
    <div className="bg-blue-50 p-4 rounded shadow w-32">
      <div className="font-bold">Wait</div>
      <input
        type="number"
        placeholder="Hours"
        className="w-full mt-2 p-1 border"
        value={data.duration}
        onChange={(e) => data.onChange({ ...data, duration: +e.target.value })}
      />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
