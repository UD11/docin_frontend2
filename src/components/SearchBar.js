import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AddButton from "./AddBttn";

const SearchBar = () => {
  const [homeSearch, setHomeSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${homeSearch}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white flex items-center justify-center mt-16"
    >
      <div className="relative w-[90%] md:w-[60%] lg:w-[40%] shadow-cyan-500/50">
        <input
          type="text"
          id="searchInput"
          value={homeSearch}
          onChange={(e) => setHomeSearch(e.target.value)}
          placeholder="Search..."
          autoFocus
          className="w-full px-6 py-4 rounded-lg bg-white text-black  placeholder-black  hover:scale-125 shadow-cyan-500/50"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center  bg-cyan-500/50 rounded-lg hover:scale-125"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-[#F9F5E7]" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
