import { Node, Edge, Connection } from "@xyflow/react";

// Función para guardar el flujo en localStorage
export const saveFlowToLocalStorage = (nodes: Node[], edges: Edge[]) => {
  const flow = { nodes, edges };
  localStorage.setItem("flow", JSON.stringify(flow));
};

// Función para cargar el flujo desde localStorage
export const loadFlowFromLocalStorage = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  const savedFlow = localStorage.getItem("flow");
  if (savedFlow) {
    const flow = JSON.parse(savedFlow);
    setNodes(flow.nodes || []);
    setEdges(flow.edges || []);
  }
};

// Función para manejar la eliminación de nodos y conexiones
export const handleKeyDownDelete = (
  event: KeyboardEvent,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  if (event.key === "Delete" || event.key === "Backspace") {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }
};

// Función para manejar la creación de nuevos nodos
export const handleDropNode = (
  event: React.DragEvent,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
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
};

// Función para exportar el flujo como JSON
export const exportFlowJson = (nodes: Node[]) => {
  if (nodes.length === 0) {
    alert("No hay nodos para exportar.");
    return;
  }

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

// Función para limpiar el flujo
export const clearFlow = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  if (confirm("¿Seguro que quieres limpiar todo el flow?")) {
    setNodes([]);
    setEdges([]);
  }
};
