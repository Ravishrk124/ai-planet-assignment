// frontend/src/components/nodes/OutputNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const OutputNode = () => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-md w-60">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      <div className="bg-gray-100 p-2 rounded-t-lg">
        <h3 className="font-bold text-gray-800">📤 Output</h3>
      </div>
      <div className="p-3">
        <p className="text-gray-600 text-sm">Displays the final response.</p>
      </div>
    </div>
  );
};

export default OutputNode;