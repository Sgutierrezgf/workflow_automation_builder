import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseNodeData } from "../../types";

interface NodeState {
  nodes: BaseNodeData[];
}

const initialState: NodeState = {
  nodes: [],
};

const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<BaseNodeData>) {
      state.nodes.push(action.payload);
    },
    updateNode(state, action: PayloadAction<BaseNodeData>) {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
  },
});

export const { addNode, updateNode } = nodeSlice.actions;
export default nodeSlice.reducer;
