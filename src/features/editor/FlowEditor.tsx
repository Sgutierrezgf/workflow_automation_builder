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
    const flow = { nodes, edges };
    localStorage.setItem("flow", JSON.stringify(flow));
  }, [nodes, edges]);

  useEffect(() => {
    const savedFlow = localStorage.getItem("flow");
    if (savedFlow) {
      const flow = JSON.parse(savedFlow);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    }
  }, [setEdges, setNodes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        setNodes((nds) => nds.filter((node) => !node.selected));
        setEdges((eds) => eds.filter((edge) => !edge.selected));
      }
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
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX, y: event.clientY };

      if (type === "Start" && nodes.some((node) => node.type === "Start")) {
        alert("Solo puede haber un nodo Start.");
        return;
      }

      const id = `${+new Date()}`;

      const newNode: Node = {
        id,
        type,
        position,
        data: {
          title: "",
          content: "",
          duration: 0,
          condition: "",
          onChange: (newData: any) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  return { ...node, data: newData };
                }
                return node;
              })
            );
          },
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const exportFlow = () => {
    if (nodes.length === 0) {
      alert("No hay nodos para exportar.");
      return;
    }

    // Crear IDs tipo node-1, node-2, etc.
    const idMapping = nodes.reduce((acc, node, index) => {
      acc[node.id] = `node-${index + 1}`;
      return acc;
    }, {} as Record<string, string>);

    const exportedNodes = nodes.map((node, index) => {
      const nextNode = nodes[index + 1];

      return {
        id: idMapping[node.id],
        type: node.type,
        data: {
          title: node.data?.title || "",
          content: node.data?.content || "",
          duration: node.data?.duration || 0,
          condition: node.data?.condition || "",
        },
        next: nextNode ? idMapping[nextNode.id] : null,
      };
    });

    const exportJson = {
      start: idMapping[nodes[0].id],
      nodes: exportedNodes,
    };

    console.info(JSON.stringify(exportJson, null, 2));
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

  const clearFlow = () => {
    if (confirm("¿Seguro que quieres limpiar todo el flow?")) {
      setNodes([]);
      setEdges([]);
    }
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
            onClick={clearFlow}
            className="bg-red-500 text-white p-2 rounded"
          >
            Limpiar Flow
          </button>
        </aside>
      </div>
    </ReactFlowProvider>
  );
}
