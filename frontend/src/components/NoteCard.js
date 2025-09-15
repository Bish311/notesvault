import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  // Format the date to be more user-friendly
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg text-gray-800 dark:text-gray-100">{note.title}</h3>
        <div className="flex space-x-2">
          <Link
            to={`/edit/${note.id}`}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        {formatDate(note.createdAt)}
      </p>
      
      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
