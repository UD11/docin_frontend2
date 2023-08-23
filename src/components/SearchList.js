import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPVOTE_QUERY } from "../graphql";
import { DOWNVOTE_QUERY } from "../graphql";
import { SEARCH_QUERY } from "../graphql";
import List_custom from "./list";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const homesearch = new URLSearchParams(location.search).get("q");
  const [searchQuery, setSearchQuery] = useState(homesearch || "");
  const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_QUERY);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] =
    useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] =
    useMutation(DOWNVOTE_QUERY);

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
    console.log(parseInt(id));
    downvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#EDDBC7]">
      <div className="w-1/2 max-w-screen-xl p-8">
        <div className="relative my-4">
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
          <h1 className="text-3xl font-semibold mb-6 font-mono text-[#2A2F4F] text-center">
            Search Results
          </h1>
          <List_custom
            searchResults={searchResults}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
