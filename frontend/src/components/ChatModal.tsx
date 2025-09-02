// frontend/src/components/ChatModal.tsx
import React, { useState } from 'react';
import { Node, Edge } from 'reactflow';
import axios from 'axios';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: Node[];
  edges: Edge[];
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, nodes, edges }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    setResponse('');
    try {
      // This will fail for now because the backend isn't ready, but that's okay.
      const apiResponse = await axios.post('http://localhost:8000/api/v1/workflow/execute', {
        nodes,
        edges,
        userQuery: query,
      });
      setResponse(apiResponse.data.answer);
    } catch (error) {
      console.error("Error executing workflow:", error);
      setResponse('Error: Could not connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Chat with your Stack</h2>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="Ask your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="p-2 bg-gray-300 rounded-md hover:bg-gray-400">Close</button>
          <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold">Answer:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal;