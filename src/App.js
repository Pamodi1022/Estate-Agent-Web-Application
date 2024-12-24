import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SearchBar from './Components/SearchBar';
import SearchForm from './Components/SearchForm';
import Advertisements from './Components/Advertisements';

function App() {
  return (
    <Router>
      <Navbar />
      <Advertisements />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/ads" element={<Advertisements />} />
          <Route path="/searchform" element={<SearchForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
