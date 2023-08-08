// Home.js
import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Header from './Header';
import SocialIcons from './SocialIcons';

const Home = () => {
  return (
    <div className="bg-[#EEF1FF] min-h-screen">
      <NavBar />
      <Header />
      <SearchBar />
      <SocialIcons />
    </div>
  );
};

export default Home;
