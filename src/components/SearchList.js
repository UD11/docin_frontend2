import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  // State to store the search query and search results

  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const homesearch = new URLSearchParams(location.search).get('q');
  const [searchQuery, setSearchQuery] = useState(homesearch||'');

  // Function to handle search
  useEffect(() => {
    if (homesearch) {
      axios
        .get(`http://localhost:8000/api/pdfs/search/?search=${homesearch}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error('Error searching PDFs:', error);
        });
    }
  }, [homesearch]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:8000/api/pdfs/search/?search=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error searching PDFs:', error);
      });
  };

  return (
    <div className="p-8">
      <div className="relative mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex w-1/2 p-3 pl-10 pr-3 rounded-sm shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
          />
          <button
            onClick={handleSearch}
            className="ml-3 text-gray-500 font-mono bg-transparent focus:outline-none"
          >
            <span className="px-2 py-1 rounded-lg bg-white shadow-outline">{searchResults.length} results</span>
          </button>
        </div>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-6 font-mono">Search Results</h1>
      {searchResults.map((result, index) => (
        <div key={index} className="border-b border-gray-300 py-4">
          <h2 className="text-xl font-semibold mb-1 font-mono">{result.title}</h2>
          <p className="text-gray-600 mb-2">{result.author}</p>
          <p className="text-gray-600 mb-2 font-mono">{result.institution_name}</p>
          <p className="text-gray-600 mb-2">{result.link}</p>
          <p className="text-gray-700 font-mono">{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
