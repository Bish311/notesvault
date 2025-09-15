import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({ value, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="markdown-editor border rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isPreview ? 'Preview' : 'Editor'}
        </div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      {isPreview ? (
        <div className="bg-white dark:bg-gray-800 p-4 prose dark:prose-invert max-w-none min-h-[200px] overflow-auto">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={onChange}
          rows="10"
          className="w-full p-4 bg-white dark:bg-gray-800 dark:text-white focus:outline-none"
          placeholder="You can use Markdown formatting. **Bold**, *Italic*, # Heading, - List items, etc."
        />
      )}
      
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Supports Markdown: **bold**, *italic*, `code`, # headings, - lists, etc.</span>
      </div>
    </div>
  );
};

export default MarkdownEditor;
