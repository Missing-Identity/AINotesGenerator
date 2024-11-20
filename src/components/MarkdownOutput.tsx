import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ClipboardCopy, Eye, Code, Download } from 'lucide-react';

interface MarkdownOutputProps {
  markdown: string;
}

export function MarkdownOutput({ markdown }: MarkdownOutputProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1
              ${viewMode === 'preview' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setViewMode('source')}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1
              ${viewMode === 'source' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Code size={16} />
            <span>Markdown</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={downloadMarkdown}
            className="px-3 py-1.5 rounded-md flex items-center space-x-1 text-gray-600 hover:bg-gray-100"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition-colors
              ${copied 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <ClipboardCopy size={16} />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-300px)] overflow-auto rounded-lg bg-gray-50">
        {viewMode === 'preview' ? (
          <div className="prose max-w-none p-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <pre className="p-6 text-sm font-mono whitespace-pre-wrap text-gray-800">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
}