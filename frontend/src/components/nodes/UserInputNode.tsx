// frontend/src/components/nodes/UserInputNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const UserInputNode = () => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-md w-60">
      <div className="bg-blue-100 p-2 rounded-t-lg">
        <h3 className="font-bold text-blue-800">👤 User Query</h3>
      </div>
      <div className="p-3">
        <p className="text-gray-600 text-sm">Input for the user's question.</p>
      </div>
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default UserInputNode;