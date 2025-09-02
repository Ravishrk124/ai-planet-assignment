// frontend/src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  onAddComponent: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddComponent }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h1 className="text-xl font-bold mb-4">Components</h1>
      <button onClick={() => onAddComponent('userInput')} className="w-full text-left p-3 border border-gray-300 rounded-md bg-white shadow-sm mb-3 hover:bg-gray-50">
        User Query
      </button>
      <button onClick={() => onAddComponent('knowledgeBase')} className="w-full text-left p-3 border border-gray-300 rounded-md bg-white shadow-sm mb-3 hover:bg-gray-50">
        KnowledgeBase
      </button>
      <button onClick={() => onAddComponent('llm')} className="w-full text-left p-3 border border-gray-300 rounded-md bg-white shadow-sm mb-3 hover:bg-gray-50">
        LLM Engine
      </button>
      <button onClick={() => onAddComponent('output')} className="w-full text-left p-3 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50">
        Output
      </button>
    </aside>
  );
};

export default Sidebar;