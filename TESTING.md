# NotesVault Testing Guide

This document provides instructions for testing the NotesVault application.

## Prerequisites

1. **MongoDB** must be installed and running
2. **Node.js** and **npm** must be installed

## Testing the Backend API

### Option 1: Using the Test Script

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the test dependency:
   ```
   npm install --no-save node-fetch
   ```

3. Start the MongoDB service if not already running

4. Run the test:
   ```
   node test-api.js
   ```

### Option 1.5: Import Sample Data

You can import sample data to quickly populate your database:

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the import script:
   ```
   npm run import-data
   ```

This will add 5 sample notes with various tags for testing.

### Option 2: Manual Testing with Postman/Thunder Client

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Use Postman, Thunder Client, or any API testing tool to test the following endpoints:

   - `GET http://localhost:5000/notes` - Get all notes
   - `POST http://localhost:5000/notes` - Create a new note
     ```json
     {
       "title": "Test Note",
       "content": "This is a test note",
       "tags": ["test", "api"]
     }
     ```
   - `GET http://localhost:5000/notes/:id` - Get a note by ID
   - `PATCH http://localhost:5000/notes/:id` - Update a note
     ```json
     {
       "title": "Updated Test Note"
     }
     ```
   - `GET http://localhost:5000/notes?tag=test` - Filter notes by tag
   - `DELETE http://localhost:5000/notes/:id` - Delete a note

## Testing the Frontend

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

4. Test the following features:
   - Create a new note with tags
   - View the note in the list
   - Filter notes by tag
   - Search for notes by title
   - Edit an existing note
   - Delete a note

## Running Automated Frontend Tests

The frontend has unit tests for the components:

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Run the tests:
   ```
   npm test
   ```

This will run tests for components like the NoteCard component.
