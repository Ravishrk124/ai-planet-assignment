// frontend/src/App.tsx
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import { Node, Edge } from 'reactflow';
import Canvas from './components/Canvas'; // Corrected path
import Sidebar from './components/Sidebar'; // Corrected path
import ConfigPanel from './components/ConfigPanel'; // Corrected path
import ChatModal from './components/ChatModal'; // Corrected path

let id = 1;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat modal

  const onAddComponent = (type: string) => {
    const newNode: Node = {
      id: getId(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${type} node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar onAddComponent={onAddComponent} />
      <div className="flex-1">
        <Canvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          setSelectedNode={setSelectedNode}
        />
      </div>
      {/* Updated Config Panel Area */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
        >
          Chat with Stack
        </button>
        <ConfigPanel selectedNode={selectedNode} />
      </div>

      {/* Conditionally render the Chat Modal */}
      {isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          nodes={nodes}
          edges={edges}
        />
      )}
    </div>
  );
}

export default App;