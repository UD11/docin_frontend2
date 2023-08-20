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
      className="bg-[#EDDBC7] flex items-center justify-center mt-16"
    >
      <div className="relative w-[90%] md:w-[60%] lg:w-[40%] ">
        <input
          type="text"
          id="searchInput"
          value={homeSearch}
          onChange={(e) => setHomeSearch(e.target.value)}
          placeholder="Search..."
          autoFocus
          className="w-full px-6 py-4 rounded-none bg-EDDBC7 text-black  placeholder-[#A7727D] focus:outline-none focus:ring-2 focus:ring-[#A7727D]"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center rounded-none bg-[#A7727D] transform -translate-y-1 transition duration-300 hover:translate-y-0 hover:shadow-2xl"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-[#F9F5E7]" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
