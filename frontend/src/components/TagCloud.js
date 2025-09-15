import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';

const TagCloud = ({ onTagSelect, selectedTag }) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const allTags = await noteService.getAllTags();
        setTags(allTags);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load tags');
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (isLoading) {
    return <div className="mt-4">Loading tags...</div>;
  }

  if (error) {
    return <div className="mt-4 text-red-500">{error}</div>;
  }

  if (tags.length === 0) {
    return <div className="mt-4 text-gray-500">No tags available</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {/* "All" tag to reset filter */}
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            !selectedTag ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
