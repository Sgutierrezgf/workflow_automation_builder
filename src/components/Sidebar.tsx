import React from "react";

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-1/5 p-4 border-r">
      <h2 className="font-bold mb-4">Nodos</h2>
      <div
        className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg m-15"
        onDragStart={(e) => onDragStart(e, "Start")}
        draggable
      >
        Start
      </div>
      <div
        className="p-2 mb-2 bg-blue-200 cursor-pointer rounded m-15"
        onDragStart={(e) => onDragStart(e, "Email")}
        draggable
      >
        Email
      </div>
      <div
        className="p-2 mb-2 bg-yellow-200 cursor-pointer rounded m-15"
        onDragStart={(e) => onDragStart(e, "Wait")}
        draggable
      >
        Wait
      </div>
      <div
        className="w-16 h-16 bg-green-300 transform rotate-45 flex items-center justify-center shadow-md m-15"
        onDragStart={(e) => onDragStart(e, "Condition")}
        draggable
      >
        <div className="-rotate-45 text-center font-bold">Condición</div>
      </div>
    </aside>
  );
};

export default Sidebar;
