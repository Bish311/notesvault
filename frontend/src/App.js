import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import NotesList from './pages/NotesList';
import NoteEditor from './pages/NoteEditor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<NotesList />} />
              <Route path="/new" element={<NoteEditor />} />
              <Route path="/edit/:id" element={<NoteEditor />} />
            </Routes>
          </main>
          <footer className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>NotesVault &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
