import { NodeList } from "./features/nodes/NodeList";
import { FlowEditor } from "./features/editor/FlowEditor";

function App() {
  return (
    <div className="flex">
      <NodeList />
      <FlowEditor />
    </div>
  );
}

export default App;
