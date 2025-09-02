// frontend/src/components/ConfigPanel.tsx
import React, { useRef } from 'react';
import { Node } from 'reactflow';
import axios from 'axios';

interface ConfigPanelProps {
  selectedNode: Node | null;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ selectedNode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedNode) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // NOTE: This is a simplified example. In a real app, you'd update the node's
      // data with the returned collectionName and use that in the workflow.
      const response = await axios.post('http://localhost:8000/api/v1/documents/upload', formData);
      alert(`File uploaded successfully! Collection: ${response.data.collectionName}`);
      // Here you would typically update the node's data:
      // onNodesChange([{ id: selectedNode.id, type: 'updateData', data: { documentId: response.data.collectionName } }])
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderContent = () => {
    if (!selectedNode) {
      return <p className="text-gray-500">Select a node to configure it.</p>;
    }

    switch (selectedNode.type) {
      case 'knowledgeBase':
        return (
          <div>
            <h4 className="font-semibold mb-2">KnowledgeBase</h4>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf" />
            <button onClick={onUploadClick} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Upload PDF
            </button>
          </div>
        );
      default:
        return <p className="text-gray-500">{selectedNode.type} settings will go here.</p>;
    }
  };

  return (
    <div className="flex-grow">
      <h2 className="text-lg font-semibold mb-4">Configuration</h2>
      {renderContent()}
    </div>
  );
};

export default ConfigPanel;