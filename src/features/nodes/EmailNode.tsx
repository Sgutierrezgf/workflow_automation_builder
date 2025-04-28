import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const EmailNode = ({ data }: any) => {
  const [title, setTitle] = useState(data.label);
  const [content, setContent] = useState("");

  return (
    <div className="p-4 bg-white rounded shadow-md border border-blue-400">
      <Handle type="target" position={Position.Top} />
      <div className="font-bold mb-2">Email Node</div>
      <input
        className="border p-1 mb-2 w-full text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        className="border p-1 w-full text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EmailNode;
