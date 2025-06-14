'use client';

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
  const context = useContext(AuthContext);
  const user = context ? context.user : null;
  const logout = context ? context.logout : () => {};

  return (
    <nav className="bg-[var(--brand-dark)] h-14 px-4 flex items-center border-b-2 border-amber-300">
      <div className="mx-auto flex justify-between items-center w-full">
        
        <div className="flex space-x-6">
          <Link href={user ? '/docs' : '/'} className="text-white text-lg font-semibold hover:text-gray-300 transition">
            Screenwriter.
          </Link>
          
        </div>

        <div>
          
        {user ? (
            <div className="flex gap-4 items-center">
              <Link href="/docs" className="text-white text-lg font-semibold hover:text-gray-300 transition">
                Documents
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 outline-1 outline-white text-white rounded-md hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="px-4 py-2 outline-1 outline-white text-white rounded-md hover:bg-gray-600 transition">
              Signup
            </Link>
          )}
       
        </div>

      </div>
    </nav>
  );
}
