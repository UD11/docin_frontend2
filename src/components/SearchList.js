import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { useLazyQuery,useMutation } from "@apollo/client";
import { UPVOTE_QUERY } from "../graphql";
import { DOWNVOTE_QUERY } from "../graphql";
import { SEARCH_QUERY } from "../graphql";



const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const homesearch = new URLSearchParams(location.search).get("q");
  const [searchQuery, setSearchQuery] = useState(homesearch || "");
  const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_QUERY);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] = useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] = useMutation(DOWNVOTE_QUERY);

  useEffect(() => {
    if (homesearch) {
      executeSearch({ variables: { query: homesearch } });
    }
  }, [executeSearch, homesearch]);

  useEffect(() => {
    if (data && data.searchPdfs) {
      setSearchResults(data.searchPdfs);
    }
  }, [data]);

  const handleSearch = () => {
    executeSearch({ variables: { query: searchQuery } });
  };

  const [counts, setCounts] = useState([]);

  const handleUpvote = (id) => {

    upvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  const handleDownvote = (id) => {
    console.log(parseInt(id))
    downvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#EDDBC7]">
      <div className="h-full overflow-auto">
        <div className="p-8">
          <div className="relative my-4">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search query..."
                className="px-6 py-4 rounded-none bg-[#F8EAD8] text-[#2A2F4F] placeholder-[#2A2F4F] focus:outline-none focus:ring-2 focus:ring-[#A7727D] w-1/2 border border-[#2A2F4F] border-opacity-50"
              />
              <button
                onClick={handleSearch}
                className="ml-3 text-[#2A2F4F] text-lg font-mono bg-transparent focus:outline-none border border-[#2A2F4F] border-opacity-50"
              >
                <span className="px-2 py-1 rounded-lg bg-[#F8EAD8] bg-opacity-75">
                  {searchResults.length} Results
                </span>
              </button>
            </div>
            <button
              type="submit"
              className="absolute right-[50%] top-0 h-full px-4 flex items-center justify-center bg-[#A7727D] focus:outline-none border border-[#2A2F4F] border-opacity-50"
            >
              <FaSearch className="w-5 h-5 text-[#F9F5E7]" />
            </button>
          </div>
          <h1 className="text-3xl font-semibold mb-6 font-mono text-[#2A2F4F]">
            Search Results
          </h1>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="border-b border-[#2A2F4F] py-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-2xl font-semibold mb-1 mt-2 font-mono hover:underline mr-2 text-[#2A2F4F]"
                  >
                    {result.title}
                  </a>
                  <button
                    className="py-2 px-4 mx-4 text-[#2A2F4F] font-mono focus:outline-none border border-[#2A2F4F] rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                    onClick={() => handleUpvote(result.id)}
                  >
                    <FaArrowUp className="w-6 h-6 md:w-4 md:h-4 text-[#0D7377]" />
                  </button>
                  <span className="mx-1 text-[#2A2F4F]">
                    {result.upvote}
                  </span>
                  <button
                    className="py-2 px-4 mr-4 text-[#2A2F4F] font-mono focus:outline-none border border-[#2A2F4F] rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                    onClick={() => handleDownvote(result.id)}
                  >
                    <FaArrowDown className="w-6 h-6 md:w-4 md:h-4 text-[#E63E6D]" />
                  </button>
                  <span className="mx-1 text-[#2A2F4F]">
                    {result.downvote}
                  </span>
                </div>
                <p className="text-[#2A2F4F] mb-2">{result.link}</p>
                <p className="text-[#2A2F4F] font-mono text-lg">
                  {result.description}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-[#2A2F4F] mb-2 text-lg font-bold">
                    {result.author}
                  </p>
                  <p className="text-[#2A2F4F] mb-2 font-mono text-lg font-bold">
                    {result.institutionName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
