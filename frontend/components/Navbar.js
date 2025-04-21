'use client';

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
  const context = useContext(AuthContext);
  const user = context ? context.user : null;
  const logout = context ? context.logout : () => {};

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex space-x-6">
          <Link href="/" className="text-white text-lg font-semibold hover:text-gray-300">
            Screenwriter
          </Link>
          <Link href="/docs" className="text-white text-lg font-semibold hover:text-gray-300">
            Documents
          </Link>
        </div>

        <div>
          
        {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-white text-lg font-semibold">Welcome, {user.username}!</p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="text-white text-lg font-semibold hover:text-gray-300">
              Login/Signup
            </Link>
          )}
       
        </div>

      </div>
    </nav>
  );
}
