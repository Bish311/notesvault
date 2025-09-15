// Sample data import script for NotesVault
const mongoose = require('mongoose');
const Note = require('./models/Note');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read sample data
const sampleData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'sample-data.json'), 'utf8')
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesvault', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const importData = async () => {
  try {
    // Clear existing data
    await Note.deleteMany({});
    console.log('✅ Existing notes deleted');

    // Import sample data
    const notes = await Note.insertMany(sampleData);
    console.log(`✅ ${notes.length} sample notes imported`);
    
    // Display imported notes
    console.log('\nImported Notes:');
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.title} (ID: ${note._id})`);
      console.log(`   Tags: ${note.tags.join(', ')}`);
    });
    
    console.log('\nSample data imported successfully! You can now test the API.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
