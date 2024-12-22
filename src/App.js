// filepath: /c:/Users/ASUS/Desktop/ACS-cw/estate_agent_webapplication/src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import SearchForm from './Components/SearchForm';

function App() {
  return (
    <Router>
      <Navbar />
      <SearchForm />
      <div>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;