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
    <form onSubmit={handleSearch} className="bg-gray-100 flex items-center justify-center pt-16">
      <div className="w-1/2 h-1/4 rounded-md overflow-hidden shadow-md bg-white">
        <div className="relative flex items-center">
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="searchInput"
            value={homeSearch}
            onChange={(e) => sethomeSearch(e.target.value)}
            placeholder="Search..."
            autoFocus
            className="bg-transparent border-none p-4 pl-10 w-full focus:outline-none font-mono"
          />
          <button type="submit" className="absolute left-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
