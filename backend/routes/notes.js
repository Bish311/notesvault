const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// @route   GET /notes
// @desc    Get all notes or filter by tag
// @access  Public (would be Private with auth)
router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    let query = {};
    
    // Filter by tag if provided
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    const notes = await Note.find(query).sort({ createdAt: -1 });
    
    // Format the response to match API design in context file
    const formattedNotes = notes.map(note => ({
      id: note._id,
      title: note.title,
      tags: note.tags,
      createdAt: note.createdAt
    }));
    
    res.json(formattedNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /notes/:id
// @desc    Get note by ID
// @access  Public (would be Private with auth)
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({
      id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags,
      createdAt: note.createdAt
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /notes
// @desc    Create a new note
// @access  Public (would be Private with auth)
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newNote = new Note({
      title,
      content,
      tags: tags || []
    });
    
    const savedNote = await newNote.save();
    
    res.status(201).json({
      id: savedNote._id,
      title: savedNote.title,
      tags: savedNote.tags,
      createdAt: savedNote.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /notes/:id
// @desc    Update a note
// @access  Public (would be Private with auth)
router.patch('/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updateFields = {};
    
    if (title) updateFields.title = title;
    if (content !== undefined) updateFields.content = content;
    if (tags) updateFields.tags = tags;
    updateFields.updatedAt = Date.now();
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({
      id: note._id,
      title: note.title,
      tags: note.tags,
      createdAt: note.createdAt
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /notes/:id
// @desc    Delete a note
// @access  Public (would be Private with auth)
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    await note.deleteOne();
    
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
