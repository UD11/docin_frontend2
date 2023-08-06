// App.js
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/NavBar';
import SearchBar from './components/SearchBar';
import HeaderMessage from './components/Header';
import AddButton from './components/AddBttn';
import Home from './components/Home';
import AddPage from './components/AddPage';
import SearchResult from './components/SearchList';

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddPage />} />
        <Route exact path="/search-results" element={<SearchResult />} />
      </Routes>
      <AddButton />
    </BrowserRouter>


  );
};

export default App;
