import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import logo from '../icons/docin-web-removebg-preview.png';

const Navbar = () => {
  return (
    <nav className="bg-[#EEF1FF]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Doc-in Logo"
              className="w-auto h-auto md:w-10 lg:w-1/4 mx-2 md:mx-0"
            />
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {/* Add any profile or user-related information here */}
            <span className="text-[#2A2F4F] text-sm md:text-md lg:text-lg xl:text-xl">
              John Doe
            </span>
            <UserCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-[#B1B2FF]" />
          </div>
          <div className="md:hidden flex items-center">
            <UserCircleIcon className="w-10 h-10 text-[#B1B2FF]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
