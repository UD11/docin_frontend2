import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';

const SearchResult = () => {
  // State to store the search query and search results
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const homesearch = new URLSearchParams(location.search).get('q');
  const [searchQuery, setSearchQuery] = useState(homesearch || '');

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

  // State to keep track of upvotes and downvotes count
  const [counts, setCounts] = useState([]);

  const handleUpvote = (id)=>{
    console.log('upvoted')
    console.log('the id is', id)
  }
  
  const handleDownvote = (id) =>{
    console.log('donwvoted')
    console.log('the downvote id', id)
  }

  return (
    <div className="p-8 bg-[#EEF1FF] h-full">
      <div className="relative my-4">
        <div className="flex items-center ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="px-6 py-4 rounded-full bg-[#D2DAFF] text-[#2A2F4F] placeholder-[#2A2F4F]  focus:outline-none focus:ring-2 focus:ring-[#B1B2FF] w-1/2"
          />
          <button
            onClick={handleSearch}
            className="ml-3 text-[#2A2F4F] text-lg font-mono bg-transparent focus:outline-none"
          >
            <span className="px-2 py-1 rounded-lg bg-[#EEF1FF] shadow-outline">
              {searchResults.length} Results
            </span>
          </button>
        </div>
  
          <button
          type="submit"
          className="absolute right-[50%] top-0 h-full px-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#B1B2FF] to-[#D2DAFF]"
        >
          <FaSearch className="w-5 h-5 text-[#2A2F4F]" />
        </button>

      </div>
      <h1 className="text-3xl font-semibold mb-6 font-mono text-[#2A2F4F]">Search Results</h1>
      {searchResults.map((result, index) => (
        <div key={index} className="border-b border-[#AAC4FF] py-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-2xl font-semibold mb-1 mt-2 font-mono hover:underline mr-2 text-[#B1B2FF]"
              >
                {result.title}
              </a>

              <button
                className="py-2 px-4 mx-4 text-gray-500 font-mono focus:outline-none border border-gray-300 rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#AAC4FF]"
                onClick={handleSearch}
              >
                <FaArrowUp className="w-6 h-6 md:w-4 md:h-4 text-[#0D7377]" />
                
              </button>
              <span className="mx-1 text-[#2A2F4F]">{counts[index] || 0}</span>
              <button
                className="py-2 px-4 mr-4 text-gray-500 font-mono focus:outline-none border border-gray-300 rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#D2DAFF]"
                onClick={handleSearch}
              >
                <FaArrowDown className="w-6 h-6 md:w-4 md:h-4 text-[#E63E6D]" />
                
              </button>
              <span className="mx-1 text-[#2A2F4F]">{counts[index] || 0}</span>
            </div>


            <p className="text-cyan-500 mb-2">{result.link}</p>     
            <p className="text-[#AAC4FF] font-mono text-lg">{result.description}</p>
            <div className="flex items-center space-x-2">
            <p className="text-[#B1B2FF] mb-2 text-lg font-bold">{result.author}</p>
            <p className="text-[#B1B2FF] mb-2 font-mono text-lg font-bold">{result.institution_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
