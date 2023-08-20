// Home.js
import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Header from "./Header";
import SocialIcons from "./SocialIcons";
import AddButton from "./AddBttn";
import CardList from "./profilepost";

const Home = () => {
  return (
    <div className="bg-[#EDDBC7] min-h-screen">
      <NavBar />
      <Header />
      <SearchBar />
      <CardList />
      <SocialIcons />
      <AddButton />
    </div>
  );
};

export default Home;
