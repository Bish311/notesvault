import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-indigo-600 dark:bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          NotesVault
        </Link>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/new" className="bg-white dark:bg-indigo-500 text-indigo-600 dark:text-white px-4 py-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-600 font-medium">
                  + New Note
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
