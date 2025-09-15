import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import TagCloud from '../components/TagCloud';
import noteService from '../services/noteService';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Fetch notes on component mount or when selected tag changes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const data = await noteService.getNotes(selectedTag);
        setNotes(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load notes');
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [selectedTag]);

  // Handle note deletion
  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteService.deleteNote(id);
        // Remove the deleted note from state
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } catch (err) {
        setError('Failed to delete note');
      }
    }
  };

  // Filter notes by search term (client-side filtering)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Notes</h1>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tag Cloud */}
        <TagCloud onTagSelect={setSelectedTag} selectedTag={selectedTag} />
      </div>
      
      {/* Loading and Error States */}
      {isLoading && <div className="text-center py-4">Loading notes...</div>}
      
      {error && <div className="text-red-500 py-4">{error}</div>}
      
      {/* Notes Grid */}
      {!isLoading && !error && (
        <>
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No notes found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotesList;
