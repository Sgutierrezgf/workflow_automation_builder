/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";

export function EmailNode({ data }: any) {
  // Usamos una función para actualizar el estado del nodo
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onChange({ ...data, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onChange({ ...data, content: e.target.value });
  };

  return (
    <div className="bg-blue-100 p-4 rounded shadow w-40">
      <div className="font-bold">Email</div>
      <input
        type="text"
        placeholder="Nombre"
        className="w-full mt-2 p-1 border"
        value={data.title}
        onChange={handleTitleChange} // Manejamos el cambio de forma independiente
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mt-2 p-1 border"
        value={data.content}
        onChange={handleContentChange} // Manejamos el cambio de forma independiente
      />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
