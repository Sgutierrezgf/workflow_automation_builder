import React from "react";
import { NODE_TYPES } from "../../constans/appConstants";

const NodeList = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-40 p-4 bg-gray-100">
      {NODE_TYPES.map((type) => (
        <div
          key={type}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
          className="p-2 my-2 bg-white rounded shadow cursor-grab"
        >
          {type}
        </div>
      ))}
    </aside>
  );
};

export default NodeList;
