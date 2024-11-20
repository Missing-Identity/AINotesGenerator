import React from 'react';
import { FileText } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export function TextInput({ value, onChange, onProcess, isProcessing }: TextInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700">Input Text</h2>
        </div>
        <button
          onClick={onProcess}
          disabled={isProcessing || !value.trim()}
          className={`px-4 py-2 rounded-md text-white transition-colors flex items-center space-x-2
            ${isProcessing || !value.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          <span>{isProcessing ? 'Processing...' : 'Process Text'}</span>
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your text here to convert it into well-structured notes..."
        className="w-full h-[calc(100vh-300px)] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
      />
    </div>
  );
}