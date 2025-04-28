export const saveFlowToLocalStorage = (nodes: any[], edges: any[]) => {
  const flow = { nodes, edges };
  localStorage.setItem("workflow-data", JSON.stringify(flow));
};

export const loadFlowFromLocalStorage = () => {
  const flow = localStorage.getItem("workflow-data");
  if (flow) {
    return JSON.parse(flow);
  }
  return null;
};
