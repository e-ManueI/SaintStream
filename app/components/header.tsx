import { Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto inset-x-0 absolute top-0 z-[5000] w-screen">
      <div className="flex items-center px-4 py-4 justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-black font-bold">
            SS
          </div>
          <span className="text-xl font-semibold text-white">SaintStream</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 font-sans text-lg">
          <Link
            href="/"
            className="text-white font-semibold hover:text-green-500"
          >
            Home
          </Link>
          <Link href="/movies" className="text-gray-200 hover:text-green-500">
            Discover
          </Link>
          <Link href="/movies" className="text-gray-200 hover:text-green-500">
            Movie Release
          </Link>
          <Link href="#" className="text-gray-200 hover:text-green-500">
            Forum
          </Link>
          <Link href="#" className="text-gray-200 hover:text-green-500">
            About
          </Link>
        </nav>

        {/* Search and Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Search className="text-gray-400 hover:text-green-500 cursor-pointer" />
          <button className="px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800">
            Sign up
          </button>
          <button className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
