// Home.js
import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Header from './Header';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <Header />
      <SearchBar />
    </div>
  );
};

export default Home;
