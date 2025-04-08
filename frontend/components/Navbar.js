import Link from "next/link";

export default function Navbar() {
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
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}