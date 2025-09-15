import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          NotesVault
        </Link>
        
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Notes
              </Link>
            </li>
            <li>
              <Link to="/new" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 font-medium">
                + New Note
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
