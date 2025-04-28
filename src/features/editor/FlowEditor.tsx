import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Connection,
  Node,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeList from "../nodes/NodeList";

import EmailNode from "../nodes/EmailNode";
import WaitNode from "../nodes/WaitNode";
import ConditionNode from "../nodes/ConditionNode";
import StartNode from "../nodes/StartNode";
import {
  saveFlowToLocalStorage,
  loadFlowFromLocalStorage,
} from "../../utils/helperFunctions";
import TrueNode from "../nodes/TrueNode";
import FalseNode from "../nodes/FalseNode";

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const nodeTypes = {
    email: EmailNode,
    wait: WaitNode,
    condition: ConditionNode,
    start: StartNode,
    trueNode: TrueNode,
    falseNode: FalseNode,
  };

  useEffect(() => {
    const savedFlow = loadFlowFromLocalStorage();
    if (savedFlow) {
      setNodes(savedFlow.nodes || []);
      setEdges(savedFlow.edges || []);
    }
  }, []);

  // Guardar flujo cada vez que cambia
  useEffect(() => {
    saveFlowToLocalStorage(nodes, edges);
  }, [nodes, edges]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedNode) {
        setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              edge.source !== selectedNode.id && edge.target !== selectedNode.id
          )
        );
        setSelectedNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, setNodes, setEdges]);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as keyof typeof nodeTypes;
      const position = { x: event.clientX - 250, y: event.clientY }; // Ajuste para aside
      const newNode: Node = {
        id: `${type}_${+new Date()}`,
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const resetFlow = () => {
    setNodes([]);
    setEdges([]);
    localStorage.removeItem("workflow-data");
  };

  const validateFlow = () => {
    const startNodes = nodes.filter((node) => node.type === "start");

    // 1. Debe haber exactamente 1 Start
    if (startNodes.length !== 1) {
      alert("Debe haber exactamente un nodo de tipo Start.");
      return false;
    }

    const startNode = startNodes[0];

    // 2. Start debe estar conectado
    const startConnections = edges.filter(
      (edge) => edge.source === startNode.id
    );

    if (startConnections.length === 0) {
      alert("El nodo Start debe estar conectado a otro nodo.");
      return false;
    }

    return true;
  };

  const exportFlow = () => {
    if (!validateFlow()) return; // Si no es válido, no seguimos

    const flow = { nodes, edges };
    const blob = new Blob([JSON.stringify(flow, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        <NodeList />
        <div className="flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              style: {
                ...node.style,
                border: selectedNode?.id === node.id ? "2px solid #3b82f6" : "", // borde azul si está seleccionado
                borderRadius: "6px",
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={(event, node) => setSelectedNode(node)}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <aside className="absolute top-0 right-0 p-4 bg-white w-72 h-full overflow-auto shadow-lg">
            <h3 className="text-lg font-bold mb-2">Datos en JSON</h3>

            <button
              onClick={resetFlow}
              className="mb-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full text-sm"
            >
              Resetear Flujo
            </button>
            <button
              onClick={exportFlow}
              className="mb-4 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full text-sm"
            >
              Exportar JSON
            </button>
            <pre className="text-xs">
              {JSON.stringify({ nodes, edges }, null, 2)}
            </pre>
          </aside>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowEditor;
