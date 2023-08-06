import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800 ml-8 md:ml-4 font-mono">Doc-in</h1>
        </div>
        <div className="hidden md:flex items-center">
          {/* Add any profile or user-related information here */}
          <span className="text-gray-600 text-sm">John Doe</span>
          <UserCircleIcon className="w-12 h-12 ml-2 mr-6 text-gray-600" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
