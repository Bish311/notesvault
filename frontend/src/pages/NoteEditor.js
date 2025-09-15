import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import noteService from '../services/noteService';
import MarkdownEditor from '../components/MarkdownEditor';

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch note data if in edit mode
  useEffect(() => {
    const fetchNote = async () => {
      if (!isEditMode) return;
      
      try {
        setIsLoading(true);
        const note = await noteService.getNoteById(id);
        setFormData({
          title: note.title,
          content: note.content || '',
          tags: note.tags || []
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load note');
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, isEditMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle tag input
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Add tag when Enter is pressed
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  // Add tag from input
  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
    }
    setTagInput('');
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      if (isEditMode) {
        await noteService.updateNote(id, formData);
      } else {
        await noteService.createNote(formData);
      }
      
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} note`);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {isEditMode ? 'Edit Note' : 'Create New Note'}
      </h1>
      
      {/* Error Message */}
      {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-lg mb-4">{error}</div>}
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Note Title"
          />
        </div>
        
        {/* Markdown Editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <MarkdownEditor
            value={formData.content}
            onChange={(e) => handleChange({ target: { name: 'content', value: e.target.value } })}
          />
        </div>
        
        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags
          </label>
          <div className="flex">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Add
            </button>
          </div>
          
          {/* Tag Pills */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : isEditMode ? 'Update Note' : 'Create Note'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
