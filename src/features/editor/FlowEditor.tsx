import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  EmailNode,
  WaitNode,
  ConditionNode,
  StartNode,
  TrueNode,
  FalseNode,
} from "../nodes";
import {
  saveFlowToLocalStorage,
  loadFlowFromLocalStorage,
  handleKeyDownDelete,
  handleDropNode,
  exportFlowJson,
  clearFlow,
} from "../../utils/helperFunctions"; // Importamos las funciones auxiliares

const nodeTypes = {
  Email: EmailNode,
  Wait: WaitNode,
  Condition: ConditionNode,
  Start: StartNode,
  True: TrueNode,
  False: FalseNode,
};

export function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    saveFlowToLocalStorage(nodes, edges); // Guardamos en el localStorage cuando cambian los nodos o bordes
  }, [nodes, edges]);

  useEffect(() => {
    loadFlowFromLocalStorage(setNodes, setEdges); // Cargamos el flujo desde el localStorage al iniciar
  }, [setEdges, setNodes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyDownDelete(event, setNodes, setEdges); // Lógica para eliminar nodos y bordes
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setEdges, setNodes]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      handleDropNode(event, nodes, setNodes); // Lógica para crear nuevos nodos
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const exportFlow = () => {
    exportFlowJson(nodes); // Exportamos el flujo como JSON
  };

  const onNodeDelete = (nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
    );
  };

  const onNodeDoubleClick = (_: any, node: Node) => {
    if (confirm(`¿Eliminar nodo ${node.id}?`)) {
      onNodeDelete(node.id);
    }
  };

  const clearAllFlow = () => {
    clearFlow(setNodes, setEdges); // Limpiar el flujo
  };

  return (
    <ReactFlowProvider>
      <div className="flex w-full h-[90vh]">
        <div
          className="flex-1 bg-gray-50"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeDoubleClick}
            fitView
          >
            <Controls />
            <Background />
            <MiniMap />
          </ReactFlow>
        </div>

        <aside className="w-52 bg-white shadow-md p-4 flex flex-col space-y-4">
          <button
            onClick={exportFlow}
            className="bg-green-500 text-white p-2 rounded"
          >
            Export JSON
          </button>

          <button
            onClick={clearAllFlow}
            className="bg-red-500 text-white p-2 rounded"
          >
            Limpiar Flow
          </button>
        </aside>
      </div>
    </ReactFlowProvider>
  );
}
