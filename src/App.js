// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AddPage from "./components/AddPage";
import SearchResult from "./components/SearchList";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddPage />} />
        <Route exact path="/search-results" element={<SearchResult />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
