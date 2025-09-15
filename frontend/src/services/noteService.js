import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

const noteService = {
  // Get all notes, optionally filtered by tag
  getNotes: async (tag = null) => {
    try {
      const params = tag ? { tag } : {};
      const response = await api.get('/notes', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Get a single note by ID
  getNoteById: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  },

  // Create a new note
  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update an existing note
  updateNote: async (id, noteData) => {
    try {
      const response = await api.patch(`/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  },

  // Get all unique tags (client-side implementation)
  getAllTags: async () => {
    try {
      const notes = await noteService.getNotes();
      const allTags = notes.reduce((tags, note) => {
        note.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
        return tags;
      }, []);
      
      return allTags;
    } catch (error) {
      console.error('Error getting all tags:', error);
      throw error;
    }
  }
};

export default noteService;
