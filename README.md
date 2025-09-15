# NotesVault

NotesVault is a lightweight notes application where users can create notes, tag them, and search/filter easily.

## Project Structure

```
vault/
├── backend/         # Node.js + Express API
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── config/      # Configuration files
│   └── server.js    # Entry point
└── frontend/        # React frontend
    ├── public/      # Static assets
    └── src/         # React components
```

## Features

- Create, read, update, and delete notes
- Add tags to notes for organization
- Filter notes by tags using the Tag Cloud
- Search notes by title
- Clean, responsive UI using Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy or rename `.env` and update with your MongoDB connection string

4. Start the server:
   ```bash
   npm start
   ```
   - For development with auto-reload:
   ```bash
   npm run dev
   ```

5. The API will be available at: `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The app will open in your browser at: `http://localhost:3000`

## API Endpoints

- `GET /notes` - Get all notes (with optional tag filter)
- `GET /notes/:id` - Get note by ID
- `POST /notes` - Create a new note
- `PATCH /notes/:id` - Update an existing note
- `DELETE /notes/:id` - Delete a note

## Future Enhancements

- User authentication
- Markdown editor for notes
- Dark mode toggle
- Deployment instructions

## Technologies Used

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Tailwind CSS
- **State Management:** React Hooks
- **API Communication:** Axios

## Testing

For comprehensive testing information, see [TESTING.md](TESTING.md).

## GitHub Setup

This project has been initialized with Git. To push it to GitHub:

1. See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions
2. Create a GitHub repository named `notesvault`
3. Run the `push-to-github.ps1` script (Windows) to push the code to GitHub
