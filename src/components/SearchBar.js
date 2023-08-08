import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [homeSearch, sethomeSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${homeSearch}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-[#EEF1FF] flex items-center justify-center mt-16">
      <div className="relative w-[90%] md:w-[60%] lg:w-[40%]">
        <input
          type="text"
          id="searchInput"
          value={homeSearch}
          onChange={(e) => sethomeSearch(e.target.value)}
          placeholder="Search..."
          autoFocus
          className="w-full px-6 py-4 rounded-full bg-[#D2DAFF] text-[#FDE2F3] placeholder-[#2A2F4F] focus:outline-none focus:ring-2 focus:ring-[#B1B2FF]"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#B1B2FF] to-[#D2DAFF]"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-[#2A2F4F]" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
