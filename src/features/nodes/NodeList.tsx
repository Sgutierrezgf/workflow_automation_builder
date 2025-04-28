import React from "react";

const nodeTypes = [
  { type: "Start", label: "Start" },
  { type: "Email", label: "Email" },
  { type: "Wait", label: "Wait" },
  { type: "Condition", label: "Condition" },
  { type: "True", label: "True" },
  { type: "False", label: "False" },
];

export function NodeList() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4 bg-gray-100">
      <h3 className="font-bold mb-4">Nodes</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable
          className="mb-2 p-2 bg-white shadow cursor-pointer text-center"
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
}
