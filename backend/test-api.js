// Simple test script for NotesVault API
const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:5000';
let testNoteId = null;

// Test data
const testNote = {
  title: 'Test Note',
  content: 'This is a test note created by the test script',
  tags: ['test', 'api']
};

const updatedNote = {
  title: 'Updated Test Note',
  tags: ['test', 'updated']
};

// Helper function for colorful console output
const logStep = (step, message) => {
  console.log(`\n\x1b[36m${step}: \x1b[0m${message}`);
};

const logSuccess = (message) => {
  console.log(`\x1b[32m✓ ${message}\x1b[0m`);
};

const logError = (message, error) => {
  console.error(`\x1b[31m✗ ${message}\x1b[0m`);
  if (error) console.error(error);
};

// Test functions
async function testCreateNote() {
  logStep('Step 1', 'Creating a new note');
  
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testNote),
    });
    
    const data = await response.json();
    
    if (response.status === 201 && data.id) {
      testNoteId = data.id;
      logSuccess(`Note created with ID: ${testNoteId}`);
      return true;
    } else {
      logError('Failed to create note', data);
      return false;
    }
  } catch (error) {
    logError('Error creating note', error);
    return false;
  }
}

async function testGetNotes() {
  logStep('Step 2', 'Retrieving all notes');
  
  try {
    const response = await fetch(`${API_URL}/notes`);
    const data = await response.json();
    
    if (response.ok && Array.isArray(data)) {
      logSuccess(`Retrieved ${data.length} notes`);
      return true;
    } else {
      logError('Failed to get notes', data);
      return false;
    }
  } catch (error) {
    logError('Error getting notes', error);
    return false;
  }
}

async function testGetNoteById() {
  if (!testNoteId) {
    logError('Cannot test get note by ID: No note ID available');
    return false;
  }
  
  logStep('Step 3', `Retrieving note with ID: ${testNoteId}`);
  
  try {
    const response = await fetch(`${API_URL}/notes/${testNoteId}`);
    const data = await response.json();
    
    if (response.ok && data.id === testNoteId) {
      logSuccess('Successfully retrieved note by ID');
      return true;
    } else {
      logError('Failed to get note by ID', data);
      return false;
    }
  } catch (error) {
    logError('Error getting note by ID', error);
    return false;
  }
}

async function testUpdateNote() {
  if (!testNoteId) {
    logError('Cannot test update note: No note ID available');
    return false;
  }
  
  logStep('Step 4', `Updating note with ID: ${testNoteId}`);
  
  try {
    const response = await fetch(`${API_URL}/notes/${testNoteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    });
    
    const data = await response.json();
    
    if (response.ok && data.title === updatedNote.title) {
      logSuccess('Successfully updated note');
      return true;
    } else {
      logError('Failed to update note', data);
      return false;
    }
  } catch (error) {
    logError('Error updating note', error);
    return false;
  }
}

async function testFilterNotesByTag() {
  logStep('Step 5', 'Filtering notes by tag: "test"');
  
  try {
    const response = await fetch(`${API_URL}/notes?tag=test`);
    const data = await response.json();
    
    if (response.ok && Array.isArray(data)) {
      logSuccess(`Retrieved ${data.length} notes with tag "test"`);
      return true;
    } else {
      logError('Failed to filter notes by tag', data);
      return false;
    }
  } catch (error) {
    logError('Error filtering notes by tag', error);
    return false;
  }
}

async function testDeleteNote() {
  if (!testNoteId) {
    logError('Cannot test delete note: No note ID available');
    return false;
  }
  
  logStep('Step 6', `Deleting note with ID: ${testNoteId}`);
  
  try {
    const response = await fetch(`${API_URL}/notes/${testNoteId}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (response.ok && data.success === true) {
      logSuccess('Successfully deleted note');
      return true;
    } else {
      logError('Failed to delete note', data);
      return false;
    }
  } catch (error) {
    logError('Error deleting note', error);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('\x1b[35m=== NOTESVAULT API TEST ===\x1b[0m');
  
  let success = true;
  
  // Test if API is reachable
  try {
    const response = await fetch(`${API_URL}`);
    if (response.ok) {
      logSuccess('API is reachable');
    } else {
      logError('API is not reachable');
      return;
    }
  } catch (error) {
    logError('Cannot reach API. Make sure the server is running.', error);
    return;
  }
  
  // Run the test sequence
  success = await testCreateNote() && success;
  success = await testGetNotes() && success;
  success = await testGetNoteById() && success;
  success = await testUpdateNote() && success;
  success = await testFilterNotesByTag() && success;
  success = await testDeleteNote() && success;
  
  // Print test summary
  console.log('\n\x1b[35m=== TEST SUMMARY ===\x1b[0m');
  if (success) {
    console.log('\x1b[32m✓ All tests passed successfully!\x1b[0m');
  } else {
    console.log('\x1b[31m✗ Some tests failed. See details above.\x1b[0m');
  }
}

// Start the tests
runTests().catch(err => {
  console.error('Test runner error:', err);
});
