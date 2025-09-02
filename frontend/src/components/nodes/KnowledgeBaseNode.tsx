// frontend/src/components/nodes/KnowledgeBaseNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const KnowledgeBaseNode = () => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-md w-60">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <div className="bg-green-100 p-2 rounded-t-lg">
        <h3 className="font-bold text-green-800">📚 KnowledgeBase</h3>
      </div>
      <div className="p-3">
        <p className="text-gray-600 text-sm">Provides context from documents.</p>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
};

export default KnowledgeBaseNode;